// 游戏风格导航栏组件
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

function createNavbar() {
    // 创建导航栏元素
    const navbar = document.createElement('nav');
    navbar.className = 'bg-gradient-to-r from-purple-900 to-blue-900 shadow-lg border-b border-amber-500/30 fixed w-full z-50 transition-all duration-300';
    navbar.id = 'navbar';
    
    // 获取当前页面相对于根目录的深度，以确定正确的链接路径
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const depth = pathSegments.length;
    
    // 根据深度计算相对路径
    let relativePath = '';
    for (let i = 1; i < depth; i++) {
        relativePath += '../';
    }
    
    // 设置导航栏内容
    navbar.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="${relativePath}index.html" class="text-xl font-bold text-amber-400 flex items-center hover:text-amber-300 transition-colors duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/50">
                        <i class="fa fa-gamepad mr-2 text-2xl"></i>游戏中心
                    </a>
                </div>
                <div class="flex items-center space-x-6">
                    <a href="${relativePath}module/index/mx_junjie.html" class="text-gray-300 hover:text-amber-400 transition-colors duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/50">
                        <i class="fa fa-shield mr-1"></i>英雄库
                    </a>
                    <a href="${relativePath}module/index/mx_welfare_collection.html" class="text-gray-300 hover:text-amber-400 transition-colors duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/50">
                        <i class="fa fa-trophy mr-1"></i>排行榜
                    </a>
                    <a href="${relativePath}module/index/mx_chat.html" class="text-gray-300 hover:text-amber-400 transition-colors duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/50">
                        <i class="fa fa-users mr-1"></i>社区
                    </a>
                    <a href="${relativePath}module/index/mx_contact.html" class="text-gray-300 hover:text-amber-400 transition-colors duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/50">
                        <i class="fa fa-cog mr-1"></i>设置
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // 添加导航栏滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-xl');
            navbar.classList.add('bg-gradient-to-r/95 from-purple-900/95 to-blue-900/95');
            navbar.classList.add('backdrop-blur-sm');
            navbar.classList.add('border-b-2');
        } else {
            navbar.classList.remove('shadow-xl');
            navbar.classList.remove('bg-gradient-to-r/95 from-purple-900/95 to-blue-900/95');
            navbar.classList.remove('backdrop-blur-sm');
            navbar.classList.remove('border-b-2');
        }
    });
    
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
    
    return navbar;
}

// 初始化导航栏
function initNavbar() {
    // 检查是否已有导航栏，避免重复添加
    if (document.getElementById('navbar')) {
        console.log('导航栏已存在，跳过初始化');
        return;
    }
    
    // 检查DOM是否已加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            _initializeNavbar();
        });
    } else {
        _initializeNavbar();
    }
}

// 内部初始化函数
function _initializeNavbar() {
    // 创建并添加导航栏到body的顶部
    const navbar = createNavbar();
    document.body.insertBefore(navbar, document.body.firstChild);
    
    // 添加全局游戏风格样式和页面间距
    const style = document.createElement('style');
    style.textContent = `
        /* 全局游戏风格重置 */
        * {
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 0;
            padding-top: 4rem;
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
        
        /* 游戏风格按钮样式 */
        button {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            background: linear-gradient(135deg, #5a11cb 0%, #1565fc 100%);
        }
        
        button:active {
            transform: translateY(0);
        }
        
        /* 卡片样式 */
        .game-card {
            background: rgba(30, 30, 50, 0.8);
            border: 1px solid rgba(255, 193, 7, 0.3);
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .game-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
            border-color: rgba(255, 193, 7, 0.5);
        }
        
        /* 游戏风格输入框 */
        input, textarea, select {
            background: rgba(20, 20, 30, 0.8);
            border: 1px solid rgba(255, 193, 7, 0.3);
            color: #e0e0e0;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            transition: all 0.3s ease;
        }
        
        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #ffc107;
            box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.2);
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
                font-size: 0.875rem;
                padding: 0.25rem;
            }
            
            #navbar i {
                font-size: 1rem;
            }
            
            body {
                padding-top: 3.5rem;
            }
        }
        
        /* 游戏风格边框辉光效果 */
        .glow-border {
            box-shadow: 0 0 15px rgba(255, 193, 7, 0.5);
        }
        
        /* 游戏风格分隔线 */
        hr {
            border: none;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 193, 7, 0.5), transparent);
        }
        
        /* 确保导航栏在所有页面中表现一致 */
        #navbar {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* 增强按钮交互反馈 */
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
        }
    `;
    document.head.appendChild(style);
    
    console.log('导航栏初始化完成');
}

// 暴露到全局作用域，便于其他脚本调用
window.createNavbar = createNavbar;
window.initNavbar = initNavbar;

// 自动初始化（如果在浏览器环境中直接引用）
if (typeof window !== 'undefined') {
    // 为了兼容不同的加载时机，我们采用多种初始化策略
    initNavbar();
    
    // 额外的安全检查
    window.addEventListener('DOMContentLoaded', initNavbar);
    
    // 如果已经加载完成，直接初始化
    if (document.readyState === 'complete') {
        setTimeout(initNavbar, 100); // 短暂延迟确保DOM完全准备好
    }
}