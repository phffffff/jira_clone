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
    editProject = (project) => {
        return Axios({
            url: `${DOMAIN_API}/Project/updateProject?projectId=${project.id}`,
            method: "PUT",
            data: project,
            headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }
    delProject = (projectId) => {
        return Axios({
            url: `${DOMAIN_API}/Project/deleteProject?projectId=${projectId}`,
            method: "DELETE",
            headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }
    assignUserProject = (user) => {
        return Axios({
            url: `${DOMAIN_API}/Project/assignUserProject`,
            method: "POST",
            data: user,
            headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }

    removeUserFromProject = (user) => {
        return Axios({
            url: `${DOMAIN_API}/Project/removeUserFromProject`,
            method: "POST",
            data: user,
            headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }

    getProjectDetail = (id) => {
        return Axios({
            url: `${DOMAIN_API}/Project/getProjectDetail?id=${id}`,
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }
}

export default new ServiceProject();

