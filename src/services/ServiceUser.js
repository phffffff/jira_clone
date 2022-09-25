import Axios from 'axios'

import { DOMAIN_API, TOKEN } from '../utils/constantsApi'

import ServiceCRUD from './ServiceCRUD'

class ServiceUser extends ServiceCRUD {
    userSignIn = (data) => {
        return this.post('Users/signin', { email: data.email, password: data.password })
    }

    getUserWithKeyword = (keyword) => {
        return this.get('Users/getUser?keyword=', keyword);
    }

    getUserByProjectId = (projectId) => {
        return this.get('Users/getUserByProjectId?idProject=', projectId);
    }

    removeUserFromTask = (data) => {
        return this.post('Project/removeUserFromTask', data);
    }
}



export default new ServiceUser();

