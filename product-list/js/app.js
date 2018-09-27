//项目入口

(function() {

    var router = new VueRouter({
        routes: [
            {
                path: '/:category',
                component: {
                    template: '<product-list :category = "category"></product-list>',
                    props: ['category']
                },
                props: true
            }, {
                path: '/',
                redirect: '/0',
            }
        ]
    });


    Vue.filter('thousandFormat', function(value) {
        if (!value) return 0;
        value = parseInt(value);
        var num = parseFloat((value / 10000).toFixed(1));
        var standard = parseFloat((value / 10000).toFixed(0));
        if (num == standard) {
            num = standard;
        }
        if (value <= 999) {
            return value;
        } else if (value > 9999 && value < 11000) {
            return '1万';
        } else if (value >= 11000) {
            return num + '万';
        } else {
            return value;
        }
    });

    var app = new Vue({
        el:'#J_app',
        router: router,
        data: {
            animate: 'slide-fade-left'
        },
        watch: {
            '$route': function(to, from) {
                console.log('hello');
            }
        },
        computed: {},
        mounted:function () {
            $(".J_empty_holder").hide();
        },
        methods: {
            /***  =======  动画分割线  ============ */
            beforeEnter: function (el) {
            // ...
            },
            // 当与 CSS 结合使用时
            // 回调函数 done 是可选的
            enter: function (el, done) {
                // ...
            },
            afterEnter: function (el) {
                // ...
            },
            enterCancelled: function (el) {
                // ...
            },
        
            // --------
            // 离开时
            // --------
        
            beforeLeave: function (el) {
                // ...
            },
            // 当与 CSS 结合使用时
            // 回调函数 done 是可选的
            leave: function (el) {
                // ...
            },
            afterLeave: function (el) {
                // ...
            },
            // leaveCancelled 只用于 v-show 中
            leaveCancelled: function (el) {
                // ...
            }
        }
    });

})()


