<template>
  <div>
    <el-form ref='form' :rules='newFormRules' :model='form' label-width='80px'>
      <el-form-item label='用户姓名' prop='name' >
        <el-input size="medium" v-model='form.name'>
          <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
        </el-input>
      </el-form-item>
      <el-form-item label='用户手机'>
        <el-input size="medium" v-model='form.phone'></el-input>
      </el-form-item>
      <el-form-item label='用户邮箱' prop='email'>
        <el-input size="medium"  v-model='form.email'></el-input>
      </el-form-item>
      <!-- <el-form-item label='员工编号'>
        <el-input v-model='form.user'></el-input>
      </el-form-item>
      <el-form-item label='身份证号'>
        <el-input v-model='form.user'></el-input>
      </el-form-item> -->

      <el-form-item label='归属组织'>
        <el-popover
          placement="bottom"
          width="400"
          trigger="click"
          @after-enter='toFetchGroup'
          >
          <el-container direction='vertical' v-loading.lock='flag'>
            <el-form>
              <el-row>
                <el-col :span='12'>
                  <el-input v-model='abc'></el-input>
                </el-col>
                <el-col :span='12'>
                  <el-button @click='filterItem=abc'>查询</el-button>
                </el-col>
              </el-row>

            </el-form>
            <el-table :data="filterGroup()(filterItem)" height='200' @row-click='rowClick'>
              <el-table-column width="150" type="index" label="序号"></el-table-column>
              <el-table-column width="100" property="ORGNAME" label="组织名称"></el-table-column>
              <el-table-column width="300" property="FORGNAME" label="上级组织"></el-table-column>
            </el-table>
          </el-container>
          <el-input size="medium" v-model='form.user' slot="reference"><i slot="suffix" class="el-input__icon el-icon-arrow-down"></i></el-input>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type='primary'>查询</el-button>
        <el-button size="small" type="primary" @click="addPerson">添加</el-button>
      </el-form-item>
    </el-form>
    <hr />
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      size='small'
      v-loading.lock='tableLoading'>
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column :show-overflow-tooltip='true' prop="id" label="身份证" width="120"></el-table-column>
      <el-table-column prop="org" label="部门" width="150"></el-table-column>
      <el-table-column :show-overflow-tooltip='true' prop="forg" label="公司" width="300"></el-table-column>
      <el-table-column prop="code" label="编号" width="100"></el-table-column>
      <el-table-column prop="email" label="邮编" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="changePerson(scope)" type="text" size="small">编辑</el-button>
          <!-- <Edit /> -->
          <el-button type="text" @click="removePerson(scope)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="pageChange" :page-size='count' background layout="prev, pager, next" :total="table.length"></el-pagination>
      <el-dialog  title="添加/编辑" :visible.sync="dialogFormVisible">
        <el-form ref='dialogRef' :rules='newFormRules' :inline='true' :model="newform" height='300px'>
          <el-form-item prop='name' size='small' label="员工姓名" :label-width="formLabelWidth">
            <el-input v-model="newform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item size='small' label="证件类型" :label-width="formLabelWidth">
            <el-select v-model="newform.group" placeholder="请选择证件类型">
              <el-option label="身份证" value="shanghai"></el-option>
              <el-option label="" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size='small' label="证件号码" :label-width="formLabelWidth">
              <el-input v-model='newform.id' placeholder='请输入证件号码'></el-input>
          </el-form-item>
          <el-form-item prop='email' size='small' label="邮箱" :label-width="formLabelWidth">
              <el-input  v-model='newform.email' placeholder='请输入证件号码'></el-input>
          </el-form-item>
          <el-form-item size='small' label="手机号码" :label-width="formLabelWidth">
              <el-input v-model='newform.phone' placeholder='请输入手机号码'></el-input>
          </el-form-item>
          <el-form-item size='small' label="归属组织" :label-width="formLabelWidth">
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
          <el-button type="primary" @click="addOk">确 定</el-button>
        </div>
      </el-dialog>
    <!-- <Addperson /> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
// import Addperson from './../addperson/addperson'
export default {
  data() {
    let validator=(rule,value,callback)=>{
      if(!value){
        return callback(new Error('不能为空'))
      }
    }
    return {
      form: {
        name: "A组",
        user: "未知",
        email:'email',
        phone:'手机号'
      },
      flag: true,
      filterItem: "",
      abc: "",
      tableLoading:true,
      count:5,
      page:1,
      newform:{
        name:'test',
        email:'',
        phone:'',
        org:'',
        forg:'',
        code:'',
        date:'',
        id:'',
        group:""
      },
      newFormRules:{
        name:[
          {validator,trigger:'blur'}
        ],
        email:[
          {required:true,message:'填写邮箱',trigger:'blur'},
          {type:'email',message:'填写正确邮箱',trigger:'blur'}
        ]
      },
      formLabelWidth: '120px',
      dialogFormVisible:false
    };
  },
  computed: {
    tableData(){
      let tableArr=this.table.slice(this.count*(this.page-1),this.count*this.page)
      return tableArr
    },
    ...mapState(['table'])
    // ...mapState(['group'])
  },
  methods: {
    toFetchGroup() {
      setTimeout(() => {
        this.flag = false;
      }, 500);
      this.fetchGroup();
    },
    toFetchTable(){
      setTimeout(() => {
        this.tableLoading = false;
      }, 1000);
      this.fetchTable()
    },
    pageChange(page){
      this.page=page
    },
    rowClick(row, event, column) {
      this.form.user = row.ORGNAME;
    },
    changePerson(scope) {
      console.log(JSON.stringify(scope.row))
      this.dialogFormVisible=true
      this.newform=scope.row
    },
    removePerson(scope){
      console.log(scope.row)
      this.$confirm('确定删除这个人吗?',"提示",{

      }).then(()=>{
          this.deleteItem({
            code:scope.row.code,
            cb:()=>{
              this.$message('删除成功')
            }
          })
      }).catch(()=>{
        this.$message({
          message:'已取消',
          type:'error'
        })
      })
    },
    addPerson(){
      this.dialogFormVisible=true;
      this.newform={
        name:'',
        email:'',
        phone:'',
        org:'',
        forg:'',
        code:'',
        date:'',
        id:'',
        group:''
      }
    },
    addOk(){
      this.$refs.dialogRef.validate((isValue,tag)=>{
        this.dialogFormVisible=false;
        // this.$http('/addnew',this.newform).then(res=>{
        //   console.log(res)
        // })
      })
    },
    ...mapMutations(['deleteItem']),
    ...mapActions(["fetchGroup","fetchTable",'deleteItem']),
    ...mapGetters(["filterGroup"])
  },
  mounted() {
    this.toFetchTable();
    // this.filterGroup()('abc')
  },
  components:{
    // Addperson
  }
};
</script>

<style>
.el-form-item {
  display: inline-block;
}
.el-pagination{
  display:inline-block;
}
</style>
