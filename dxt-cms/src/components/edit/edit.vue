<template>
  <div>
    <el-button type="primary" @click="handleClick(scope)">编辑</el-button>
      <el-dialog title="添加人员" :visible.sync="dialogFormVisible">
        <el-form :inline='true' :model="newform" height='300px'>
          <el-form-item size='small' label="员工姓名" :label-width="formLabelWidth">
            <el-input v-model="newform.name" auto-complete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
// export default {
//   data(){
//     return {
//       dialogFormVisible:false,
//       newform:{
//         name:''
//       },
//       formLabelWidth:'50px'
//     }
//   },
//   methods:{
//     handleClick(scope) {
//       dialogFormVisible:true
//     }
//   }
// }
// </script>

// <style>

// </style>
