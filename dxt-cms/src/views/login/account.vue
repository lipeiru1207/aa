<template>
  <div class='account-box'>
    <el-form :model="login_model" label-position="top" ref='form'>
      <el-form-item prop='account' :rules="rules" label='账号登录'>
        <el-input v-model='login_model.account' placeholder='请输入手机号或邮箱'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled='isphoneDisabled' class='phone' v-on:click='checkPhone("phone")' type='primary'>{{phoneMsg}}</el-button>
        <el-button :disabled='isemailDisabled' class='email' v-on:click='checkPhone("email")' type='primary'>{{emailMsg}}</el-button>
      </el-form-item>
      <el-form-item label='动态密码' >
        <span>{{random}}</span>
        <el-input placeholder='请输入动态密码'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class='login-btn' type='primary' @click='Login'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      phoneMsg:'手机获取动态密码',
      emailMsg:'邮箱获取动态密码',
      timer:null,
      isphoneDisabled:false,
      isemailDisabled:false,
      login_model:{
        account:''
      },
      rules:[
        {required:true,message:'请输入手机号'}

      ],
      random:[],
      num:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    }
  },
  methods:{
    count_down(type){
      let start=10;
      this.timer=setInterval(()=>{
        start--;
        type==='phone'?(this.isphoneDisabled=true,this.phoneMsg=start):(this.isemailDisabled=true,this.emailMsg=start);
        if(start<0) {

          type==='phone'?(this.isphoneDisabled=false,this.phoneMsg="重新发送动态密码"):(this.isemailDisabled=false,this.emailMsg='重新发送邮箱动态密码');
          clearInterval(this.timer)
        }
      },500)
    },
    Login(){
      sessionStorage.setItem('islogin','ldg')
      this.$router.push('/home')
    },
    checkPhone(type){
      if(this.rules.length>1){
        this.rules.pop()
      }

      if(type==='phone'){
        this.rules.push({type:'number',validator:(rule,value,callback)=>{
          if(/^1[3,5,7,8]\d{9}$/.test(value)){
            callback()
          }else{
            callback(new Error('请输入正确格式'))
          }

        },message:"请输入正确的手机号"})
      }else if(type==='email'){
        this.rules.push({type,message:"请输入正确的邮箱"})
      }

      this.$refs.form.validate((isValid,rules)=>{
        if(isValid){
          this.count_down(type)
          // console.log(111)
          for(let i=0;i<4;i++){
            let ind=Math.floor(Math.random()*4)
            console.log(ind)
            this.random.push(this.num[ind])
          }
          this.random=this.random.join('')
          // this.$http.post('',{account:login_model.account}).then(res=>{
          //   console.log(res)
          // })

        }
      })
    }
  }
}
</script>

<style>
.account-box{
  width:400px;
  height:300px;
  border:1px solid #ccc;
  position:fixed;
  right:5%;
  top:150px;
  background:#fff;
}
.el-form-item{
  margin-bottom:13px;
}
.el-form-item label{
  height:40px;
}
.el-form-item input{
  width:86%;
  height:34px;
  margin-left:7%;
}
.phone{
  margin-left:8%;
}
.phone,.email{
  width:40%;
  height:34px;
}
.login-btn{
  width:86%;
  margin-left:7%;
  height:40px;
}
</style>
