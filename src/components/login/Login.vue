<template>
  <div class="login">
    <div class="background">
      <div class="back">
        <router-link to="/user">
          <i style="color: white" class="fa fa-chevron-left"></i>
          <span style="color: white">返回</span>
        </router-link>
      </div>
      <div class="form">
        <span>登录简讯 发现你的新闻</span>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名称" prop="username" >
            <el-input type="username" v-model="ruleForm2.username" auto-complete="off" placeholder="请输入2-6位的用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="button">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">立即登录</el-button>
              <el-button @click="resetForm('ruleForm2')">重置内容</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="go-reg">
        <span>没有账号？</span>
        <router-link to="/register">去注册</router-link>
        <p>忘记密码？</p>
      </div>
      <div style="position: absolute;bottom: 100px;left:45px;color: grey">
        <span>@版权所有:中北大学14140Y03班&#x3000;|&#x3000;帆帅</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios  from "axios"
  export default {
    name: "login",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          username:'', //用户名
          pass: '',
        },
        rules2: {
          username: [
            {required:true,message:'请输入用户名',tigger:'blur'},
            {min:2,max:16,message:'请输入合法的用户名',tigger:'blur'},
          ],
          pass: [
            {required:true,message:'请输入密码',tigger:'blur'},
            {min:6,max:12,message:'密码长度不合法',tigger:'blur'},
          ],
        }
      };
    },
    methods: {
      submitForm:function(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            //提交
            axios.post('/users/login',this.ruleForm2)
              .then(response=>{
                var res = response.data;
                if(res.status == 1){
                  //显示成功的消息提示
                  this.$message.success('登录成功');
                  this.backUser();
                  this.$refs[formName].resetFields();
                }else{
                  //返回了错误的提示消息的时候
                  this.$message.error(res.msg);
                }
              }).catch(err=>{
              console.log(err);
            })
          }else{
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      backUser:function () {
        this.$router.push({
          path:'/user'
        })
      }
    }
  }
</script>

<style scoped>
  .background{
    width: 100%;
    height: 745px;
    background-image: url("../../assets/login5.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .back{
    width: 100%;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }
  .back i{
    margin-top: 10px;
    margin-left: 10px;
  }
  .form{
    width: 100%;
    position: absolute;
    top:260px;
    left: -12px;
    text-align: center;
  }
  .form span{
    display: block;
    width: 100%;
    height: 50px;
    margin-left: 15px;
    font-weight: bold;
    font-size: 20px;
    line-height: 50px;
    margin-bottom: 10px;
    /*background-color: red;*/
  }
  .button{
    width: 100%;
    margin: 0 auto;
  }
  .button button{
    text-align: center;
    float: left;
    margin-left: 11px;
  }
  .go-reg{
    position: absolute;
    top:520px;
    left: 130px;
  }
  .go-reg a:hover{
    color: red;
  }
  .go-reg p{
     text-align: center;
     margin-top: 10px;
     margin-left: 15px;
  }
</style>

