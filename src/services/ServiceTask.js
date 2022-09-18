import ServiceCRUD from '../services/ServiceCRUD'

class ServiceTask extends ServiceCRUD {
    constructor() {
        super();
    }
    getStatusApi = () => {
        return this.get('Status/getAll');
    }

    getTaskTypeApi = () => {
        return this.get('TaskType/getAll');
    }

    getPriorityApi = () => {
        return this.get('Priority/getAll');
    }

    createTaskApi = (task) => {
        return this.post('Project/createTask', task);
    }
}

export default new ServiceTask();