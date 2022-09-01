import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';

import { actionGetProjectCategoryApiSaga, actionPutProjectApiSaga } from '../../redux/actions/actionProject/actionProjectApi';
import { actionSetHandleSubmit } from '../../redux/actions/actionForm/actionForm';

const FormEditerFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props

        return {
            id: projectEdit?.id || '',
            projectName: projectEdit?.projectName || '',
            description: projectEdit?.description || '',
            categoryId: projectEdit?.categoryId || '',
        }
    },
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(actionPutProjectApiSaga(values))
    }
})(FormEditer)

const mapStateToProps = (state) => {
    return {
        projectEdit: state.stateProject.projectEdit
    }
}

function FormEditer(props) {
    const { projectCategoryList } = useSelector(state => state.stateProject);
    const dispatch = useDispatch();

    const {
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    const handleEditChange = (content, editor) => {
        setFieldValue('description', content)
    }

    useEffect(() => {
        dispatch(actionGetProjectCategoryApiSaga())
        dispatch(actionSetHandleSubmit(handleSubmit))
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='container mb-2'>
                    <div className='row'>
                        <div className='col col-4'>
                            <label htmlFor='projectId'>Project ID</label>
                            <input className='form-control' disabled id='projectId' name='projectId'
                                value={values.id}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col col-4'>
                            <label htmlFor='projectName'>Project Name</label>
                            <input className='form-control' id='projectName' name='projectName'
                                value={values.projectName}
                                onChange={handleChange}
                            />
                            {
                                touched && errors.projectName &&
                                <small className='text-danger'>{errors.projectName}</small>
                            }
                        </div>
                        <div className='col col-4'>
                            <label htmlFor='categoryId'>Project Category</label>
                            <select name='categoryId' id='categoryId' className='form-control'
                                value={values.categoryId}
                                onChange={handleChange}>
                                {
                                    projectCategoryList && projectCategoryList?.length && projectCategoryList.map(item => {
                                        return (
                                            <option key={item.id} value={item.id}>{item.projectCategoryName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className='mb-2 container'>
                    <div className='row'>
                        <div className='col col-12'>
                            <label>Description</label>
                            <Editor
                                name='description12'
                                value={values.description}
                                onEditorChange={handleEditChange}
                                init={{
                                    width: '100%',
                                    height: 350,
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
                            {
                                touched && errors.description &&
                                <small className='text-danger'>{errors.description}</small>
                            }
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

// const formik = useFormik({
//     // enableReinitialize: true,
//     initialValues: {
//         id: projectEdit?.id || '',
//         projectName: projectEdit?.projectName || '',
//         description: projectEdit?.description || '',
//         categoryId: projectEdit?.categoryId || '',
//     },
//     // validationSchema: Yup.object({
//     //     projectName: Yup.string().required('Vui lòng nhập tên project mới'),
//     //     describe: Yup.string().required('Không được để trống phần mô tả'),
//     // }),
//     onSubmit: (values) => {
//         console.log(values)
//     }
// })



export default connect(mapStateToProps)(FormEditerFormik);