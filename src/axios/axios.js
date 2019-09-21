import axios from 'axios'
import config from './config'
import Cookies from 'js-cookie'
import router from '@/router'
import store from '@/store'

export default options => new Promise((resolve, reject) => {
    const instance = axios.create({
        ...config
    })

    instance.interceptors.request.use(
        config => {
            const tooken = Cookies.get('tooken') || localStorage.getItem('tooken') || ''
            if (tooken) {
                config.tooken = tooken
                config.auth = `basic ${tooken}`
            } else {
                router.push('/login')
            }
            return config
        },

        /* 
         * config: AxiosRequestConfig;
         * code?: string;
         * request?: any;
         * response?: AxiosResponse<T>;
         * isAxiosError: boolean; 
        */
        error => {
            console.log('请求错误：' + error)
            if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                console.log('timeout请求超时')
            }
            const errRes = error.response
            if (errRes) {
                error = errRes.data
                router.push(`/error/${errRes.status}`)
            }
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        res => {
            let data = res.data || JSON.parse(res.request.responseText) //后者解决IE9问题

            if (data.resCode == 0) {
                store.commit('changeLoginState')
                console.log('登陆成功')
            } else if (data.resCode == 1) {
                console.log(data.desc)
            }

            return data
        },

        error => {
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        error.message = '请求错误'
                        break
                    case 401:
                        error.message = '未授权，请登录'
                        break
                    case 403:
                        error.message = '拒绝访问'
                        break
                    case 404:
                        error.message = `请求地址出错: ${error.response.config.url}`
                        break
                    case 408:
                        error.message = '请求超时'
                        break
                    case 500:
                        error.message = '服务器内部错误'
                        break
                    case 501:
                        error.message = '服务未实现'
                        break
                    case 502:
                        error.message = '网关错误'
                        break
                    case 503:
                        error.message = '服务不可用'
                        break
                    case 504:
                        error.message = '网关超时'
                        break
                    case 505:
                        error.message = 'HTTP版本不受支持'
                        break
                    default:
                }
            }
            console.error(error)
            return Promise.reject(error)
        }
    )

    instance(options).then(res => {
        resolve(res)
        return false
    }).catch(error => {
        reject(error)
    })
})