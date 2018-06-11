<template>
  <div id="app">
    <header class='header'>
      <img src="../static/img/logo.jpg" alt="">
    </header>
    <section class='section'>
      <router-view></router-view>
    </section>
    <footer class='footer'>
      <span>集团邮件系统</span>
      <span>集团邮件系统</span>
      <span>集团邮件系统</span>
      <span>集团邮件系统</span>
      <span>集团邮件系统</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
html,body{
  width:100%;
  height:100%;
}
#app{
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
}
.header{
  width:100%;
  height:60px;
}
.section{
  flex:1;
  background:url(../static/img/bg.png) no-repeat;
}
footer{
  display:flex;
  width:100%;
  height:70px;
  text-align:center
}
</style>
