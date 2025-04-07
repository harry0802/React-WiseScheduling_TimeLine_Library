import { useEffect } from 'react'
import { Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useHeaderNameStore } from '../../slice/LayoutSlice'
import { useParams } from 'react-router-dom'
import DailyIncomingStock from './feature/DailyInComingStock'
import ProgressBarChart from './components/Dashboard/ProgressBarChart'
import DailyProductionTasks from './feature/DailyProductionTasks'

function ProductionProgressTracker() {
  const { setHeaderName } = useHeaderNameStore()
  useEffect(() => {
    setHeaderName('即時生產進度追蹤')
  }, [])

  return (
    <section>
      <Stack spacing={2.5}>
        <Grid
          container
          spacing={2.5}
          size={12}
        >
          <Grid
            size={6}
            spacing={2.5}
          >
            <DailyIncomingStock />
          </Grid>
          <Grid
            size={6}
            spacing={2.5}
          >
            <DailyProductionTasks />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2.5}
        >
          <Grid
            size={12}
            height={100}
          >
            <ProgressBarChart
              inStockPercentage={40}
              inStockGradient={{
                startColor: '#48dbfb', // 起始顏色
                endColor: '#0abde3' // 結束顏色
              }}
            />
          </Grid>
        </Grid>
      </Stack>
    </section>
  )
}

export default ProductionProgressTracker

