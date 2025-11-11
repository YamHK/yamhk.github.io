// 全局ESC键监听脚本 - 返回首页功能

/**
 * 初始化全局ESC键监听
 */
function initGlobalEscapeKeyListener() {
    // 添加键盘事件监听
    document.addEventListener('keydown', function(event) {
        // 检查是否按下的是ESC键（keyCode 27）
        if (event.key === 'Escape' || event.keyCode === 27) {
            // 阻止默认行为
            event.preventDefault();
            
            // 检查是否有冲突的场景：输入框、编辑器等正在使用键盘的元素
            const activeElement = document.activeElement;
            if (activeElement && 
                (activeElement.tagName === 'INPUT' || 
                 activeElement.tagName === 'TEXTAREA' || 
                 activeElement.tagName === 'SELECT' ||
                 (activeElement.hasAttribute('contenteditable') && 
                  activeElement.getAttribute('contenteditable') !== 'false'))) {
                // 避免在编辑状态下意外跳转
                return;
            }
            
            // 检查当前页面是否已经是首页
            if (!window.location.pathname.includes('index.html') || window.location.pathname.includes('/module/index/')) {
                // 显示版本信息
                showVersionInfo();
                
                // 保存当前页面信息
                try {
                    const currentPage = window.location.href;
                    const currentPageName = document.title || '页面';
                    localStorage.setItem('last_visited_page', currentPage);
                    localStorage.setItem('last_visited_page_name', currentPageName);
                } catch (e) {
                    // 忽略localStorage错误
                }
                
                // 延迟返回首页，让用户看到版本信息
                setTimeout(() => {
                    window.location.href = getHomePageUrl();
                }, 1500);
            } else {
                // 如果当前已经是首页，只显示版本信息
                showVersionInfo();
            }
        }
    });
}

/**
 * 获取首页的正确URL路径
 * @returns {string} 首页URL
 */
function getHomePageUrl() {
    // 根据当前路径决定使用哪种方式返回首页
    const currentPath = window.location.pathname;
    if (currentPath.includes('/module/index/')) {
        return '../../index.html';
    }
    // 对于其他页面，使用根路径下的index.html
    return '/index.html';
}

/**
 * 显示版本信息
 */
function showVersionInfo() {
    // 默认版本信息
    let version = 'v1.0.0-6f72485';
    let gitTimestamp = '2025-11-11 10:34:31 +0800';
    
    // 尝试从JSON文件中获取版本信息
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../../data/version_info.json', false); // 同步请求
        xhr.send(null);
        
        if (xhr.status === 200) {
            const versionInfo = JSON.parse(xhr.responseText);
            version = versionInfo.version + '-' + versionInfo.commit_hash;
            gitTimestamp = versionInfo.commit_timestamp;
        }
    } catch (e) {
        console.warn('无法加载版本信息文件，使用默认值:', e);
    }
    
    // 检查是否已经存在版本信息弹出层
    let versionDiv = document.getElementById('version-info-popup');
    if (!versionDiv) {
        // 创建版本信息弹出层
        versionDiv = document.createElement('div');
        versionDiv.id = 'version-info-popup';
        versionDiv.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: rgba(0, 0, 0, 0.85); color: white; padding: 20px; border-radius: 10px; 
                        z-index: 10000; text-align: center; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                        animation: fadeInOut 1.5s ease-in-out;">
                <div style="font-size: 18px; margin-bottom: 10px;">前端版本信息</div>
                <div style="font-size: 14px; opacity: 0.8;">${version}</div>
                <div style="font-size: 12px; opacity: 0.6; margin-top: 8px;">${gitTimestamp}</div>
            </div>
            <style>
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                }
            </style>
        `;
        
        // 添加到页面中
        document.body.appendChild(versionDiv);
        
        // 1.5秒后自动移除
        setTimeout(() => {
            if (versionDiv.parentNode) {
                versionDiv.parentNode.removeChild(versionDiv);
            }
        }, 1500);
    }
}

// 页面加载完成后初始化
if (typeof window !== 'undefined') {
    // 确保DOM已加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlobalEscapeKeyListener);
    } else {
        // 如果DOM已经加载完成，立即初始化
        initGlobalEscapeKeyListener();
    }
}

// 暴露到全局作用域
window.initGlobalEscapeKeyListener = initGlobalEscapeKeyListener;
window.getHomePageUrl = getHomePageUrl;
window.showVersionInfo = showVersionInfo;