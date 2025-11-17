import { useEffect } from 'react'
import { Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useHeaderNameStore } from '../../slice/LayoutSlice'
import MachineOperationRate from './feature/MachineOperationRate'
import MachineOperationSummary from './feature/MachineOperationSummary'
import DowntimeFactors from './feature/DowntimeFactors'
import MachineStatusDuration from './feature/MachineStatusDuration'
import useDocumentTitle from '../../../../hooks/useDocumentTitle'

function OEEInsightSystem() {
  // 設置頁面標題
  useDocumentTitle('OEE 深度分析');

  const { setHeaderName } = useHeaderNameStore()
  useEffect(() => {
    setHeaderName('全廠設備稼動分析')
  }, [])
  return (
    <section>
      <Stack
        marginTop={1.25}
        spacing={2.5}
      >
        <Grid
          container
          spacing={1.25}
          size={12}
          width={'100%'}
          height={'430px'}
        >
          <Grid size={3}>
            <MachineOperationRate />
          </Grid>
          <Grid size={3}>
            <MachineOperationSummary />
          </Grid>
          <Grid size={6}>
            <DowntimeFactors />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1.25}
          size={12}
          height={'510px'}
        >
          <MachineStatusDuration />
        </Grid>
      </Stack>
    </section>
  )
}

export default OEEInsightSystem

