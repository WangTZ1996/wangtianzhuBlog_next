import axios from 'axios'

const request = axios.create({
    baseURL: 'http://www.wangtz.cn:8089',
    // baseURL: 'http://127.0.0.1:8089',
    timeout: 0,
    headers: {}
})

request.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

request.interceptors.response.use(
    (response: any) => {
        const { data } = response
        return data
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default request