import http.server
import socketserver
import os
from urllib.parse import urlparse

# 服务器配置
PORT = 8091  # 使用8091端口，避免与其他服务冲突

# 自定义请求处理器，添加缓存控制头
class CachingHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # 根据文件类型设置缓存控制头
        parsed_url = urlparse(self.path)
        file_extension = os.path.splitext(parsed_url.path)[1].lower()
        
        # 为静态资源设置缓存控制
        if file_extension in ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot']:
            self.send_header('Cache-Control', 'public, max-age=3600')  # 缓存1小时
        # 为HTML文件设置较短的缓存时间，允许Service Worker
        elif file_extension in ['.html']:
            self.send_header('Cache-Control', 'public, max-age=600, must-revalidate')  # 缓存10分钟
            self.send_header('Service-Worker-Allowed', '/')
        
        # 添加跨域支持（如果需要）
        self.send_header('Access-Control-Allow-Origin', '*')
        
        # 调用父类方法发送其余头信息
        super().end_headers()
    
    # 重写日志方法，可以自定义日志格式或禁用日志
    def log_message(self, format, *args):
        # 保留关键错误信息，减少控制台输出
        if any(keyword in format.lower() for keyword in ['error', 'exception', 'fail']):
            super().log_message(format, *args)

# 创建并启动服务器
Handler = CachingHTTPRequestHandler

with socketserver.TCPServer(("localhost", PORT), Handler) as httpd:
    print("服务器启动中...")
    print(f"服务器已启动在 http://localhost:{PORT}/")
    print(f"访问 http://localhost:{PORT}/ 查看已添加财经直播功能的首页")
    print("按 Ctrl+C 停止服务器")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n服务器正在关闭...")
        httpd.server_close()
        print("服务器已关闭")