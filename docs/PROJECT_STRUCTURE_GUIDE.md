# 项目结构指南

## 目的

本文档旨在为ev项目提供统一的文件组织结构和命名规范，帮助开发者理解项目架构并遵循一致的文件管理模式，从而提高代码的可维护性和团队协作效率。

## 整体结构

ev项目采用扁平化的目录结构，主要围绕功能模块进行组织。以下是项目的整体结构：

```
static/                   # 项目根目录
├── js/                   # JavaScript文件目录
│   ├── environment.js    # 环境配置管理（核心文件）
│   └── ...               # 其他JavaScript文件
├── module/               # 功能模块目录
│   └── index/            # 主要功能模块
│       ├── contact.html  # 联系页面
│       ├── 2048.html     # 2048游戏
│       └── ...           # 其他功能页面
├── index.html            # 首页
├── README.md             # 项目文档
├── CODE_STYLE_GUIDE.md   # 代码规范指南
└── PROJECT_STRUCTURE_GUIDE.md # 项目结构指南
```

## 目录详解

### js/ 目录

`js/`目录存放所有JavaScript文件，负责项目的交互逻辑和功能实现。

- **environment.js**: 环境配置管理核心文件，整合了所有环境相关功能
- **其他.js文件**: 按功能模块命名的JavaScript文件，每个文件负责特定功能

**注意**: 
- 环境管理功能已统一整合到`environment.js`文件中
- 新增功能应创建独立的JavaScript文件，避免文件过大

### module/index/ 目录

`module/index/`目录是项目的核心，包含所有功能模块的HTML页面。

- **contact.html**: 联系页面，展示客服信息和下载链接
- **qrcode_page.html**: 二维码生成和展示页面
- **buisinessCard.html**: 名片展示系统
- **2048.html**: 2048游戏实现
- **index_days.html**: 重要日子记录功能
- **其他功能页面**: 按功能命名的HTML文件

## 文件命名规范

### HTML文件

- 使用小写字母和连字符 `-` 命名
- 文件名应能清晰反映页面功能
- 禁止使用中文或特殊字符
- 示例: `contact-form.html`, `qrcode-generator.html`

### JavaScript文件

- 使用小写字母和连字符 `-` 命名（推荐）或小驼峰命名法
- 文件名应反映其功能或所属模块
- 核心功能使用描述性名称
- 示例: `environment.js`, `task-manager.js`, `userProfile.js`

### CSS文件

- 使用小写字母和连字符 `-` 命名
- 遵循BEM（Block, Element, Modifier）命名规范
- 示例: `card-styles.css`, `user-profile.css`

## 环境管理使用指南

为了统一环境管理，我们已经将所有环境相关功能整合到`environment.js`文件中。

### 主要特性

1. **环境配置**: 支持开发环境和生产环境
2. **配置保存**: 环境选择保存在localStorage中
3. **自动检测**: 支持URL参数检测和本地存储读取
4. **向后兼容**: 提供对旧版环境配置的兼容支持

### 使用方法

#### 1. 获取当前环境

```javascript
// 获取当前环境名称
export const currentEnv = window.getCurrentYamhkEnvironment();

// 获取当前环境配置对象
const envConfig = window.yamhkEnvManager.getCurrentConfig();
```

#### 2. 切换环境

```javascript
// 切换到开发环境
window.switchYamhkEnvironment('development');

// 切换到生产环境
window.switchYamhkEnvironment('production');
```

#### 3. 获取环境URL

```javascript
// 获取基础URL
const baseUrl = window.getYamhkUrl('base');

// 获取API URL
const apiUrl = window.getYamhkUrl('api');

// 获取SVN URL
const svnUrl = window.getYamhkUrl('svn');

// 获取GUI URL
const guiUrl = window.getYamhkUrl('gui');
```

#### 4. 向后兼容方法

为了兼容旧版代码，提供以下兼容方法：

```javascript
// 获取当前环境数据（兼容旧版envHelp.js）
const localData = globalThis.getLocalData();

// 访问环境变量（兼容旧版）
const environments = globalThis.environments;
```

## 新增功能模块流程

1. 在`module/index/`目录下创建新的HTML文件
2. 如需JavaScript逻辑，在`js/`目录下创建对应的.js文件
3. 在首页添加导航链接
4. 遵循项目的代码规范和设计风格
5. 更新相关文档

## 文件组织最佳实践

1. **保持扁平化**: 避免过深的目录嵌套
2. **功能内聚**: 相关功能的文件应组织在一起
3. **命名清晰**: 使用描述性的文件名，便于理解和查找
4. **删除冗余**: 定期清理不再使用的文件
5. **文档同步**: 添加或修改文件时，同步更新相关文档

## 结语

遵循统一的项目结构和文件命名规范，可以大大提高代码的可读性和可维护性，同时也方便团队成员理解项目架构和快速定位问题。随着项目的发展，这些规范可能会进行调整，请定期查看最新版本。