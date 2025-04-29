import BaseSection from '../components/BaseSection'
import DashboardCard from '../components/DashboardCard'
import styled from 'styled-components'
const equipmentData = [
  {
    id: 'B1',
    model: 'CT-12345',
    goodRate: 85,
    completionRate: 72,
    status: 'success'
  },
  {
    id: 'B2',
    model: 'WQ-87439',
    goodRate: 45,
    completionRate: 60,
    status: 'warning'
  },
  {
    id: 'B3',
    model: 'FT-39087',
    goodRate: 12,
    completionRate: 24,
    status: 'danger'
  },
  {
    id: 'B4',
    model: '--',
    goodRate: 0,
    completionRate: 0,
    status: 'inactive'
  }
]

// 卡片網格容器
const CardGrid = styled.div`
  width: 100%;
  display: flex;
  gap: 2.875rem;
`
function ProductionZoneA() {
  return (
    <BaseSection backgroundImage={'public/images/ProductionZoneA.jpg'}>
      <CardGrid>
        {equipmentData.map((equipment) => (
          <DashboardCard
            key={equipment.id}
            status={equipment.status}
          >
            <DashboardCard.Header
              id={equipment.id}
              model={equipment.model}
            />
            <DashboardCard.Stats
              goodRate={equipment.goodRate}
              completionRate={equipment.completionRate}
            />
          </DashboardCard>
        ))}
      </CardGrid>
    </BaseSection>
  )
}

export default ProductionZoneA

