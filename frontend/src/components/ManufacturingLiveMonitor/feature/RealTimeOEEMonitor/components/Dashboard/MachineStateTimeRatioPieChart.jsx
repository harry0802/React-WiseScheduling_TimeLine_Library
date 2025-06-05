import { Charts } from '@iimm/data-view-react'
import { DEVICE_STATUS_COLORS, oklchToHex } from '../../../../configs/Color'
import { colors } from '@mui/material'

const option1 = {
  color: [
    oklchToHex(DEVICE_STATUS_COLORS.NORMAL_PRODUCTION),
    oklchToHex(DEVICE_STATUS_COLORS.TRIAL_MODE),
    oklchToHex(DEVICE_STATUS_COLORS.ADJUSTMENT_MODE),
    oklchToHex(DEVICE_STATUS_COLORS.SHUTDOWN_STATE),
    oklchToHex(DEVICE_STATUS_COLORS.ERROR_STATE)
  ],
  series: [
    {
      type: 'pie',
      radius: '75%',
      data: [
        { name: '可口可乐', value: 93 },
        { name: '百事可乐', value: 32 },
        { name: '哇哈哈', value: 65 },
        { name: '康师傅', value: 44 },
        { name: '统一', value: 52 }
      ],
      insideLabel: {
        show: true,
        formatter: '{percent}%',
        style: {
          fontSize: 17, // 放大內部標籤，預設是 10
          fill: '#fff',
          textAlign: 'center',
          textBaseline: 'middle'
        }
      },
      outsideLabel: {
        show: true,
        formatter: '{name}',
        style: {
          fontSize: 14, // 放大外部標籤，預設是 11
          fill: '#fff'
        }
      }
    }
  ]
}

function MachineStateTimeRatioPieChart() {
  return (
    <div style={{ width: '100%', height: '270px' }}>
      <Charts option={option1} />
    </div>
  )
}

export default MachineStateTimeRatioPieChart

