import React, {useState} from 'react'
import { Form, Icon, Input, Button } from 'antd';

import PhoneValidator from '../../validators/PhoneValidator'
import PasswordValidator from '../../validators/PasswordValidator'

import '../../styles/App.sass'
import { Link } from 'react-router-dom';

import {register} from '../../actions'

import { connect } from 'react-redux'

const NormalRegisterForm = ({ dispatch, form }) => {
    const [message, setMessage] = useState('')

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const messageMap = {
        'user already exists': 'Пользователь с таким номером телефона уже существует.',
        'phone is invalid': 'Номер телефона введен некорректно.',
        'password should be at least 5 characters long': 'Слишком короткий пароль'
    }

    const handler = error => {
        setMessage(messageMap[error])
    }

    const handleSubmit = function (e) {
        dispatch(register({phone, password}, handler))
    }

    const { getFieldDecorator } = form;
    return (

        <div>
            <h1>Зарегистрируйтесь</h1>
            {message}
            <Form id="components-form-demo-normal-login" onSubmit={handleSubmit} className="login-form">
                <Form.Item required label="Телефон" style={{ marginBottom: "0" }}>
                    {getFieldDecorator('phone', {
                        rules: [{ validator: PhoneValidator }],
                    })(
                        <Input
                            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Введите номер телефона"
                            onChange={e => setPhone(e.target.value)}
                        />,
                    )}
                </Form.Item>
                <Form.Item required label="Пароль">
                    {getFieldDecorator('password', {
                        rules: [{ validator: PasswordValidator }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />,
                    )}
                </Form.Item>
                <Form.Item style={{ marginBottom: "0" }}>
                    <Button type="primary" onClick={handleSubmit} className="login-form-button">
                        Зарегистрироваться
                    </Button>
                    Или <Link to={{pathname: '/auth/login'}}>авторизуйтесь</Link>
                </Form.Item>
            </Form >
        </div>
    );
}

const Register = Form.create({ name: 'normal_register' })(NormalRegisterForm);

export default connect()(Register)