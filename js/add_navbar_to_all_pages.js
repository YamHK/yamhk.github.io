// 游戏风格导航栏和样式应用工具脚本

// 引入全局ESC键监听功能
if (typeof window !== 'undefined') {
    // 动态加载全局ESC键监听脚本
    const script = document.createElement('script');
    script.src = '../js/global_escape_listener.js';
    script.onload = function() {
        console.log('全局ESC键监听脚本已加载');
    };
    document.head.appendChild(script);
}

/**
 * 添加游戏风格全局样式
 */
function addGameStyle() {
    console.log('应用游戏风格全局样式...');
    
    // 创建样式元素
    const style = document.createElement('style');
    style.textContent = `
        /* 全局游戏风格样式 */
        body {
            background-color: #0f0f1e !important;
            color: #e0e0e0 !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
            padding-top: 4rem !important;
            margin: 0;
            background-image: 
                radial-gradient(circle at 20% 50%, rgba(106, 17, 203, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 80% 30%, rgba(37, 117, 252, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 40% 80%, rgba(255, 193, 7, 0.05) 0%, transparent 20%);
            background-attachment: fixed;
        }
        
        /* 卡片和面板样式 */
        .card, .panel, .bg-white {
            background: rgba(30, 30, 50, 0.7) !important;
            border: 1px solid rgba(255, 193, 7, 0.2) !important;
            backdrop-filter: blur(10px);
            color: #e0e0e0 !important;
        }
        
        /* 按钮样式 */
        button, .btn {
            background: linear-gradient(135deg, #ffc107, #ff9800) !important;
            border: none !important;
            color: #1a1a2e !important;
            font-weight: bold !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            padding: 10px 20px !important;
            border-radius: 6px !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 193, 7, 0.3) !important;
        }
        
        button:hover, .btn:hover {
            background: linear-gradient(135deg, #ff9800, #ffc107) !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 193, 7, 0.5) !important;
        }
        
        /* 标题样式 */
        h1, h2, h3, h4, h5, h6 {
            color: #ffc107 !important;
            text-shadow: 0 0 10px rgba(255, 193, 7, 0.3) !important;
        }
        
        /* 链接样式 */
        a {
            color: #03a9f4 !important;
            transition: all 0.3s ease !important;
        }
        
        a:hover {
            color: #29b6f6 !important;
            text-shadow: 0 0 5px rgba(3, 169, 244, 0.5) !important;
        }
        
        /* 输入框样式 */
        input, textarea, select {
            background: rgba(30, 30, 50, 0.7) !important;
            border: 1px solid rgba(3, 169, 244, 0.3) !important;
            color: #e0e0e0 !important;
            padding: 10px !important;
            border-radius: 6px !important;
            transition: all 0.3s ease !important;
        }
        
        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: #03a9f4 !important;
            box-shadow: 0 0 10px rgba(3, 169, 244, 0.5) !important;
        }
        
        /* 滚动条样式 */
        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }
        
        ::-webkit-scrollbar-track {
            background: rgba(30, 30, 50, 0.7);
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #ffc107, #ff9800);
            border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #ff9800, #ffc107);
        }
    `;
    
    // 添加到head
    document.head.appendChild(style);
    console.log('游戏风格全局样式应用完成');
}

/**
 * 创建游戏风格导航栏
 */
function createGameNavbar() {
    console.log('创建游戏风格导航栏...');
    
    // 检查当前页面是否已经有导航栏
    if (document.getElementById('game-navbar')) {
        console.log('当前页面已有游戏导航栏，无需重复添加');
        return false;
    }
    
    // 创建导航栏元素
    const navbar = document.createElement('nav');
    navbar.id = 'game-navbar';
    navbar.className = 'bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] fixed top-0 left-0 w-full z-9999 shadow-lg border-b border-[#ffc107]/30';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(106, 17, 203, 0.2)';
    
    // 获取当前页面URL和路径信息，计算相对路径
    const currentURL = new URL(window.location.href);
    const currentPath = currentURL.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment && !segment.includes('.'));
    const depth = pathSegments.length;
    
    // 根据深度构建相对路径前缀
    let pathPrefix = '';
    for (let i = 1; i < depth; i++) {
        pathPrefix += '../';
    }
    
    // 导航栏内容
    navbar.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-2">
            <div class="flex items-center justify-between h-16">
                <!-- 左侧Logo -->
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <i class="fa fa-gamepad text-2xl text-[#ffc107] mr-2"></i>
                        <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ffc107] to-[#ff9800]">游戏中心</span>
                    </div>
                </div>
                
                <!-- 中间导航项 - 桌面版 -->
                <div class="hidden md:flex items-center space-x-8">
                    <!-- 导航项 -->
                    <a href="${pathPrefix}index.html" class="text-white hover:text-[#ffc107] transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium flex items-center relative group">
                        <i class="fa fa-home mr-2"></i>首页
                        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffc107] transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    
                    <!-- 游戏模块下拉框导航 -->
                    <div class="relative group">
                        <button id="game-modules-dropdown" class="text-white hover:text-[#ffc107] transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium flex items-center relative focus:outline-none">
                            <i class="fa fa-gamepad mr-2"></i>游戏模块
                            <i class="fa fa-chevron-down ml-2 text-xs transition-transform duration-300 group-hover:rotate-180"></i>
                            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffc107] transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        <div id="game-modules-menu" class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-[#1a1a2e] border border-[#ffc107]/30 rounded-md shadow-xl py-1 z-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top">
                            <div class="p-2 text-sm text-gray-400">加载中...</div>
                        </div>
                    </div>
                    
                    <!-- 游戏社区下拉框导航 -->
                    <div class="relative group">
                        <button id="game-community-dropdown" class="text-white hover:text-[#ffc107] transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium flex items-center relative focus:outline-none">
                            <i class="fa fa-users mr-2"></i>游戏社区
                            <i class="fa fa-chevron-down ml-2 text-xs transition-transform duration-300 group-hover:rotate-180"></i>
                            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffc107] transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        <div id="game-community-menu" class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-[#1a1a2e] border border-[#ffc107]/30 rounded-md shadow-xl py-1 z-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top">
                            <div class="p-2 text-sm text-gray-400">加载中...</div>
                        </div>
                    </div>
                    
                    <a href="${pathPrefix}module/index/mx_contact.html" class="text-white hover:text-[#ffc107] transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium flex items-center relative group">
                        <i class="fa fa-envelope mr-2"></i>联系我们
                        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffc107] transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </div>
                
                <!-- 右侧用户信息 -->
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <button class="bg-[#ffc107]/20 hover:bg-[#ffc107]/30 text-[#ffc107] p-2 rounded-full transition-colors duration-300 relative">
                            <i class="fa fa-bell"></i>
                            <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                    <div class="relative">
                        <button class="flex items-center space-x-2 bg-[#03a9f4]/20 hover:bg-[#03a9f4]/30 text-[#03a9f4] p-1 px-3 rounded-full transition-colors duration-300">
                            <img src="${pathPrefix}static/avatar.jpg" alt="用户头像" class="h-6 w-6 rounded-full border border-[#03a9f4]/50">
                            <span class="text-sm font-medium">玩家</span>
                        </button>
                    </div>
                    
                    <!-- 移动端菜单按钮 -->
                    <div class="md:hidden">
                        <button id="mobile-menu-button" class="text-white p-2 rounded-md hover:bg-[#ffc107]/20 transition-colors duration-300">
                            <i class="fa fa-bars text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- 移动端菜单 -->
            <div id="mobile-menu" class="md:hidden hidden">
                <!-- 移动端菜单内容将动态生成 -->
            </div>
        </div>
    `;
    
    // 为导航链接添加点击事件
    navbar.addEventListener('click', function(e) {
        // 如果点击的是导航链接
        if (e.target.tagName === 'A' || (e.target.closest && e.target.closest('a'))) {
            // 保存当前页面为最后访问的页面
            // 不保存首页作为最后访问页面
            if (!window.location.pathname.includes('index.html')) {
                const pageName = document.title || '页面';
                localStorage.setItem('last_visited_page', window.location.href);
                localStorage.setItem('last_visited_page_name', pageName);
            }
            
            // 平滑滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // 添加到body顶部
    document.body.insertBefore(navbar, document.body.firstChild);
    console.log('游戏风格导航栏创建完成');
    
    // 初始化移动端菜单
    initMobileMenu(pathPrefix);
    
    // 初始化游戏模块下拉菜单
    initGameDropdownMenu(pathPrefix);
    
    return true;
}

/**
 * 初始化游戏模块下拉菜单
 */
function initGameDropdownMenu(pathPrefix) {
    // 游戏模块列表
    const gameModules = [
        { name: '游戏日历', url: pathPrefix + 'module/index/mx_calendar.html', icon: 'fa-calendar' },
        { name: '游戏二维码', url: pathPrefix + 'module/index/mx_qrcode_page.html', icon: 'fa-qrcode' },
        { name: '游戏地图', url: pathPrefix + 'module/index/mx_travel_map.html', icon: 'fa-map' },
        { name: '矩阵工具', url: pathPrefix + 'module/index/mx_matrix.html', icon: 'fa-th' },
        { name: '星座聊天室', url: pathPrefix + 'module/index/mx_constellation_chat.html', icon: 'fa-star' },
        { name: '游戏签到', url: pathPrefix + 'module/index/mx_sign.html', icon: 'fa-check-square-o' },
        { name: '天气助手', url: pathPrefix + 'module/index/mx_weather.html', icon: 'fa-cloud' },
        { name: '生肖聊天', url: pathPrefix + 'module/index/mx_zodiac_chat.html', icon: 'fa-paw' }
    ];
    
    // 游戏社区列表
    const gameCommunity = [
        { name: '游戏聊天室', url: pathPrefix + 'module/index/mx_chat.html', icon: 'fa-comments' },
        { name: '游戏福利', url: pathPrefix + 'module/index/mx_welfare_collection.html', icon: 'fa-gift' },
        { name: '游戏定制', url: pathPrefix + 'module/index/mx_software_custom.html', icon: 'fa-code' },
        { name: '联系我们', url: pathPrefix + 'module/index/mx_contact.html', icon: 'fa-envelope' }
    ];
    
    // 生成游戏模块下拉菜单
    generateDropdownMenu('game-modules-menu', gameModules, '游戏模块');
    
    // 生成游戏社区下拉菜单
    generateDropdownMenu('game-community-menu', gameCommunity, '游戏社区');
}

/**
 * 生成下拉菜单内容
 */
function generateDropdownMenu(menuId, items, title) {
    const menuElement = document.getElementById(menuId);
    if (!menuElement) return;
    
    // 创建菜单内容 - 游戏风格
    let menuContent = '';
    items.forEach(item => {
        menuContent += `
            <a href="${item.url}" class="block px-4 py-2 text-gray-300 hover:bg-[#ffc107]/20 hover:text-[#ffc107] transition-colors duration-300 flex items-center border-l-2 border-transparent hover:border-[#ffc107]">
                <i class="fa ${item.icon} mr-3 text-[#03a9f4]"></i>${item.name}
            </a>
        `;
    });
    
    menuElement.innerHTML = menuContent;
}

/**
 * 初始化移动端菜单
 */
function initMobileMenu(pathPrefix) {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            // 切换移动端菜单显示状态
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                // 生成移动端菜单内容
                generateMobileMenuContent(mobileMenu, pathPrefix);
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

/**
 * 生成移动端菜单内容
 */
function generateMobileMenuContent(mobileMenu, pathPrefix) {
    // 所有导航项
    const allNavItems = [
        { name: '首页', url: pathPrefix + 'index.html', icon: 'fa-home' },
        { name: '游戏模块', isDropdown: true, items: [
            { name: '游戏日历', url: pathPrefix + 'module/index/mx_calendar.html', icon: 'fa-calendar' },
            { name: '游戏二维码', url: pathPrefix + 'module/index/mx_qrcode_page.html', icon: 'fa-qrcode' },
            { name: '游戏地图', url: pathPrefix + 'module/index/mx_travel_map.html', icon: 'fa-map' }
        ]},
        { name: '游戏社区', isDropdown: true, items: [
            { name: '游戏聊天室', url: pathPrefix + 'module/index/mx_chat.html', icon: 'fa-comments' },
            { name: '游戏福利', url: pathPrefix + 'module/index/mx_welfare_collection.html', icon: 'fa-gift' }
        ]},
        { name: '联系我们', url: pathPrefix + 'module/index/mx_contact.html', icon: 'fa-envelope' }
    ];
    
    let mobileContent = '';
    
    allNavItems.forEach(item => {
        if (item.isDropdown) {
            // 下拉项
            mobileContent += `
                <div class="mt-1 px-2 space-y-1">
                    <button class="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-white hover:bg-[#ffc107]/20 hover:text-[#ffc107] rounded-md transition-colors duration-300">
                        <span>${item.name}</span>
                        <i class="fa fa-chevron-down"></i>
                    </button>
                    <div class="pl-4 border-l-2 border-[#ffc107]/30">`;
            
            // 添加下拉项内容
            item.items.forEach(subItem => {
                mobileContent += `
                        <a href="${subItem.url}" class="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-[#ffc107]/20 hover:text-[#ffc107] rounded-md transition-colors duration-300">
                            <i class="fa ${subItem.icon} mr-2"></i>${subItem.name}
                        </a>`;
            });
            
            mobileContent += `
                    </div>
                </div>
            `;
        } else {
            // 普通链接
            mobileContent += `
                <a href="${item.url}" class="block px-3 py-2 text-base font-medium text-white hover:bg-[#ffc107]/20 hover:text-[#ffc107] rounded-md transition-colors duration-300">
                    <i class="fa ${item.icon} mr-2"></i>${item.name}
                </a>
            `;
        }
    });
    
    mobileMenu.innerHTML = `
        <div class="px-2 pt-2 pb-3 space-y-1">
            ${mobileContent}
        </div>
    `;
}

/**
 * 智能添加游戏风格导航栏和样式到当前页面
 */
function addGameStyleAndNavbar() {
    console.log('开始应用游戏风格和添加导航栏...');
    
    // 检查是否在浏览器环境中运行
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        console.error('错误: 此脚本只能在浏览器环境中运行');
        return false;
    }
    
    try {
        // 应用游戏风格全局样式
        addGameStyle();
        
        // 创建游戏风格导航栏
        createGameNavbar();
        
        // 增强页面标题
        enhancePageTitle();
        
        // 添加元素增强效果
        enhanceElementsWithGameStyle();
        
        // 添加链接效果
        addGameLinkEffects();
        
        console.log('游戏风格和导航栏应用成功');
        return true;
    } catch (error) {
        console.error('应用游戏风格和导航栏时发生错误:', error);
        return false;
    }
}

/**
 * 添加页面标题游戏风格效果
 */
function enhancePageTitle() {
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
        const originalTitle = pageTitle.textContent;
        // 只在标题不包含游戏中心时添加前缀
        if (!originalTitle.includes('游戏中心') && !originalTitle.includes('Game Center')) {
            pageTitle.textContent = `游戏中心 - ${originalTitle}`;
        }
    }
}

/**
 * 为所有链接添加游戏风格的悬停效果
 */
function addGameLinkEffects() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        // 避免重复添加事件监听器
        if (!link.classList.contains('game-link-effect')) {
            link.classList.add('game-link-effect');
            
            // 添加鼠标悬停效果
            link.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            link.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

/**
 * 为所有卡片和面板添加游戏风格的边框和阴影
 */
function enhanceElementsWithGameStyle() {
    // 选择所有卡片和面板元素
    const elements = document.querySelectorAll('.card, .panel, section, div[class*="card"], div[class*="panel"]');
    
    elements.forEach(element => {
        // 添加游戏风格边框和阴影
        element.style.border = '1px solid rgba(255, 193, 7, 0.2)';
        element.style.borderRadius = '8px';
        element.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 193, 7, 0.1)';
        element.style.backgroundColor = 'rgba(30, 30, 50, 0.7)';
        element.style.color = '#e0e0e0';
    });
}

/**
 * 主执行函数
 */
function initGameStyleLoader() {
    console.log('游戏风格加载器初始化...');
    
    // 多重初始化策略，确保在各种情况下都能正确加载
    const initialize = () => {
        // 先尝试添加游戏风格和导航栏
        addGameStyleAndNavbar();
        
        // 设置一个延迟执行，确保DOM完全准备好
        setTimeout(() => {
            // 再次检查并添加，以防第一次失败
            if (!document.getElementById('game-navbar')) {
                console.log('检测到游戏导航栏未加载，尝试再次添加...');
                addGameStyleAndNavbar();
            }
        }, 300);
    };
    
    // 根据当前文档状态决定何时初始化
    if (document.readyState === 'loading') {
        console.log('文档正在加载中，等待DOMContentLoaded事件...');
        document.addEventListener('DOMContentLoaded', initialize);
    } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
        console.log('文档已加载，立即初始化游戏风格...');
        initialize();
    }
    
    // 页面加载完成后再次检查
    window.addEventListener('load', () => {
        console.log('页面完全加载后检查游戏风格...');
        if (!document.getElementById('game-navbar')) {
            console.log('页面加载完成但游戏导航栏未初始化，最后尝试添加...');
            addGameStyleAndNavbar();
        }
        // 再次增强元素样式，确保动态添加的元素也能应用样式
        setTimeout(() => {
            enhanceElementsWithGameStyle();
            addGameLinkEffects();
        }, 500);
    });
}

// 暴露到全局作用域，便于其他脚本调用
window.addGameStyleAndNavbar = addGameStyleAndNavbar;
window.initGameStyleLoader = initGameStyleLoader;
window.addGameStyle = addGameStyle;

// 如果直接在浏览器中运行，自动初始化
if (typeof window !== 'undefined') {
    // 立即执行初始化，不再等待DOMContentLoaded
    // 这样可以在动态加载的内容中也能及时初始化游戏风格
    initGameStyleLoader();
    
    // 确保在document对象完全可用时初始化
    if (document && typeof document.addEventListener === 'function') {
        document.addEventListener('DOMContentLoaded', initGameStyleLoader);
    }
}

// 旧的导航栏初始化函数已被游戏风格初始化函数替换