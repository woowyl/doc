(function() {
    var tpl = '<div>'+
                '<slot name="cache-body"></slot>'+
            '</div>';

    Vue.component('cache-data', {
        props: [],
        template: tpl,
        data: function() {
            return {

            }
        },
        methods: {
            initPage: function(pageInfo) {
                // 判断是否有初始化信息
                if (!!pageInfo) { 
                    setTimeout(function() {
                        window.scroll(0, pageInfo.offsetY);
                    },0);
                    this.$emit('target-fun', pageInfo);
                } else {
                    // 这句用于关闭异步插件
                    setTimeout(function() {
                        window.scroll(0, 0);
                    },0);
                    this.$emit('untarget-fun');
                }
            },
            recordPage: function(name, nextName, recordData) {
                // 记录并保存当前信息
                recordData.offsetY = window.scrollY;
                
                sessionStorage.setItem('ICECREAM-' + name, JSON.stringify(recordData));
                // 判断下一个分类是否已被缓存
                var nextPageInfo = JSON.parse(sessionStorage.getItem('ICECREAM-'+ nextName));
                this.initPage(nextPageInfo);
            }
        },
        mounted: function(){
            
        }
    });
})();