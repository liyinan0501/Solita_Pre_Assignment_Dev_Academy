import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SingleStationAction, showDetailAction } from 'store/actions'

import { Button, Modal } from 'antd'

const SingleStation = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(SingleStationAction(id))
    setIsModalVisible(true)
  }, [dispatch, id])

  const stationDetail = useSelector((item) => item.singleStation)
  const handleOk = () => {
    dispatch(showDetailAction(false, 0))
    setIsModalVisible(false)
  }

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
        width={620}
        destroyOnClose={true}
      >
        <h3>Station Name</h3>
        <p>{stationDetail.nimi}</p>
        <h3>Station Address</h3>
        <p>{stationDetail.osoite}</p>
        <h3>Total number of journeys starting from the station</h3>
        <p>{stationDetail.startCount}</p>
        <h3>Total number of journeys ending at the station</h3>
        <p>{stationDetail.endCount}</p>
        <h3>The average distance of a journey starting from the station</h3>
        <p>{stationDetail.startAvg}(m)</p>
        <h3>The average distance of a journey ending at the station</h3>
        <p>{stationDetail.endAvg}(m)</p>
        <h3>
          Top 5 most popular return stations for journeys starting from the
          station
        </h3>
        <h3>
          Top 5 most popular departure stations for journeys ending at the
          station
        </h3>
      </Modal>
    </div>
  )
}

export default SingleStation
