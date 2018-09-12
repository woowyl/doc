//导航组件
(function() {
    var $navbar;

    var getdata;
    var tpl = '<div class="nav-bar fui-uti-hor-mid">'+
        '        <ul class="nav-wrapper fui-uti-hor-mid" id="J_nav_ul">'+
        '            <li class="nav-item fui-uti-hor-mid" :class="{cur : curType==0}" @click="delayTrigger(0,$event)">全部</li>'+
        '            <li v-for="category in categoryList" class="nav-item fui-uti-hor-mid" :key="category.id" :class="{cur: curType==category.id}" @click="delayTrigger(category.id,$event)">{{category.name}}</li>'+
        '        </ul>'+
        '    </div>';

    Vue.component('nav-bar',{
        props: [],
        template: tpl,
        data: function() {
            return {
                categoryList: [],
                oldType:'0',
                curType: 0
            }
        },
        computed: {
        },
        methods: {
            getcategoryList: function() {
                var that = this;
                $.getJSON('http://mock.fanli.com/mockjsdata/117/category', function(res){
                    if (res.status == 1) {
                        that.categoryList = res.data.list;
                    } else {
                    }
                });
            },
            delayTrigger: function(type, event){
                // new
                var that = this;
                
                this.oldType = this.curType;
                var that = this;
                clearTimeout(getdata);
                this.curType = type;
                if (parseInt(this.curType) > parseInt(this.oldType)) {
                    this.$root.animate = "slide-fade-left";
                } else {
                    this.$root.animate = "slide-fade-right";
                }
                clickDom = $(event.currentTarget)[0];
                this.setSelectedPosition($navbar, clickDom);
                getdata = setTimeout(function(){
                    // 修改路由
                    that.$router.replace("/"+type)
                }, 200);
            },
            setSelectedPosition: function($wapper, $selected) {
                if (!$selected) return;
                var selectedPosition = $selected.offsetLeft;
                
                var wrapperWidth = $wapper.width();
                var scrollLength = selectedPosition - (wrapperWidth / 2);
                if (scrollLength > 0) {
                    $wapper.animate({ scrollLeft: scrollLength }, 300);
                } else if ($wapper[0].scrollLeft > 0) {
                    $wapper.animate({ scrollLeft: 0 }, 300);
                };
            }
        },
        mounted: function() {
            this.getcategoryList();
            $navbar = $("#J_nav_ul");
            this.curType= this.$route.params.category;
        },
        updated: function() {
            this.setSelectedPosition($navbar, $("#J_nav_ul .cur")[0]);
        }
    });
})();