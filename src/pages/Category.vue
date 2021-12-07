<template>
  <div class="category">
    <div class="list-action">
      <el-button type="primary" size="small" @click="openInputBox()">
        <i class="el-icon-plus"></i>
        新增
      </el-button>
    </div>
    <el-table
      :loading="isLoading"
      :data="items"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="props">
          <el-button type="primary" plain size="mini" @click="openInputBox(props.row)">
            <i class="el-icon-edit"></i>
            编辑
          </el-button>

          <el-popconfirm
            @confirm="deleteItem(props.row)"
            title="您确定是否要删除该条发布信息？">
            <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference" style="margin-left: 10px;">
            删除
            </el-button>
          </el-popconfirm>

          <!-- <el-button type="danger" size="mini" @click="deleteUser(props.row)">
            <i class="el-icon-delete"></i>
            删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="list-pagination">
      <el-pagination
        :page-sizes="[10, 20, 40, 60, 80]"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="80">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="80">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
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
import * as api from '@/common/api'

export default {
  data () {
    return {
      isLoading: false,
      currentPage: 1,
      pageSize: 20,
      items: [],
      total: 0,
      dialogFormVisible: false,
      form: {

      }
    }
  },
  mounted () {
    this.fetchItems()
  },
  methods: {
    fetchItems () {
      this.isLoading = true
      api.getCategory(null, {
        notifyType: 'f'
      }).then(data => {
        this.items = data
      })
      .finally(() => {
        this.isLoading = false
      })
    },
    openInputBox (item) {
      this.$prompt('请输入名称', '提示', {
        inputValue: item ? item.name : undefined,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[^\s]+/,
        inputErrorMessage: '请输入内容'
      }).then(({ value }) => {
        if (item) {
          this.editItem(item, value)
        } else {
          this.postItem(value)
        }
      })
    },
    postItem (value) {
      api.postCategory({
        name: value
      }).then(() => {
        this.fetchItems()
      })
    },
    editItem (item, value) {
      api.putCategory({
        name: value
      }, {
        pathParams: {
          id: item.id
        }
      }).then(() => {
        this.fetchItems()
      })
    },
    deleteItem (item) {
      api.deleteCategory(null, {
        pathParams: {
          id: item.id
        }
      }).then(() => {
        this.fetchItems()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-action {
  display: flex;
  justify-content: right;
  margin: 30px 0;
}
.list-pagination {
  margin: 30px 0;
}
</style>
