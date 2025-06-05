import { useEffect } from 'react'
import { Stack, Grid } from '@mui/material'
import { useHeaderNameStore } from '../../slice/LayoutSlice'
import RecentShippingPanel from './feature/RecentShippingPanel'
import TodayShippingPanel from './feature/TodayShippingPanel'
function DeliveryTrendAnalyzer() {
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
        >
          <Grid item xs={12}>
            <RecentShippingPanel />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2.5}
        >
          <Grid
            item
            xs={12}
            sx={{ maxHeight: '330px' }}
          >
            <TodayShippingPanel />
          </Grid>
        </Grid>
      </Stack>
    </section>
  )
}
// sdas
export default DeliveryTrendAnalyzer

