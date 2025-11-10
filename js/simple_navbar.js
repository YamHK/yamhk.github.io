// 简化版游戏风格导航栏组件 - 使用传统JavaScript确保兼容性

// 计算当前页面的相对路径
function calculateRelativePath() {
    // 获取当前URL
    const currentURL = window.location.href;
    const pathname = window.location.pathname;
    
    // 计算相对路径深度
    const segments = pathname.split('/').filter(Boolean);
    let relativePath = '';
    
    // 根目录下的页面（如index.html）
    if (segments.length <= 1) {
        return './';
    }
    
    // 其他页面根据深度计算../的数量
    for (let i = 1; i < segments.length; i++) {
        relativePath += '../';
    }
    
    return relativePath;
}

// 创建导航栏HTML
function createNavbarHTML() {
    const relativePath = calculateRelativePath();
    
    return `
    <nav id="navbar" class="bg-gradient-to-r from-purple-900 to-blue-900 shadow-lg border-b border-amber-500/30 fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="${relativePath}index.html" 
                       class="text-xl font-bold text-amber-400 flex items-center hover:text-amber-300 transition-colors duration-200" 
                       style="text-decoration: none;">
                        <i class="fa fa-gamepad mr-2 text-2xl"></i>游戏中心
                    </a>
                </div>
                <div class="flex items-center space-x-6">
                    <a href="${relativePath}module/index/mx_junjie.html" 
                       class="text-gray-300 hover:text-amber-400 transition-colors duration-200" 
                       style="text-decoration: none;">
                        <i class="fa fa-shield mr-1"></i>英雄库
                    </a>
                    <a href="${relativePath}module/index/mx_welfare_collection.html" 
                       class="text-gray-300 hover:text-amber-400 transition-colors duration-200" 
                       style="text-decoration: none;">
                        <i class="fa fa-trophy mr-1"></i>排行榜
                    </a>
                    <a href="${relativePath}module/index/mx_chat.html" 
                       class="text-gray-300 hover:text-amber-400 transition-colors duration-200" 
                       style="text-decoration: none;">
                        <i class="fa fa-users mr-1"></i>社区
                    </a>
                    <a href="${relativePath}module/index/mx_contact.html" 
                       class="text-gray-300 hover:text-amber-400 transition-colors duration-200" 
                       style="text-decoration: none;">
                        <i class="fa fa-cog mr-1"></i>设置
                    </a>
                </div>
            </div>
        </div>
    </nav>
    <style>
        /* 全局游戏风格重置 */
        * {
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 0;
            padding-top: 4rem !important;
            background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%);
            color: #e0e0e0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            background-attachment: fixed;
        }
        
        /* 游戏风格标题样式 */
        h1, h2, h3, h4, h5, h6 {
            color: #ffc107;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        /* 游戏风格链接样式 */
        a {
            color: #03a9f4;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        a:hover {
            color: #ffc107;
            text-decoration: none;
        }
        
        /* 确保导航栏样式正确 */
        #navbar {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            #navbar .flex.items-center.space-x-6 {
                display: none;
            }
            
            #navbar .flex.items-center {
                justify-content: center;
                width: 100%;
            }
        }
        
        @media (max-width: 640px) {
            #navbar a {
                font-size: 0.875rem !important;
            }
            #navbar i {
                font-size: 1rem !important;
            }
            body {
                padding-top: 3.5rem !important;
            }
        }
        
        /* 点击效果 */
        #navbar a {
            position: relative;
            padding: 0.5rem 0.75rem;
            border-radius: 0.25rem;
        }
        
        #navbar a::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 0;
            height: 2px;
            background-color: #ffc107;
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }
        
        #navbar a:hover::after {
            width: 80%;
        }
        
        #navbar a:active {
            background-color: rgba(255, 193, 7, 0.2);
            opacity: 0.8;
            transform: scale(0.98);
        }
    </style>
    `;
}

// 初始化导航栏
function initSimpleNavbar() {
    console.log('开始初始化简单导航栏...');
    
    // 检查是否已存在导航栏
    if (document.getElementById('navbar')) {
        console.log('导航栏已存在，跳过初始化');
        return;
    }
    
    // 创建导航栏容器
    const navbarContainer = document.createElement('div');
    navbarContainer.innerHTML = createNavbarHTML();
    
    // 添加到body的最前面
    document.body.insertBefore(navbarContainer.firstChild, document.body.firstChild);
    
    // 添加滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-xl');
                navbar.classList.add('border-b-2');
            } else {
                navbar.classList.remove('shadow-xl');
                navbar.classList.remove('border-b-2');
            }
        }
    });
    
    console.log('简单导航栏初始化完成');
}

// 确保在DOM加载完成后执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // 短延迟确保所有资源加载完成
        setTimeout(initSimpleNavbar, 100);
    });
} else {
    // 如果DOM已加载，直接执行
    setTimeout(initSimpleNavbar, 100);
}

// 暴露到全局
window.initSimpleNavbar = initSimpleNavbar;