import React, { useState } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

import {connect} from 'react-redux'

import '../../styles/App.sass'
import { Link } from 'react-router-dom';

import PhoneValidator from '../../validators/PhoneValidator'
import PasswordValidator from '../../validators/PasswordValidator'

import { login } from '../../actions'




const NormalLoginForm = ({dispatch, form}) => {
    // <div style={{ position: 'relative' }}>
    //         <div style={{ position: 'absolute', top: '50%', transform: 'translate(0, -50%)' }}></div>
    
    const [message, setMessage] = useState('')

    const messageMap = {
        'user is not found': 'Пользователь не найден',
        'unknown error': 'Что-то пошло не так',
        'passwords do not match' : 'Пароли не совпадают'
    }

    const handler = error => {
        setMessage(messageMap[error])
    }

    const handleSubmit = function (e) {
        dispatch(login({phone, password}, handler))
    }

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')


    const { getFieldDecorator } = form;
    return (
        <div>
            <h1>Авторизуйтесь</h1>
            {message}
            {/* {phone}
            {password} */}
            <Form id="components-form-demo-normal-login" onSubmit={handleSubmit} className="login-form">
                <Form.Item required label="Телефон" style={{ marginBottom: "0" }}>
                    {getFieldDecorator('phone', {
                        //rules: [{ required: true, message: 'Введите номер телефона' },
                        rules: [{validator: PhoneValidator}],
                    })(
                        <Input
                            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Введите номер телефона"
                            onChange={e=>setPhone(e.target.value)}
                        />,
                    )}
                </Form.Item>
                <Form.Item required label="Пароль">
                    {getFieldDecorator('Пароль', {
                        //rules: [{ required: true, message: 'Введите пароль' }],
                        rules: [{validator: PasswordValidator}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            onChange={e=>setPassword(e.target.value)}
                        />,
                    )}
                </Form.Item>
                <Form.Item style={{ marginBottom: "0" }}>
                    {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)} */}
                    {/* <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
                    <Button type="primary" onClick={handleSubmit} /* htmlType="submit" */ className="login-form-button">
                        Войти
                    </Button>
                    Или <Link to={{pathname: '/auth/register'}}>зарегистрируйтесь</Link>
                </Form.Item>
            </Form >
        </div>
    );
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default connect()(Login)