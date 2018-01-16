define(function(require, exports, module) {
    let hash;

    //打开页面默认进入商品页，渲染商品
    var goodsJS = require('goods');
    var shoppingcarJS = require('shoppingcar');
    goodsJS.drawing();
    window.onhashchange = function() {
        hash = window.location.hash == '' ? 'goods' : window.location.hash.substring(2);
        //切换a标签的样式
        $('#' + hash).addClass('select').siblings('a').removeClass('select');
        if (hash == 'goods') {
            goodsJS.drawing();

        } else if (hash == 'shoppingcar') {
            shoppingcarJS.drawing();
        }

    }


})
