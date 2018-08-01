<template>
    <div>
      <div class="header">
        <router-link to="/user" class="backed">
          <i class="fa fa-chevron-left"></i>
          <span>返回</span>
        </router-link>
        <span class="my">简讯@我的发表</span>
      </div>
      <router-link to="/login">
        <p class="no-login" v-show="isLogin">您还没有登录？去登录！</p>
      </router-link>
      <div v-for="(v,i) in List" :key="i" class="article" >
          <router-link :to="{
            path:'pipper',
            params: {        //要传的参数
                list:v   
            },
            query: {
                list:v  
            }
          }">
            <div class="image">
              <img :src="v.img" alt="">
            </div>
            <div class="title">{{v.title}}</div>
          </router-link>
          <button @click="Delete(v._id)">删除</button>
      </div>
    </div>
</template>

<script>
import axios from "axios"
    export default {
        name: "fb",
        data(){
          return{
            List:{},
            isLogin:false
          }
      },
      mounted(){
         let username = document.cookie.split('=')[1]
        if (username) {
          this.getData();
        }else{
          this.isLogin = true;
        }
      },
      methods: {
        getData() {
          this.$http.post('/users/pushlist').then(res => {
            this.List = res.data;
            console.log(res.data[0]);
          })
        },
        Delete:function (_id) {
          this.$confirm('提示:此操作将删除该文章，是否删除？','删除文章',{
            confirmButtonText: '确定', //确认按钮
            cancelButtonText: '取消', //取消按钮
            type: 'warning', //按钮类型
          }).then(()=>{
            axios.post('/users/deleteArt',{
              _id:_id
            }).then(res=>{
              this.$message({
                type:'success',
                message:res.data.message
              })
              if(res.data.message=="删除成功"){
                this.getData();
              }
            })
          }).catch(()=>{
            this.$message({
              type:'info',
              message:'已取消操作'
            })
          })
        }
      }
    }
</script>

<style scoped>
.no-login{
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -65px;
  height: 50px;
  width: 200px;
  margin-left: -100px;
  text-align: center;
  line-height: 50px;
  border: 1px solid rgba(0, 0, 0, 15%)
}
  .header{
    width: 100%;
    height: 50px;
    background-color: #f85959;
  }
  .backed{
    display: inline-block;
    width: 20%;
    line-height: 50px;
    height: 50px;
    color: white;
    padding-left: 10px;
  }
  .my{
    display: inline-block;
    width:50%;
    text-align: center;
    color: white;
  }
  .article{
    width: 100%;
    height: 80px;
    border: 1px solid #ccc;
    line-height: 50px;
    position: relative;
    margin-top: 10px;
  }
  .image{
    width: 90px;
    height:80px;
    margin-left: 2%;
  }
  img{
    width: 100%;
    height: 100%;
  }
 .title{
   width: 200px;
   height: 60px;
   line-height: 30px;
  position: absolute;
  top:15px;
  left:30%;
 }
 .article button{
   position: absolute;
   z-index: 999;
   padding: 5px 20px;
   top:30px;
   right:10px;
   border: none;
   outline: none;
   background: #ba1c0b;
   color:white;
 }
</style>
