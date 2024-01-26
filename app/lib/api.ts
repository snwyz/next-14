import Axios, { type AxiosResponse } from 'axios'

const VITE_API_URL = 'https://api.pearktrue.cn'

declare module 'axios' {
  interface AxiosResponse {
    msg: string
    code: number
  }
}

const api = Axios.create({
  baseURL: VITE_API_URL,
})

// interceptors https://axios-http.com/zh/docs/interceptors
api.interceptors.request.use(
  function (config) {
    // Automatic addition access-token
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      // Authorization
      config.headers.Authorization = accessToken
      // headers access-token
      config.headers['access-token'] = accessToken
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

const initResponse = (response: AxiosResponse) => {
  const status = response?.data?.statusCode || response?.status || 404
  if (status >= 200 && status < 300) {
    return response.code
  } else {
    console.error(`Unknown Error:`, response.data)
    return null
  }
}

api.interceptors.response.use(
  function (response) {
    return initResponse(response)
  },
  function (error) {
    return initResponse(error.response)
  },
)

export default api
