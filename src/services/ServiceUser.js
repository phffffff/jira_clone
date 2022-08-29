import Axios from 'axios'

import { DOMAIN_API } from '../utils/constantsApi'

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
}


export default new ServiceUser();

