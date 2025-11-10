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
            
            // 检查当前页面是否已经是首页，如果是则不执行任何操作
            if (!window.location.pathname.includes('index.html') || window.location.pathname.includes('/module/index/')) {
                // 保存当前页面信息
                try {
                    const currentPage = window.location.href;
                    const currentPageName = document.title || '页面';
                    localStorage.setItem('last_visited_page', currentPage);
                    localStorage.setItem('last_visited_page_name', currentPageName);
                } catch (e) {
                    // 忽略localStorage错误
                }
                
                // 返回首页
                window.location.href = getHomePageUrl();
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