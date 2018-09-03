//横向商品组件
(function() {
    var tpl = '<div class="hor-product-wrapper fui-uti-hor-mid fui-grid J_need_exposure">'+
        '          <div class="product-images-mask" @click="gotoProduct()"></div>'+
        '          <img @click="gotoProduct()" class="product-images fui-span0 J_lazyimg" v-bind:data-original="product.img" src="//static2.51fanli.net/common/images/loading/grey_spacer.png" alt="">'+
        '          <div class="product-desc fui-span1">'+
        // '              <fav-item :item=product></fav-item>' +
        '              <p class="product-name fui-uti-nowrap-line" @click="gotoProduct()">{{product.title}}</p>'+
        '              <p class="product-recommend bold fui-uti-nowrap-line" @click="gotoProduct()">{{product.recommend_info}}</p>'+
        '              <div class="product-price" @click="gotoProduct()">'+
        '                  <p class="product-discount">{{priceText}}<span class="money-symbol bold">￥</span><span class="money-value bold">{{product.finalPrice}}</span>'+
        '                  </p>'+
        '                  <p class="product-coupon fui-uti-hor-mid" :class="product.isPromotion!=0? \'quan\' : \'fan\'"><i class="radius" v-if="product.isPromotion==0"></i><span>{{couponText}}</span>'+
        '                  </p>'+
        '              </div>'+
        '              <div class="product-info" @click="gotoProduct()">'+
        '                  <p>{{product.shopName}}￥{{product.shopPrice}}</p>'+
        '                  <p v-show="product.sales>0">月销{{product.sales | thousandFormat}}</p>'+
        '              </div>'+
        '          </div>'+
        '      </div>';

    Vue.component('hor-product',{
        props: ['item'],
        template: tpl,
        data: function() {
            return {
                product: this.item || {
                    pid:0,
                    id :0,
                    img: null,
                    title: '标题',
                    shopName: '商城名',
                    shopPrice: '100',
                    sales : 100,
                    isPromotion: 0,
                    finalPrice: 110,
                    itemPromotion:{discount_price: "938", coupon_price: "160"},
                    itemPoint: 120,
                    tips: 'tips',
                    link: null
                }
            }
        },
        methods: {
        },
        computed:{
            couponText: function() {
                // 是否是满减
                if (this.product.isPromotion) {
                    if (parseInt(this.product.itemPromotion.discount_price) > parseInt(this.product.shopPrice)) {
                        return "满"+this.product.itemPromotion.discount_price+"减"+this.product.itemPromotion.coupon_price;
                    } else {
                        return this.product.tips;
                    }
                } else {
                    return "返"+this.product.itemPoint;
                }
            },
            priceText: function() {
                 // 是否是满减
                if (this.product.isPromotion!=0) {
                    if (parseInt(this.product.itemPromotion.discount_price) > parseInt(this.product.shopPrice)) {
                        return ""
                    } else {
                        return "券后";
                    }
                } else {
                    return "返后"
                }
            }
        },
        mounted: function() {
            $(this.$el).find(".J_lazyimg").lazyload({ threshold : 400 });
        }
    });
})();