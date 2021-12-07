<template>
  <div class="user-list">
    <el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        prop="uid"
        label="ID"
        width="50">
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
          <el-button type="danger" size="mini" @click="deleteUser(props.item)">
            <i class="el-icon-delete"></i>
            删除
          </el-button>
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
      isLoading: false,
      currentPage: 1,
      pageSize: 20,
      users: [],
      total: 0
    };
  },
  mounted () {
    this.fetchUsers()
  },
  methods: {
    fetchUsers () {
      this.isListLoading = true
      api.getUserItems(null, {
        notifyType: 'f'
      }).then(data => {
        this.users = data.list
      })
      .finally(() => {
        this.isListLoading = false
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  .el-tabs {
    display: flex;
    align-items: stretch;
    min-height: 300px;
  }
  ::v-deep .el-tabs__header {
    height: auto;
    flex: 0;
  }
  ::v-deep .el-tabs__content {
    flex: 1;
  }
  .el-tab-pane {
    padding: 50px 0;
  }
  &-form {
    max-width: 700px;
    margin: 0 auto;
    &-cont {
      display: flex;
      flex-wrap: wrap;
      // border-left: 2px solid #E4E7ED;
    }
    &-left {
      flex: 1 1 100px;
    }
    &-right {
      flex: 0 1 200px;
      text-align: center;
    }
    &-bottom {
      flex: 1 0 100%;
    }
    .avatar {
      display: block;
      margin: auto;
      ::v-deep img {
        width: 100%;
      }
    }
    .progress {
      margin: 5px auto;
      width: 100px;
    }
  }
  &-post-actions {
    display: flex;
    flex-direction: column;
  }
}
.list-pagination {
  margin: 30px 0;
}
</style>
