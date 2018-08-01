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
        <span>@简讯 修改个人信息</span>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名称" prop="username" >
            <el-input type="username" disabled v-model="ruleForm2.username" auto-complete="off" placeholder="请输入2-6位的用户名">
            </el-input>
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
          <div class="button">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">立即修改</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import {isvalidPhone} from '../../validate'
// import func from './vue-temp/vue-editor-bridge';
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
            {required:true,message:'请输入昵称',tigger:'blur'},
            {min:2,max:6,message:'请输入合法的昵称',tigger:'blur'},
          ],
          pass: [
            { required:true,validator: validatePass, trigger: 'blur' }
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
    mounted(){
        let username = document.cookie.split("=")[1]
        if (!username) {
          this.$router.push('/login')
        }
        this.getUsers()
    },
    methods: {
      getUsers(){
          axios.get('/users/list').then(res=>{
            this.ruleForm2 = res.data
        })
      },
      submitForm:function(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            //提交
            axios.post('/users/update',this.ruleForm2)
              .then(response=>{
                  var res = response.data;
                  if(res.status == '0'){
                       this.$message.success('修改个人信息成功');
                      this.getUsers();
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
      }
    }
  }
</script>

<style scoped>
  .background{
    width: 100%;
    height: 780px;
    background-image: url("../../assets/setting.png");
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
    width: 90%;
    position: absolute;
    top:320px;
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
    /*background-color: red;*/
  }
  .button{
    width: 100%;
    margin: 0 auto;
    position: relative;
    left: 30px;
  }
  .button button{
    text-align: center;
    float: left;
    margin-left: 30px;
  }
</style>

