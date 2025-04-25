import Grid from '@mui/material/Grid2'
import styled from 'styled-components'
import StatusDisplay from '../components/Dashboard/StatusDisplay'

const StatusContent = styled.div`
  /* 布局定位 */
  display: flex;
  justify-content: center;
  /* padding: 12px 82px 0px 95px; */
  /* 盒模型 */
  width: 100%;
  margin-bottom: 10px;
`
const productionData = [
  { status: 'NORMAL', count: '135', hours: '9070.0' },
  { status: 'TESTING', count: '00', hours: '040.0' },
  { status: 'SWITCHING', count: '300', hours: '2510.0' },
  { status: 'PAUSED', count: '', hours: '020.0' },
  { status: 'ABNORMAL', count: '00', hours: '2510.0' }
]

function Scoreboard() {
  return (
    <StatusContent>
      <Grid
        container
        sx={{ width: '100%' }}
        spacing={5.4375}
      >
        {/* 狀態展示卡片列表 */}
        {productionData.map((data, index) => (
          <Grid
            size={2.4}
            key={index}
          >
            <StatusDisplay
              status={data.status}
              count={data.count}
              hours={data.hours}
            />
          </Grid>
        ))}
      </Grid>
    </StatusContent>
  )
}

export default Scoreboard

