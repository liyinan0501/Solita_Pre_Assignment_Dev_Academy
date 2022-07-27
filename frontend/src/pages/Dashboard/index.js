import { Link } from 'react-router-dom'
import StationList from 'components/Station'

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
            <Form>
              <Form.Item label="Date" name="date" labelCol={{ span: 6 }}>
                <RangePicker style={{ width: 266 }} />
              </Form.Item>

              <Form.Item label="Time" name="Time" labelCol={{ span: 6 }}>
                <TimePicker.RangePicker style={{ width: 266 }} />
              </Form.Item>

              <Form.Item label="Departure Station" labelCol={{ span: 6 }}>
                <StationList />
              </Form.Item>

              <Form.Item label="Return Station" labelCol={{ span: 6 }}>
                <StationList />
              </Form.Item>

              <Form.Item label="Covered Distance" labelCol={{ span: 6 }}>
                <InputNumber />
              </Form.Item>

              <Form.Item label="Duration" labelCol={{ span: 6 }}>
                <InputNumber />
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
