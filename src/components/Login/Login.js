import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, UnlockOutlined, } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { withFormik, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup'

import style from './Login.module.scss'
import { signInUserApi } from '../../redux/actions/actionUser/actionUserApi'

function Login(props) {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email required').email('Email không hợp lệ'),
            password: Yup.string().required('Password required').min(6, 'Mật khẩu tối thiểu 6 ký tự').max(20, ' Mật khẩu tối đa 20 ký tự')
        }),
        onSubmit: (values) => {
            dispatch(signInUserApi(values))
        },
    })

    return (
        <div className="container">
            <form className='d-flex flex-column justify-content-center align-items-center'
                style={{
                    height: window.innerHeight
                }}
                onSubmit={formik.handleSubmit}
            >
                <h3>Login to continue...</h3>
                <div className={style.containerStyle}>
                    <div className='mt-3'>
                        <Input size="large" placeholder="Email" prefix={<UserOutlined />}
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {
                            formik.touched.email && formik.errors.email ?
                                <div style={{
                                    paddingLeft: '10px',
                                    marginTop: "-5px",
                                }}>
                                    <small className='text-danger'>{formik.errors.email}</small>
                                </div>
                                : <></>
                        }
                    </div>
                    <div className='input-group mt-3'>
                        <Input.Password size="large" prefix={<UnlockOutlined />} placeholder="Password" iconRender={(visible = false) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {
                            formik.touched.password && formik.errors.password ?
                                <div style={{
                                    paddingLeft: '10px',
                                    marginTop: "-5px",
                                }}>
                                    <small className='text-danger'>{formik.errors.password}</small>
                                </div>
                                : <></>
                        }

                    </div>
                    <div className='input-group mt-3'>
                        <button type="submit" className='w-100 btn btn-primary'>Login</button>
                    </div>
                </div>
                <div className='mt-2'>
                    <Button type="primary" shape="circle" className={`${style.btnStyle} m-2`} size='large' icon={<FaFacebookF />}
                        style={{
                            backgroundColor: '#2078bf',
                        }}
                    />
                    <Button type="primary" shape="circle" className={`${style.btnStyle} m-2`} size='large' icon={<FaTwitter />}
                    />
                </div>
            </form >
        </div >
    );
}

export default Login
