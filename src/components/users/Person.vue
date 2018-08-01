<template>
  <div class="my">
     <div class="background">
       <div class="back">
         <router-link to="/indexList/__all__" >
           <i class="fa fa-chevron-left"></i>
           <span>返回简讯</span>
         </router-link>
       </div>
       <div class="user" v-if="show1">
         <img src="../../assets/login2.png" alt="">
       </div>
       <div v-if="show" class="user1">
         <span>{{name}}</span>
         <a href="javascript:void(0)"  @click="logOut">退出</a>
       </div>
       <div class="login-reg" v-show="show2">
         <router-link to="/register">注册&#x3000;/</router-link>
         <router-link to="/login">&#x3000;登录</router-link>
       </div>
       <div class="my-like">
        <router-link to="/like">
          <i class="fa fa-podcast"></i>
          <span>我的收藏</span>
          <i class="fa fa-chevron-right"></i>
        </router-link>
       </div>
       <div class="my-connect">
         <router-link to="/connect">
           <i class="fa fa-star"></i>
           <span>我的关注</span>
           <i class="fa fa-chevron-right"></i>
         </router-link>
       </div>
       <div class="my-comment">
         <router-link to="/comment">
           <i class="fa fa-list"></i>
           <span>我的评论</span>
           <i class="fa fa-chevron-right"></i>
         </router-link>
       </div>
       <div class="my-fb">
         <router-link to="/fb">
           <i class="fa fa-edit"></i>
           <span>我的发表</span>
           <i class="fa fa-chevron-right"></i>
         </router-link>
       </div>
       <div class="my-setting">
         <router-link to="/setting">
           <i class="fa fa-cog"></i>
           <span>我的信息</span>
           <i class="fa fa-chevron-right"></i>
         </router-link>
       </div>
       <div class="my-setting">
         <router-link to="/write">
           <i class="fa fa-pencil"></i>
           <span>写文章</span>
           <i class="fa fa-chevron-right"></i>
         </router-link>
       </div>
     </div>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    name: "user",
    data(){
      return{
        username:"",
        show1:true,
        show:false,
        show2:true,
        name:''
      }
    },
    mounted:function(){
      axios.get('/users/list').then(res=>{
            this.name = res.data.name
        })
      //  判断页面cookie
      if(document.cookie != ""){
        axios.post('/users/cookie').then(res=>{
          console.log(res.data);
          this.username=res.data.data;
          this.show1=false;
          this.show= true;
          this.show2 = false
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    methods:{
      logOut: function(){
        axios.post("/users/logout").then((response)=>{
          let res = response.data;
          if(res.status=="0"){
            this.show1 = true;
            this.show = false;
            this.show2 = true;
          }
        })
      },
    }
  }
</script>

<style scoped>
.my{
  margin: 0 auto;
  background-color: #f9f4e1;
  height: 100%;
}
.background{
  width: 100%;
  height: 230px;
  background-image: url("../../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
  .background i{
    font-size: 20px;
  }
  .back{
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .back a{
    color: grey;
  }
  .back i{
    margin-top: 10px;
    margin-left: 10px;
  }
  .user{
    width: 80px;
    height: 80px;
    margin: 15px auto;
  }
.user1{
  background-color: #f9f4e1;
  width: 100px;
  border-radius: 50%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: 40px auto;
}
.user1 a{
  color: gray;
}
  .user img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.7;
  }
  .login-reg{
    text-align: center;
    margin-top: 40px;
  }
  .login-reg a{
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
  .login-reg a:hover{
    color: #ba1c0b;
  }
  .my-like{
    margin-top: 60px;
    color: #333;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
  }
  .my-like a,.my-setting a,.my-fb a,.my-connect a,.my-comment a{
    color: #333;
  }
  .my-like span{
    margin-left: 20px;
    font-family: 楷体;
  }
.my-like i:first-child{
  margin-left: 30px;
  color: #ea6f5a;
  font-size: 18px;
}
  .my-like i:last-child{
    float: right;
    margin-right: 70px;
    color: #ccc;
    margin-top: 15px;
    font-size: 18px;
  }
.my-connect{
  color: #333;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
.my-connect span{
  margin-left: 20px;
  font-family: 楷体;
}
.my-connect i:first-child{
  margin-left: 30px;
  color: #ea6f5a;
  font-size: 18px;
}
.my-connect i:last-child{
  float: right;
  margin-right: 70px;
  color: #ccc;
  margin-top: 15px;
  font-size: 18px;
}
.my-comment{
  color: #333;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
.my-comment span{
  margin-left: 20px;
  font-family: 楷体;
}
.my-comment i:first-child{
  margin-left: 30px;
  color: #ea6f5a;
  font-size: 18px;
}
.my-comment i:last-child{
  float: right;
  margin-right: 70px;
  color: #ccc;
  margin-top: 15px;
  font-size: 18px;
}
.my-fb{
  color: #333;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
.my-fb span{
  margin-left: 20px;
  font-family: 楷体;
}
.my-fb i:first-child{
  margin-left: 30px;
  color: #ea6f5a;
  font-size: 18px;
}
.my-fb i:last-child{
  float: right;
  margin-right: 70px;
  color: #ccc;
  margin-top: 15px;
  font-size: 18px;
}
.my-setting{
  color: #333;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
.my-setting span{
  margin-left: 20px;
  font-family: 楷体;
}
.my-setting i:first-child{
  margin-left: 30px;
  color: #ea6f5a;
  font-size: 18px;
}
.my-setting i:last-child{
  float: right;
  margin-right: 70px;
  color: #ccc;
  margin-top: 15px;
  font-size: 18px;
}
</style>
