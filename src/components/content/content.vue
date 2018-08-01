<template>
  <div>
    <v-title>{{listCon.title}}</v-title>
     <router-link to="/indexList/__all__" class="backed">
       <i class="fa fa-chevron-left"></i>
       <span>返回</span>
     </router-link>
    <article v-if="listCon.content"  class="article padding-side">
      <div class="article__header new-style-test-article__header">
        <h1 class="article__title">{{listCon.title}}</h1>
        <div class="new-style-test-article-author">
          <span class="avatar new-style-test-avatar">
            <img :src="avatar_url" class="avatar__image" style="transition: opacity 200ms ease; opacity: 1;">
            <span class="avatar__mask"></span>
          </span>
          <span style="display: inline-block; margin-left: 10px;">
            <div>
              <span class="new-style-test-article-author-name">{{screen_name}}</span>
              </div>
            <div>
              <span class="new-style-test-article-publish-time">{{reversedMessage}}</span>
              <span class="dot"></span>
              <span class="new-style-test-article-comment">{{listCon.comment_count}}评论</span></div>
          </span>
          <!-- 收藏按钮 -->
          <i class="fa fa-heart" @click="connect"></i>
          <!-- 关注按钮 -->
          <a href="javascript: void(0)" class="new-style-test-favor-btn" @click="add" >关注</a>
        </div>
      </div>
      <div class="article__content" style="height: auto;" v-html='listCon.content'></div>
    </article>
    <a v-else :href="listCon.url"></a>
    <div class="comment">
      <div style="margin-top:15px;margin-left:15px;width: 150px;height: 30px;border: 1px solid #ccc;border-radius:20px" @click="write">
        <i class="fa fa-edit"></i>
        写评论
      </div>
      <transition  :duration="500" name="fade">
        <el-form v-if="show" style="margin-top: 5px">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入您的评论"
            v-model="textarea" ref="content">
          </el-input>
          <el-button type="primary" style="float: right;margin-right: 35px" @click="submit">提交</el-button>
        </el-form>
      </transition>
    </div>
    <div class="top" @click="toTop">
      <p>Top</p>
    </div>
    <div class="commenteara" v-if="disapper">
      <div>用户评论:</div>
     <div v-for="list in List" class="comlist" :key="list">
        <span>{{list.username}}:</span>
        <span class="content">{{list.content}}</span>
     </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import VTitle from '@/components/title/title'
export default {
  data () {
    return {
      listCon:{},
      avatar_url:{},
      screen_name:{},
      textarea: '',
      show:false,
      articleName:"",
      articleUrl:"",
      essayTitle:'',
      essayUrl:"",
      CommentTitle:"",
      CommentUrl:'',
      List:{},
      disapper:false
    };
  },
  created(){
    this.fetchData();
  },
  components: {
    VTitle
  },
   computed: {
    // 计算属性的 getter
    reversedMessage: function (){
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();
      var diffValue = now - this.listCon.publish_time*1000;
      if(diffValue < 0){return;}
      var monthC =diffValue/month;
      var weekC =diffValue/(7*day);
      var dayC =diffValue/day;
      var hourC =diffValue/hour;
      var minC =diffValue/minute;
      var result = {}
      if(monthC>=1){
        result="" + parseInt(monthC) + "月前";
      }
      else if(weekC>=1){
        result="" + parseInt(weekC) + "周前";
      }
      else if(dayC>=1){
        result=""+ parseInt(dayC) +"天前";
      }
      else if(hourC>=1){
        result=""+ parseInt(hourC) +"小时前";
      }
      else if(minC>=1){
        result=""+ parseInt(minC) +"分钟前";
      }else
      result="刚刚";
      return result;
    }
  },
  mounted(){
      this.getData();
  },
  methods :{
      getData() {
          axios.post("/users/commentlist",{
            title:this.CommentTitle
          }).then(res=>{
            this.List = res.data;
            console.log(res.data);
          })
        },
    fetchData() {
      // 使用 axios获取 文章数据
        axios({
          url: 'https://m.toutiao.com/i'+this.$route.params.id+'/info/?callback=__jp2',
          //  url:'https://m.toutiao.com/list/?tag='+this.$route.params.id+'&ac=wap&count=20&format=json_raw&as=A1654AC98D20C81&cp=5A9D00DC18C1CE1&min_behot_time=0', 
          adapter: jsonpAdapter
      }).then((res) => {
          this.listCon =res.data.data
          console.log(res.data.data.title)
          // 获取页面接口数据赋值给定义的参数
          this.articleName=res.data.data.media_user.screen_name;
          this.articleUrl = res.data.data.media_user.avatar_url;
          this.avatar_url=res.data.data.media_user.avatar_url;
          this.screen_name=res.data.data.media_user.screen_name;
          // console.log( res.data.data.url);
          this.essayTitle = res.data.data.title;
          this.essayUrl = res.data.data.media_user.avatar_url;
          this.CommentTitle = res.data.data.title;
          this.CommentUrl = res.data.data.media_user.avatar_url;
      });
    },
    write(){
      this.show = !this.show;
    },
    toTop:function () {
      $('html,body').animate({
        scrollTop:0
      })
    },
    //关注
    add(){
      let username = document.cookie.split("=")[1];
      if(username){
        axios.post('/users/addArticle',{
          articleName:this.articleName,
          articleUrl:this.articleUrl
        }).then(response=>{
          var res = response.data;
          if(res.status == '0'){
            //显示成功的消息提示
            this.$message.success('关注成功');
            this.getData();
          }else{
            //返回了错误的提示消息的时候
            this.$message.error(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      }else{
        alert("您还没登录，请登录")
      }
    },
    //收藏
    connect(e){
      let username = document.cookie.split("=")[1]; 
      let tid = this.$route.params.id;
      if(username){
        console.log(this.essayContent);
        axios.post('/users/ConnectArticle',{
          // 传参
          essayTitle:this.essayTitle,
          essayUrl:this.essayUrl,
          tid
        }).then(response=>{
          var res = response.data;
          if(res.status == '0'){
            //显示成功的消息提示
            this.$message.success('收藏成功');
          }else{
            //返回了错误的提示消息的时候
            this.$message.error(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      }else{
        alert("您还没登录，请登录")
      }
    },
    // 评论
   submit(){
      let username = document.cookie.split("=")[1];
      let tid = this.$route.params.id;
      if(username){
        axios.post('/users/CommentArticle',{
          CommentTitle:this.CommentTitle,
          CommentUrl:this.CommentUrl,
          content:this.$refs.content.value,
          tid
        }).then(response=>{
          var res = response.data;
          if(res.status == '0'){
            //显示成功的消息提示
            this.$message.success('评论成功');
            this.disapper = !this.disapper;
            this.show = !this.show;
             this.getData();
          }else{
            //返回了错误的提示消息的时候
            this.$message.error(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      }else{
        alert("您还没登录，请登录")
      }
    },
  }
}

</script>
<style>
  .fa-heart{
    position: absolute;
    top:75px;
   right: 25%;
    color: #f85959;
    font-size: 20px;
  }
  .fade-enter-active,.fade-leave-active {
    opacity: 1;
    transition: .3s;
    -webkit-transition: .3s
  }
  .fade-enter,.fade-leave-to {
    opacity: 0;
    transform: translate3d(0,-5%,0);
    -webkit-transform: translate3d(0,-5%,0);
    transition: .3s;
    -webkit-transition: .3s
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
  .comment{
    width: 100%;
    line-height: 30px;
    text-align: center;
    height: 30px;
    margin-top: 50px;
    border-top: 1px dotted red;
  }
  .top{
    width: 30px;
    height: 25px;
    background-color: #eee;
    position: fixed;
    bottom:50px;
    right: 15px;
  }
  .top p{
    margin: 0;
    padding: 0;
  }
  .commenteara{
    width: 98%;
    height: 100%;
    border: 1px solid #ccc;
    margin-top: 180px;
  }
  .commenteara div{
    margin-top: 10px;
    margin-left: 10px;
  }
  .comlist{
    width: 98%;
    height: 100px;
    border: 1px solid #eee;
  }
  .comlist span:first-child{
    margin-left: 15px;
    line-height: 50px;
  }
  .comlist .content{
    width: 90%;
    float: left;
    margin-left: 15%;
  }
  .padding-side {
    padding-left: 14px;
    padding-right: 14px;
}

.article {
    margin-top: 12px;
    position: relative;
    overflow: hidden;
    background-color: #ffffff;
}
.article .article__header {
    position: relative;
}
.article .new-style-test-article__header .article__title {
    color: #000;
    font-size: 22px;
    line-height: 1.45;
    font-weight: 600;
}
.article .new-style-test-article__header .new-style-test-article-author {
    margin-top: 10px;
}
.new-style-test-avatar {
    height: 28px;
    width: 28px;
    display: inline-block;
}
.new-style-test-favor-btn {
    font-size: 14px;
    line-height: 29px;
    height: 29px;
    border-radius: 2px;
    width: 72px;
    font-weight: 600;
    position: absolute;
    top:70px;
    right:3%;
    color: #fff;
    display: inline-block;
    text-align: center;
    background-image: linear-gradient(to right, #f85959, #ff5050);
}
.article .article__content {
    position: relative;
    overflow: hidden;
    clear: both;
    padding-bottom: 24px;
}
.article .article__content img {
    width: 100%;
    display: block;
    margin-right: auto;
    margin-left: auto;
    margin-top: 4px;
    margin-bottom: 4px;
    transition: opacity 200ms ease;
    opacity: 1;
}
.article .article__content .pgc-img-caption {
    text-align: center;
    color: #777;
    font-size: 12px;
    line-height: 16px;
    margin-top: 8px;
    margin-bottom: 15px;
}
.avatar .new-style-test-avatar {
    height: 28px;
    width: 28px;
    display: inline-block;
}
.avatar .avatar__image, .avatar{
    width: 28px;
    height: 28px;
    border-radius: 32px;
    position: absolute;
    top: 35px;
    left: 0;
}
.article .new-style-test-article__header .new-style-test-article-author .new-style-test-article-author-name {
    vertical-align: top;
    display: inline-block;
    font-weight: 600;
    color: #000;
    font-size: 14px;
    margin-left: 20px;
}
.article .new-style-test-article__header .new-style-test-article-author .new-style-test-article-publish-time {
    font-size: 11px;
    color: #999;
    vertical-align: top;
    display: inline-block;
    margin-left: 20px;
}
.article .new-style-test-article__header .new-style-test-article-author .new-style-test-article-comment {
    font-size: 11px;
    color: #f85959;
    vertical-align: top;
    display: inline-block;
    margin-left: 20px;
}
.article__content{
  margin-top: 30px;
  font-size: 20px;
  font-weight: 200;
  font-family: 宋体;
}
</style>
