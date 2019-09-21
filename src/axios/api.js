import axios from './axios'

export const getTestMsg = () => axios('/test')

export default { getTestMsg }