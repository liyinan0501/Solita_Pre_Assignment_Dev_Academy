import { Link } from 'react-router-dom'
import StationList from 'components/Station'
import { useState } from 'react'

import {
  Card,
  Breadcrumb,
  Form,
  Button,
  DatePicker,
  TimePicker,
  InputNumber,
  Input,
  Col,
  Row,
} from 'antd'
import { HomeOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker

const Dashboard = () => {
  const [duration, setDuration] = useState('')
  let params = {}

  const addJourney = ({
    departure_station_id,
    return_station_id,
    covered_distance,
  }) => {
    params.departure_station_id = departure_station_id
    params.return_station_id = return_station_id
    params.covered_distance = covered_distance

    console.log(params)
  }

  const onChange = (changedValues, { date, Time }) => {
    if (Time !== undefined) {
      params.departure =
        date[0].format('YYYY-MM-DD') + ' ' + Time[0].format('HH:mm:ss')
      params.return =
        date[1].format('YYYY-MM-DD') + ' ' + Time[1].format('HH:mm:ss')

      const startTime = +new Date(params.departure)
      const returnTime = +new Date(params.return)
      params.duration = (returnTime - startTime) / 1000
      showDuration(startTime, returnTime, params.duration)
    }
  }

  const showDuration = (startTime, returnTime, count) => {
    let d = parseInt(count / 60 / 60 / 24)
    d = d <= 0 ? '' : d + ' Days'
    let h = parseInt((count / 60 / 60) % 24)
    h = h <= 0 ? '' : h + ' HRS'
    let m = parseInt((count / 60) % 60)
    m = m <= 0 ? '' : m + ' MINS'
    let s = parseInt(count % 60)
    s = s <= 0 ? '' : s + ' SECS'
    setDuration(`${d} ${h} ${m} ${s}`)
  }

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
          </Breadcrumb>
        }
      >
        <Row>
          <Col span={12}>
            <Form onFinish={addJourney} onValuesChange={onChange}>
              <Form.Item label="Date" name="date" labelCol={{ span: 6 }}>
                <RangePicker style={{ width: 266 }} />
              </Form.Item>

              <Form.Item label="Time" name="Time" labelCol={{ span: 6 }}>
                <TimePicker.RangePicker style={{ width: 266 }} />
              </Form.Item>

              <Form.Item
                label="Departure Station"
                name="departure_station_id"
                labelCol={{ span: 6 }}
              >
                <StationList />
              </Form.Item>

              <Form.Item
                label="Return Station"
                name="return_station_id"
                labelCol={{ span: 6 }}
              >
                <StationList />
              </Form.Item>

              <Form.Item
                label="Covered Distance"
                name="covered_distance"
                labelCol={{ span: 6 }}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Duration"
                name="duration"
                labelCol={{ span: 6 }}
              >
                <span>{duration}</span>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Add Journey
                </Button>
              </Form.Item>
            </Form>
          </Col>

          <Col span={12}>
            <Form>
              <Form.Item label="Station Number" labelCol={{ span: 6 }}>
                <InputNumber />
              </Form.Item>

              <Form.Item label="Kapasiteet" labelCol={{ span: 6 }}>
                <InputNumber />
              </Form.Item>

              <Form.Item label="Name" labelCol={{ span: 6 }}>
                <Input style={{ width: 266 }} />
              </Form.Item>

              <Form.Item label="Address" labelCol={{ span: 6 }}>
                <Input style={{ width: 266 }} />
              </Form.Item>

              <Form.Item label="City" labelCol={{ span: 6 }}>
                <Input style={{ width: 266 }} />
              </Form.Item>

              <Form.Item label="Operator" labelCol={{ span: 6 }}>
                <Input style={{ width: 266 }} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Add Station
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Dashboard
