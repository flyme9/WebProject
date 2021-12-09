<template>
    <div>
        <el-table :data="nowTabData" border style="width: 100%">
            <el-table-column prop="username" label="用户名"> </el-table-column>
            <el-table-column prop="email" label="用户邮箱"></el-table-column>
            <el-table-column prop="data" label="注册日期"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleToFreeze(scope.$index, scope.row)">{{scope.row.isFreeze ? '已冻结':'未冻结'}}</el-button>
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
            <el-pagination class="page" background layout="prev, pager, next" :page-size="pageSize" :current-page.sync="currentPage" :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'users',
    data() {
      return {
          tableData:[],
          currentPage:1,
          pageSize:9
        }
    },
    mounted(){
        axios.get('/api2/admin/usersList')
          .then(res=>{
              var status = res.data.status
              if(status === 0){
                  this.tableData = res.data.data.usersList
              }
          })
    },
    computed:{
        nowTabData(){
            return this.tableData.slice((this.currentPage - 1) * this.pageSize,this.currentPage*this.pageSize) || []
        }
    },
    methods:{
        handleToFreeze(index,row){
            axios.post('/api2/admin/updateFreeze',{
                email:row.email,
                isFreeze:!row.isFreeze
            })
             .then(res=>{
                 var status = res.data.status
                 if(status === 0){
                    this.$alert('操作成功', {
                        confirmButtonText: '确定',
                        callback:actions=>{
                            this.tableData[index].isFreeze = !row.isFreeze
                        }
                    });
                 }
                 else{
                    this.$alert('操作失败', {
                        confirmButtonText: '确定'
                    });
                 }
             })
        },
        handleDelete(index,row){
            axios.post('/api2/admin/deleteUser',{
                email:row.email
            })
              .then(res=>{
                  var status = res.data.status
                  if(status===0){
                    this.$alert('操作成功', {
                        confirmButtonText: '确定',
                        callback:actions=>{
                            this.tableData.splice(index,1)
                        }
                    });
                  }
                  else{
                    this.$alert('操作成功', {
                        confirmButtonText: '确定'
                    });
                  }
              })
        }
    }
}
</script>
<style scoped>
    .page{
        margin-top: 20px;
    }
</style>