<template>
  <div class="location">
    <div class="list-action">
      <el-button type="primary" size="small" @click="openDialog()">
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

    <!-- <div class="list-pagination">
      <el-pagination
        :page-sizes="[10, 20, 40, 60, 80]"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div> -->

    <el-dialog center :title="isEditForm ? '编辑地点' : '新增地点'" :visible.sync="dialogFormVisible" @closed="handleDialogClosed" :close-on-click-modal="false" :close-on-press-escape="false"
    :class="{'is-complete': isMapComplete}">
      <el-form ref="form" :model="form" :rules="formRules">
        <el-form-item label="地点名称" label-width="80" prop="name">
          <el-input id="pickerInput" placeholder="输入关键字选取地点" v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="地点经度" label-width="80" prop="lng">
              {{ form.lng }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地点纬度" label-width="80" prop="lat">
              {{ form.lat }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
      <div id="container"
        v-loading="isMapLoading"
        element-loading-text="地图加载中"
        element-loading-background="transparent">
      </div>
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
import mapAreaPath from '@/assets/mapAreaPath.json'
import AMapLoader from '@amap/amap-jsapi-loader'
import jquery from 'jquery'
/* global AMap, AMapUI */

export default {
  data () {
    return {
      isLoading: false,
      isMapLoading: true,
      isMapComplete: false,
      isMapInited: false,
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
    this.map = null
    this.positionPicker = null
    this.poiPicker = null
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
      this.$nextTick(async () => {
        const defaultPos = [110.347924, 21.268879]
        const position = editItem ? [this.form.lng, this.form.lat]: defaultPos
        try {
          if (!this.map) {
            await this.initMap(position).then(this.onMapComplete)
          } else {
            this.map.resize()
          }
          this.positionPicker.start(position)
        } catch (err) {
          this.$message.error('地图加载失败')
        } finally {
          this.isMapLoading = false
        }
      })
    },
    async onMapComplete (map) {
      this.map = map
      if (!this.positionPicker) {
        this.positionPicker = await this.initPositionPicker()
      }
      if (!this.poiPicker) {
        this.poiPicker = await this.initPoiPicker()
        this.poiPicker.on('poiPicked', (poiResult) => {
          this.form.name = poiResult.item.name
          this.positionPicker.start([poiResult.item.location.lng, poiResult.item.location.lat])
        })
      }
      return new Promise(resolve => {
        setTimeout(() => {
          this.isMapComplete = true
          resolve()
        })
      })
    },
    async initMap (center) {
      if (!window.AMap) {
        await AMapLoader.load({
          key: 'e765ee2c909344df70d61e4a6852adc5',
          version: '2.0',
          plugins: [],
          AMapUI: {
            version: '1.1',
            plugins: []
          },
          // Loca: {
          //   version: '2.0'
          // },
        })
      }
      const bounds = [mapAreaPath.map(item => [item.R, item.Q])]

      const map = new AMap.Map('container', {
        // mask: bounds,
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        scrollWheel: false,
        labelzIndex: 999,
        zoom: 16,
        zooms: [14, 20],
        viewMode:'2D',
        pitch: 50,
        rotation: 0,
        showLabel: true,
        features: ['bg','point','road','building'],
        center,
        mapStyle: 'amap://styles/grey',
        layers: [
          new AMap.createDefaultLayer({
            visible: true,
            zIndex: 0
          }),
          new AMap.Buildings({
            zIndex: 9,
            heightFactor: 2
          })
        ]
      })

      AMap.plugin([
        'AMap.ToolBar'
      ], () => {
        map.addControl(new AMap.ToolBar())
      })

      const area = new AMap.Polygon({
        zIndex: 1,
        path: bounds,
        strokeColor: '#0066ff',
        strokeWeight: 2,
        fillColor: '#71B3ff',
        fillOpacity: .2
      })
      map.add(area)
      map.on('hotspotclick', (evt) => {
        if (this.positionPicker) {
          this.form.name = evt.name
          this.positionPicker.start([evt.lnglat.lng, evt.lnglat.lat])
        }
      })

      return new Promise((resolve, reject) => {
        map.on('complete', () => {
          resolve(map)
        })
        map.on('error', reject)
      })
    },
    initPositionPicker () {
      return new Promise((resolve) => {
        AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
          const positionPicker = new PositionPicker({
            mode:'dragMap',
            map: this.map,
            iconStyle:{//自定义外观
              url: process.env.BASE_URL + 'marker_blue.png',//图片地址
              size:[25, 35],  //要显示的点大小，将缩放图片
              ancher:[12.5, 35],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
            }
          })
          positionPicker.on('success', positionResult => {
            this.form.lng = positionResult.position.lng
            this.form.lat = positionResult.position.lat
          })
          resolve(positionPicker)
        })
      })
    },
    initPoiPicker () {
      AMapUI.setDomLibrary(jquery)
      return new Promise((resolve) => {
        AMapUI.loadUI(['misc/PoiPicker'],(PoiPicker) => {
          const poiPicker = new PoiPicker({
            input: 'pickerInput',
            autocompleteOptions: {
              city: '湛江',
              citylimit: true
            }
          })
          resolve(poiPicker)
        })
      })
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
#container {
  width: 100%;
  height: 400px;
  background-color: #1a232c;
}
</style>
