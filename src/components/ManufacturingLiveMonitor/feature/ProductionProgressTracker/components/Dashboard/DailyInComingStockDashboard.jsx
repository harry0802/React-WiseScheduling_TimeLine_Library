import { PercentPond } from '@iimm/data-view-react'
import styled from 'styled-components'

const data = {
  value: 78.9,
  colors: ['#04B30A', '#37FFF2'],
  lineDash: [0, 0],
  borderGap: 0.0,
  borderRadius: 1,
  formatter: '已經入庫 {value} %'
}

const PercentPondProcess = styled(PercentPond)`
  width: 100%;
  height: 40%;
`

function DailyInComingStockDashboard() {
  return (
    <>
      <PercentPondProcess config={data} />
    </>
  )
}

export default DailyInComingStockDashboard

