import React from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import { fetchIdentity } from '../../actions'
import { logout } from '../../actions'

import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';

const Profile = ({ logout, fetchIdentity, user }) => {

    if (user.phone === null) {
        fetchIdentity()
    }

    return (
        <div>
            <h1>Профиль</h1>
            <Form id="components-form-demo-normal-login" className="login-form">
                <Row gutter={[16, 16]}>
                    <Col sm={24} md={12} xl={6}>
                        <Form.Item colon={false} label="Телефон" style={{ marginBottom: "0" }}>
                            <Input
                                readOnly
                                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Введите номер телефона"
                                value={user.phone}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={logout} style={{ width: '50%' }} type="danger" className="login-form-button">
                                Выйти
                            </Button>
                        </Form.Item>
                        </Col>
                        <Col sm={24} md={12} xl={6}>
                        <Form.Item style={{marginBottom: 0}} colon={false} label="Email">
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                value="john.doe@mail.com"
                            />
                        </Form.Item>
                        <Form.Item style={{marginBottom: 0}} colon={false} label="Имя">
                            <Input
                                value="Джон"
                            />
                        </Form.Item>
                        <Form.Item style={{marginBottom: 0}} colon={false} label="Фамилия">
                            <Input
                                value="Доу"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form >
        </div>
    )
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    fetchIdentity: PropTypes.func
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    fetchIdentity: () => dispatch(fetchIdentity()),
    logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)