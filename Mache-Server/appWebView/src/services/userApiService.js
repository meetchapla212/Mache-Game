import { Config } from '../Config';
const url = Config.apiUrl;
let header = {
    "api_key": Config.api_key 
}

export class userApiService {

    static getLoginUserDetail = (params) => {
        header.Authorization =  `Bearer ${params.token}`;
        return fetch(url + "profile", {
            "method": "GET",
            "headers": header
        })
        .then(response => response.json())
    }
};