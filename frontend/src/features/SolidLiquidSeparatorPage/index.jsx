import React, { useEffect, useState } from 'react';
import GraphicLoading from '../../components/ChartUI/GraphicLoading';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MainPage from 'app/MainPage';
import classes from './index.module.scss';

export default function SolidLiquidSeparatorPage() {
  const [data, setData] = useState([
    {
      "id": 5,
      "name": "SEPARATOR",
      "label": "固液分離機1",
      "type": "SEPARATOR",
      "values": [
        {
          "id": 101,
          "name": "EXTRUDER_STATE",
          "label": "擠壓機狀態",
          "value": true,
          "unit": ""
        },
        {
          "id": 102,
          "name": "EXTRUDER_OVERLOAD",
          "label": "擠壓機異常",
          "value": false,
          "unit": ""
        },
        {
          "id": 103,
          "name": "WASHER_STATE",
          "label": "清洗機狀態",
          "value": false,
          "unit": ""
        },
        {
          "id": 104,
          "name": "WASHER_OVERLOAD",
          "label": "清洗機異常",
          "value": true,
          "unit": ""
        }
      ]
    },
    {
      "id": 6,
      "name": "SEPARATOR",
      "label": "固液分離機2",
      "type": "SEPARATOR",
      "values": [
        {
          "id": 105,
          "name": "EXTRUDER_STATE",
          "label": "擠壓機狀態",
          "value": false,
          "unit": ""
        },
        {
          "id": 106,
          "name": "EXTRUDER_OVERLOAD",
          "label": "擠壓機異常",
          "value": false,
          "unit": ""
        },
        {
          "id": 107,
          "name": "WASHER_STATE",
          "label": "清洗機狀態",
          "value": false,
          "unit": ""
        },
        {
          "id": 108,
          "name": "WASHER_OVERLOAD",
          "label": "清洗機異常",
          "value": false,
          "unit": ""
        }
      ]
    },
    {
      "id": 76,
      "name": "SEPARATOR",
      "label": "固液分離機3",
      "type": "SEPARATOR",
      "values": [
        {
          "id": 7105,
          "name": "EXTRUDER_STATE",
          "label": "擠壓機狀態",
          "value": false,
          "unit": ""
        },
        {
          "id": 7106,
          "name": "EXTRUDER_OVERLOAD",
          "label": "擠壓機異常",
          "value": true,
          "unit": ""
        },
        {
          "id": 7107,
          "name": "WASHER_STATE",
          "label": "清洗機狀態",
          "value": true,
          "unit": ""
        },
        {
          "id": 7108,
          "name": "WASHER_OVERLOAD",
          "label": "清洗機異常",
          "value": false,
          "unit": ""
        }
      ]
    },

  ]);


  // 假設api請求成功
  const isOK = true;

  // 設定Item style
  const Item = styled(Paper)(({ theme, status }) => {
    let background;
    switch (status) {
      case 'NORMAL':
        background = 'linear-gradient(180deg, #000 0%, #36F096 81.58%)';
        break;
      case 'OVERLOAD':
        background = 'linear-gradient(180deg, #000 0%, #F00 81.58%)';
        break;
      case 'UNNORMAL':
        background = 'linear-gradient(180deg, #A5A5A5 0%, #000 81.58%)';
        break;
      default:
        background = 'linear-gradient(180deg, #000 0%, #36F096 81.58%)';
    }

    return `
      position: relative;
      border-radius: 10px;
      box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
      border: 1px solid #8f8f8f;
      padding: ${theme.spacing(1)};
      text-align: center;
      color: ${theme.palette.text.secondary};
      background: ${background};
    `;
  });

  const [separatorStates, setSeparatorStates] = useState({});

  useEffect(() => {
    const processSeparator = (separator) => {
      const EXTRUDER_STATE_ARRAY = separator.values.slice(0, 2);
      const EXTRUDER_OVERLOAD_ARRAY = separator.values.slice(2);

      const setStateStatus = (status) => {
        setSeparatorStates((prevStates) => ({
          ...prevStates,
          [separator.id]: {
            ...prevStates[separator.id],
            ...status,
          },
        }));
      };

      if (EXTRUDER_STATE_ARRAY[1]?.value) {
        setStateStatus({
          extruderStateStatus: false,
          EXTRUDER_STATE: 'OVERLOAD',
        });
      } else if (EXTRUDER_STATE_ARRAY[0]?.value) {
        setStateStatus({
          extruderStateStatus: true,
          EXTRUDER_STATE: 'NORMAL',
        });
      } else {
        setStateStatus({
          extruderStateStatus: false,
          EXTRUDER_STATE: 'UNNORMAL',
        });
      }

      if (EXTRUDER_OVERLOAD_ARRAY[1]?.value) {
        setStateStatus({
          extruderOverloadStatus: false,
          WASHER_STATE: 'OVERLOAD',
        });
      } else if (EXTRUDER_OVERLOAD_ARRAY[0]?.value) {
        setStateStatus({
          extruderOverloadStatus: true,
          WASHER_STATE: 'NORMAL',
        });
      } else {
        setStateStatus({
          extruderOverloadStatus: false,
          WASHER_STATE: 'UNNORMAL',
        });
      }
    };

    data.forEach(processSeparator);
  }, [data]);

  const renderGridItem = (separator) => {
    const separatorState = separatorStates[separator.id];

    return (
      <div className={classes.separatorStateBox} key={`separator-${separator.id}`} >

        <div item className={classes.EXTRUDER_STATE} key={`state-${separator.id}-extruder`}>
          <Item
            className={classes.Item}
            status={separatorState?.EXTRUDER_STATE || 'NORMAL'}
          >
            <span className={classes.Title}>
              {separator.label} --- 擠壓機
            </span>
            <div className={classes.GraphicLoadingBox}>
              <GraphicLoading loop={separatorState?.extruderStateStatus} />
            </div>
          </Item>
        </div>
        <div item className={classes.WASHER_STATE} key={`state-${separator.id}-watch`}>
          <Item
            className={classes.Item}
            status={separatorState?.WASHER_STATE || 'NORMAL'}
          >
            <span className={classes.Title}>
              {separator.label} --- 清洗機
            </span>
            <div className={classes.GraphicLoadingBox}>

              <GraphicLoading loop={separatorState?.extruderOverloadStatus} />
            </div>

          </Item>
        </div>
      </div>
    );
  };

  return (
    <MainPage id="monitor-page">
      {isOK && data.map((separator) => renderGridItem(separator))}
    </MainPage>
  );
}