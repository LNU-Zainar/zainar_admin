import request from './request'

const createAPI = description => (payload, config) => request({
  customConfig: {
    description,
    payload,
    ...config
  }
})

const APIDescriptions = {
  login: 'POST /admin/auth/login',
  logout: 'POST /admin/auth/logout',
  getUserInfo: 'GET /admin/logined_user',

  getUsers: 'GET /admin/users',
  deleteUser: 'DELETE /admin/users/:id',

  getItems: 'GET /items',
  getItem: 'GET /items/:id',
  deleteItem: 'DELETE /admin/items/:id',
  putItem: '/PUT /admin/items/:id',

  getCategory: 'GET /category',
  postCategory: 'POST /admin/category',
  putCategory: 'PUT /admin/category/:id',
  deleteCategory: 'DELETE /admin/category/:id',

  getLocation: 'GET /location',
  postLocation: 'POST /admin/location',
  putLocation: 'PUT /admin/location/:id',
  deleteLocation: 'DELETE /admin/location/:id',

  getUploadToken: 'GET /upload_token'
}

export const login = createAPI(APIDescriptions.login)
export const logout = createAPI(APIDescriptions.logout)
export const getUserInfo = createAPI(APIDescriptions.getUserInfo)
export const getItems = createAPI(APIDescriptions.getItems)
export const getUploadToken = createAPI(APIDescriptions.getUploadToken)
export const getItem = createAPI(APIDescriptions.getItem)
export const getCategory = createAPI(APIDescriptions.getCategory)
export const postCategory = createAPI(APIDescriptions.postCategory)
export const putCategory = createAPI(APIDescriptions.putCategory)
export const deleteCategory = createAPI(APIDescriptions.deleteCategory)
export const getLocation = createAPI(APIDescriptions.getLocation)
export const postLocation = createAPI(APIDescriptions.postLocation)
export const putLocation = createAPI(APIDescriptions.putLocation)
export const deleteLocation = createAPI(APIDescriptions.deleteLocation)
export const getUsers = createAPI(APIDescriptions.getUsers)
export const deleteUser = createAPI(APIDescriptions.deleteUser)
export const deleteItem = createAPI(APIDescriptions.deleteItem)
export const putItem = createAPI(APIDescriptions.putItem)

