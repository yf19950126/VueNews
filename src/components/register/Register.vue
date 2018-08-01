<template>
  <div class="login">
    <div class="background">
      <div class="back">
       <router-link to="/user">
         <i class="fa fa-chevron-left"></i>
         <span>返回</span>
       </router-link>
      </div>
      <div class="form">
        <span>加入简讯 开启生活的美</span>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名称" prop="username" >
            <el-input type="username" v-model="ruleForm2.username" auto-complete="off" placeholder="请输入2-6位的用户名(一经注册，不得修改)"></el-input>
          </el-form-item>
           <el-form-item label="我的昵称" prop="name" >
            <el-input type="name" v-model="ruleForm2.name" auto-complete="off" placeholder="请输入2-6位的昵称"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input type="phone" v-model="ruleForm2.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱地址" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
            <el-input v-model="ruleForm2.email" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item label="用户年龄" prop="age">
            <el-input v-model.number="ruleForm2.age" placeholder="请输入您的年龄"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <div class="button">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">立即注册</el-button>
              <el-button @click="resetForm('ruleForm2')">重置内容</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="go-log">
        <span>已有账号？</span>
        <router-link to="/login">去登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import {isvalidPhone} from '../../validate.js'
  export default {
    name: "register",
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validPhone=(rule, value,callback)=>{
        if (!value){
          callback(new Error('请输入电话号码'))
        }else  if (!isvalidPhone(value)){
          callback(new Error('请输入正确的11位手机号码'))
        }else {
          callback()
        }
      }
      return {
        ruleForm2: {
          username:'', //用户名
          name:'',
          pass: '',
          checkPass: '',
          tel:'',
          age: '',
          email: ''
        },
        rules2: {
          username: [
            {required:true,message:'请输入用户名',tigger:'blur'},
            {min:2,max:6,message:'请输入合法的用户名',tigger:'blur'},
          ],
          name: [
            {required:true,message:'请输入您的昵称',tigger:'blur'},
            {min:2,max:6,message:'请输入合法的昵称',tigger:'blur'},
          ],
          pass: [
            { required:true,validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required:true,validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            {required:true, validator: checkAge, trigger: 'blur' }
          ],
          phone: [
            { required: true, trigger: 'blur', validator: validPhone }//这里需要用到全局变量
          ]
        }
      };
    },
    methods: {
      submitForm:function(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            //提交
            axios.post('/users/register',this.ruleForm2)
              .then(response=>{
                var res = response.data;
                if(res.status == '0'){
                  //显示成功的消息提示
                  this.$message.success('注册成功');
                  this.backLogin();
                  this.$refs[formName].resetFields();
                }else{
                  //返回了错误的提示消息的时候
                  this.$message.error(res.message);
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
      backLogin:function () {
        this.$router.push({
          path:"/login"
        })
      }
    }
  }
</script>

<style scoped>
  .background{
    width: 100%;
    height: 900px;
    background-image: url("../../assets/login3.png");
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
    top:280px;
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
    margin-bottom: 5px;
  }
  .button{
    width: 100%;
    margin: 60px auto;
  }
  .button button{
    text-align: center;
    float: left;
    margin-left: 11px;
  }
  .go-log{
    position: absolute;
    top:775px;
    left: 130px;
  }
</style>

