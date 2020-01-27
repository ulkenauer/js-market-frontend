//VIEW
import React, { useState } from 'react'
import { Form, Icon, Input, Button } from 'antd';

import { Link } from 'react-router-dom';

import PhoneValidator from '../../validators/PhoneValidator'
import PasswordValidator from '../../validators/PasswordValidator'


const NormalLoginForm = ({ login, form }) => {
    
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
        login({phone, password}, handler)
    }

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')


    const { getFieldDecorator } = form;
    return (
        <div>
            <h1>Авторизуйтесь</h1>
            {message}
            <Form id="components-form-demo-normal-login" onSubmit={handleSubmit} className="login-form">
                <Form.Item required label="Телефон" style={{ marginBottom: "0" }}>
                    {getFieldDecorator('phone', {
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
                    <Button type="primary" onClick={handleSubmit} className="login-form-button">
                        Войти
                    </Button>
                    Или <Link to={{pathname: '/auth/register'}}>зарегистрируйтесь</Link>
                </Form.Item>
            </Form >
        </div>
    );
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login