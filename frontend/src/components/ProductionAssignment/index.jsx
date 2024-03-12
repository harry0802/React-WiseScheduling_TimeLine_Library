import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Table, Select, Form, Input, Button, message, Modal, Tooltip, DatePicker } from 'antd';
import dayjs from 'dayjs';
import CompressIcon from '@mui/icons-material/Compress';
import { SearchOutlined } from '@ant-design/icons';

import {
  useGetProductionAssignmentQuery,
  usePauseStausMutation,
  useCancelStausMutation,
  useActionStausMutation,
  useAddProductionAssignmentMutation,
  useUpdateProductionAssignmentMutation
} from "../../store/api/productionAssignmentApi";
import './index.scss';

import { debounce } from 'lodash'; // 引入 lodash 的 debounce 函數


// 表單編輯設置
const EditableContext = React.createContext(null);

const EditableRow = ({ id, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({ title, editable, children, dataIndex, rule, type, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[rule]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} type={type} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};



const ProductionAssignment = (props) => {

  const defaultColumns = [

    {
      title: 'NO.',
      width: 15,
      fixed: true,
      render: (text, object, index) => {return  index + 1}
    },
    {
      title: '狀態',
      dataIndex: 'status',
      fixed: true,
      width: 36,
    },
    {
      title: '製令單號',
      dataIndex: 'workOrderSN',
      width: 76,
      fixed: true,
      ellipsis: true,
      render: (text) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '模具編號',
      dataIndex: '',
      width: 76,
      fixed: true,
      ellipsis: true,
      render: (text) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '產品名稱',
      dataIndex: 'productName',
      width: 165,
      fixed: true,
      ellipsis: true,
      render: (text) => (
        // 使用 Tooltip 包裹超出部分的内容
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '製令數量',
      dataIndex: 'workOrderQuantity',
      width: 50,
    },
    {
      title: '良品數量',
      dataIndex: 'productionQuantity',
      width: 50,
    },
    {
      title: '不良數',
      dataIndex: 'defectiveQuantity',
      width: 50,
    },
    {
      title: '預計上機日',
      dataIndex: 'planOnMachineDate',
      width: 60,
    },
    {
      title: '實際上機日',
      dataIndex: 'actualOnMachineDate',
      width: 60,
    },

  ];
  // 設定初始當前頁面以及分頁一頁有幾個資料

  const [pagination, setPagination] = useState({
    page: 1, /*當前分頁位址*/
    pageSize: 10, // 默认值为 10
  });
  const [totalCurrent, setTotalCurrent] = useState(1);/*總數據量*/
  const [dataSource, setDataSource] = useState([]);/*回傳資料*/
  // 搜尋條件篩選
  const { Option } = Select;
  // 日期
  const [startDate, setStartDate] = useState(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState('all'); // 狀態
  const [expiryFilter, setExpiryFilter] = useState('all'); // 期限
  const [keywordTypeFilter, setKeywordTypeFilter] = useState('製令單號'); // 關鍵字搜尋類型
  const [machineSN, setMachineSN] = useState(''); // 機台
  
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isSuccess, refetch } = useGetProductionAssignmentQuery({
    start_date: startDate,
    end_date: endDate,
    status_filter: statusFilter ? statusFilter : 'all',

  });

  // 查詢條件
  // 日期換算成週數
  const getWeekNumber = (date) => {
    date = new Date(date);
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  }

  // 製令單狀態
  const allStatusOptions = [
    <Option key={0} value={'all'} label="所有狀態">
      所有狀態
    </Option>,
    <Option key={1} value={'尚未上機'} label="尚未上機">
      尚未上機
    </Option>,
    <Option key={2} value={'On-going'} label="正在生產">
      正在生產
    </Option>,
    <Option key={3} value={'Done'} label="已經完成">
      已經完成
    </Option>,
    <Option key={4} value={'暫停生產'} label="暫停生產">
      暫停生產
    </Option>,
  ];

  // 製令單期限
  const allExpiryOptions = [
    <Option key={0} value={'all'} label="所有狀態">
      所有狀態
    </Option>,
    <Option key={1} value={'無限期'} label="無限期">
      無限期
    </Option>,
    <Option key={2} value={'即將到期'} label="即將到期">
      即將到期
    </Option>,
    <Option key={3} value={'已經到期'} label="已經到期">
      已經到期
    </Option>
  ];

  // 關鍵字搜尋類型
  const allKeywordTypeOptions = [
    <Option key={1} value={'製令單號'} label="製令單號">
      製令單號
    </Option>,
    <Option key={2} value={'產品名稱'} label="產品名稱">
      產品名稱
    </Option>
  ];


  useEffect(() => {
    if (isSuccess) {
      setLoading(true);

      const { data: dataSource, meta } = data;
      // 設定總量
      setDataSource(dataSource);
      setLoading(false);
      setTotalCurrent(meta.total_count);

      // 在获取到最新的 dataSource 后，检查 moldingSecond 和 moldCavity 是否有值
      const newDataWithHourlyCapacity = dataSource.map((item) => {
        if (item.moldingSecond && item.moldCavity) {
          // 计算新的 hourlyCapacity，并使用 Math.floor() 進行無条件捨去
          const newHourlyCapacity = Math.floor((3600 / item.moldingSecond) * item.moldCavity);
          // 更新 dataSource 中的 hourlyCapacity
          return { ...item, hourlyCapacity: newHourlyCapacity };
        }
        return item;
      });

      // 更新 dataSource
      setDataSource(newDataWithHourlyCapacity);

      // 在这里处理 hourlyCapacity 更新后的逻辑
      const newDataWithDailyCapacity = newDataWithHourlyCapacity.map((item) => {
        if (item.hourlyCapacity !== null && item.conversionRate !== null) {
          // 计算新的 dailyCapacity，并使用 Math.floor() 進行無条件捨去
          const newDailyCapacity = Math.floor(item.hourlyCapacity * item.dailyWorkingHours * item.conversionRate);
          // 更新 dataSource 中的 dailyCapacity
          return { ...item, dailyCapacity: newDailyCapacity };
        }
        return item;
      });

      // 更新 dataSource
      setDataSource(newDataWithDailyCapacity);
    }
  }, [statusFilter, isSuccess, data]);




  const [selectionType, setSelectionType] = useState('checkbox');

  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 追蹤選中的行的 id


  // 勾選令機具開始動作
  const [actionStaus] = useActionStausMutation();
  const actionChecked = () => {
    // Get the selected rows' ids
    if (selectedRowKeys.length === 0) {
      message.warning('請先勾選要啟動的項目');
      return;
    }
    const selectedRowsData = dataSource.filter((row) => selectedRowKeys.includes(row.id));

    // Check if the 'actualOnMachineDate' property exists in all selected rows
    const missingActualOnMachineDate = selectedRowsData.some((row) => !row.actualOnMachineDate);

    if (missingActualOnMachineDate) {
      message.warning('請先填寫實際上機日!');
      return;
    }
    // Check if the status is "Done" for any selected rows
    const completedDocuments = selectedRowsData.some((row) => row.status === 'Done');

    if (completedDocuments) {
      message.warning('此單據已經完成，無法進行修改。');
      return;
    }
    const stringIds = JSON.stringify(selectedRowKeys);

    Modal.confirm({
      title: '確認啟動動作',
      content: '確定要啟動所選項目的動作嗎？',
      okText: '確定',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 將勾選的欄位更改其屬性 status 值為"啟動動作"
          await actionStaus(stringIds);

          // 清空勾選
          // setSelectedRowKeys([]);

          message.success('目前狀態已變為正在生產');
        } catch (error) {
          console.error('Error starting production schedules:', error);
        }
      },
    });
  };

  // 勾選設定
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

      setSelectedRowKeys(selectedRowKeys); // 更新選中的行

    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),

  };


  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    return {
      ...col,
      key: col.dataIndex, // 添加了這一行，使用 dataIndex 作為 key
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });



  if (isLoading) {
    return <p>Loading...</p>;
  }

  // 防抖函數，延遲 500 毫秒執行
  // const debouncedHandleDelete = debounce(deleteChecked, 500);
  // const debouncedHandleAction = debounce(actionChecked, 500);
  // const debouncedHandlePause = debounce(pauseChecked, 500);
  // const debouncedHandleAdd = debounce(handleAdd, 500);

  return (
    <div className='prodution-assignment'>
      <div className='box'>

        <div className='title-box'>
          <div className='title'>
            產線派工系統
          </div>
          
          <div className="filter-section">
            <div className="start-date">
              <DatePicker 
                defaultValue={dayjs(startDate)}  
                format='YYYY/MM/DD'
                onChange={(date, dateString) => {setStartDate(dateString);}}
              />
              <div className="week-no">
                {getWeekNumber(startDate)} 週
              </div>
            </div>
            <span className='date-to'>~</span>
            <div className="end-date">
              <DatePicker
                defaultValue={dayjs(endDate)}
                format='YYYY/MM/DD'
                onChange={(date, dateString) => {setEndDate(dateString);}}
              />
              <div className="week-no">
                {getWeekNumber(endDate)} 週
              </div>
            </div>

            <div className="select-box">
              {/* 篩選狀態 */}
              <Select
                className='status-filter'
                placeholder="所有狀態"
                style={{ width: 180, height: 60 }}
                // onChange={(value) => setStatusFilter(value)}
              >
                {allStatusOptions}
              </Select>

              {/* 篩選期限 */}
              <Select
                className='expiry-filter'
                placeholder="全部期限"
                style={{ width: 180, height: 60}}
                onChange={(value) => setExpiryFilter(value)}
              >
                {allExpiryOptions}
              </Select>

              {/* 篩選關鍵字搜尋類型 */}
              <Select
                className='keyword-type-filter'
                placeholder="製令單號"
                style={{ width: 180, height: 60}}
                onChange={(value) => setKeywordTypeFilter(value)}
              >
                {allKeywordTypeOptions}
              </Select>

              <Input
                className='keyword-search'
                placeholder='請輸入關鍵字查詢...'
                style={{ width: 260, marginRight: '15px'}}
                suffix={<SearchOutlined />}
              >
              </Input>
            </div>
            <div className='btn-box'>
              <Tooltip title="搜尋">
                <Button type="primary" shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
            </div>
          </div>

        </div>
        {isSuccess &&
          <Table
            components={components}
            rowClassName={() => "rowClassName1"}
            bordered
            striped={true}
            rowKey="id"  // 在這裡指定 'id' 作為每一行的唯一標識
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            scroll={{ x: 3600 }}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
              columnWidth: '32px'
            }}
          />
        }
      </div>
    </div>
  );
};

export default ProductionAssignment;
