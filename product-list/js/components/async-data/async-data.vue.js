// 上拉加载更多
(function() {

    var $window = $(window);
    var $document = $(document);

    var tpl = '<div>'+
                '<slot name="scroll-async"></slot>'+
                '<div class="footer">'+
                    '<div  class="fui-uti-loading" v-show="isSending">拼命加载中...</div>'+
                    '<p class="bottom-tip" v-show="noMore">到底了哦~</p>'+
                '</div>'+
            '</div>';

    Vue.component('async-data',{
        props: [],
        template: tpl,
        data: function() {
            return {
                isSending: false,
                noMore: false
            }
        },
        methods: {
            loadMoreItem: function() {
                var that = this;
                // 这里加入 this.$vnode.key 用来给每一个页面添加不同的滚动加载
                $window.on("scroll.LOADMORE" + this.$vnode.key, function() {
                    
                    if (that.isSending || that.noMore || that.$vnode.key != that.$parent.category) {
                        return;
                    }
                    if ($window.scrollTop() + $window.height() >= $document.height() - 2*$window.height()) {
                        that.isSending = true;
                        that.$emit('scrollfun');
                    }
                });
            }
        },
        mounted: function() {
            this.loadMoreItem();
        }
    })
})();