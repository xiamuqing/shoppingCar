define(function(require, exports, module) {
    let $ = require('jquery');
    let template = require('template');
    //所有商品
    let goods = require('goodsDatas');
    //加入购物车的商品
    let carsGoods = require('userCar');

    let datas = goods.datas.goods;
    let goodList = carsGoods.datas.User.shoppingcar;
    //加入购物车功能
    function addGoods(good) {
        var isExist = false;
        var sum = 0;
        //console.log(carsGoods.datas.User.shoppingcar);
        for (var i = 0; i < goodList.length; i++) {
            if (goodList[i]['id'] === Number(good)) {
                goodList[i]['count']++;
                isExist = true;
            }
        }
        if (!isExist) {
            goodList[goodList.length] = {
                'id': Number(good),
                'count': 1
            }
        }
        //返回购物车中商品数量
        for (var i = 0; i < goodList.length; i++) {
            sum += goodList[i]['count'];
        }
        return sum;
    }

    exports.drawing = function() {
        $('#main').html('');
        for (let i = 0; i < datas.length; i++) {
            let html = template('goodsTpl', datas[i]);
            $('#main').append(html);
        }
        $('.buy').on('click', function(e) {
            let _this = $(e.target);
            let sum = addGoods(_this.attr('data-num'));
            carsGoods.datas.User.count = sum;
            $('#goodQuantity').text(sum);
        })
        $('#goodQuantity').text(carsGoods.datas.User.count);
    }

})
