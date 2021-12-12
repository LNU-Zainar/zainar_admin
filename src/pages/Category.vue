<template>
  <div class="category">
    <div class="list-action">
      <el-button type="primary" size="small" @click="openInputBox()">
        <i class="el-icon-plus"></i>
        新增
      </el-button>
    </div>
    <el-table
      v-loading="isLoading"
      :data="items"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="category_name"
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
            title="您确定是否要删除该分类？">
            <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference" style="margin-left: 10px;">
            删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="list-pagination">
      <el-pagination
        :page-sizes="[10, 20, 40, 60, 80]"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div> -->
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
      total: 0
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
        inputValue: item ? item.category_name : undefined,
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
        category_name: value
      }).then(() => {
        this.fetchItems()
      })
    },
    editItem (item, value) {
      api.putCategory({
        category_name: value
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
