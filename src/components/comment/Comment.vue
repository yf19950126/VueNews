<template>
    <div>
      <div class="header">
        <router-link to="/user" class="backed">
          <i class="fa fa-chevron-left"></i>
          <span>返回</span>
        </router-link>
        <span class="my">简讯@我的评论</span>
      </div>
      <router-link to="/login">
        <p class="no-login" v-show="isLogin">您还没有登录？去登录！</p>
      </router-link>
      <div v-for="(list,i) in List"  class="content" :key="i">
        <router-link :to="'/content/' + list.tid">
          <img :src="list.url" alt="">
          <span>{{list.title}}</span>
        </router-link>
          <div class="com">
            <p>我的评论:</p>
            <div style="width:100%;height:8px"></div>
          <p>{{list.content}}</p>
          <button @click="detele(list._id)">删除评论</button>
          </div>
      </div>
    </div>
</template>

<script>
  import axios from "axios"
    export default {
        name: "comment",
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
          this.$http.post('/users/CommentL').then(res => {
            this.List = res.data;
            console.log(res.data);
          })
        },
        detele:function (_id) {
          this.$confirm('提示:此操作将删除该评论，是否删除？','删除评论',{
            confirmButtonText: '确定', //确认按钮
            cancelButtonText: '取消', //取消按钮
            type: 'warning', //按钮类型
          }).then(()=>{
            axios.post('/users/Comments',{
              params:{
                _id:_id
              }
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
              message:'已取消删除'
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
    height: 100%;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    position: relative;
    padding: 10px;
  }
  .content a{
    width:100%;
    height: 80px;
    color: #333;
    font-family: 楷体;
    font-weight: bold;
  }
  .content a span{
    float: right;
    width: 55%;
    margin-right: 23%;
    line-height: 35px;
    margin-top: 8px;
  }
  .content img{
    width: 80px;
    height: 80px;
  }
  .com{
    width: 100%;
    height: 100%;
    font-size: 16px;
    margin-bottom: 20px;
    margin-top:20px;
    font-family: 楷体
  }
  .com P:first-child{
    font-weight: bold;
    font-size: 18px;
  }
  .com p:last-child{
    margin-left: 21%;
  }
  .com button{
    margin-left: 80%; 
    border: none;
    outline: none;
    background-color: #ba1c0b;
    color: white;
  }
</style>
