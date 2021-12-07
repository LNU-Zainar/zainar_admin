import request from './request'

const createAPI = description => (payload, config) => request({
  customConfig: {
    description,
    payload,
    ...config
  }
})

const APIDescriptions = {
  login: 'POST /auth/login',
  logout: 'POST /auth/logout',
  getUserInfo: 'GET /userinfo',
  getItems: 'GET /items',
  putItem: 'PUT /item/:id',
  getItem: 'GET /item/:id',
  getUploadToken: 'GET /upload_token',
  getCategory: 'GET /category',
  postCategory: 'POST /category',
  putCategory: 'PUT /category/:id',
  deleteCategory: 'DELETE /category/:id',
  getLocation: 'GET /location',
  postLocation: 'POST /location',
  putLocation: 'PUT /location/:id',
  deleteLocation: 'DELETE /location/:id',
  getUserItems: 'GET /users',
  deleteUserItem: 'DELETE /users/:id'
}

export const login = createAPI(APIDescriptions.login)
export const logout = createAPI(APIDescriptions.logout)
export const getUserInfo = createAPI(APIDescriptions.getUserInfo)
export const getItems = createAPI(APIDescriptions.getItems)
export const putItem = createAPI(APIDescriptions.putItem)
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
export const getUserItems = createAPI(APIDescriptions.getUserItems)
export const deleteUserItem = createAPI(APIDescriptions.deleteUserItem)

