import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Popover, Space, Tag } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import {
    CloseCircleTwoTone,
    PlusOutlined,
} from '@ant-design/icons';
import { useEffect } from "react";

import { actionGetPriorityApiSaga } from '../../redux/actions/actionTask/actionPriorityApi';
import { actionGetStatusApiSaga } from '../../redux/actions/actionTask/actionStatusApi';
import { actionDeleteTaskApiSaga, actionGetTaskTypeApiSaga, actionUpdateTaskApiSaga } from '../../redux/actions/actionTask/actionTaskApi';
import { actionAssignUserTaskApiSaga, actionRemoveUserFromTaskApiSaga } from '../../redux/actions/actionUser/actionUserApi';
import { useState } from "react";

function InfoModal() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionGetPriorityApiSaga())
        dispatch(actionGetStatusApiSaga())
        dispatch(actionGetTaskTypeApiSaga())
    }, [])

    const { currentTask } = useSelector(state => state.stateTask);
    const { statusList } = useSelector(state => state.stateStatus);
    const { priorityList } = useSelector(state => state.statePriority);
    const { taskTypeList } = useSelector(state => state.stateTask);
    const { projectDetail } = useSelector(state => state.stateProject);

    const userListByProjectId = projectDetail.members;

    // console.log('taskTypeList', taskTypeList);
    // console.log('priorityList', priorityList);
    // console.log('statusList', statusList);
    // console.log(currentTask);
    // console.log(userListByProjectId);

    const percent = () => {
        return Math.round((+currentTask.timeTrackingSpent / +(+currentTask.timeTrackingSpent + +currentTask.timeTrackingRemaining)) * 100);
    }

    const delUserAssign = ({ taskId = 0, userId = 0, projectId = 0 }) => {
        dispatch(actionRemoveUserFromTaskApiSaga({ userData: { taskId, userId }, projectId }))
    }

    const renderListUser = () => {
        const newUser = (
            userListByProjectId?.length && userListByProjectId?.filter(mem => {
                const idx = currentTask?.assigness?.length ? currentTask?.assigness.findIndex(user => { return user.id == mem.userId }) : -1;

                return idx === -1;
            })) || []

        return (newUser?.length && newUser.map(user => <option key={user.userId} value={user.userId} label={user.name}>{user.name}</option>)) || <></>;
    }

    const [isVisible, setVisible] = useState(false);
    const [context, setContext] = useState(currentTask?.description);
    const [contextHistory, setContextHistory] = useState(currentTask?.description);

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <h3 className="mb-2" suppressContentEditableWarning={true} contentEditable
                                onBlur={(e) => {
                                    dispatch(actionUpdateTaskApiSaga({ name: 'taskName', value: e.target.innerHTML }))
                                }}>
                                {currentTask?.taskName}
                            </h3>
                            <select name='typeId' className="custom-select form-control"
                                value={currentTask?.typeId}
                                onChange={(e) => {
                                    dispatch(actionUpdateTaskApiSaga({ name: e.target.name, value: e.target.value }))
                                }}
                            >
                                {taskTypeList?.length ? taskTypeList.map(item => <option key={item.id} value={item.id} label={item.taskType}>{item.taskType}</option>) : <></>}
                            </select>
                            {/* <span>TASK-{currentTask.taskId}</span> */}
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>

                            <button type="button" className="btn btn-danger d-flex justify-content-center align-items-center" data-dismiss="modal" aria-label="Close" style={{
                                width: '30px',
                                height: '25px',
                                marginLeft: '10px',
                            }}
                                onClick={(e) => dispatch(actionDeleteTaskApiSaga({ taskId: currentTask?.taskId, projectId: currentTask?.projectId }))}
                            >
                                <span aria-hidden="true" className="d-block">
                                    <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                                </span>
                            </button>
                            <button type="button" className="btn btn-danger d-flex justify-content-center align-items-center" data-dismiss="modal" aria-label="Close" style={{
                                width: '30px',
                                height: '25px',
                                marginLeft: '10px',
                            }}>
                                <span aria-hidden="true" className="d-block">X</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        <p>Description</p>
                                        {isVisible ?
                                            <>
                                                <Editor
                                                    name='description'
                                                    value={context}
                                                    initialValue={currentTask?.description}
                                                    onEditorChange={(context, editer) => {
                                                        setContext(context);
                                                        setContextHistory(currentTask?.description);
                                                    }}
                                                    init={{
                                                        width: '100%',
                                                        height: 300,
                                                        menubar: false,
                                                        plugins: [
                                                            'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                                            'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                                            'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                                        ],
                                                        toolbar: `undo redo | casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | a11ycheck code table help`,
                                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                    }}
                                                />
                                                <button className="btn btn-primary" onClick={(e) => {
                                                    setVisible(!isVisible)
                                                    dispatch(actionUpdateTaskApiSaga({
                                                        name: 'description',
                                                        value: context,
                                                    }));
                                                }}>Save</button>
                                                <button className="btn ml-2" style={{ backgroundColor: '#ccc' }} onClick={(e) => {
                                                    setContext(contextHistory);
                                                }}>Cancel</button>
                                            </>
                                            : <div onClick={(e) => {
                                                setVisible(!isVisible)
                                            }}
                                                dangerouslySetInnerHTML={{ __html: currentTask.description }}></div>}

                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select className="custom-select form-control"
                                            name="statusId"
                                            value={currentTask?.statusId}
                                            onChange={(e) => dispatch(actionUpdateTaskApiSaga({ name: e.target.name, value: e.target.value }))}
                                        >
                                            {statusList?.length ? statusList.map(item => <option key={item.statusId} value={item.statusId} label={item.statusName}>{item.statusName}</option>) : <></>}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className="d-flex">
                                            <div className='row'>
                                                {currentTask?.assigness?.length ? currentTask.assigness.map(user => {
                                                    return (
                                                        <div className="col mb-1" style={{

                                                        }} key={user?.id}>
                                                            <Tag icon={<Avatar key={user?.id}
                                                                size="default" src={user.avatar} />}
                                                                value={user.id}
                                                                color="#55acee"
                                                                closeIcon={
                                                                    <CloseCircleTwoTone size='default' style={{
                                                                        paddingBottom: '10px',
                                                                        fontSize: '18px',
                                                                    }} />}
                                                                closable
                                                                onClose={(e) => delUserAssign({
                                                                    taskId: currentTask.taskId,
                                                                    userId: user.id,
                                                                    projectId: currentTask.projectId,
                                                                })}
                                                            >
                                                                <Space style={{
                                                                    padding: '5px 5px 0px',
                                                                    height: '100%',
                                                                }}>
                                                                    <span style={{ fontSize: '18px', paddingTop: '5px', lineHeight: '100%' }}>{user?.name}</span>
                                                                </Space>
                                                            </Tag>
                                                        </div>
                                                    )
                                                }) : <></>}
                                            </div>
                                        </div>
                                        <Popover
                                            content={
                                                <select style={{ width: '100%' }} className='form-control'
                                                    onClick={(e) => {
                                                        if (+e.target.value !== -1) {
                                                            dispatch(actionAssignUserTaskApiSaga(+e.target.value))
                                                        }
                                                    }}
                                                >
                                                    <option selected value={-1}>Select user</option>
                                                    {renderListUser()}
                                                </select>
                                            }
                                            title="Add User"
                                            trigger="click"
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            zIndex={99999}
                                            placement="left"
                                            color={'#ccc'}
                                        >
                                            <Button
                                                style={{
                                                    color: 'black',
                                                    margin: '5px 0px',
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#ccc',
                                                    display: "flex"
                                                }}
                                                icon={
                                                    <PlusOutlined
                                                        style={{ marginTop: '1px' }}
                                                    />}
                                            >
                                                Add more
                                            </Button>
                                        </Popover>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select className="custom-select form-control" name='priorityId'
                                            value={currentTask?.priorityTask?.id}
                                            onChange={(e) => dispatch(actionUpdateTaskApiSaga({ name: e.target.name, value: e.target.value }))}
                                        >
                                            {priorityList?.length ? priorityList.map(item => <option key={item.priorityId} value={item.priorityId} label={item.priority}>{item.priority}</option>) : <></>}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input name='originalEstimate'
                                            onChange={(e) => { dispatch(actionUpdateTaskApiSaga({ name: e.target.name, value: e.target.value })) }} type="text"
                                            className="form-control estimate-hours"
                                            value={currentTask?.originalEstimate} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        <div style={{ display: 'flex' }}>
                                            <i className="fa fa-clock" />
                                            <div style={{ width: '100%' }}>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{ width: `${percent()}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p className="logged">{currentTask.timeTrackingSpent}h</p>
                                                    <p className="estimate-time">{currentTask.timeTrackingRemaining}h estimated</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <input className="form-control" name="timeTrackingSpent"
                                                    value={currentTask.timeTrackingSpent}
                                                    onChange={(e) => { dispatch(actionUpdateTaskApiSaga({ name: e.target.name, value: e.target.value })) }} />
                                            </div>
                                            <div className="col-6">
                                                <input name="timeTrackingRemaining" className="form-control"
                                                    value={currentTask.timeTrackingRemaining}
                                                    onChange={(e) => {
                                                        dispatch(actionUpdateTaskApiSaga({ name: e.target.name, value: e.target.value }))
                                                    }}
                                                />
                                                {+currentTask.timeTrackingSpent > +currentTask.timeTrackingRemaining
                                                    && <small className="text-danger">timeTrackingRemaining phải lơn hơn timeTrackingSpent</small>}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default InfoModal;