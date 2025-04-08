import { useEffect } from 'react'
import { Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useHeaderNameStore } from '../../slice/LayoutSlice'
import DailyIncomingStock from './feature/DailyInComingStock'
import NextThreeDaysIncomingStock from './feature/NextThreeDaysIncomingStock'
import DailyProductionTasks from './feature/DailyProductionTasks'

function ProductionProgressTracker() {
  const { setHeaderName } = useHeaderNameStore()
  useEffect(() => {
    setHeaderName('即時生產進度追蹤')
  }, [])

  return (
    <section>
      <Stack
        marginTop={1.25}
        spacing={2.5}
      >
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
            <NextThreeDaysIncomingStock />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2.5}
        >
          <Grid
            size={12}
            height={'100%'}
          >
            <DailyProductionTasks />
          </Grid>
        </Grid>
      </Stack>
    </section>
  )
}

export default ProductionProgressTracker

