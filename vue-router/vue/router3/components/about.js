
(function(){
    //首页组件
    var tpl = '<div class = "content">'+
              '   <h2>关于我</h2>'+
              '   <p>这里是关于的内容，About page!!</p>'+
              '</div>';


    Vue.component('about', {
        template: tpl
    });
})();