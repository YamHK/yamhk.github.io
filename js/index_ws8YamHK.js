// 创建WebSocket连接
let socket;

// 获取uid - 简化版本，不依赖外部服务器
function fetchUid() {
    console.log('fetchUid called');
    // 检查本地缓存是否存在uid
    let websocketSid = localStorage.getItem('websocketSid');
    
    // 连接目标
    let target = new URLSearchParams(window.location.search).get('t') || "matrix";
    
    // 如果没有uid，创建一个模拟的uid
    if (!websocketSid || websocketSid === "null") {
        websocketSid = 'demo_user_' + Date.now();
        localStorage.setItem('websocketSid', websocketSid);
        console.log('Created demo user ID:', websocketSid);
    }
    
    // 延迟连接，确保所有变量都已设置
    setTimeout(() => {
        connect(websocketSid + "&t=" + target);
    }, 100);
}

// 建立WebSocket连接 - 改进的错误处理版本
function connect(websocketSid) {
    console.log('connect called with sid:', websocketSid);
    
    try {
        // 为演示目的，直接创建一个模拟的socket对象
        // 这样即使WebSocket连接失败，页面仍然可以使用
        socket = {
            readyState: 1, // 模拟已连接状态
            send: function(data) {
                console.log('模拟发送消息:', data);
                // 在本地显示自己发送的消息
                if (window.displayMessage) {
                    const messageObj = JSON.parse(data);
                    window.displayMessage(JSON.stringify({
                        content: messageObj.content,
                        nickname: messageObj.frNickname || '我',
                        time: new Date().toLocaleTimeString()
                    }));
                }
            },
            close: function() {
                console.log('模拟关闭连接');
            }
        };
        
        console.log('聊天界面已准备就绪！（使用模拟WebSocket）');
        
        // 模拟收到一条欢迎消息
        setTimeout(() => {
            if (window.displayMessage) {
                window.displayMessage(JSON.stringify({
                    content: '欢迎来到聊天室！这是一个演示版本。',
                    nickname: '系统',
                    time: new Date().toLocaleTimeString()
                }));
            }
        }, 500);
        
    } catch (error) {
        console.error('初始化聊天系统时发生错误：', error);
        // 即使出错，也要确保socket有基本功能
        socket = {
            readyState: 0,
            send: function() { console.log('无法发送消息'); },
            close: function() {}
        };
    }
}

  // 发送挥手消息的函数
function sendGoodbyeMessage() {
    if (socket.readyState === WebSocket.OPEN) {
        let goodbyeMessage = {
            "content": "Goodbye",
            "type": "text",
            "toUserId": "all",
            "uid": localStorage.getItem('websocketSid')
        };
        socket.send(JSON.stringify(goodbyeMessage));
    }
}

// 发送消息给服务器的函数
function sendMessage(message, target) {
    if (socket.readyState === WebSocket.OPEN) {
        //提取当前用户把message封装成json
        let messageJson = {
            "content": message,
            "type": "text",
            "toUserId": target,
            "frNickname": localStorage.getItem('nickname'),
            "frUserId": localStorage.getItem('websocketSid')
        };
        socket.send(JSON.stringify(messageJson));
    } else {
        console.error('WebSocket连接未打开');
    }
}

//定时器,每隔三十秒发送一次消息
// var timer = setInterval(function () {
//     let message = document.querySelector('.el-input').value;
//     //如果为空的话赋默认值
//     if (message === "") {
//         message = "我在这里等人";
//     }
//     sendMessage(message,"all");
// }, 60000);
//关闭链接
function closeWebsocket() {
    if (socket) {
        socket.close();
    }
}

function notification(tip, content) {
    //浏览器内部内右下角弹出消息

    function showNotification(tip, content) {
        new Notification('提醒' + "-" + tip, {body: content});
    }

    if ('Notification' in window) {
        //log
        console.log('浏览器支持通知');
        if (Notification.permission === 'granted') {
            console.log('通知已授权-' + content);
            showNotification(tip, content);
        } else if (Notification.permission !== 'denied') {
            console.log('请求通知权限');
            Notification.requestPermission()
                .then(permission => {
                    if (permission === 'granted') {
                        console.log('通知权限已授权');
                        showNotification(tip, content);
                    } else {
                        console.log('用户拒绝了通知权限');
                    }
                });
        }
    } else {
        console.log('浏览器不支持通知');
    }
}

function updateOnlineList(content) {
    //content报文结构如下[{\"nickcode\":\"000000000012\",\"nickname\":\"应先生@台式机\"},{\"nickcode\":\"000000000001\",\"nickname\":\"应先生@宁美魔方\"},{\"nickcode\":\"000000000002\",\"nickname\":\"应先生@戴尔笔记本\"}]
    if (content) {
        let onlineList = JSON.parse(content);
        //清空在线列表
        document.getElementById("onlineUsers").innerHTML = "";
        //遍历onlineList
        for (let i = 0; i < onlineList.length; i++) {
            //创建一个div
            let div = document.createElement("div");
            //设置div的class
            div.className = "online-item";
            //设置div的innerHTML
            div.innerHTML = onlineList[i].nickname;
            //将div添加到onlineList中
            document.getElementById("onlineUsers").appendChild(div);
            if (onlineList[i].nickname === localStorage.getItem('nickname')) {
                div.style.color = "red";
            }
        }
    }
}

// 在聊天界面显示消息的函数
function displayMessage(message) {
    //往consolePanel中追加显示
    // 自定义逻辑，将消息显示在聊天界面上
    //获取message中的content属性
    let msg = JSON.parse(message);
    console.warn('messageReceived:', msg.content);
    //如果消息内包含open字符串
    if (msg.content.indexOf("open") > -1) {
        //提取open后面的字符串
        const target = msg.content.substr(msg.content.indexOf("open") + 5);
        openTarget(target);
        return;
    }
    //如果消息内包含网址则新窗口打开地址
    if (msg.content.indexOf("http") > -1) {
        let targetUrl = msg.content.substr(msg.content.indexOf("http"));
        document.getElementById("myFrame").src = targetUrl;
        openUrl(targetUrl);
    }
    //如果itemType为50001的话,则更新在线列表
    if (msg.itemType === 50001) {
        updateOnlineList(msg.content);
    } else if (msg.itemType === 20) {
        //如果消息的itemType为50003的话.则居中显示,且高亮
        document.getElementById("consoleContent").innerHTML += "<div style='text-align: center'>" + msg.content + "</div>";
        notification("系统消息", msg.content);
    } else if (msg.itemType === 50003) {
        //如果消息的itemType为50003的话.则不显示
        console.warn("不显示-监控消息" + msg.content);
    } else if (msg.frUserId === "" || msg.frUserId === null || msg.frUserId === "null" || msg.frUserId === "undefined") {
        //如果消息来源为空的话,则不显示
        console.warn("不显示-消息来源为空" + msg.content);
    } else if (msg.frUserId === localStorage.getItem('websocketSid')) {
        //找到叫consoleContent的div,填充聊天信息
        //根据消息来源显示不同的颜色,本人消息靠右展示,其他消息靠左
        document.getElementById("consoleContent").innerHTML += "<div style='text-align: right; margin-right: 550px'>" + msg.frNickname + ":" + msg.content + "</div>";
        notification("我的消息", msg.content);
    } else {
        document.getElementById("consoleContent").innerHTML += "<div style='text-align: left; margin-left: 550px'>" + msg.frNickname + ":" + msg.content + "</div>";
        notification("他人消息", msg.content);
    }
}

// 断线重连函数
function reconnect() {
    setTimeout(function () {
        console.log('尝试重新连接...');
        fetchUid();
    }, 2000); // 2秒延迟后重新连接
}

function openUrl(url) {
    let tempALink = document.createElement("a");
    tempALink.setAttribute("target", "_blank");
    tempALink.setAttribute("id", "openWin");
    tempALink.setAttribute("href", url);
    document.body.appendChild(tempALink);
    document.getElementById("openWin").click();
    document.body.removeChild(tempALink);
}
//狗日墙?不连了不连了
// 开始初始连接
fetchUid();