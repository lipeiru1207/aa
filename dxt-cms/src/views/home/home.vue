<template>
  <div class='home'>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <h5>默认颜色</h5>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu v-for='(item,index) in data' :index='index+"1"' :key="index">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for='(val,ind) in item.Secondary' :index='index+"1"+"-"+ind+"1"' :key="ind">
                  <router-link :to='{name:val.type}'>{{val.name}}</router-link>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
//map映射
console.log(mapState(['data']))
console.log(mapActions(['featchData']))
export default {
  name: "home",
  data(){
    return {

    }
  },
  computed:{
    //map映射  上面遍历的时候不用写成$store.state.data 可以直接写data遍历了,data中就不用写data:[]了
    ...mapState(['data'])
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    ...mapActions(['fetchData'])
  },
  mounted(){
    //dispatch流程
    // this.$store.dispatch('fetchData')
    this.fetchData()


    // this.$http.get('/server/data.json').then(res=>{
    //   this.data=res.data
    //   console.log(this.data)
    // })
  }
};
</script>

<style src='./home.css'>
</style>
