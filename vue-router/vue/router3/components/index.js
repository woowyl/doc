
(function(){
    //首页组件
    var tpl = '<div class = "tab-div"><div class = "content">'+
              '   <h2>主页</h2>'+
              '   <ul class = "tab">'+
              '     <li @click = "tabClick(1)"><router-link to="/index/Tab1">Tab1</router-link></li>'+
              '     <li @click = "tabClick(2)">tab2</li>'+
              '   </ul>'+
              '</div><br>'+
              '<div class="detail">'+
              '   <router-view></router-view>'+
              '</div></div>'



    Vue.component('index', {
        template: tpl,
        methods:{
            tabClick: function(item) {
                console.log(item);
                if (item == 2)
                  router.push('Tab2')
            }
        }
    });
})();
