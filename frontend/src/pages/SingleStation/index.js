import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { singleStationAction, showDetailAction } from 'store/actions'

import { Button, Modal, Table, Divider } from 'antd'
import styles from './index.module.scss'

const SingleStation = ({ id }) => {
  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    setIsModalVisible(true)
    dispatch(singleStationAction(id))
  }, [dispatch, id])

  const stationDetail = useSelector((item) => item.singleStation)
  const handleOk = () => {
    dispatch(showDetailAction(false, 0))
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: 'Return Station',
      dataIndex: 'return_station_name',
    },
    {
      title: 'Amount',
      dataIndex: 'times',
    },
  ]

  const columns1 = [
    {
      title: 'Departure Station',
      dataIndex: 'departure_station_name',
    },
    {
      title: 'Amount',
      dataIndex: 'times',
    },
  ]

  return (
    <div>
      <Modal
        title="Station Detail"
        visible={isModalVisible}
        closable={false}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
        width={750}
        destroyOnClose={true}
        wrapClassName={styles.root}
      >
        <h1>
          <span className="underline--magical">{stationDetail.nimi}</span>
        </h1>

        <h2>{stationDetail.osoite}</h2>
        <Divider />

        <h3>
          Total number of journeys starting from the station:{' '}
          <span>{stationDetail.startCount}</span>
        </h3>

        <h3>
          Total number of journeys ending at the station:
          <span>{stationDetail.endCount}</span>
        </h3>

        <h3>
          The average distance of a journey starting from the station:{' '}
          <span>≈ {(stationDetail.startAvg / 1000).toFixed(2)} km</span>
        </h3>

        <h3>
          The average distance of a journey ending at the station:{' '}
          <span>≈ {(stationDetail.endAvg / 1000).toFixed(2)} km</span>
        </h3>
        <Divider />

        <Divider>
          <h3>
            Top 5 most popular return stations for journeys starting from the
            station
          </h3>
        </Divider>

        <Table
          columns={columns}
          dataSource={stationDetail.topReturn}
          rowKey="return_station_name"
          pagination={false}
        />

        <Divider>
          <h3>
            Top 5 most popular departure stations for journeys ending at the
            station
          </h3>
        </Divider>
        <Table
          columns={columns1}
          dataSource={stationDetail.topDeparture}
          rowKey="departure_station_name"
          pagination={false}
        />
      </Modal>
    </div>
  )
}

export default SingleStation
