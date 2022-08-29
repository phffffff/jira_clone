import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { actionGetProject } from '../../redux/actions/actionProject/actionProjectApi'

function PageCreateProject() {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(actionGetProject())
    }, [])

    const formik = useFormik({
        initialValues: {
            projectName: '',
            description: '',
            categoryId: '',
        },
        onSubmit: (values) => {
            console.log(values)
        }

    })

    const handleEditorChange = (content, editor) => {
        console.log('content', content)
        console.log('editor', editor)
    }

    return (
        <div style={{
            marginRight: '10px',
            width: (window.innerWidth - window.innerWidth * 0.25),
        }}>
            <h2 className='w-75 mt-5 ml-4' style={{
                margin: '0px auto',
            }}>
                Create Project
            </h2>
            <form className="w-75" style={{
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
                </div>
                <div className='m-4'>
                    <small htmlFor="projectName" className="form-label">Category Project</small>
                    <select className='form-control' name='categoryId'
                        onChange={formik.handleChange}
                    >
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                    </select>
                </div>
                <div className='m-4'>
                    <button className='btn btn-primary form-control'>Create</button>
                </div>
            </form>
        </div >
    )
}
export default PageCreateProject;
