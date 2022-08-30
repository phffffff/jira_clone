import { Editor } from '@tinymce/tinymce-react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik'
import { useEffect } from 'react';

import {
    actionGetProjectCategoryApiSaga,
    actionCreateProjectApiSaga,
} from '../../redux/actions/actionProject/actionProjectApi'
import { ID_PROJECT_CATEGORY_DEFAULT } from '../../utils/constantsApi';

function PageCreateProject(props) {

    const dispatch = useDispatch();

    const projectCategory = useSelector(state => state.stateProject.projectCategoryList)

    const formik = useFormik({
        initialValues: {
            projectName: '',
            description: '',
            categoryId: ID_PROJECT_CATEGORY_DEFAULT,
        },
        onSubmit: (values) => {
            dispatch(actionCreateProjectApiSaga(values))
        },
        validationSchema: Yup.object({
            projectName: Yup.string().required('Vui lòng nhập tên dự án'),
            description: Yup.string().required('Vui lòng nhập mô tả'),
        })
    })

    const handleEditorChange = (content, editor) => {
        formik.setFieldValue('description', content);
    };


    useEffect(() => {
        dispatch(actionGetProjectCategoryApiSaga())
    }, [])


    const renderCategory = () => {
        return projectCategory && projectCategory.length
            && projectCategory.map(item => {
                return (
                    <option value={item.id} key={item.id}>{item.projectCategoryName}</option>
                )
            })
    }

    return (
        <div style={{
            marginRight: '10px',
            width: (window.innerWidth - window.innerWidth * 0.25),
        }}
        >
            <h2 className='w-75 mt-5 ml-4' style={{
                margin: '0px auto',
            }}>
                Create Project
            </h2>
            <form className="w-75"
                style={{
                    margin: '0 auto'
                }}
                onSubmit={formik.handleSubmit}
            >
                <div className='m-4'>
                    <small htmlFor="projectName" className="form-label">Project Name</small>

                    <input className='form-control' id='projectName' name="projectName"
                        onChange={formik.handleChange}
                        value={formik.values.projectName}
                    />
                    {
                        formik.touched && formik.errors.projectName &&
                        <small className="form-label text-danger">*{formik.errors.projectName}</small>
                    }
                </div>
                <div className='m-4'>
                    <small htmlFor="projectName" className="form-label">Description</small>

                    <Editor
                        // onInit={(evt, editor) => editorRef.current = editor}
                        initialValue=""
                        name='description'
                        init={{
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
                        onEditorChange={handleEditorChange}
                    />
                    {
                        formik.touched && formik.errors.description &&
                        <small className="form-label text-danger">*{formik.errors.description}</small>
                    }
                </div>
                <div className='m-4'>
                    <small htmlFor="projectName" className="form-label">Category Project</small>
                    <select className='form-control' name='categoryId'
                        onChange={formik.handleChange}
                    >
                        {renderCategory()}
                    </select>
                </div>
                <div className='m-4'>
                    <button type='submit' className='btn btn-primary form-control'

                    >Create</button>
                </div>
            </form>
        </div >
    )
}
export default PageCreateProject;
