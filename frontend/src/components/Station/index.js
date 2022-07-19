import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stationListAction } from 'store/actions'

import { Select } from 'antd'
const { Option } = Select

function StationList({ value, onChange }) {
  const dispatch = useDispatch()
  const stationList = useSelector((state) => state.stationList)

  useEffect(() => {
    dispatch(stationListAction())
  })

  return (
    <Select
      placeholder="Select a departure station name or number"
      value={value}
      onChange={onChange}
      style={{ width: 330 }}
    >
      {stationList.map((item) => (
        <Option key={item.id} value={item.id}>
          {item.nimi}
          <span style={{ float: 'right' }}>{item.id}</span>
        </Option>
      ))}
    </Select>
  )
}

export default StationList
