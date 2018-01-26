new Vue({
    el: '.container',
    data: {
    	limitNum:3,
        addressList: [],
        currentIndex:0,
        shippingMethod:1
    },
    mounted: function() {
        this.$nextTick(function() {
            this.getAddressList();
        });
    },
    computed:{
    	filterAddress:function(){
    		return this.addressList.slice(0,this.limitNum);
    	}
    },
    methods: {
        getAddressList: function() {
            this.$http.get('data/address.json').then(res => {
                if (res.data.status == '0') {
                    this.addressList = res.data.result;
                }
            });
        },
        loadMore:function(){
        	if(this.limitNum ==3){
        		this.limitNum = this.addressList.length;
        	}else{
        		this.limitNum =3;
        	}
        },
        setDefault:function(id){
        	this.addressList.forEach(function(item,index){
        		item.isDefault = false;
        		if(item.addressId ==id){
        			item.isDefault = true;
        		}
        	})
        }
    }
})