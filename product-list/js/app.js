//项目入口

(function() {

    var router = new VueRouter({
        routes: [
            {
                path: '/:category',
                components: {
                    template: '',
                    props: []
                }
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
    
        },
        computed: {},
        mounted:function () {
            
        },
        methods: {
    
        }
    });

})()


