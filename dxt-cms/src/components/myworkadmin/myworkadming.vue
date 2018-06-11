<template>
  <div>
    <div class='con'>
      <router-link to='/rename'>发起更名流程工地</router-link>
      <router-link to='/transfer'>发起过户流程工地</router-link>
      <router-link to='/maintain'>工程维护单</router-link>
      <router-link to='/other'>其他类型工单</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.con a{
  text-decoration:none;
  width:33%;
  height:200px;
  background:#ccc;
  display:inline-block;
  text-align:center;
  margin-top:10px;
  color:#000;
  font-size:18px;
}
</style>
