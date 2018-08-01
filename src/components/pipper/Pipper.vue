<template>
  <div>
    <router-link to="/indexList/__all__" class="backed">
       <i class="fa fa-chevron-left"></i>
       <span>返回</span>
     </router-link>
     <div  class="all">
       <p class="title">{{arr.title}}</p>
      <div class="author">
        <span>作者:</span>
        <p>{{arr.author}}</p>
      </div>
      <div style="width:380px;height:300px;margin:0 auto;">
         <img style="width:100%;height:100%" :src="arr.img" alt="">
       </div>
       <div style="width:100%;height:20px"></div>
       <P class="content">{{arr.content}}</P>
       
     </div>
  </div>
</template>

<script>
import axios from "axios"
  export default {
    name: "pipper",
     data(){
          return{
            List:{},
            list:{},
            arr:{}
          }
      },
      mounted(){
        this.getData();
        this.arr = this.$route.query.list
        console.log(this.$route.query)
      },
      methods: {
        getData() {
          this.$http.post('/users/pushlist').then(res => {
            this.List = res.data;
            var args = this.List
            this.list = args[args.length-1]
            console.log(this.list);
          })
        },
      }
  }
</script>

<style scoped>
.all{
  padding: 10px;
}
  .backed{
    display: inline-block;
    width: 100%;
    line-height: 50px;
    height: 50px;
    background-color: #f85959;
    color: white;
    padding-left: 15px;
  }
  .title{
    width: 100%;
    height: 60px;
    line-height: 30px;
    font-size: 25px;
    padding: 0;
    margin-top: 15px;
    font-weight: bold;  
    margin-bottom: 15px;
  }
  .author{
    display: inline;
    font-size: 20px;
  }
  .author p{
    display: inline-block;
    margin-bottom: 15px;
  }
  .content{
   font-size: 18px;
   text-indent: 2em;
   font-family: 楷体;
  }
</style>

