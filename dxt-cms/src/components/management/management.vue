<template>
  <div>
    <el-container>
      <el-aside>
        <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'
export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    computed:{
      ...mapState(['tree'])
    },
    mounted(){
      //   this.$store.dispatch('fetchTree')
      this.fetchTree()
    },
    methods: {
      handleNodeClick(data) {
        console.log(data.type)
        if(!data.children){
          this.$router.push({
            path:'/home/Management/',
            query:{id:data.type}
          })
        }
      },
      ...mapActions(['fetchTree'])
    }
  };
</script>

<style>
.el-tree{
  width:200px;
}
</style>
