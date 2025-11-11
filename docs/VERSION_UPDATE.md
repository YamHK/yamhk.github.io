# 版本信息更新说明

## 概述

为了方便维护前端版本信息，我们将Git提交信息存储在单独的JSON文件中：
`data/version_info.json`

## 文件结构

```json
{
  "version": "v1.0.0",
  "commit_hash": "6f72485",
  "commit_timestamp": "2025-11-11 10:34:31 +0800"
}
```

## 更新脚本

### Node.js脚本

路径：`scripts/update_version_info.js`

使用方法：
```bash
node scripts/update_version_info.js
```

### PowerShell脚本

路径：`scripts/update_version_info.ps1`

使用方法：
```powershell
.\scripts\update_version_info.ps1
```

## 脚本功能

两个脚本都会执行以下操作：
1. 获取当前Git提交哈希（短格式）
2. 获取当前Git提交时间戳
3. 更新`data/version_info.json`文件
4. 输出更新后的版本信息

## 集成说明

前端代码通过读取`data/version_info.json`文件获取版本信息，确保显示的版本信息与Git提交信息保持一致。