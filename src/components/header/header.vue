<template>
<header  class="mint-header header">
   <div class="mint-header-button is-left">
       <button data-v-70fccefc="" class="mint-button left mint-button--default mint-button--normal">
         <!----> <router-link to="/user" class="mint-button-text"><img data-v-70fccefc="" src="../../assets/account.png" alt="" /></router-link></button>
   </div>
   <div class="mint-header-button is-center">
    <button data-v-70fccefc="" class="mint-button center mint-button--default mint-button--normal">
        <label class="mint-button-text center1">简讯</label>
     </button>
   </div>
   <div class="mint-header-button is-right">
        <router-link
              :to=" {path:'/search'} "
              >
            <button data-v-70fccefc="" class="mint-button right mint-button--default mint-button--normal">
            <!----> <label class="mint-button-text"><img data-v-70fccefc="" src="https://s3.pstatp.com/growth/mobile_list/image/feed_ic_search_normal@3x_0f198e56.png" alt="" /></label></button>
        </router-link>
   </div>

  </header>
</template>
<script>
	export default {
	  data() {
	    return {};
	  }
	}
</script>
<style lang='stylus' scoped>
    .header
        width: 100%;
        position: fixed;
        top 0px
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background: #f85959;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 14px;
        height: 40px;
        line-height: 1;
        padding: 0 10px;
        text-align: center;
        white-space: nowrap;
        z-index 1
        .mint-header-button
            -webkit-box-flex: .5;
            -ms-flex: .5;
            flex: .5;
            .mint-button
                background-color: transparent;
                border: 0;
                -webkit-box-shadow: none;
                box-shadow: none;
                color: inherit;
                display: inline-block;
                padding: 0;
                font-size: inherit;
        .is-left
            text-align left
            img
                width 20px
        .is-right
            text-align right
            img
                width 20px
        .is-center
            text-align center
            .center1
                img
                    width 68px
            .center2
                img
                    width 16px

</style>
