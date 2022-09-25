import Axios from "axios"
import { DOMAIN_API, TOKEN } from "../utils/constantsApi"

class ServiceCRUD {
    get = (api, payload = '') => {
        return Axios({
            url: `${DOMAIN_API}/${api}${payload}`,
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` },
        })
    }
    post = (api, data = {}, payload = '') => {
        return Axios({
            url: `${DOMAIN_API}/${api}${payload}`,
            data,
            headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` },
            method: 'POST',
        })
    }

    delete = (api, data = {}, payload = '') => {
        return Axios({
            url: `${DOMAIN_API}/${api}${payload}`,
            data: data,
            headers: { 'Authorization': `Bearer ${localStorage.getItem(TOKEN)}` },
            method: 'DELETE',
        })
    }
}

export default ServiceCRUD;