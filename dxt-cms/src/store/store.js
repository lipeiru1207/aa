import Vue from 'vue'
import Vuex from 'vuex'
import {instance as http} from '@/utils/http'  //不是默认的引入也需要{}
Vue.use(Vuex)
//一个对象
let store=new Vuex.Store({
  state:{
    data:[],
    group:[],
    table:[],
    tree:[]
  },
  mutations:{//通过commit来触发一个mutation
    //可以改变state其他方法不行
    updateData(state,data){
      state.data=data.data;
    },
    updateGroup(state,payload){
      state.group=payload.orgs
    },
    updateTable(state,payload){
      state.table=payload
    },
    deleteItem(state,payload){
      let temp=[...state.table];
      let ind;
      temp.map((item,index)=>{
        if(item.code==payload.code){
          ind=index
        }
      })
      temp.splice(ind,1)
      state.table=temp;
      payload.cb()
      // console.log(state)
      // console.log(payload)
    },
    updateTree(state,payload){
      state.tree=payload
    }
  },
  actions:{//通过dispatch来触发一个action
    //间接修改state通过调用mutations
    fetchData({commit}){
      http.get('/server/data.json').then(res=>{
        // console.log(res)
        commit('updateData',res)
      })
    },
    fetchGroup(store){
      // if(store.state.group.legth>0){
      //   return
      // }
      http.get('/server/group.json').then(res=>{
        console.log(res)
        setTimeout(()=>{
          store.commit('updateGroup',res)
        },1000)

      })
    },
    fetchTable({commit,state},payload){
      http.get('/server/user.json').then(res=>{
        commit('updateTable',res.userList)
      })
    },
    deleteItem({commit},payload){
      commit('deleteItem',payload)
    },
    fetchTree({commit}){
      http.get('/server/menutree.json').then(res=>{
        console.log(res.data);
        commit('updateTree',res.data)
      })
    }
  },
  getters:{
    filterGroup(state){
      return (filter)=>{
        //console.log(filter);   input输入的名字
        if(filter){
          let str=state.group.filter((item)=>{ //item 是输入的名字的那一整条数据
            return item.ORGNAME.indexOf(filter)>-1||item.FORGNAME.indexOf(filter)>-1
          })
          // console.log(str)
          return str
        }else{
          return state.group
        }
      }
    }
  },
  modules:{}
})
export default store
