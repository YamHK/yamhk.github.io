# 更新版本信息的PowerShell脚本
# 该脚本会获取当前Git提交信息并更新version_info.json文件

# 获取当前目录
$currentDir = Get-Location

# 切换到项目根目录
Set-Location -Path ".."

# 获取Git提交哈希
$commitHash = git rev-parse --short HEAD

# 获取Git提交时间戳
$commitTimestamp = git show -s --format="%ci" HEAD

# 构造JSON内容
$jsonContent = @{
    version = "v1.0.0"
    commit_hash = $commitHash
    commit_timestamp = $commitTimestamp
} | ConvertTo-Json

# 写入版本信息文件
$jsonContent | Out-File -FilePath "agent\data\version_info.json" -Encoding UTF8

Write-Host "版本信息已更新:"
Write-Host "提交哈希: $commitHash"
Write-Host "提交时间: $commitTimestamp"

# 切换回原目录
Set-Location -Path $currentDir