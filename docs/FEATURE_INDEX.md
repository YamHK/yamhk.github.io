# ev功能索引

## 概述

本文件提供ev所有功能模块的索引，帮助用户快速查找和访问所需功能。每个功能模块都包含简要描述、访问路径和相关信息。

## 核心功能模块

| 功能名称 | 描述 | 访问路径 | 文件位置 |
|---------|------|---------|----------|
| **首页** | 平台入口，提供功能导航和环境切换 | / | static/index.html |
| **联系页面** | 展示客服信息和下载链接 | /module/index/contact.html | static/module/index/contact.html |
| **重要日子记录** | 记录和展示重要日期及倒计时 | /module/index/index_days.html | static/module/index/index_days.html |
| **二维码生成** | 二维码生成和展示功能 | /module/index/qrcode_page.html | static/module/index/qrcode_page.html |
| **名片展示系统** | 展示用户名片信息和相关图片 | /module/index/buisinessCard.html | static/module/index/buisinessCard.html |
| **2048游戏** | 经典2048数字拼图游戏 | /module/index/2048.html | static/module/index/2048.html |
| **矩阵工具** | 矩阵相关计算和动画 | /module/index/mx_matrix.html | static/module/index/mx_matrix.html |
| **邮件工具** | 邮件相关功能和管理 | /module/index/mx_email.html | static/module/index/mx_email.html |
| **50OK平台** | 专业的游戏娱乐平台 | /module/index/mx_50OK.html | static/module/index/mx_50OK.html |

## 游戏与娱乐

| 功能名称 | 描述 | 访问路径 | 文件位置 |
|---------|------|---------|----------|
| **2048游戏** | 经典2048数字拼图游戏 | /module/index/2048.html | static/module/index/2048.html |
| **五子棋游戏** | 五子棋对战游戏 | /module/index/GameWzq.html | static/module/index/GameWzq.html |
| **50OK平台** | 专业的游戏娱乐平台 | /module/index/mx_50OK.html | static/module/index/mx_50OK.html |

## 工具与实用功能（已整合到核心功能模块）

> 注意：所有工具模块已整合到核心功能模块中，在此仅作分类展示

| 功能名称 | 描述 | 访问路径 | 文件位置 |
|---------|------|---------|----------|
| **矩阵工具** | 矩阵相关计算和动画 | /module/index/mx_matrix.html | static/module/index/mx_matrix.html |
| **邮件工具** | 邮件相关功能和管理 | /module/index/mx_email.html | static/module/index/mx_email.html |

## 通信与社交

| 功能名称 | 描述 | 访问路径 | 文件位置 |
|---------|------|---------|----------|
| **邮件功能** | 邮件相关功能 | /module/index/email.html | static/module/index/email.html |
| **聊天功能** | 实时聊天功能 | /module/index/index_chat.html | static/module/index/index_chat.html |

## 其他功能

| 功能名称 | 描述 | 访问路径 | 文件位置 |
|---------|------|---------|----------|
| **文件下载** | 软件和文件下载服务 | /module/index/contact_download.html | static/module/index/contact_download.html |
| **签到功能** | 签到和积分系统 | /module/index/index_sign.html | static/module/index/index_sign.html |
| **话题讨论** | 话题讨论和社区功能 | /module/index/index_topic.html | static/module/index/index_topic.html |
| **积分和金币** | 积分和金币管理系统 | /module/index/pointAndGold.html | static/module/index/pointAndGold.html |

## 环境配置

平台支持两种运行环境：

1. **生产环境**：稳定版本，使用HTTPS协议
2. **开发环境**：测试版本，用于开发和调试

### 环境切换方法

1. **通过URL参数**：在URL后添加 `?env=development` 或 `?env=production`
2. **通过导航栏**：在首页导航栏点击环境切换按钮选择环境
3. **通过localStorage**：系统会记住您的环境偏好设置

## 开发与维护

| 文档名称 | 描述 | 文件位置 |
|---------|------|----------|
| **项目文档** | 项目概述、技术栈和使用说明 | static/README.md |
| **代码规范** | 编码标准和最佳实践 | static/CODE_STYLE_GUIDE.md |
| **项目结构** | 文件组织和目录结构说明 | static/PROJECT_STRUCTURE_GUIDE.md |
| **功能索引** | 功能模块索引和访问路径 | static/FEATURE_INDEX.md |

## 快速导航

### 核心功能快速访问

- [首页](/) - 平台入口
- [联系我们](/module/index/contact.html) - 客服信息
- [重要日子记录](/module/index/index_days.html) - 记录重要日期
- [二维码生成](/module/index/qrcode_page.html) - 生成二维码
- [2048游戏](/module/index/2048.html) - 休闲游戏

## 注意事项

- 部分功能可能需要特定权限才能访问
- 请确保在适合的环境下使用相应功能
- 如遇到功能问题，请联系客服或开发团队

---

*更新时间：2023年*