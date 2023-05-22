/**Generate by ASGENS
*@author Charlietyn 
*@date Wed May 17 17:20:57 GMT-04:00 2023  
*@time Wed May 17 17:20:57 GMT-04:00 2023  
*/
import axios from 'axios';
import Vue from 'vue'
/*Globally*/


const axios_services=axios.create({
    baseURL : 'https://api.nationalize.io/',
});

axios_services.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios_services.defaults.headers.get['Accepts'] = 'application/json'

export default axios_services
export const Axios = axios_services

