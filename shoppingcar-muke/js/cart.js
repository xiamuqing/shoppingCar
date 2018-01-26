var vm = new Vue({
    el: '#app',
    data: {
        productList: {},
        totalMoney: 0,
        checkFlag: false,
        totalMoney: 0,
        delFlag:false,
        curproduct:''
    },
    filters: {
        formatMoney: function(value) {
            return "￥" + value.toFixed(2);
        }
    },
    mounted: function() {
        this.cartView();
    },
    methods: {
        cartView: function() {
            this.$http.get("data/cartData.json", { "id": 123 }).then(res => {
                //箭头函数的好处：this直接指向外层，内层无this
                this.productList = res.data.result.list;
            })
        },
        changeNum: function(product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity <= 0) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function(item) {
            if (typeof item.checked == 'undefined') {
                //使用vue.set设置属性中没有的字段
                //全局注册
                //Vue.set(item,"checked",true);
                //局部注册
                this.$set(item, "checked", true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function() {
            this.checkFlag = !this.checkFlag;
            if (this.checkFlag) {
                this.productList.forEach((item, index) => {
                    if (typeof item.checked == 'undefined') {
                        this.$set(item, "checked", true);
                    } else {
                        item.checked = true;
                    }
                })
            } else {
                this.productList.forEach((item, index) => {
                    item.checked = false;
                })
            }
            this.calcTotalPrice();
        },
        calcTotalPrice: function() {
            this.totalMoney = 0;
            this.productList.forEach((item, index) => {
                if (item.checked) {
                    this.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        },
        delConfirm:function(item){
            this.delFlag = true;
            this.curproduct = item;
        },
        delProduct:function(){
            var index = this.productList.indexOf(this.curproduct);
            this.productList.splice(index,1);
            this.delFlag = false;
            this.calcTotalPrice();
        }
    }
})

Vue.filter("money", (value, type) => {
    return "￥" + value.toFixed(2) + type;
});