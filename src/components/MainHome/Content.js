import { useDispatch } from "react-redux";
import { actionGetTaskDetailApiSaga } from "../../redux/actions/actionTask/actionTaskApi";

function Content({ projectDetail }) {

    let { lstTask } = projectDetail;

    const dispatch = useDispatch()

    const renderTaskListDetail = (task) => {
        return (
            task?.length ? task?.map(taskDetail => {
                return (
                    <li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}
                        key={taskDetail.taskId}
                        onClick={() => {
                            dispatch(actionGetTaskDetailApiSaga(taskDetail.taskId));
                        }}
                    >
                        <b>
                            {taskDetail.taskName}
                        </b>
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-left">
                                <i className="fa fa-bookmark" />
                                <i className="fa fa-arrow-up" />
                                <span>{taskDetail.priorityTask.priority}</span>
                            </div>
                            <div className="block-right">
                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    {taskDetail?.assigness?.length ? taskDetail?.assigness?.map(mem => {
                                        return (
                                            <div className="avatar" key={mem.id}>
                                                <img src={mem.avatar} alt={mem.avatar} />
                                            </div>
                                        )
                                    }) : <></>}
                                </div>
                            </div>
                        </div>
                    </li >
                )
            }) : <></>
        )
    }

    const renderTask = () => {
        return (
            lstTask?.length && lstTask?.map(item => {
                return (
                    <div className="card" key={item.statusId} style={{
                        width: '17rem', height: 'auto'
                    }}>
                        <div className="card-header">
                            {item.statusName}
                        </div>
                        <ul className="list-group list-group-flush">
                            {renderTaskListDetail(item.lstTaskDeTail)}
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </div>
                )
            })
        )
    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderTask()}
        </div>
    );
}

export default Content;

{/* <div className="card" style={{
                //  width: '17rem', height: '25rem' 
            }}>
                <div className="card-header">
                    BACKLOG 3
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
                        <p>
                            Each issue has a single reporter but can have multiple
                            assignees
                        </p>
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-left">
                                <i className="fa fa-bookmark" />
                                <i className="fa fa-arrow-up" />
                            </div>
                            <div className="block-right">
                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    <div className="avatar">
                                        <img src={require("../../assets/img/download (1).jfif")} alt={"../../assets/img/download (1).jfif"} />
                                    </div>
                                    <div className="avatar">
                                        <img src={require("../../assets/img/download (2).jfif")} alt={"../../assets/img/download (2).jfif"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <p>
                            Each issue has a single reporter but can have multiple
                            assignees
                        </p>
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-left">
                                <i className="fa fa-check-square" />
                                <i className="fa fa-arrow-up" />
                            </div>
                            <div className="block-right">
                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    <div className="avatar">
                                        <img src={require("../../assets/img/download (1).jfif")} alt={"../../assets/img/download (1).jfif"} />
                                    </div>
                                    <div className="avatar">
                                        <img src={require("../../assets/img/download (2).jfif")} alt={"../../assets/img/download (2).jfif"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>
            <div className="card" style={{
                //  width: '17rem', height: '25rem' 
            }}>
                <div className="card-header">
                    SELECTED FOR DEVELOPMENT 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>
            <div className="card" style={{
                //  width: '17rem', height: '25rem' 
            }}>
                <div className="card-header">
                    IN PROGRESS 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>
            <div className="card" style={{
                //  width: '17rem', height: '25rem' 
            }}>
                <div className="card-header">
                    DONE 3
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div> */}