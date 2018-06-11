<template>
  <div>

      <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
      <el-dialog title="添加人员" :visible.sync="dialogFormVisible">
        <el-form :inline='true' :model="newform" height='300px'>
          <el-form-item size='small' label="员工姓名" :label-width="formLabelWidth">
            <el-input v-model="newform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item size='small' label="证件类型" :label-width="formLabelWidth">
            <el-select v-model="newform.email" placeholder="请选择证件类型">
              <el-option label="身份证" value="shanghai"></el-option>
              <el-option label="" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size='small' label="证件号码" :label-width="formLabelWidth">
              <el-input v-model='newform.id' placeholder='请输入证件号码'></el-input>
          </el-form-item>
          <el-form-item size='small' label="手机号码" :label-width="formLabelWidth">
              <el-input v-model='newform.phone' placeholder='请输入手机号码'></el-input>
          </el-form-item>
          <el-form-item size='small' label="部门" :label-width="formLabelWidth">
            <el-select v-model="newform.org" placeholder="请选择证件类型">
              <el-option label="资产" value="shanghai"></el-option>
              <el-option label="财务" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size='mini' label="员工编号" :label-width="formLabelWidth">
              <el-input v-model='newform.code' placeholder='请输入员工编号'></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible=false">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
// export default {
//   data(){
//     return {
//       newform:{
//         name:'test',
//         email:'',
//         phone:'',
//         org:'',
//         forg:'',
//         code:'',
//         date:'',
//         id:''
//       },
//       formLabelWidth: '120px',
//       dialogFormVisible:false
//     }
//   },
//   methods:{

//   }
// }
// </script>

// <style>

// </style>
