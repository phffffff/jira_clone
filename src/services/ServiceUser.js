import Axios from 'axios'

import { DOMAIN_API, TOKEN } from '../utils/constantsApi'

class ServiceUser {
    userSignIn = (payload) => {
        const { email, password } = payload
        return Axios({
            url: `${DOMAIN_API}/Users/signin`,
            method: 'POST',
            data: {
                email: email,
                passWord: password,
            }
        })
    }

    getUserWithKeyword = (payload) => {
        return Axios({
            url: `${DOMAIN_API}/Users/getUser?keyword=${payload}`,
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }
}


export default new ServiceUser();

