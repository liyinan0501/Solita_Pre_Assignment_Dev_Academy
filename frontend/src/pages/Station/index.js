import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { stationsAction } from 'store/actions'
import StationList from 'components/Station'
import SingleStation from 'pages/SingleStation'

import { Card, Breadcrumb, Form, Button, Table } from 'antd'
import { HomeOutlined, FlagOutlined } from '@ant-design/icons'

const Station = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(stationsAction())
  }, [dispatch])

  const { pageNumber, pageSize, totalCount, list } = useSelector(
    (state) => state.stations
  )

  // default pagination of request params
  let params = {
    pageNumber: 1,
    pageSize: 100,
  }

  // for saving the searched information
  let search = useRef({})

  const onFinish = ({ stationId }) => {
    const paramsSearch = { stationId }
    search.current = paramsSearch
    dispatch(stationsAction(paramsSearch))
  }

  const changePage = (pageNumber, pageSize) => {
    params = { ...search.current, pageNumber, pageSize }
    dispatch(stationsAction(params))
  }

  const columns = [
    {
      title: 'Number',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'nimi',
    },
    {
      title: 'Address',
      dataIndex: 'osoite',
    },
    {
      title: 'City',
      dataIndex: 'kaupunki',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id) => {
        return <SingleStation id={id}></SingleStation>
      },
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
              <FlagOutlined />
              {` `}Journey
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Station Name"
            name="stationId"
            labelCol={{ span: 3 }}
            rules={[
              {
                required: true,
                message: 'Please input a station',
              },
            ]}
          >
            <StationList />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3 }}>
            <Button type="primary" htmlType="submit">
              Search
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

export default Station
