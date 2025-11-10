# 代码规范指南

## 目的

本文档旨在为EV官方平台项目提供统一的代码规范和最佳实践，确保代码的可读性、可维护性和一致性。所有参与项目开发的人员都应遵循这些规范。

## HTML规范

### 基本结构
- 所有HTML文件必须使用UTF-8编码
- 必须包含正确的DOCTYPE声明：`<!DOCTYPE html>`
- 使用语义化HTML标签（header, nav, section, article, footer等）
- 确保HTML结构清晰，层次分明

### 命名规范
- 文件命名使用小写字母和连字符 `-`，例如：`contact-form.html`
- ID和class命名使用有意义的英文单词
- 为所有图片添加alt属性，提供有意义的描述

### 格式化
- 缩进使用2个空格
- 每个标签的属性独立成行，提高可读性
- 确保所有标签正确闭合
- 避免使用内联样式，使用CSS类代替

### 示例
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EV官方平台 - 首页</title>
  <!-- 外部资源引入 -->
</head>
<body>
  <header class="site-header">
    <nav class="main-navigation">
      <!-- 导航内容 -->
    </nav>
  </header>
  
  <main class="main-content">
    <section class="hero-section">
      <!-- 内容 -->
    </section>
  </main>
  
  <footer class="site-footer">
    <!-- 页脚内容 -->
  </footer>
  
  <script src="path/to/script.js"></script>
</body>
</html>
```

## CSS/Tailwind规范

### Tailwind CSS使用
- 优先使用Tailwind CSS类，避免编写自定义CSS
- 对于需要重用的样式组合，使用@layer和@apply创建自定义工具类
- 避免在多个地方重复相同的Tailwind类组合

### 自定义CSS
- 当Tailwind类无法满足需求时，可添加自定义CSS
- 自定义CSS应放在HTML文件的`<style>`标签内或单独的CSS文件中
- 使用语义化的CSS变量管理颜色、间距等设计系统值

### 命名规范
- 自定义CSS类使用BEM（Block, Element, Modifier）命名法
- 避免使用ID作为选择器，优先使用class

### 示例
```html
<style>
  /* 自定义工具类 */
  @layer utilities {
    .content-auto {
      content-visibility: auto;
    }
    .card-hover {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
  }
  
  /* 主题变量 */
  :root {
    --primary-color: #3B82F6;
    --secondary-color: #10B981;
  }
</style>

<div class="bg-white rounded-lg shadow p-6 card-hover">
  <!-- 卡片内容 -->
</div>
```

## JavaScript规范

### 基本语法
- 使用ES6+语法（let, const, arrow functions, template literals等）
- 优先使用const声明变量，只有在需要重新赋值时使用let
- 避免使用var
- 语句末尾必须添加分号
- 字符串使用单引号

### 命名规范
- 变量和函数名使用小驼峰命名法：`userName`, `fetchData()`
- 类名使用大驼峰命名法：`EnvironmentManager`
- 常量使用全大写和下划线：`MAX_RETRY_COUNT`
- 私有方法和属性使用下划线前缀：`_privateMethod()`

### 代码风格
- 缩进使用2个空格
- 花括号前必须有空格
- 函数参数之间用逗号和空格分隔
- 运算符前后必须有空格

### 类和模块
- 使用class语法创建类
- 类的方法之间用空行分隔
- 为类和方法添加适当的注释

### 异步编程
- 优先使用async/await处理异步操作
- 避免深层嵌套的Promise
- 正确处理异步错误

### 示例
```javascript
class EnvironmentManager {
  constructor() {
    this.environments = {
      development: {
        name: '开发环境',
        baseUrl: 'http://example.com'
      },
      production: {
        name: '生产环境',
        baseUrl: 'https://example.com'
      }
    };
    
    this.currentEnvironment = this.detectEnvironment();
  }
  
  detectEnvironment() {
    const storedEnv = localStorage.getItem('environment');
    return storedEnv || 'production';
  }
  
  async fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('获取数据失败:', error);
      throw error;
    }
  }
}

// 使用示例
const manager = new EnvironmentManager();
const currentEnv = manager.currentEnvironment;
console.log(`当前环境: ${currentEnv}`);
```

## 错误处理

### 异常处理
- 始终使用try/catch块捕获可能的异常
- 记录错误信息，但不要向用户显示技术错误详情
- 提供友好的错误提示给用户

### 防御性编程
- 检查变量是否存在（null/undefined检查）
- 验证函数参数的有效性
- 处理边界情况和边缘情况

## 性能优化

### 加载优化
- 延迟加载非关键资源
- 使用适当大小的图片
- 压缩CSS和JavaScript

### 渲染优化
- 使用CSS动画代替JavaScript动画
- 避免频繁操作DOM
- 使用事件委托处理大量元素的事件

### 内存管理
- 避免内存泄漏，及时清理事件监听器
- 不要保存不必要的大型对象引用

## 文档规范

### 代码注释
- 为复杂函数和算法添加详细注释
- 使用JSDoc格式为函数和类添加文档
- 避免不必要的注释，代码应该自解释

### 文档示例
```javascript
/**
 * 环境管理器类
 * 用于管理不同环境的配置和切换
 * 
 * @class EnvironmentManager
 */
class EnvironmentManager {
  /**
   * 获取当前环境的URL
   * @param {string} type - URL类型 (base, api, svn, gui)
   * @returns {string} 对应的URL
   */
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
}
```

## 结语

遵循这些代码规范将有助于我们创建更一致、更易于维护的代码库。随着项目的发展，这些规范可能会进行调整和更新。请定期查看最新版本。