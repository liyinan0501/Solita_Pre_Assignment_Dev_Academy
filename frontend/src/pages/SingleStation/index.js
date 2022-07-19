import React, { useState } from 'react'

import styles from './index.module.scss'
import { Button, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SingleStation = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Button shape="circle" icon={<SearchOutlined />} onClick={showModal} />
      <div className={styles.root}>
        <Modal title="Station Detail" visible={isModalVisible} onOk={handleOk}>
          <div className="detail">detail</div>
          <p id="pp">{id}</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </>
  )
}

export default SingleStation
