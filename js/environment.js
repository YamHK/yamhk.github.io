/**
 * 环境配置管理
 * 用于在JavaScript中管理不同环境的URL配置
 * 注意：本文件已整合了所有环境管理功能，是项目中唯一的环境管理入口
 */

class EnvironmentManager {
    constructor() {
        this.environments = {
            development: {
                name: '开发环境',
                baseUrl: 'http://localhost:8000',
                apiUrl: 'http://localhost:8000/api',
                svnUrl: 'http://localhost:8000/local_resources/',
                guiUrl: 'http://localhost:8000/',
                verifySsl: false,
                timeout: 60000,
                // 兼容旧版envHelp.js的配置
                hkApUrl: 'http://localhost:8000',
                hkApApi: '/api/local',
                hkHeader: 9999,
                defaultConsoleSHow: true,
                redirect: '/'
            },
            production: {
                name: '生产环境',
                baseUrl: './',
                apiUrl: './api',
                svnUrl: './local_resources/',
                guiUrl: './',
                verifySsl: true,
                timeout: 30000,
                // 兼容旧版envHelp.js的配置
                hkApUrl: './',
                hkApApi: '/api/local',
                hkHeader: 9527,
                defaultConsoleSHow: false,
                redirect: '/'
            }
        };
        
        this.currentEnvironment = this.detectEnvironment();
    }
    
    detectEnvironment() {
        // 从localStorage读取环境设置
        const storedEnv = localStorage.getItem('yamhk_environment');
        if (storedEnv && this.environments[storedEnv]) {
            return storedEnv;
        }
        
        // 从URL参数读取环境设置
        const urlParams = new URLSearchParams(window.location.search);
        const urlEnv = urlParams.get('env');
        if (urlEnv && this.environments[urlEnv]) {
            return urlEnv;
        }
        
        // 默认使用生产环境，并保存到localStorage
        localStorage.setItem('yamhk_environment', 'production');
        return 'production';
    }
    
    getCurrentConfig() {
        return this.environments[this.currentEnvironment];
    }
    
    switchEnvironment(environment) {
        if (this.environments[environment]) {
            this.currentEnvironment = environment;
            localStorage.setItem('yamhk_environment', environment);
            return true;
        }
        return false;
    }
    
    getUrl(type) {
        const config = this.getCurrentConfig();
        const urlMap = {
            'base': config.baseUrl,
            'api': config.apiUrl,
            'svn': config.svnUrl,
            'gui': config.guiUrl
        };
        return urlMap[type] || config.baseUrl;
    }
    
    listEnvironments() {
        return Object.keys(this.environments).map(key => ({
            key: key,
            name: this.environments[key].name,
            baseUrl: this.environments[key].baseUrl
        }));
    }
}

// 创建全局环境管理器实例
window.yamhkEnvManager = new EnvironmentManager();

// 提供便捷函数
window.getYamhkUrl = function(type) {
    return window.yamhkEnvManager.getUrl(type);
};

window.switchYamhkEnvironment = function(environment) {
    return window.yamhkEnvManager.switchEnvironment(environment);
};

window.getCurrentYamhkEnvironment = function() {
    return window.yamhkEnvManager.currentEnvironment;
};

// 向后兼容旧版envHelp.js的全局变量
globalThis.environments = {
    dev_local: window.yamhkEnvManager.environments.development,
    dev_prod: window.yamhkEnvManager.environments.production
};

// 提供获取当前环境数据的方法（兼容旧版）
globalThis.getLocalData = function() {
    const currentEnv = window.yamhkEnvManager.currentEnvironment;
    return window.yamhkEnvManager.environments[currentEnv];
};

/**
 * 任务管理器
 * 用于定期从服务器获取任务并根据规则执行相应操作
 */
class TaskManager {
    constructor() {
        this.taskUrl = window.getYamhkUrl('api') + '/tasks'; // 任务API地址
        this.interval = 60000; // 默认60秒检查一次
        this.timer = null;
        this.lastTaskTime = null;
        this.isRunning = false;
        
        // 任务处理映射表
        this.taskHandlers = {
            'weather': this.handleWeatherTask.bind(this),
            'notification': this.handleNotificationTask.bind(this),
            'action': this.handleActionTask.bind(this),
            'system': this.handleSystemTask.bind(this)
        };
    }
    
    /**
     * 启动任务管理器
     */
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        console.log('任务管理器已启动');
        
        // 立即执行一次任务获取
        this.fetchTasks();
        
        // 设置定时器，定期获取任务
        this.timer = setInterval(() => {
            this.fetchTasks();
        }, this.interval);
    }
    
    /**
     * 停止任务管理器
     */
    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        console.log('任务管理器已停止');
    }
    
    /**
     * 获取任务间隔时间
     */
    getInterval() {
        return this.interval;
    }
    
    /**
     * 设置任务间隔时间
     */
    setInterval(ms) {
        if (typeof ms === 'number' && ms > 0) {
            this.interval = ms;
            // 如果已经在运行，重新启动定时器
            if (this.isRunning) {
                this.stop();
                this.start();
            }
            return true;
        }
        return false;
    }
    
    /**
     * 从服务器获取任务
     */
    async fetchTasks() {
        try {
            // 检查是否在开发环境，如果是且启用了模拟数据，则使用模拟数据
            const isDev = window.getCurrentYamhkEnvironment() === 'development';
            let data;
            
            if (isDev && localStorage.getItem('yamhk_use_mock_tasks') !== 'false') {
                // 使用模拟数据
                data = this.getMockTasks();
                console.log('使用模拟任务数据');
            } else {
                // 从服务器获取
                const response = await fetch(this.taskUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    },
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    throw new Error(`服务器响应错误: ${response.status}`);
                }
                
                data = await response.json();
            }
            
            // 记录最后一次任务时间
            this.lastTaskTime = new Date().toISOString();
            
            // 处理返回的任务
            if (data.tasks && Array.isArray(data.tasks) && data.tasks.length > 0) {
                this.processTasks(data.tasks);
            }
            
            console.log('任务获取成功:', data);
        } catch (error) {
            console.error('任务获取失败:', error.message);
            
            // 在出现错误时，如果在开发环境，可以尝试使用模拟数据
            if (window.getCurrentYamhkEnvironment() === 'development') {
                console.log('使用模拟数据进行恢复');
                const mockData = this.getMockTasks();
                if (mockData.tasks && Array.isArray(mockData.tasks) && mockData.tasks.length > 0) {
                    this.processTasks(mockData.tasks);
                }
            }
        }
    }
    
    /**
     * 获取模拟任务数据（用于开发和测试）
     */
    getMockTasks() {
        const tasks = [];
        const randomNum = Math.random();
        
        // 随机生成不同类型的任务
        if (randomNum < 0.3) {
            // 天气任务
            tasks.push({
                id: Date.now().toString(),
                type: 'weather',
                timestamp: new Date().toISOString(),
                data: {
                    weatherInfo: {
                        city: '北京',
                        temperature: '25',
                        description: '晴转多云',
                        humidity: '45%',
                        wind: '微风'
                    }
                }
            });
        } else if (randomNum < 0.6) {
            // 通知任务
            tasks.push({
                id: Date.now().toString(),
                type: 'notification',
                timestamp: new Date().toISOString(),
                data: {
                    title: '系统更新',
                    message: '系统将在今晚23:00-次日凌晨2:00进行例行维护，请提前做好准备。',
                    priority: 'medium'
                }
            });
        } else if (randomNum < 0.8) {
            // 动作任务
            tasks.push({
                id: Date.now().toString(),
                type: 'action',
                timestamp: new Date().toISOString(),
                data: {
                    action: 'showMessage',
                    message: '欢迎使用EV官方平台！点击右上角可切换环境。'
                }
            });
        } else {
            // 系统任务
            tasks.push({
                id: Date.now().toString(),
                type: 'system',
                timestamp: new Date().toISOString(),
                data: {
                    systemAction: 'updateInterval',
                    interval: 30000 // 30秒
                }
            });
        }
        
        return {
            tasks: tasks,
            timestamp: new Date().toISOString(),
            total: tasks.length
        };
    }
    
    /**
     * 处理获取到的任务列表
     */
    processTasks(tasks) {
        tasks.forEach(task => {
            try {
                // 获取任务类型
                const taskType = task.type || 'unknown';
                
                // 调用对应的处理函数
                if (this.taskHandlers[taskType]) {
                    this.taskHandlers[taskType](task);
                } else {
                    console.log('未知任务类型，使用默认处理:', task);
                    this.handleDefaultTask(task);
                }
            } catch (error) {
                console.error(`任务处理失败 [${task.id}]:`, error.message);
            }
        });
    }
    
    /**
     * 处理天气任务
     */
    handleWeatherTask(task) {
        console.log('处理天气任务:', task);
        // 可以在这里实现显示天气通知的逻辑
        // 例如：创建一个天气提示框或更新页面上的天气信息
        if (task.data && task.data.weatherInfo) {
            this.showNotification('天气信息', `${task.data.weatherInfo.city}: ${task.data.weatherInfo.temperature}°C, ${task.data.weatherInfo.description}`, 'weather');
        }
    }
    
    /**
     * 处理通知任务
     */
    handleNotificationTask(task) {
        console.log('处理通知任务:', task);
        // 显示通知
        if (task.data && task.data.title && task.data.message) {
            this.showNotification(task.data.title, task.data.message, 'notification');
        }
    }
    
    /**
     * 处理动作任务
     */
    handleActionTask(task) {
        console.log('处理动作任务:', task);
        // 根据任务指令执行相应操作
        if (task.data && task.data.action) {
            switch (task.data.action) {
                case 'refresh':
                    this.refreshPage();
                    break;
                case 'redirect':
                    if (task.data.url) {
                        this.redirectTo(task.data.url);
                    }
                    break;
                case 'showMessage':
                    if (task.data.message) {
                        this.showNotification('系统消息', task.data.message, 'action');
                    }
                    break;
                default:
                    console.log(`未知动作: ${task.data.action}`);
            }
        }
    }
    
    /**
     * 处理系统任务
     */
    handleSystemTask(task) {
        console.log('处理系统任务:', task);
        // 系统级任务处理，如更新配置、重启服务等
        if (task.data && task.data.systemAction) {
            // 根据系统指令执行相应操作
            switch (task.data.systemAction) {
                case 'updateInterval':
                    if (task.data.interval) {
                        this.setInterval(task.data.interval);
                        this.showNotification('系统更新', `任务检查间隔已更新为 ${task.data.interval/1000} 秒`, 'system');
                    }
                    break;
                default:
                    console.log(`未知系统动作: ${task.data.systemAction}`);
            }
        }
    }
    
    /**
     * 默认任务处理
     */
    handleDefaultTask(task) {
        console.log('默认任务处理:', task);
        // 默认处理逻辑
    }
    
    /**
     * 显示通知
     */
    showNotification(title, message, taskType = 'notification') {
        // 检查浏览器是否支持Notification API
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: '/favicon.ico',
                tag: taskType
            });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            // 请求通知权限
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification(title, {
                        body: message,
                        icon: '/favicon.ico',
                        tag: taskType
                    });
                } else {
                    // 权限未授予，使用页面内通知
                    this.showPageNotification(title, message, taskType);
                }
            });
        } else {
            // 不支持Notification API，使用页面内通知
            this.showPageNotification(title, message, taskType);
        }
    }
    
    /**
     * 显示页面内通知
     */
    showPageNotification(title, message, taskType = 'notification') {
        // 创建通知元素
        const notification = document.createElement('div');
        // 应用基础样式和任务类型特定样式
        notification.className = `yamhk-notification ${taskType} fixed bottom-4 right-4 text-white p-4 rounded-lg shadow-lg z-50 transform translate-y-16 opacity-0 transition-all duration-300`;
        notification.innerHTML = `
            <div class="font-bold mb-1">${title}</div>
            <div>${message}</div>
        `;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 显示通知
        setTimeout(() => {
            notification.classList.remove('translate-y-16', 'opacity-0');
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.classList.add('translate-y-16', 'opacity-0');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    /**
     * 刷新页面
     */
    refreshPage() {
        window.location.reload();
    }
    
    /**
     * 重定向到指定URL
     */
    redirectTo(url) {
        window.location.href = url;
    }
}

// 创建全局任务管理器实例并启动
window.yamhkTaskManager = new TaskManager();

// 页面加载完成后启动任务管理器
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.yamhkTaskManager.start();
    });
} else {
    // 页面已经加载完成，直接启动
    window.yamhkTaskManager.start();
}

// 提供便捷函数
window.startYamhkTaskManager = function() {
    return window.yamhkTaskManager.start();
};

window.stopYamhkTaskManager = function() {
    return window.yamhkTaskManager.stop();
};

window.setYamhkTaskInterval = function(ms) {
    return window.yamhkTaskManager.setInterval(ms);
};
