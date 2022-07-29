import { Link, useNavigate } from 'react-router-dom'
import StationList from 'components/Station'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addJourneyAction } from 'store/actions'

import {
  Card,
  Breadcrumb,
  Form,
  Button,
  DatePicker,
  TimePicker,
  InputNumber,
  Col,
  Row,
  message,
} from 'antd'
import { HomeOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker

const Dashboard = () => {
  const [duration, setDuration] = useState('')
  const [dateState, setDateState] = useState({})
  const [paramsDuration, setParamsDuration] = useState()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  let params = {}

  const addJourney = async ({
    departure_station_id,
    return_station_id,
    covered_distance,
  }) => {
    params.departure_station_id = departure_station_id
    params.return_station_id = return_station_id
    params.covered_distance = covered_distance
    params.departure = dateState.departure
    params.return = dateState.return
    params.duration = paramsDuration

    try {
      await dispatch(addJourneyAction(params))
      message.success('Adding Journey succeeds!', 2, () => {
        navigate(`/home/journey`)
      })
    } catch (e) {
      message.error(e.response?.data?.message, 2)
    }
  }

  const onChange = (changedValues, { date, Time }) => {
    if (Time !== undefined && date !== undefined) {
      if (Time === null || date === null) {
        setDuration('')
        return
      }

      const formedDate = setDate(date, Time)
      const startTime = +new Date(formedDate[0])
      const returnTime = +new Date(formedDate[1])
      const duration = (returnTime - startTime) / 1000
      setParamsDuration(duration)
      showDuration(startTime, returnTime, duration)
    }
  }

  const setDate = (date, Time) => {
    const departure =
      date[0].format('YYYY-MM-DD') + ' ' + Time[0].format('HH:mm:ss')
    const returnJourney =
      date[1].format('YYYY-MM-DD') + ' ' + Time[1].format('HH:mm:ss')
    setDateState({
      departure,
      return: returnJourney,
    })
    return [departure, returnJourney]
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
          <Col span={15}>
            <Form onFinish={addJourney} onValuesChange={onChange}>
              <Form.Item
                label="Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: 'Select the dates',
                  },
                ]}
                labelCol={{ span: 7 }}
              >
                <RangePicker style={{ width: 266 }} />
              </Form.Item>

              <Form.Item
                label="Time"
                name="Time"
                rules={[
                  {
                    required: true,
                    message: 'Select the times',
                  },
                ]}
                labelCol={{ span: 7 }}
              >
                <TimePicker.RangePicker style={{ width: 266 }} />
              </Form.Item>

              <Form.Item
                label="Departure Station"
                name="departure_station_id"
                rules={[
                  {
                    required: true,
                    message: 'Select the a departure station',
                  },
                ]}
                labelCol={{ span: 7 }}
              >
                <StationList />
              </Form.Item>

              <Form.Item
                label="Return Station"
                name="return_station_id"
                rules={[
                  {
                    required: true,
                    message: 'Select the a return station',
                  },
                ]}
                labelCol={{ span: 7 }}
              >
                <StationList />
              </Form.Item>

              <Form.Item
                label="Covered Distance (m)"
                name="covered_distance"
                rules={[
                  {
                    required: true,
                    message: 'input covered distance',
                  },
                ]}
                labelCol={{ span: 7 }}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Duration"
                name="duration"
                labelCol={{ span: 7 }}
              >
                <span>{duration}</span>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 7 }}>
                <Button type="primary" htmlType="submit">
                  Add Journey
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
