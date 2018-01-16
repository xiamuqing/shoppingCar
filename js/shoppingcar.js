define(function(require, exports, module) {
    var $ = require('jquery');
    let template = require('template');
    //所有商品
    let goods = require('goodsDatas');
    //加入购物车的商品
    let carsGoods = require('userCar');

    //购物车中商品
    var carGoodList = carsGoods.datas.User.shoppingcar;
    let goodsList = goods.datas.goods;
    let carCount = carsGoods.datas.User.count;

    //展示页面
    exports.drawing = function() {
        $('#main').html('');
        let html = template('shoppingcarTpl');
        $("#main").append(html);
        for (var i = 0; i < carGoodList.length; i++) {
            for (var j = 0; j < goodsList.length; j++) {
                if (carGoodList[i].id == goodsList[j].id) {
                    goodsList[j].count = Number(carGoodList[i].count);
                    let list = template('carGoodListTpl', goodsList[j]);
                    $("#itemList").append(list);
                }
            }
        }
        calculateCAP();
    }

    //修改商品数量
    function alter(num, target) {
        let count = Number($(target).siblings('.buyNum').text());
        let price = $(target).parent().siblings('.price').text().substr(1);
        if (num == -1 && count == 0) {
            return;
        }
        let newCount = count + num;
        $(target).siblings('.buyNum').text(newCount);
        $(target).parent().siblings('.totalPrices').text(newCount * Number(price));

        calculateCAP();

        //修改数据表中的商品数量
        let id = Number($(target).attr('data-id'));
        //carsGoods.datas.User.shoppingcar[id].count += num;
        for (var i = 0; i < carGoodList.length; i++) {
            if(id == carGoodList[i].id){
                carGoodList[i].count += num;
                break;
            }
        }
    }
    //委托事件
    $('#main').on('click', '.sub', function(e) {
        alter(-1, e.target);
    })
    $('#main').on('click', '.add', function(e) {
        alter(1, e.target);
    })

    //计算数量和价格
    function calculateCAP() {
        let totalCount = 0;
        let totalPrice = 0;
        let goodsList = $('#itemList').children('tr');
        for (let i = 0; i < goodsList.length; i++) {
            totalCount += Number($($('.buyNum')[i]).text());
            totalPrice += Number($($('.totalPrices')[i]).text().substring(1));
        }
        $('#totalGoods').text(totalCount);
        $('#totalPrice').text('¥' + totalPrice);
        $('#goodQuantity').text(totalCount);
        carsGoods.datas.User.count = totalCount;
    }

    //删除商品
    $('#main').on('click', '.delete', function(e) {
        $(e.target).parent().parent().remove();
        calculateCAP();

        //删除数据文件中的商品
        let id = Number($(e.target).attr('data-id'));
        for (var i = 0; i < carGoodList.length; i++) {
            if(id == carGoodList[i].id){
                carGoodList.splice(i,1);
                break;
            }
        }
    })
})
