import Axios from "axios";

import { DOMAIN_API, TOKEN } from '../utils/constantsApi';

class ServiceProject {
    getProjectCategory = () => {
        return Axios({
            url: `${DOMAIN_API}/ProjectCategory`,
            method: 'GET',
        })
    }
    createProject = (project) => {
        return Axios({
            url: `${DOMAIN_API}/Project/createProjectAuthorize`,
            method: "POST",
            data: project,
            headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }
    getProject = () => {
        return Axios({
            url: `${DOMAIN_API}/Project/getAllProject`,
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }
}

export default new ServiceProject();

