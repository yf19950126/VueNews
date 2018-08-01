<template>
    <div>
      <div class="header">
        <router-link to="/user" class="backed">
          <i class="fa fa-chevron-left"></i>
          <span>返回</span>
        </router-link>
        <span class="my">简讯@我的关注</span>
      </div>
      <router-link to="/login">
        <p class="no-login" v-show="isLogin">您还没有登陆？去登陆！</p>
      </router-link>
     <div v-for="(list,i) in List" :key="i" class="content">
       <img :src="list.url" alt="">
       <p>{{list.name}}</p>
       <button @click="Delete(list._id)">取消关注</button>
     </div>
    </div>
</template>

<script>
  import axios from "axios"
    export default {
        name: "connect",
      data(){
          return{
            List:{},
            isLogin:false
          }
      },
      mounted(){
        let username = document.cookie.split("=")[0]
        if (username) {
          this.getData();
        } else{
          this.isLogin = true;
        }
      },
      methods:{
        // 从后台数据库获取关注列表
        getData(){
          this.$http.post('/users/list').then(res=>{
            this.List = res.data;
          })
        },
        Delete:function (_id) {
          this.$confirm('提示:此操作将取消关注该作者，是否取消关注？','取消关注',{
            confirmButtonText: '确定', //确认按钮
            cancelButtonText: '取消', //取消按钮
            type: 'warning', //按钮类型
          }).then(()=>{
            axios.post('/users/deleteUsers',{
              params:{
                _id:_id
              }
            }).then(res=>{
              this.$message({
                type:'success',
                message:res.data.message
              })
              if(res.data.message=="取消关注成功"){
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
  .content{
    width: 100%;
    height: 80px;
    border-bottom:1px solid #ccc ;
    position: relative;
  }
  .content img{
    display: inline-block;
    width: 15%;
    height: 70%;
    border-radius: 50%;
    margin:12px 0 0 15px ;
  }
  .content p{
    width: 40%;
    height: 80px;
    font-size: 15px;
    text-align: center;
    float: right;
    font-weight: bold;
    font-family: 楷体;
    margin-right: 160px;
    line-height: 80px;
  }
  .content button{
    width: 80px;
    height: 30px;
    position: absolute;
    top: 26px;
    right: 7%;
    outline: none;
    background-color: #d43d3d;
    color: white;
    font-size: 14px;
    border: none;
  }
</style>
