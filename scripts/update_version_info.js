/**
 * 更新版本信息的脚本
 * 该脚本会获取当前Git提交信息并更新version_info.json文件
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// 获取项目根目录
const projectRoot = path.resolve(__dirname, '..');

// 获取Git提交时间戳
// 使用 HEAD~1 获取上一次提交的时间戳，而不是当前提交的
let commitTimestamp;
try {
    commitTimestamp = execSync('git show -s --format="%ci" HEAD~1', { cwd: projectRoot }).toString().trim();
} catch (error) {
    // 如果获取上一次提交失败，则使用当前提交的时间戳
    try {
        commitTimestamp = execSync('git show -s --format="%ci" HEAD', { cwd: projectRoot }).toString().trim();
    } catch (error) {
        // 如果都失败了，使用默认时间戳
        commitTimestamp = "1970-01-01 00:00:00 +0000";
    }
}

// 确保只使用一个时间戳，防止意外的多行输出
commitTimestamp = commitTimestamp.split('\n')[0];

// 构造版本信息对象
const versionInfo = {
  version: "v1.0.0",
  commit_timestamp: commitTimestamp
};

// 写入版本信息文件
const versionInfoPath = path.join(projectRoot, 'data', 'version_info.json');

// 只有当内容发生变化时才更新文件
const newContent = JSON.stringify(versionInfo, null, 2);

// 检查文件是否存在且内容是否相同
let shouldUpdate = true;
try {
  const existingContent = fs.readFileSync(versionInfoPath, 'utf8');
  if (existingContent === newContent) {
    shouldUpdate = false;
  }
} catch (error) {
  // 文件不存在或其他错误，需要更新
  shouldUpdate = true;
}

if (shouldUpdate) {
  fs.writeFileSync(versionInfoPath, newContent);
  console.log('版本信息已更新:');
} else {
  console.log('版本信息无变化，跳过更新:');
}

console.log(`提交时间: ${commitTimestamp}`);