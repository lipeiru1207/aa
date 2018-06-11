<template>
  <div class='qrcode'>
    <h4>二维码登录</h4>
    <img src="../../../static/img/ewm.jpg" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .qrcode{
    width:400px;
    height:300px;
    border:1px solid #ccc;
    position:fixed;
    right:5%;
    top:150px;
    background:#fff;
  }
  .qrcode h4{
    width:100%;
    text-align:center;
    height:30px;
  }
  .qrcode img{
    width:150px;
    height:150px;
    margin:20px 130px;
    /* position:absolute; */
  }
</style>
