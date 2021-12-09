<template>
  <div class="location">
    <div class="list-action">
      <el-button type="primary" size="small" @click="openDialog()">
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
        prop="location_name"
        label="名称">
      </el-table-column>
      <el-table-column
        label="经度">
        <template slot-scope="props">
          {{ props.row.position[0] }}
        </template>
      </el-table-column>
      <el-table-column
        label="纬度">
        <template slot-scope="props">
          {{ props.row.position[1] }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="props">
          <el-button type="primary" plain size="mini" @click="openDialog(props.row)">
            <i class="el-icon-edit"></i>
            编辑
          </el-button>

          <el-popconfirm
            @confirm="deleteItem(props.row)"
            title="您确定是否要删除该地点？">
            <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference" style="margin-left: 10px;">
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

    <el-dialog :title="isEditForm ? '编辑地点' : '新增地点'" :visible.sync="dialogFormVisible" @closed="handleDialogClosed" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="form" :model="form" :rules="formRules">
        <el-form-item label="地点名称" label-width="80" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="地点经度" label-width="80" prop="lng">
              <el-input v-model="form.lng"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地点纬度" label-width="80" prop="lat">
              <el-input v-model="form.lat"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveForm">
          保存
        </el-button>
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
        name: '',
        lng: '',
        lat: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入地点名称', trigger: 'blur' }
        ],
        lng: [
          { required: true, message: '请输入地点经度', trigger: 'blur' }
        ],
        lat: [
          { required: true, message: '请输入地点纬度', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isEditForm () {
      return Boolean(this.form.id)
    }
  },
  mounted () {
    this.fetchItems()
  },
  methods: {
    fetchItems () {
      this.isLoading = true
      api.getLocation(null, {
        notifyType: 'f'
      }).then(data => {
        this.items = data
      })
      .finally(() => {
        this.isLoading = false
      })
    },
    openDialog (editItem) {
      this.form = editItem ? {
        id: editItem.id,
        name: editItem.location_name,
        lng: editItem.position[0],
        lat: editItem.position[1]
      } : {
        name: '',
        lng: '',
        lat: ''
      }
      this.dialogFormVisible = true
    },
    saveForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = {
            location_name: this.form.name,
            position: [this.form.lng, this.form.lat]
          }
          if (this.isEditForm) {
            api.putLocation(data, {
              pathParams: {
                id: this.form.id
              }
            }).then(() => {
              this.dialogFormVisible = false
              this.fetchItems()
            })
          } else {
            api.postLocation(data).then(() => {
              this.dialogFormVisible = false
              this.fetchItems()
            })
          }
        } else {
          return false
        }
      })
    },
    postItem (value) {
      api.postLocation({
        name: value
      }).then(() => {
        this.fetchItems()
      })
    },
    editItem (item, value) {
      api.putLocation({
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
      api.deleteLocation(null, {
        pathParams: {
          id: item.id
        }
      }).then(() => {
        this.fetchItems()
      })
    },
    handleDialogClosed () {
      this.$refs.form.clearValidate()
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
