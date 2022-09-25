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

    updateTaskApi = (task) => {
        return this.post('Project/updateTask', task);
    }

    deleteTaskApi = (taskId) => {
        return this.delete('Project/removeTask?taskId=', {}, taskId);
    }

    getTaskDetail = (taskId) => {
        return this.get('Project/getTaskDetail?taskId=', taskId)
    }
}

export default new ServiceTask();