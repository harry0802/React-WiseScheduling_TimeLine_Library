import { Charts } from '@iimm/data-view-react'
import { DEVICE_STATUS_COLORS, oklchToHex } from '../../../../configs/Color'

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
      data: [
        { name: '可口可乐', value: 93 },
        { name: '百事可乐', value: 32 },
        { name: '哇哈哈', value: 65 },
        { name: '康师傅', value: 44 },
        { name: '统一', value: 52 }
      ],
      sortData: true,
      radius: ['50%', '70%'],
      outsideLabel: {
        show: true,
        formatter: '{name} : \n   {percent}%', // 使用 \n 實現換行
        labelLineEndLength: 20, // 引導線長度
        labelLineBendGap: 20, // 引導線彎曲程度
        style: {
          fontSize: 16,
          fill: '#fff',
          fontWeight: 'bold'
        }
      },
      insideLabel: {
        // show: true,
        style: {
          fontSize: 14,
          fill: '#fff',
          fontWeight: 'normal'
        }
      }
    }
  ]
}
function MachineOperationRateDashboard() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'
      }}
    >
      <Charts
        option={option1}
        style={{ height: '300px', width: '100%', margin: 'auto' }}
      />
    </div>
  )
}

export default MachineOperationRateDashboard

