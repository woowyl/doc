
(function(){
    //首页组件
    var tpl = '<div class = "content">'+
              '   <h2>{{skill}}</h2>'+
              '   <p>我现在在学习{{skill}}</p>'+
              '   <p>{{skill}} 是一门编程语言，是用来定义计算机程序的形式语言。它是一种被标准化的交流技巧，用来向计算机发出指令。一种计算机语言让程序员能够准确地定义计算机所需要使用的数据，并精确地定义在不同情况下所应当采取的行动。</p>'+
              '</div>'


    Vue.component('type', {
        props: [],
        template: tpl,
        //data只执行一次
        data: function() {
            return {
                // skill :  this.$route.params.skill
            }
        },
        computed: {
            skill: function(){
               return this.$route.params.skill;
            } 
        },
        watch: {
            '$route' (to, from) {
                console.log('watch', to, from);
            }
        },
        mounted: function() {
            console.log('mounted', this.$route.params.skill);
        }

    });
})();
