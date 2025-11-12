// 创建浮动窗口元素
var floatingWindow = document.createElement('div');
floatingWindow.style.position = 'fixed';
floatingWindow.style.bottom = '10px';
floatingWindow.style.left = '10px';
floatingWindow.style.width = '120px'; // 根据需要调整宽度
floatingWindow.style.padding = '10px';
floatingWindow.style.cursor = 'pointer';
floatingWindow.style.borderRadius = '50%'; // 设置为椭圆形状
floatingWindow.style.textAlign = 'center'; // 文字居中显示
floatingWindow.style.backgroundColor = getRandomColor(); // 随机生成背景色
floatingWindow.innerText = '切换环境';
floatingWindow.style.display = 'none';
// 创建下拉选择框元素
var selectDropdown = document.createElement('select');
selectDropdown.style.display = 'none'; // 初始时隐藏下拉选择框
selectDropdown.style.position = 'fixed';
selectDropdown.style.top = '50%';
selectDropdown.style.left = '50%';
selectDropdown.style.transform = 'translate(-50%, -50%)';
selectDropdown.style.borderRadius = '30px'; // 圆润的选择框
selectDropdown.style.backgroundColor = getRandomColor(); // 随机生成背景色
selectDropdown.style.width = '300px'; // 增加宽度
selectDropdown.style.height = '60px'; // 增加高度
selectDropdown.style.fontSize = '20px'; // 增加字体大小
selectDropdown.style.padding = '10px'; // 增加内边距
selectDropdown.style.border = '2px solid black'; // 增加边框
selectDropdown.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'; // 增加阴影效果
// 定义环境选项
var environments = {
    dev_prod: {
        id: 0,
        env: 'dev_prod',
        defaultConsoleSHow: false,
        hkHeader: 9527,
        // hkApUrl: "https://www.baotx2019.xyz/hk",
        // hkApUrl: "http://yamhk.2288.org:8090",
        hkApUrl: "https://www.yamhk.top",
        hkApApi: "/inner_matrix/activity/m/1",
        redirect: "/v5/hk/bc"
    },
    dev_local: {
        id: 1,
        env: 'dev_local',
        defaultConsoleSHow: true,
        hkHeader: 9999,
        //hkApUrl: "http://192.168.179.25:55055",
        //hkApUrl: "http://127.0.0.1:55055",
        //hkApUrl: "https://www.baotx2019.xyz",
        hkApUrl: "https://local.yamhk.top",
        hkApApi: "/inner_matrix/activity/m/1",
        redirect: "/v5/hk/iy"
    }
};

// 将环境选项添加到下拉选择框中
for (var key in environments) {
    if (environments.hasOwnProperty(key)) {
        var option = document.createElement('option');
        option.value = key;
        option.text = key;
        selectDropdown.appendChild(option);
    }
}

// 定义默认环境
var defaultEnvironment = 'dev_prod';
// var defaultEnvironment = 'dev_local';

// 从本地存储中获取选中的环境
var storedEnvironment = localStorage.getItem('selectedEnvironment');

// 判断本地存储是否存在选中的环境
if (environments.hasOwnProperty(storedEnvironment)) {
    selectDropdown.value = storedEnvironment;
    floatingWindow.innerText = storedEnvironment;
} else {
    selectDropdown.value = defaultEnvironment;
    floatingWindow.innerText = defaultEnvironment;
    // 将默认环境存储在本地存储中
    localStorage.setItem('selectedEnvironment', defaultEnvironment);
}

// 处理环境切换
function handleEnvironmentSwitch() {
    var selectedEnvironment = selectDropdown.value;
    if (environments.hasOwnProperty(selectedEnvironment)) {
        this.localData = environments[selectedEnvironment];
        // 将所选环境存储在本地存储中
        localStorage.setItem('selectedEnvironment', selectedEnvironment);
        // 更新浮动窗口的文本为所选环境
        floatingWindow.innerText = selectedEnvironment;
    } else {
        this.localData = environments[defaultEnvironment];
        // 将默认环境存储在本地存储中
        localStorage.setItem('selectedEnvironment', defaultEnvironment);
        // 更新浮动窗口的文本为默认环境
        floatingWindow.innerText = defaultEnvironment;
    }
    // 选择环境后隐藏下拉选择框
    selectDropdown.style.display = 'none';
}

// 切换显示或隐藏下拉选择框
function envDropdown() {
    floatingWindow.style.display = floatingWindow.style.display === 'none' ? 'block' : 'none';
}

// 切换显示或隐藏下拉选择框
function toggleDropdown() {
    selectDropdown.style.display = selectDropdown.style.display === 'none' ? 'block' : 'none';
}

// 从本地存储中获取默认选中的环境
var storedEnvironment = localStorage.getItem('selectedEnvironment');
if (environments.hasOwnProperty(storedEnvironment)) {
    selectDropdown.value = storedEnvironment;
    floatingWindow.innerText = storedEnvironment;
} else {
    selectDropdown.value = 'default';
}

// 为下拉选择框添加change事件监听器
selectDropdown.addEventListener('change', function () {
    handleEnvironmentSwitch();
});

// 为浮动窗口添加click事件监听器
floatingWindow.addEventListener('click', function () {
    toggleDropdown();
});

// 随机生成背景色
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 将下拉选择框和浮动窗口元素添加到文档主体中
document.body.appendChild(selectDropdown);
document.body.appendChild(floatingWindow);

// 添加双击事件监听器到页面空白处
document.addEventListener('dblclick', function (event) {
    if (event.target === document.body) {
        envDropdown();
    }
});

var touchstartTimestamp = 0;
document.addEventListener('touchstart', function (event) {
    var now = new Date().getTime();
    var delta = now - touchstartTimestamp;
    touchstartTimestamp = now;
    if (delta < 3000) {
        if (event.target === document.body) {
            envDropdown();
        }
    }
});

async function openTarget(target, virtualSpace) {
    //设置默认值
    if (!target || target === "" || target === "undefined" || target === "null" || target == null) {
        target = "index";
        target = "chat";
        target = "baidu";
        target = "matrix";
        target = "local";
        target = "sign";
        target = "days";
        target = "contact";
    }
    if (!virtualSpace || virtualSpace === "" || virtualSpace === "undefined" || virtualSpace === "null" || virtualSpace == null) {
        realVirtual = false;
        virtualSpace = "Beijing";
    } else {
        realVirtual = true;
    }
    let targetSite = target;
    //热点新闻
    if (target === "hot") {
        targetSite = "matrix";
        targetSite = "yyf";
        targetSite = "baidu";
    }
    //索引页
    if (target === "index") {
        targetSite = "contact";
    }
    //本地广播
    if (target === "local") {
        // 使用本地模拟数据替代外部API调用
        // const mockLocationData = {
        //     ip: '127.0.0.1',
        //     country: '中国',
        //     region: '北京',
        //     city: '北京'
        // };
        // console.log('公网IP及地理位置（模拟）：', mockLocationData.ip, mockLocationData.country, mockLocationData.region, mockLocationData.city);
        // 使用本地模拟数据替代外部API调用
            const mockLocationData = {
                ip: '127.0.0.1',
                country: '中国',
                region: '北京',
                city: '北京',
                longitude: 116.4074,
                latitude: 39.9042,
                isp: '本地网络'
            };
            //获取模拟数据
            let ip = mockLocationData.ip;
            let city = mockLocationData.city;
            let region = mockLocationData.region;
            let country = mockLocationData.country;
            let longitude = mockLocationData.longitude;
            let latitude = mockLocationData.latitude;
            
            if (city === "" || city === null || city === "null" || city === "undefined") {
                targetSite = "baidu";
            } else {
                targetSite = city;
                targetSite = region;
            }
            //虚拟定位
            if (realVirtual) {
                targetSite = virtualSpace;
                //log
                console.log("虚拟定位-" + virtualSpace);
            }
            //log
            console.log("当前访问站点-ip(模拟): " + ip + "-" + city + "-" + region + "-" + country + "-" + longitude + "-" + latitude);
            //通知服务器人访问,带上 位置信息
            const apiUrl = getYamhkUrl('api');
            fetch(apiUrl + '?action=locationMonitor&city=' + city + '&region=' + region + '&ip=' + ip)
    }
    if (target !== "local") {
        // 使用本地模拟数据替代外部API调用
        const mockLocationData = {
            ip: '127.0.0.1',
            country: '中国',
            region: '北京',
            city: '北京',
            longitude: 116.4074,
            latitude: 39.9042,
            isp: '本地网络'
        };
        //获取模拟数据
        let ip = mockLocationData.ip;
        let city = mockLocationData.city;
        let region = mockLocationData.region;
        let country = mockLocationData.country;
        let longitude = mockLocationData.longitude;
        let latitude = mockLocationData.latitude;
        
        //log
        console.log("当前访问站点-ip(模拟): " + ip + "-" + city + "-" + region + "-" + country + "-" + longitude + "-" + latitude);
        //通知服务器人访问,带上 位置信息
        const apiUrl = getYamhkUrl('api');
        fetch(apiUrl + '?action=locationMonitor&city=' + city + '&region=' + region + '&ip=' + ip)
    }
    // Fetching site configurations from JSON
    fetch('json/targetSites.json')
        .then(response => response.json())
        .then(data => {
            let site = null;
            //打印target
            console.log("当前访问站点-target: " + target + "-" + targetSite);
            site = data.sites[targetSite];
            if (site) {
                document.title = site.title;
                //如果请求的地址中包含标题,则使用该标题
                let vTitle = new URLSearchParams(window.location.search).get('title');
                if (vTitle) {
                    document.title = vTitle;
                }
                if (site.accessAble) {
                    //如果accessAble为true
                    let url = site.url;
                    // 替换动态URL
                    if (url.includes('DYNAMIC_BASE_URL')) {
                        url = url.replace('DYNAMIC_BASE_URL', getYamhkUrl('base'));
                    }
                    document.getElementById("myFrame").src = url;
                } else {
                    //如果accessAble为false
                    //直接跳转页面
                    let url = site.url;
                    // 替换动态URL
                    if (url.includes('DYNAMIC_BASE_URL')) {
                        url = url.replace('DYNAMIC_BASE_URL', getYamhkUrl('base'));
                    }
                    window.location.href = url;
                }
            } else {
                site = data.sites["baidu"];
                document.getElementById("myFrame").src = site.url;
                //如果找不到对应的站点，申请通知管理员
                sendMessage("找不到对应的站点，请通知管理员添加" + target + "-" + targetSite, "all");
            }
        })
        .catch(error => console.error('Error fetching site configurations:', error));
    // 检查浏览器是否支持 wakeLock API
    if ('wakeLock' in navigator) {
        // 请求屏幕不休眠
        navigator.wakeLock.request('screen')
            .then(wakeLock => {
                console.log('屏幕不休眠');
                // 在这里执行需要屏幕保持开启的操作
            })
            .catch(error => {
                console.error('无法请求屏幕不休眠');
            });
    } else {
        console.warn('wakeLock API 不受此浏览器支持');
    }
    //修改当前url中的t参数
    let url = new URL(window.location.href);
    url.searchParams.set("t", target);
    window.history.replaceState({}, document.title, url);
}

window.onload = function () {
    floatingWindow.style.display = 'none';
    var storedEnvironment = localStorage.getItem('selectedEnvironment');
    this.localData = environments[storedEnvironment];
    // 例如：
    //let qrUrl = this.localData.hkApUrl + this.localData.hkApApi + "?hello=world&proxy=qr&finder=hw";
    //console.warn("二维码地址-" + qrUrl)
    //获取二维码
    //document.getElementById('qrcode').src = qrUrl;
    // 获取url中的t参数
    let target = new URLSearchParams(window.location.search).get('t');
    let virtualSpace = new URLSearchParams(window.location.search).get('v');
    openTarget(target, virtualSpace);
    localStorage.setItem('target', target);
};