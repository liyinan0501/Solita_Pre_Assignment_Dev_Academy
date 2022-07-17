import styles from './index.module.scss'
import { Layout, Menu, Popconfirm } from 'antd'

import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from 'store/actions'

import {
  HomeOutlined,
  BranchesOutlined,
  FlagOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
const { Header, Content, Sider } = Layout

const siderItems = [
  {
    key: '/home/dashboard',
    icon: <HomeOutlined />,
    label: <Link to="/home/dashboard">Home</Link>,
  },
  {
    key: '/home/journey',
    icon: <BranchesOutlined />,
    label: <Link to="/home/journey">Journey</Link>,
  },
  {
    key: '/home/station',
    icon: <FlagOutlined />,
    label: <Link to="/home/station">Station</Link>,
  },
]

const LayoutComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const logoutConfirm = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.root}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <div className="profile">
            <span>User</span>
            <span>
              {' '}
              <Popconfirm
                title="Are you sure to logout?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={logoutConfirm}
              >
                <LogoutOutlined />
                {` `}Logout
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={siderItems}
              theme="dark"
            ></Menu>
          </Sider>
          <Layout
            style={{
              padding: '24px',
            }}
          >
            <Content className="site-layout-background">
              <Outlet></Outlet>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default LayoutComponent
