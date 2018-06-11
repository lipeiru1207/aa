<template>
  <div class='login-box'>
    <p class='login-tit'>
      <span v-on:click='tab_change("qrcode")' :class="active_change('qrcode')">二维码登录</span>
      <span v-on:click='tab_change("account")' :class="active_change('account')">账号登录</span>
    </p>
    <div class='login-content'>
      <Transition name='login'>
        <Component :is='login_way'></Component>
      </Transition>
    </div>
  </div>
</template>

<script>
import qrcode from './qrcode'
import account from './account'
export default {
  data(){
    return {
      login_way:'qrcode'
    }
  },
  beforeRouteEnter(to,from,next){
    console.log('component login')
    next()
  },
  methods:{
    tab_change(str){
      this.login_way=str
    },
    active_change(str){
      return this.login_way===str?'active':''
    }
  },
  components:{
    qrcode,
    account
  }
}
</script>

<style src='./login.css'>

</style>
