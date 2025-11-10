import { BorderBox } from '../../../styles/Content'
import '../../../components/Marks/DashBordrdMark'

import { BaseCard } from '../../../components/DashboardCard'
import Grid from '@mui/material/Grid2'
import ProcessText from '../components/ProcessText'
import ProgressBarChart from '../components/Dashboard/ProgressBarChart'

function DailyIncomingStock() {
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
                  startColor: '#04B30A ', // 起始顏色
                  endColor: '#37FFF2 ' // 結束顏色
                }}
              />
            </Grid>
            <Grid size={3}>
              <ProcessText
                data={{
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

export default DailyIncomingStock

