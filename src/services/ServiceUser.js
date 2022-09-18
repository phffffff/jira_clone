import Axios from 'axios'

import { DOMAIN_API, TOKEN } from '../utils/constantsApi'

import ServiceCRUD from './ServiceCRUD'

class ServiceUser extends ServiceCRUD {
    userSignIn = (payload) => {
        return this.post('Users/signin', { email: payload.email, password: payload.password })
    }

    getUserWithKeyword = (keyword) => {
        return this.get('Users/getUser?keyword=', keyword);
    }

    getUserByProjectId = (projectId) => {
        return this.get('Users/getUserByProjectId?idProject=', projectId);
    }
}


export default new ServiceUser();

