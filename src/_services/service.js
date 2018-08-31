import { authHeader, path } from '../_helpers';
import axios from 'axios';

function post(url, data) {
    
    var headers = {
        'Authorization': authHeader().Authorization
    }
    
    return axios.post(path() + url, data, headers);
}

function get(url) {
   return axios.get(path() + url, {
       'headers': {
           'Authorization': authHeader().Authorization
       }
   });
}

export const Service = {
    post,
    get,
};