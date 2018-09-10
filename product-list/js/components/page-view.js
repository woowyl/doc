// 首页数据
(function() {
    var $window = $(window);

    var tpl = '<div class="item-wrapper">'+
        '         <async-data @scrollfun="getDataList()" ref="async" :key="category">'+
        '            <ul slot="scroll-async">'+
        '                <li v-for="(item, index) in itemList" class="item-li">'+
        '                    <hor-product :index="index" :key="random"></hor-product>'+
        '                </li>'+
        '            </ul>'+
        '         </async-data>'+
        '        </div>';

    Vue.component('product-list', {
        props:['category'],
        template: tpl,
        data: function() {
            return {
                itemList: [],
                page:1,
                // 此处为模拟的临界值，实际开发中并不需要
                maxPage: parseInt(this.category),
                isSending: false
            }
        },
        watch: {
            '$route': function(to, from) {
                // 对路由变化作出响应...
                this.listenRouter(to.params.category, from.params.category);
                // 此处为模拟的临界值，实际开发中并不需要
                this.maxPage = parseInt(to.params.category);
            }
        },
        computed: {
            random: function() {
                return Math.random();
            }
        },
        methods: {
            initPage: function(pageInfo) {
                // 判断是否有初始化信息
                if (!!pageInfo) { 
                    this.page = pageInfo.page;
                    this.itemList = pageInfo.itemList;

                    if (pageInfo.itemList.length < 1) {
                        setTimeout(function() {
                            that.$refs.async.noMore = true;
                        },1000);
                    }

                    setTimeout(function() {
                        window.scroll(0, pageInfo.offsetY);
                    },0);
                } else {
                    // 这句用于关闭异步插件
                    this.page = 1;
                    this.itemList = [];
                    this.getDataList();
                }
            },
            getDataList: function() {
                var that =  this;
                if (that.isSending) {
                    return;
                }
                that.isSending = true;
                $.getJSON('http://mock.fanli.com/mockjsdata/117/productList', {
                    category: this.category,
                    page: this.page,
                    t: new Date().getTime()
                }).done(function(res) {
                    if (res.status == 1) {
                        // 如果返回的列表有数据
                        if (res.data.list && res.data.list.length > 0 && that.page <= that.maxPage) {
                            that.itemList = that.itemList.concat(res.data.list);
                            that.page++;
                        } else {
                            // 返回的列表数据已空
                            $window.off("scroll.LOADMORE"+ that.category);
                            that.$refs.async.noMore = true;
                        }
                    } else {
                        Fanli.Utility.Toast.open(res.info);
                    }
                    that.$refs.async.isSending = false;
                    that.isSending = false;
                });
            },
            listenRouter: function(nextCategory, category) {
                // 记录并保存当前信息
                var thisPageInfo = {
                    page: this.page,
                    offsetY: $(window).scrollTop(),
                    itemList: this.itemList
                };
                sessionStorage.setItem('ICECREAM-' + category, JSON.stringify(thisPageInfo));
                // 判断下一个分类是否已被缓存
                var nextPageInfo = JSON.parse(sessionStorage.getItem('ICECREAM-'+nextCategory));
                this.initPage(nextPageInfo);
            }
        },
        mounted: function() {
            this.initPage();
            console.log('view router mounted');
        }
    });
})();