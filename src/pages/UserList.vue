<template>
  <div class="user-list">
    <el-table
      v-loading="isLoading"
      :data="users"
      style="width: 100%;">
      <el-table-column
        prop="uid"
        label="ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="简介"
        width="220">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="props">
          <el-popconfirm
            @confirm="handlePopConfirm(props.row)"
            title="您确定是否要删除该用户？">
            <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference">
            删除
          </el-button>
          </el-popconfirm>
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
  </div>
</template>
<script>
import * as api from '@/common/api'

export default {
  data() {
    return {
      isLoading: true,
      currentPage: 1,
      pageSize: 20,
      users: [],
      total: 0
    };
  },
  mounted () {
    this.$watch(() => {
      return this.currentPage + ',' + this.pageSize
    }, this.fetchUsers, {
      immediate: true
    })
  },
  methods: {
    fetchUsers () {
      this.isLoading = true
      api.getUsers({
        page_size: this.pageSize,
        cur_page: this.currentPage
      }, {
        notifyType: 'f'
      }).then(data => {
        this.total = data.total
        this.users = data.list
      })
      .finally(() => {
        this.isLoading = false
      })
    },
    handlePopConfirm (item) {
      api.deleteUser(null, {
        pathParams: {
          id: item.uid
        }
      })
      .then(() => {
        this.fetchUsers()
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.user-list {
  //
}
.list-pagination {
  margin: 30px 0;
}
</style>
