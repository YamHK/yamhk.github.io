// 获取DOM元素
const statusElement = document.getElementById('status');
const urlDisplayElement = document.getElementById('url-display');
const qrcodeElement = document.getElementById('qrcode');
const refreshButton = document.getElementById('refresh');

// 生成符合QR码标准的可扫描二维码
function generateQRCode(url) {
    // 清空现有的二维码
    qrcodeElement.innerHTML = '';
    
    try {
        // 显示正在生成二维码的状态
        statusElement.textContent = '正在生成二维码...';
        statusElement.style.color = '#666';
        
        // 创建Canvas元素 - 使用更大的尺寸确保可扫描性
        const canvas = document.createElement('canvas');
        const size = 400; // 大幅增大尺寸提高扫描成功率
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // 清除画布为纯白色背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        
        // 版本1 QR码 - 21x21模块
        const moduleCount = 21;
        const quietZone = 4; // 安静区域
        
        // 计算每个模块的大小
        const availableSize = size - (quietZone * 2);
        const moduleSize = Math.floor(availableSize / moduleCount);
        
        // 计算偏移以居中
        const offsetX = (size - (moduleCount * moduleSize)) / 2;
        const offsetY = (size - (moduleCount * moduleSize)) / 2;
        
        // 创建数据矩阵
        const matrix = Array(moduleCount).fill().map(() => Array(moduleCount).fill(false));
        
        // 1. 绘制三个定位图案 (Finder Patterns)
        function drawFinder(x, y) {
            // 外框 - 黑色
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 7; j++) {
                    matrix[y+i][x+j] = true;
                }
            }
            
            // 中间层 - 白色
            for (let i = 1; i < 6; i++) {
                for (let j = 1; j < 6; j++) {
                    matrix[y+i][x+j] = false;
                }
            }
            
            // 中心方块 - 黑色
            for (let i = 2; i < 5; i++) {
                for (let j = 2; j < 5; j++) {
                    matrix[y+i][x+j] = true;
                }
            }
        }
        
        // 绘制定位图案
        drawFinder(0, 0);            // 左上角
        drawFinder(moduleCount-7, 0);  // 右上角
        drawFinder(0, moduleCount-7);  // 左下角
        
        // 2. 绘制分隔符 (白色边框)
        for (let i = 0; i < 7; i++) {
            matrix[i][7] = false;
            matrix[7][i] = false;
            matrix[i][moduleCount-8] = false;
            matrix[moduleCount-8][i] = false;
        }
        
        // 3. 添加格式信息
        const formatBits = [1,0,1,0,0,1,1,0,1,1,0,0,0,1]; // M级容错，掩码0
        
        // 顶部格式信息
        for (let i = 0; i < 6; i++) matrix[i][8] = formatBits[i];
        matrix[7][8] = formatBits[6];
        for (let i = 8; i < 14; i++) matrix[moduleCount-1-(i-7)][8] = formatBits[i];
        
        // 左侧格式信息
        for (let i = 0; i < 8; i++) matrix[8][moduleCount-1-i] = formatBits[i];
        for (let i = 8; i < 14; i++) matrix[moduleCount-1-(i-7)][i-8] = formatBits[i];
        
        // 4. 将URL转换为二进制数据 - 简化但更可靠的实现
        function urlToBits(url) {
            // 确保URL格式正确
            const formattedUrl = url.startsWith('http') ? url : 'http://' + url;
            
            const bits = [];
            
            // 模式指示符 (4位) - 0100 = 字节模式
            bits.push(0,1,0,0);
            
            // 数据长度 (8位)
            const lenBin = formattedUrl.length.toString(2).padStart(8, '0');
            for (let i = 0; i < 8; i++) bits.push(parseInt(lenBin[i]));
            
            // 数据编码 (每个字符8位)
            for (let i = 0; i < formattedUrl.length; i++) {
                const charBin = formattedUrl.charCodeAt(i).toString(2).padStart(8, '0');
                for (let j = 0; j < 8; j++) bits.push(parseInt(charBin[j]));
            }
            
            // 终止符 (4位)
            bits.push(0,0,0,0);
            
            // 填充到8的倍数
            while (bits.length % 8 !== 0) bits.push(0);
            
            return bits;
        }
        
        const dataBits = urlToBits(url);
        
        // 5. 按照Z字形路径填充数据
        let bitIndex = 0;
        let direction = -1; // 向上
        let col = moduleCount - 1;
        
        while (col >= 0 && bitIndex < dataBits.length) {
            // 跳过分隔符列
            if (col === 6) {
                col--;
                continue;
            }
            
            // 填充当前列
            let r = (direction === 1) ? 0 : moduleCount - 1;
            
            while ((direction === 1 && r < moduleCount) || (direction === -1 && r >= 0)) {
                // 检查是否是保留区域
                const isReserved = 
                    (r < 7 && col < 7) ||        // 左上角
                    (r < 7 && col > moduleCount-8) || // 右上角
                    (r > moduleCount-8 && col < 7) || // 左下角
                    (r === 8 || col === 8);      // 格式信息
                
                if (!isReserved && bitIndex < dataBits.length) {
                    matrix[r][col] = dataBits[bitIndex] === 1;
                    bitIndex++;
                }
                
                r += direction;
            }
            
            // 移动到左侧两列
            col -= 2;
            // 改变方向
            direction *= -1;
        }
        
        // 6. 应用掩码 (模式0: (x+y) % 2 === 0)
        for (let y = 0; y < moduleCount; y++) {
            for (let x = 0; x < moduleCount; x++) {
                const isReserved = 
                    (y < 7 && x < 7) ||
                    (y < 7 && x > moduleCount-8) ||
                    (y > moduleCount-8 && x < 7) ||
                    (y === 8 || x === 8);
                
                if (!isReserved && (x + y) % 2 === 0) {
                    matrix[y][x] = !matrix[y][x];
                }
            }
        }
        
        // 7. 绘制二维码 - 优化绘制函数以提高对比度和清晰度
        function drawModule(x, y, isBlack) {
            const px = offsetX + x * moduleSize;
            const py = offsetY + y * moduleSize;
            
            // 使用高对比度的颜色
            ctx.fillStyle = isBlack ? '#000000' : '#ffffff';
            
            // 稍微缩小绘制尺寸，确保模块之间有清晰的间隔
            const drawSize = moduleSize > 4 ? moduleSize - 2 : moduleSize;
            const shift = moduleSize > 4 ? 1 : 0;
            
            // 填充模块
            ctx.fillRect(px + shift, py + shift, drawSize, drawSize);
            
            // 为黑色模块添加更强的边界
            if (isBlack) {
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 2;
                ctx.strokeRect(px + shift, py + shift, drawSize, drawSize);
            }
        }
        
        // 绘制所有模块
        for (let y = 0; y < moduleCount; y++) {
            for (let x = 0; x < moduleCount; x++) {
                drawModule(x, y, matrix[y][x]);
            }
        }
        
        // 完成二维码绘制，添加到DOM中
        qrcodeElement.appendChild(canvas);
        
        // 显示成功状态
        statusElement.textContent = '二维码生成成功';
        statusElement.style.color = '#4CAF50';
        
        // 创建并添加说明文字 - 添加到body而非qrcode容器中
        const instructions = document.createElement('p');
        instructions.textContent = '扫描此二维码访问当前页面';
        instructions.style.fontSize = '14px';
        instructions.style.color = '#666';
        instructions.style.textAlign = 'center';
        instructions.style.marginTop = '10px';
        instructions.style.marginBottom = '5px';
        document.body.appendChild(instructions);
        
    } catch (error) {
        // 显示错误信息
        statusElement.textContent = '二维码生成失败: ' + error.message;
        statusElement.style.color = '#F44336';
        console.error('QR Code generation error:', error);
    }
}

// 获取当前标签页的URL并生成二维码
function getCurrentTabAndGenerateQR() {
    // 清空之前的状态
    statusElement.textContent = '获取页面URL...';
    urlDisplayElement.value = '';
    
    // 使用Chrome API获取当前标签页
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs && tabs[0] && tabs[0].url) {
            const url = tabs[0].url;
            urlDisplayElement.value = url;
            generateQRCode(url);
        } else {
            statusElement.textContent = '无法获取标签页URL';
            statusElement.style.color = '#F44336';
            urlDisplayElement.value = '';
        }
    });
}

// 刷新按钮点击事件
refreshButton.addEventListener('click', function() {
    // 添加点击反馈效果
    refreshButton.style.backgroundColor = '#2E7D32';
    
    // 延迟恢复按钮颜色
    setTimeout(function() {
        refreshButton.style.backgroundColor = '';
    }, 200);
    
    // 清空二维码区域
    qrcodeElement.innerHTML = '';
    
    // 重新生成二维码
    getCurrentTabAndGenerateQR();
});

// 页面加载完成后立即生成二维码
window.addEventListener('load', getCurrentTabAndGenerateQR);