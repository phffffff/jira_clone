import { Slider, Select } from 'antd'
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionSetHandleSubmit } from '../../redux/actions/actionForm/actionForm';
import { actionGetProjectApiSaga } from '../../redux/actions/actionProject/actionProjectApi';
import { actionCreateTastApiSaga, actionGetTaskTypeApiSaga } from '../../redux/actions/actionTask/actionTaskApi';
import { actionGetStatusApiSaga } from '../../redux/actions/actionTask/actionStatusApi';
import { actionGetPriorityApiSaga } from '../../redux/actions/actionTask/actionPriorityApi';
import { actionGetUserByProjectIdApiSaga } from '../../redux/actions/actionUser/actionUserApi'

function FormCreateTask() {

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })

    const { projectList } = useSelector(state => state.stateProject);
    const { statusList } = useSelector(state => state.stateStatus);
    const { taskTypeList } = useSelector(state => state.stateTask);
    const { priorityList } = useSelector(state => state.statePriority);
    const { userListByProjectId } = useSelector(state => state.stateUser);

    // console.log('projectList', projectList);
    // console.log('taskTypeList', taskTypeList);
    // console.log('statusList', statusList);
    // console.log('priorityList', priorityList);
    // console.log('userListByProjectId', userListByProjectId);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            projectId: projectList[0]?.id,
            taskName: '',
            typeId: taskTypeList[0]?.id,
            statusId: statusList[0]?.statusId,
            priorityId: priorityList[0]?.priorityId,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            originalEstimate: 0,
            description: '',
            listUserAsign: [],
        },
        onSubmit: (values) => {
            dispatch(actionCreateTastApiSaga(values));
        },
        validationSchema: Yup.object().shape({
            taskName: Yup.string().required("Vui lòng nhập taskName"),
            description: Yup.string().required('Vui lòng nhập description'),
            timeTrackingSpent: Yup.number().min(1, 'Vui lòng nhập timeTrackingSpent'),
            timeTrackingRemaining: Yup.number().min(1, 'Vui lòng nhập timeTrackingRemaining').moreThan(timeTracking.timeTrackingSpent, 'timeTrackingRemaining phải lớn hơn timeTrackingSpent'),
            originalEstimate: Yup.number().min(1, 'Vui lòng nhập originalEstimate'),
            listUserAsign: Yup.array().min(1, 'Vui lòng phân công thành viên'),
        })
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionSetHandleSubmit({
            handleSubmit: formik.handleSubmit,
            handleReset: formik.handleReset,
        }))
        dispatch(actionGetProjectApiSaga());
        dispatch(actionGetTaskTypeApiSaga());
        dispatch(actionGetStatusApiSaga());
        dispatch(actionGetPriorityApiSaga());
    }, [])

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="container">
                <div className="row ">
                    <div className='col col-12 mb-2'>
                        <small>Project Id</small>
                        <Select name='projectId'
                            onChange={(value) => {
                                formik.setFieldValue('projectId', value);
                                dispatch(actionGetUserByProjectIdApiSaga(value));
                            }}
                            value={formik.values.projectId}
                            defaultValue={projectList[0]?.projectName}
                            options={
                                projectList?.length ? projectList.map((project) => {
                                    return {
                                        value: project.id,
                                        label: project.projectName,
                                    }
                                }) : []
                            }
                            style={{
                                width: '100%'
                            }}
                        />

                    </div>
                    <div className='col col-12 mb-2'>
                        <small>Task Name</small>
                        <input className="form-control" name='taskName'
                            onChange={
                                formik.handleChange
                            }
                            value={formik.values.taskName}
                        />
                        {(formik.touched && formik.errors.taskName) ?
                            <small className='text-danger'>{formik.errors.taskName}</small>
                            : <></>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className='col col-6 '>
                        <small>Type</small>
                        <Select name='typeId'
                            onChange={(value) =>
                                formik.setFieldValue('typeId', value)
                            }
                            value={formik.values.typeId}
                            options={
                                taskTypeList?.length ? taskTypeList.map((item) => ({ value: item.id, label: item.taskType })) : []
                            }
                            style={{
                                width: '100%',
                            }}
                        />
                    </div>
                    <div className='col col-6'>
                        <small>Status</small>
                        <Select name='statusId'
                            onChange={(value) =>
                                formik.setFieldValue('statusId', value)
                            }
                            value={formik.values.statusId}
                            options={
                                statusList?.length ? statusList.map(item => ({ value: item.statusId, label: item.statusName })) : []
                            }
                            style={{
                                width: '100%',
                            }}
                        />
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col col-12'>
                        <small>User Asign</small>
                        <Select
                            name='listUserAsign'
                            mode="multiple"
                            placeholder="Please select user"
                            onChange={(values) => {
                                formik.setFieldValue('listUserAsign', values)
                            }}
                            filterOption={(input, option) => {
                                return option.label.toLowerCase().includes(input.toLowerCase());
                            }}
                            value={formik.values.listUserAsign}
                            optionLabelProp="label"
                            options={
                                userListByProjectId?.length ? userListByProjectId.map(user => ({ value: user.userId, label: user.name })) : []
                            }
                            style={{
                                width: '100%',
                            }}
                        />
                        {(formik.touched && formik.errors.listUserAsign) ?
                            <small className='text-danger'>{formik.errors.listUserAsign}</small>
                            : <></>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className='col col-12'>
                        <small>Priority</small>
                        <Select name='priorityId'
                            onChange={(value) =>
                                formik.setFieldValue('priorityId', value)
                            }
                            value={formik.values.priorityId}
                            options={
                                priorityList?.length ? priorityList.map(item => ({ value: item.priorityId, label: item.priority })) : []
                            }
                            style={{
                                width: '100%',
                            }}
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col col-12 mb-2">
                        <small>Time Tracking</small>
                        <div className='form-control'>
                            <Slider
                                max={timeTracking.timeTrackingRemaining}
                                value={timeTracking.timeTrackingSpent}
                                tooltip={{
                                    open: true,
                                }}
                            />
                        </div>
                    </div>
                    <div className='col col-6'>
                        <small> Time Tracking Spent</small>
                        <input type='number' className="form-control" name='timeTrackingSpent' min={0}
                            onChange={(e) => {
                                formik.setFieldValue('timeTrackingSpent', e.target.value);
                                setTimeTracking((state) => ({
                                    ...state,
                                    timeTrackingSpent: e.target.value,
                                }))
                            }}
                            value={formik.values.timeTrackingSpent}
                        />
                        {(formik.touched && formik.errors.timeTrackingSpent) ?
                            <small className='text-danger'>{formik.errors.timeTrackingSpent}</small>
                            : <></>}
                    </div>
                    <div className='col col-6'>
                        <small> Time Tracking Remaining</small>
                        <input type='number' className="form-control" name='timeTrackingRemaining'
                            min={0}
                            onChange={(e) => {
                                formik.setFieldValue('timeTrackingRemaining', e.target.value);
                                setTimeTracking((state) => ({
                                    ...state,
                                    timeTrackingRemaining: e.target.value,
                                }))
                            }}
                            value={formik.values.timeTrackingRemaining}
                        />
                        {(formik.touched && formik.errors.timeTrackingRemaining) ?
                            <small className='text-danger'>{formik.errors.timeTrackingRemaining}</small>
                            : <></>}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className='col col-12'>
                        <small> Original Estimate</small>
                        <input type='number' className="form-control" name='originalEstimate'
                            min={0}
                            onChange={
                                formik.handleChange
                            }
                            value={formik.values.originalEstimate} />
                        {(formik.touched && formik.errors.originalEstimate) ?
                            <small className='text-danger'>{formik.errors.originalEstimate}</small>
                            : <></>}
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col col-12'>
                        <small> Description</small>
                        <Editor
                            initialValue='<p>This is the initial content of the editor.</p>'
                            value={formik.values.description}
                            name='description'
                            onEditorChange={(context, editor) => { formik.setFieldValue('description', context) }}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        {(formik.touched && formik.errors.description) ?
                            <small className='text-danger'>{formik.errors.description}</small>
                            : <></>}
                    </div>
                </div>
            </div>
        </form >
    );
}

export default FormCreateTask; 