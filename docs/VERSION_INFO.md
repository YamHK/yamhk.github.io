# 前端版本信息显示功能说明

## 功能概述

在按下ESC键返回主页时，会平滑地弹出前端代码的发布版本信息，然后跳转到主页。

## 实现原理

1. 修改了全局ESC键监听脚本 `js/global_escape_listener.js`
2. 添加了版本信息显示函数 `showVersionInfo()`
3. 在ESC键按下时，先显示版本信息，再跳转主页

## 版本信息格式

版本信息格式为：`v1.0.0-{Git提交哈希}`，并附带时间戳

例如：`v1.0.0-6f72485`  2025-11-11 15:30:45

## 使用方法

### 1. ESC键返回主页时自动显示

在任何非主页页面按下ESC键时：
1. 显示版本信息弹出层
2. 1.5秒后自动跳转到主页

### 2. 手动调用显示版本信息

可以通过调用全局函数 `showVersionInfo()` 来手动显示版本信息：

```javascript
// 显示版本信息
showVersionInfo();
```

## 集成说明

### 已集成的页面

以下页面已集成版本信息显示功能：
- 所有在 `/module/index/` 目录下的页面
- 主页 `index.html`

### 新页面集成方法

在新页面中集成版本信息显示功能：

1. 引入全局ESC键监听脚本：
```html
<script src="../../js/global_escape_listener.js"></script>
```

2. 在DOM加载完成后初始化（可选，脚本会自动初始化）：
```javascript
document.addEventListener('DOMContentLoaded', function() {
    if (typeof initGlobalEscapeKeyListener === 'function') {
        initGlobalEscapeKeyListener();
    }
});
```

## 样式说明

版本信息弹出层具有以下特性：
- 居中显示
- 半透明黑色背景
- 白色文字
- 圆角边框
- 阴影效果
- 1.5秒的淡入淡出动画效果

## 自定义版本信息

如需自定义版本信息，可以修改 `js/global_escape_listener.js` 中的 `showVersionInfo()` 函数：

```javascript
function showVersionInfo() {
    // 修改这里的版本号
    const version = 'v1.0.0-' + '6f72485';
    
    // ... 其余代码保持不变
}
```