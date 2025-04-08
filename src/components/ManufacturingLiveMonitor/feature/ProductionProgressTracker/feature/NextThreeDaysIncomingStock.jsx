import { BorderBox } from '../../../styles/Content'
import '../../../components/Marks/DashBordrdMark'

import { BaseCard } from '../../../components/DashboardCard'
import Grid from '@mui/material/Grid2'
import ProcessText from '../components/ProcessText'
import ProgressBarChart from '../components/Dashboard/ProgressBarChart'

function NextThreeDaysIncomingStock() {
  return (
    <BorderBox>
      <BaseCard style={{ backgroundColor: 'transparent' }}>
        <BaseCard.Content>
          <Grid
            container
            size={12}
            spacing={2.5}
          >
            <Grid
              size={9}
              justifyContent={'center'}
              alignContent={'center'}
            >
              <ProgressBarChart
                inStockPercentage={30}
                inStockGradient={{
                  startColor: '#0491B4', // 起始顏色
                  endColor: '#37FFF2 ' // 結束顏色
                }}
              />
            </Grid>
            <Grid size={3}>
              <ProcessText
                data={{
                  title: '未來三天入庫',
                  percentage: 30,
                  quantity: 100000
                }}
              />
            </Grid>
          </Grid>
        </BaseCard.Content>
      </BaseCard>
    </BorderBox>
  )
}

export default NextThreeDaysIncomingStock

