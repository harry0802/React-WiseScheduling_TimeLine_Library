import React, { useState, useEffect } from 'react';
import { Slider as MuiSlider } from '@mui/material';
import styled from 'styled-components';

// 使用 styled-components 定義整體容器
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SliderContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SliderLabel = styled.p`
  margin-bottom: 1rem;
  font-weight: 500;
`;

const SliderWrapper = styled.div`
  padding: 0 1.5rem;
`;

const VisualizationTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DataCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  text-align: center;
`;

const BarContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const DataBar = styled.div`
  width: 80%;
  height: ${props => props.height}%;
  background-color: #3a8589;
  transition: height 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: white;
  font-weight: bold;
`;

const DataLabel = styled.p`
  margin-top: 0.5rem;
  color: #666;
`;

const InfoSection = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
`;

// 模擬數據
const generateData = (value) => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    value: Math.floor(Math.random() * value) + 10,
    label: `數據 ${i + 1}`
  }));
};

const Slider = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [data, setData] = useState([]);
  
  // 當滑動器值變化時更新數據
  useEffect(() => {
    setData(generateData(sliderValue));
  }, [sliderValue]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  
  // 計算條形高度的最大值用於正規化
  const maxDataValue = Math.max(...data.map(item => item.value));

  return (
    <Container>
      <Title>數據可視化滑動器</Title>
      
      <SliderContainer>
        <SliderLabel>調整數據範圍（目前值：{sliderValue}）</SliderLabel>
        <SliderWrapper>
          <MuiSlider
            value={sliderValue}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={10}
            max={100}
            sx={{
              color: '#3a8589',
              height: 8,
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                height: 24,
                width: 24,
                backgroundColor: '#fff',
                border: '2px solid currentColor',
                '&:focus, &:hover, &.Mui-active': {
                  boxShadow: 'inherit',
                },
              },
            }}
          />
        </SliderWrapper>
      </SliderContainer>
      
      <VisualizationTitle>視覺化結果</VisualizationTitle>
      
      <DataGrid>
        {data.map((item) => (
          <DataCard key={item.id}>
            <CardContent>
              <BarContainer>
                <DataBar 
                  height={(item.value / maxDataValue) * 100}
                >
                  {item.value}
                </DataBar>
              </BarContainer>
              <DataLabel>{item.label}</DataLabel>
            </CardContent>
          </DataCard>
        ))}
      </DataGrid>
      
      <InfoSection>
        <InfoTitle>使用指南</InfoTitle>
        <InfoText>
          移動滑動器來改變數據可視化的範圍。數據值會隨著滑動器的值動態調整，讓你可以即時觀察不同數據範圍的視覺效果。
        </InfoText>
        <InfoText>
          此示例顯示了如何使用滑動器元件來控制數據的顯示方式，你可以用類似的方式來實現更複雜的數據可視化專案。
        </InfoText>
      </InfoSection>
    </Container>
  );
};

export default Slider;
