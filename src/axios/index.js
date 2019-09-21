import api from './api'

export default (Vue,options) => {
    Vue.prototype.$api = api
}