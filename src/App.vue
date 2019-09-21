<template>
    <div>
        这是个<svg-icon iconClass='yangtuo'/>APP
        <div>{{message1}}</div>
        <div>{{message2}}</div>
        <div>{{value}}</div>
        <router-view/>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {getTestMsg} from './axios/api'

export default {
    data(){
        return{
            message1:'',
            message2:''
        }
    },
    computed:{
        ...mapState(
            ['value']
        )
    },
    async created(){
        let data = await this.$api.getTestMsg()
        this.message1 = data.message
    },
    async beforeMount(){
        let data = await getTestMsg()
        this.message2 = data.message
    }
}
</script>

<style scoped>
    .svg-icon{
        font-size: 50px;
    }
</style>