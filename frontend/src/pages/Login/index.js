import styles from './index.module.scss'
import logo from 'assets/Solita-logo.png'
import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import { useDispatch } from 'react-redux'
import { loginAction } from 'store/actions/index'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [loadings, setLoadings] = useState(false)

  const onFinish = async (values) => {
    const { username, password } = values
    setLoadings(true)
    try {
      await dispatch(loginAction(username, password))
      message.success('Login succeeds!', 1, () => {
        location.state?.from
          ? navigate(location.state.from)
          : navigate('/home/dashboard', { replace: true })
      })
    } catch (e) {
      message.error(e.response.data.message, 1, () => {
        setLoadings(false)
      })
    }
  }

  return (
    <div className={styles.root}>
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="solita_logo" />
        <Form
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
          //! Only for development
          initialValues={{
            username: 'solita123',
            password: '123456',
            remember: true,
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                pattern: /^[a-zA-Z0-9]+$/,
                message: 'input a correct username',
                validateTrigger: 'onBlur',
              },
              {
                required: true,
                message: 'username can not be empty.',
              },
            ]}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 17,
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'password can not be empty.',
              },
            ]}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 17,
            }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loadings}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
