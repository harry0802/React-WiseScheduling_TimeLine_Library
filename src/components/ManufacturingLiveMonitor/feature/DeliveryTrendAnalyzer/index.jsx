import { useEffect } from 'react'
import { Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useHeaderNameStore } from '../../slice/LayoutSlice'
import RecentShippingPanel from './feature/RecentShippingPanel'
import TodayShippingPanel from './feature/TodayShippingPanel'
import useDocumentTitle from '../../../../hooks/useDocumentTitle'

function DeliveryTrendAnalyzer() {
  // 設置頁面標題
  useDocumentTitle('交貨趨勢分析');

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
          <Grid size={12}>
            <RecentShippingPanel />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2.5}
        >
          <Grid
            size={12}
            maxHeight={'330px'}
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

