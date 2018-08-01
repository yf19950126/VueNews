<template>
  <div class="all">
    <div class="header">
        <router-link to="/user" class="backed">
          <i class="fa fa-chevron-left"></i>
          <span>返回</span>
        </router-link>
        <span class="my">简讯@写文章</span>
      </div>
    <div class="all-1">
      <label for="">标题</label>
      <input v-model="title" type="text">
    </div>
    <div class="all-1">
      <label for="">作者</label>
      <input v-model="author" type="text">
    </div>
    <div class="all-3">
      <div class="img">
        <img height="100%" width="100%" id="showImg" src="" alt="">
      </div>
      <a class="file">上传图片
        <input class="change" @change="showImg(this)" ref="img" type="file" value="选择图片"  name="img"><br>
      </a>
    </div>
    <div class="all-4">
      <textarea v-model="content" name="" id="" cols="30" rows="10"></textarea>
    </div>
    <button @click="submit">发表</button>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data(){
    return{
      title:'',
      author:'',
      content:''
    }
  },
  mounted(){
    let username = document.cookie.split('=')[1]
    if (!username) {
      this.$router.push('/login')
    }
  },
  methods:{
    submit(){
      let author = this.author;
      var newsrc = document.getElementById('showImg').src;
      let title = this.title;
      let content = this.content;
      let obj = {
        author,
        title,
        content,
        img:newsrc
      }
      console.log(obj)      
      if (obj.title != '' && obj.author != '' && obj.content != '' && obj.img != '') {
          axios.post('/users/push',qs.stringify(obj)).then(res=>{
          console.log(res.data)
          if (res.data.status === 0) {
            alert(res.data.message);
            this.$router.push('/pipper1')
          }
        })
      }else{
        alert('您的输入有空！')
      }
     
      
    },
    showImg(){
      let reads= new FileReader();
      let f = this.$refs.img.files[0];
      reads.readAsDataURL(f);
      reads.onload = function (e) {
          document.getElementById('showImg').src=this.result;
          console.log(document.getElementById('showImg'))
      };
    }
  }
}
</script>
<style scoped>
 .header{
    width: 100%;
    height: 50px;
    background-color: #f85959;
    margin-bottom: 50px;
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
.all{
background-color: #f9f4e1;
height: 100%;
}
input{
  background-color: #f9f4e1;
}
.all-1{
  margin: 10px auto 10px auto;
  width: 80%;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  border: 1px solid rgba(0, 0, 0, 15%)
}
.all-1 input{
  outline: none;
}
.all-3{
  width: 100%;
  /* height: 200px; */
  position: relative;
  margin-bottom: 20px;
}
.all-3 .img{
  /* height: 80%; */
  width: 60%;
  margin: 0 auto;
  /* border: 1px solid rgba(0, 0, 0, 35%) */
}
.file{
    height: 20px;
    line-height: 20px;
    position: absolute;
    left: 50%;
    margin-left: -30px;
    text-decoration: none;
    color: black;
    font-size: 20px;
}
.change{
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
}
.all-4{
  text-align: center;
}
.all-4 textarea{
  margin-top: 20px;
  width: 80%;
  border: 1px solid rgba(0, 0, 0, 15%);
  outline: none;
}
button{
  display: block;
  margin: 10px auto;
  border: none;
  padding: 10px 20px;
}
</style>

