import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { journeysAction } from 'store/actions'
import StationList from 'components/Station'

import { Card, Breadcrumb, Form, Button, DatePicker, Table } from 'antd'
import { HomeOutlined, BranchesOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker

const Journey = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(journeysAction())
  }, [dispatch])

  const { pageNumber, pageSize, totalCount, list } = useSelector(
    (state) => state.journey
  )

  // default pagination of request params
  let params = {
    pageNumber: 1,
    pageSize: 100,
  }

  // for saving the filtered information
  let filters = useRef({})

  const onFinish = ({ departureStationId, date }) => {
    const paramsFilter = { departureStationId }
    if (date) {
      paramsFilter.departureDate = date[0]
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
      paramsFilter.returnDate = date[1]
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    }
    filters.current = paramsFilter
    dispatch(journeysAction(paramsFilter))
  }

  const changePage = (pageNumber, pageSize) => {
    params = { ...filters.current, pageNumber, pageSize }
    dispatch(journeysAction(params))
  }

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
      title: 'Cover Distance (km)',
      dataIndex: 'covered_distance',
      render: (meters) => (meters / 1000).toFixed(2),
    },
    {
      title: 'Duration (min)',
      dataIndex: 'duration',
      render: (seconds) => (seconds / 60).toFixed(2),
    },
  ]

  return (
    <div>
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
            name="departureStationId"
            labelCol={{ span: 3 }}
            rules={[
              {
                required: true,
                message: 'Please input a departure station',
              },
            ]}
          >
            <StationList />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            labelCol={{ span: 3 }}
            rules={[
              {
                required: true,
                message: 'Please input a date',
              },
            ]}
          >
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
        <Table
          columns={columns}
          dataSource={list}
          rowKey="id"
          pagination={{
            position: ['bottomCenter'],
            total: totalCount,
            pageSize,
            current: pageNumber,
            onChange: changePage,
          }}
        />
      </Card>
    </div>
  )
}

export default Journey
