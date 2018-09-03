// 首页数据
(function() {
    var $window = $(window);

    var tpl = '<div class="item-wrapper">'+
        '         <async-data @scrollfun="getDataList()" ref="async" :key="$route.path">'+
        '            <ul slot="scroll-async">'+
        '                <li v-for="n in itemList" class="item-li">'+
        '                    <hor-product></hor-product>'+
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
            }
        },
        watch: {
            '$route': function(to, from) {
                // 对路由变化作出响应...
                this.page = 1;
                this.getDataList();
            }
        },
        methods: {
            getDataList: function() {
                var that =  this;
                $.getJSON('http://mock.fanli.com/mockjsdata/117/productList', {
                    category: this.category,
                    page: this.page,
                    t: new Date().getTime()
                }).done(function(res) {
                    if (res.status == 1) {
                        // 如果返回的列表有数据
                        if (res.data.list && res.data.list.length > 0) {
                            that.itemList = that.itemList.concat(res.data.list);
                            that.page++;
                        } else {
                            // 返回的列表数据已空
                            $window.off("scroll.LOADMORE");
                            that.$refs.async.noMore = true;
                        }
                    } else {
                        Fanli.Utility.Toast.open(res.info);
                    }
                    that.$refs.async.isSending = false;
                    that.isSending = false;
                });
            }
        },
        mounted: function() {
            this.getDataList();
            console.log(this.category);
            
        }
    });
})();