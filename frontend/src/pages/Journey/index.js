import { Link } from 'react-router-dom'
import StationList from 'components/Station'

import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Button, DatePicker, Table } from 'antd'
import { HomeOutlined, BranchesOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { journeysAction } from 'store/actions'
const { RangePicker } = DatePicker

const Journey = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(journeysAction())
  }, [dispatch])

  const { pageNumber, pageSize, totalCount, list } = useSelector(
    (state) => state.journey
  )

  const columns = [
    {
      title: 'Departure Station',
      dataIndex: 'departure_station_name',
    },
    {
      title: 'Return Station',
      dataIndex: 'return_station_name',
    },
    {
      title: 'Cover Distance',
      dataIndex: 'covered_distance',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
    },
  ]

  const onFinish = (values) => {
    console.log(values)
  }

  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home/dashboard">
                <HomeOutlined />
                {` `}Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <BranchesOutlined />
              {` `}Journey
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Departure Station"
            name="nimi"
            labelCol={{ span: 3 }}
          >
            <StationList />
          </Form.Item>

          <Form.Item label="Date" name="date" labelCol={{ span: 3 }}>
            <RangePicker style={{ width: 266 }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3 }}>
            <Button type="primary" htmlType="submit">
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`Total ${totalCount} records:`}>
        <Table columns={columns} dataSource={list} />
      </Card>
    </div>
  )
}

export default Journey
