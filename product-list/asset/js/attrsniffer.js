(function() {
    /**
     * 一般UA
     * User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B350 Safari/8536.25 
     * 返利APP UA
     * 1. Fanli/4.0.0.112 (iPhone; iPhone OS 6.1.4; en_US; ID:1-6663128-7787518413510-17-3)
     * 2. Fanli/4.3.0.31 (iPhone; iPhone OS 8.1.2; zh_CN; ID:1--63371201214502-17-3) context:com|fs
     *
     * Done
     * 1. ios, HTML.fl-ios
     * 2. ios version > 8, HTML.fl-hairlines
     * 3. ua has 'context:com', fefine meta viewport width
     */
    var ua = navigator.userAgent.toLowerCase();
    var appv = navigator.appVersion;
    var html = document.documentElement;
    var isIos = /ip(hone|od|ad)/i.test(ua);
    var device = {
        iphone: "iphone",
        ipod: "ipod",
        ipad: "ipad",
        samsung: "samsung|sm-",
        huawei: "huawei",
        meizu: "mx[0-9]+"
    };

    var vArr, ver;
    var dev;

    if (isIos) {
        html.classList.add("fl-ios");
        vArr = appv.match(/OS (\d+)[_\.](?:\d+)[_\.]?(?:\d+)?/);
        ver = parseInt(vArr[1], 10);

        if (ver >= 8) {
            html.classList.add("fl-hairlines");
        }
    } else {
        vArr = appv;
        ver = parseInt(ua.substr(ua.indexOf('android') + 8, 3));
        html.classList.add("fl-android");
        
        if (ver < 6) {
            html.classList.add("fl-android-" + ver);
        }
    }
    
    for (dev in device) {
        if (device.hasOwnProperty(dev)) {
            if ((new RegExp("\\b" + device[dev] + "\\b")).test(ua)) {
                html.classList.add("fl-" + dev);
                break; 
            }
        }
    }

}());

(function(win, doc) {
    var remwidth = 750;

    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
    var timer = null;

    var ua = navigator.userAgent.toLowerCase();
    var isIos = /ip(hone|od|ad)/i.test(ua);
    var isFanli = ua.indexOf('fanli') > -1;
    var isIpad = /ipad/i.test(ua);

    function setFontSize() {
        var docEl = doc.documentElement;
        var winWidth = (isFanli && isIos && !isIpad) ? window.screen.width : docEl.getBoundingClientRect().width;

        var originFontSize;
        var definedFontSize = (winWidth / remwidth) * 100;

        if (definedFontSize > 100) {
            definedFontSize = 100;
        }

        docEl.setAttribute('data-screenwidth', winWidth);
        docEl.style.fontSize = definedFontSize + 'px';

        originFontSize = parseFloat(window.getComputedStyle(docEl, null).getPropertyValue("font-size"));

        if( !isIos && definedFontSize != originFontSize ){
            originFontSize = (originFontSize % 1 === 0) ? (originFontSize + 0.5) : originFontSize;
            docEl.style.fontSize = ( definedFontSize / originFontSize ) * definedFontSize + 'px';
        }
    }

    win.addEventListener(evt, function() {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 300);
        }
    }, false);

    setFontSize();

}(window, document));
