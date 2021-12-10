const express = require('express')
const router = express.Router()
const path = require('path')

router.use(function timeLog(req, res, next) {
  setTimeout(next, Math.random() * 500)
})

function route (desc, dataOrHandler) {
  let [method, path] = desc.split(' ')
  method = method.toLocaleLowerCase()
  router[method](path, (req, res) => {
    if (typeof dataOrHandler === 'function') {
      dataOrHandler(res, req)
    } else {
      res.json(dataOrHandler)
    }
  })
}

let isLogin = false
const userInfo = {
  uid: 1,
  nickname: 'Simon',
  avatar: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  phone: '18374384851',
  email: 'simon@gmail.com',
  desc: '岭师校园拾荒者'
}

route('POST /auth/register', res => {
  isLogin = true
  res.json({
    code: 200,
    message: '注册成功',
    data: userInfo
  })
})

route('POST /admin/auth/login', res => {
  isLogin = true
  res.json({
    code: 200,
    message: '登录成功',
    data: userInfo
  })
})

route('POST /admin/auth/logout', res => {
  isLogin = false
  res.json({
    code: 200,
    message: '退出成功',
    data: {}
  })
})

route('GET /admin', res => {
  res.json({
    code: isLogin ? 200 : 403,
    message: 'ok',
    data: userInfo
  })
})

route('GET /upload_token', {
  code: 200,
  message: 'ok',
  data: {}
})

route('GET /items', {
  code: 200,
  message: 'ok',
  data: {
    list: [
      {
        "category_id": 2,
        "create_time": "2021-11-27 22:07:36",
        "description": null,
        "id": 8,
        "images": [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        ],
        "location_id": 5,
        "thumbnail": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "title": "钥匙",
        "update_date": "2021-11-27 22:07:36"
      },
      {
        "category_id": 3,
        "create_time": "2021-11-27 22:07:36",
        "description": null,
        "id": 11,
        "images": [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        ],
        "location_id": 1,
        "thumbnail": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "title": "充电宝",
        "update_date": "2021-11-27 22:07:36"
      },
      {
        "category_id": 7,
        "create_time": "2021-11-27 22:07:36",
        "description": null,
        "id": 10,
        "images": [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        ],
        "location_id": 7,
        "thumbnail": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "title": "测试2",
        "update_date": "2021-11-27 22:07:36"
      },
      {
        "category_id": 3,
        "create_time": "2021-11-27 22:07:36",
        "description": null,
        "id": 9,
        "images": [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        ],
        "location_id": 2,
        "thumbnail": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "title": "测试",
        "update_date": "2021-11-27 22:07:36"
      },
      {
        "category_id": 1,
        "create_time": "2021-11-27 22:07:35",
        "description": null,
        "id": 4,
        "images": [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        ],
        "location_id": 3,
        "thumbnail": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "title": "手机",
        "update_date": "2021-11-27 22:07:35"
      },
      {
        "category_id": 3,
        "create_time": "2021-11-27 22:07:35",
        "description": null,
        "id": 7,
        "images": [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        ],
        "location_id": 3,
        "thumbnail": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "title": "平板",
        "update_date": "2021-11-27 22:07:35"
      },
      {
        "category_id": 4,
        "create_time": "2021-11-27 22:07:35",
        "description": null,
        "id": 6,
        "images": [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        ],
        "location_id": 3,
        "thumbnail": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "title": "藏青色雨伞",
        "update_date": "2021-11-27 22:07:35"
      },
      {
        "category_id": 1,
        "create_time": "2021-11-27 22:07:35",
        "description": null,
        "id": 5,
        "images": [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        ],
        "location_id": 4,
        "thumbnail": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "title": "iphone",
        "update_date": "2021-11-27 22:07:35"
      },
      {
        "category_id": 1,
        "create_time": "2021-11-27 22:03:55",
        "description": null,
        "id": 3,
        "images": [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        ],
        "location_id": 2,
        "thumbnail": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "title": "饭卡",
        "update_date": "2021-11-27 22:03:55"
      },
      {
        "category_id": 1,
        "create_time": "2021-11-27 20:50:35",
        "description": null,
        "id": 2,
        "images": [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        ],
        "location_id": 1,
        "thumbnail": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "title": "手机",
        "update_date": "2021-11-27 20:50:35"
      },
      {
        "category_id": 5,
        "create_time": "2021-11-26 22:05:58",
        "description": "伞",
        "id": 1,
        "images": [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        ],
        "location_id": 1,
        "thumbnail": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "title": "雨伞",
        "update_date": "2021-11-26 22:07:30"
      }
    ],
    total: 11
  }
})

route('POST /items', {
  code: 200,
  message: '创建成功',
  data: {}
})

route('GET /items/:id', {
  code: 200, 
  message: 'ok',
  data: {
    "category_id": 3,
    "category_name": "主机",
    "create_time": "2021-12-09 19:23:18",
    "description": "的撒后噶外观和哦啊五花肉恶评好好听瓦特我按头鹅火锅哦额我那根。",
    "id": 3,
    "images": [
      "https://zainar-1300922881.cos.ap-guangzhou.myqcloud.com/images/73dc24c40acd0f7bc6230b1ec00cb035.jpg"
    ],
    "location_id": 9,
    "location_name": "图书馆",
    "phone": "18512345678",
    "pickup_time": "2021-12-08 00:00:00",
    "poster": {
      "avatar": "https://zainar-1300922881.cos.ap-guangzhou.myqcloud.com/images/f1de38a4d917df513565a99a4852eac3.jpeg",
      "description": null,
      "email": null,
      "nickname": "林来疯",
      "uid": "admin"
    },
    "thumbnail": "https://zainar-1300922881.cos.ap-guangzhou.myqcloud.com/images/73dc24c40acd0f7bc6230b1ec00cb035.jpg",
    "title": "MacBook Air",
    "update_date": "2021-12-09 19:23:18"
  }
})

route('PUT /item/:id', {
  code: 200, 
  message: '更新成功', 
  data: {}
})

route('GET /category', {
  code: 200,
  message: 'ok', 
  data: [
    { category_name: '校园卡', id: '0' },
    { category_name: '雨伞', id: '1' }
  ]
})

route('POST /category', {
  code: 200,
  message: '创建成功', 
  data: {}
})

route('PUT /category/:id', {
  code: 200,
  message: '修改成功', 
  data: {}
})

route('DELETE /category/:id', {
  code: 200,
  message: '删除成功', 
  data: {}
})

route('GET /location', {
  code: 200,
  message: 'ok',
  data: [
    { location_name: '图书馆', id: '0' },
    { location_name: '鹏园', id: '1' }
  ]
})

route('POST /location', {
  code: 200,
  message: '创建成功',
  data: {}
})

route('PUT /location/:id', {
  code: 200,
  message: '更新成功',
  data: {}
})

route('DELETE /location', {
  code: 200,
  message: '删除成功',
  data: {}
})

route('GET /auth/captcha.png', res => {
  res.sendFile(path.resolve(__dirname, './captcha.png'))
})

route('GET /users', {
  code: 200,
  message: 'ok',
  data: {
    list: [
      userInfo,
      userInfo,
      userInfo,
      userInfo,
      userInfo,
      userInfo,
      userInfo,
      userInfo,
      userInfo
    ],
    total: 11
  }
})

route('DELETE /users/:id', {
  code: 200, 
  message: '删除成功', 
  data: {}
})

module.exports = router
