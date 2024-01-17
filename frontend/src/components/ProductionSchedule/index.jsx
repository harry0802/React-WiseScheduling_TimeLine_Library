import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faTrashCan, faPlus, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { Table, Select, Popconfirm, Button, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import {
  useGetProductionScheduleQuery,
  useDelProductionScheduleMutation,
  usePauseStausMutation,
  useActionStausMutation,
  useAddProductionScheduleMutation,
  useUpdateProductionScheduleMutation
} from "../../store/api/productionScheduleApi";

import './index.scss';


const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
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
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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

const ProductionSchedule = () => {




  // 設定初始當前頁面以及分頁一頁有幾個資料
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [totalPage, setTotalPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const { data, error, isLoading, isSuccess, refetch } = useGetProductionScheduleQuery({
    size: pagination.size,
    page: pagination.page,
  });



  const handleTableChange = (page) => {
    const newPagination = { ...pagination, page: +page };
    setPagination(newPagination);
  };


  // 新增項目
  const [addProductionSchedule] = useAddProductionScheduleMutation();
  // 置令單創建日期
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [nowDate, setNowDate] = useState(formatDate(new Date())); // 初始值为当前日期


  const handleAdd = () => {
    const newData = {
      productionArea: "A",
      machineSN: "需重新填寫資料",
      workOrderSN: "需重新填寫資料",
      productSN: "需重新填寫資料",
      productName: "需重新填寫資料",
      workOrderQuantity: 1000,
      workOrderDate: nowDate,
      moldingSecond: 30,
      planOnMachineDate: "2024-02-16",
      actualOnMachineDate: "2024-02-16",
      moldWorkDays: 1,
      workDays: 1,
      planFinishDate: "2024-02-16",
      actualFinishDate: "2024-02-16",
      comment: "string",
      dailyWorkingHours: 8,
      moldCavity: 2,
      week: 0,
      singleOrDoubleColor: "single",
      conversionRate: 0.95,
      status: "string"
    };
    addProductionSchedule(newData);

    refetch();

  };


  const [selectionType, setSelectionType] = useState('checkbox');

  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 追蹤選中的行的 id

  const [delProductionSchedule] = useDelProductionScheduleMutation();
  const [pauseStaus] = usePauseStausMutation();
  //勾選刪除
  const deleteChecked = () => {
    // Get the selected rows' ids
    const stringIds = JSON.stringify(selectedRowKeys);
    // console.log('selectedRowKeys', stringIds);

    delProductionSchedule(stringIds);
    refetch();


  };
  // 勾選令機具暫停動作
  const pauseChecked = () => {
    // Get the selected rows' ids
    const stringIds = JSON.stringify(selectedRowKeys);
    // console.log('selectedRowKeys', stringIds);

    // 將勾選的欄位更改其屬性status值為"暫停動作"
    pauseStaus(stringIds);


  };
  const [actionStaus] = useActionStausMutation();

  // 勾選令機具暫停動作
  const actionChecked = () => {
    // Get the selected rows' ids
    const stringIds = JSON.stringify(selectedRowKeys);
    // console.log('selectedRowKeys', stringIds);

    // 將勾選的欄位更改其屬性status值為"暫停動作"
    actionStaus(stringIds);


  };
  // 勾選設定
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys); // 更新選中的行

      console.log(`selectedRowKeysId: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const { Option } = Select;
  const allWeekOptions = [
    <Option key={0} value={null}>
      全部周別
    </Option>,
    ...[...Array(52).keys()].map((week) => (
      <Option key={week + 1} value={week + 1}>
        第{week + 1}周
      </Option>
    ))
  ];


  // 周別篩選
  const [weekFilter, setWeekFilter] = useState(null); // State to store the selected week filter

  const { data: filterData, isSuccess: filterIsSuccess } = useGetProductionScheduleQuery({
    week_filter: weekFilter ? (weekFilter).toString() : null
  });

  // 匯出功能
  const handleExport = () => {
    // 获取当前篩選条件
    const exportParams = {
      week_filter: weekFilter !== null ? (weekFilter).toString() : null,
      // 添加其他篩選條件...
    };

    // 向伺服器發送匯出請求
    // 注意：这里使用的是示例 API，具体匯出功能的实现需要根据你的后端接口进行调整
    fetch(`YOUR_EXPORT_API_ENDPOINT`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 添加其他必要的请求头...
      },
      body: JSON.stringify(exportParams),
    })
      .then((response) => response.blob())
      .then((blob) => {
        // 创建一个 URL 对象，用于生成下载链接
        const url = window.URL.createObjectURL(new Blob([blob]));

        // 创建一个 <a> 元素，模拟点击下载
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'exported_data.csv'); // 下載檔名

        // 将 <a> 元素添加到 DOM 中
        document.body.appendChild(link);

        // 模拟点击下载
        link.click();

        // 移除 <a> 元素
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('匯出失敗', error);
      });
  };


  useEffect(() => {
    if (isSuccess) {
      const { data: dataSource, meta } = data;
      setTotalPage(meta.total_count);
      setDataSource(dataSource);
    }

    if (filterIsSuccess && weekFilter !== null) {
      const { data: filterDataSource, meta } = filterData;
      setTotalPage(meta.total_count);
      setDataSource(filterDataSource);
    }
  }, [isSuccess, data, filterIsSuccess, filterData, weekFilter]);

  const defaultColumns = [

    {
      title: '編號 ',
      dataIndex: 'id',
      width: 80,
      fixed: true,
      editable: true,

    },
    {
      title: '製令單號 ',
      dataIndex: 'workOrderSN',
      width: 170,
      fixed: true,
      editable: true,
    },
    {
      title: '產品名稱',
      width: 180,
      dataIndex: 'productName',
      fixed: true,
      editable: true,
    },
    {
      title: '置令數量',
      dataIndex: 'workOrderQuantity',
      editable: true,
      width: 150,
    },
    {
      title: '置令開立日期',
      dataIndex: 'workOrderDate',
      width: 150,
      editable: true,
    },
    {
      title: '成型秒數',
      dataIndex: 'moldingSecond',
      editable: true,
      width: 100,
    },
    {
      title: '穴數',
      dataIndex: 'moldCavity',
      editable: true,
      width: 70,
    },
    {
      title: '生產區域                     ',
      dataIndex: 'productionArea',
      width: 130,
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 90, background: 'none', color: '#fff' }}
        >
          <Option value="A">A</Option>
          <Option value="B">B</Option>
          <Option value="C">C</Option>
        </Select>
      ),

    },
    {
      title: '機台編號      ',
      dataIndex: 'machineSN',
      editable: true,
      width: 170,
    },
    {
      title: '預計上機日',
      dataIndex: 'planOnMachineDate',
      editable: true,
      width: 150,
    },
    {
      title: '預計完成日',
      dataIndex: 'planFinishDate',
      editable: true,
      width: 150,
    },
    {
      title: '上下機工作日',
      dataIndex: 'actualFinishDate',
      editable: true,
      width: 150,
    },
    {
      title: '日工時',
      dataIndex: 'dailyWorkingHours',
      editable: true,
      width: 100,
    },
    {
      title: '實際上機日',
      dataIndex: 'actualOnMachineDate',
      editable: true,
      width: 150,
    },
    {
      title: '實際完成日',
      dataIndex: 'actualFinishDate',
      editable: true,
      width: 150,
    },
    {
      title: '週別',
      dataIndex: 'week',
      editable: true,
      width: 80,
    },
    {
      title: '產能小時',
      dataIndex: 'hourlyCapacity',
      editable: true,
      width: 100,
    },
    {
      title: '日產能',
      dataIndex: 'dailyCapacity',
      editable: true,
      width: 100,
    },
    {
      title: '工作天數',
      dataIndex: 'workDays',
      editable: true,
      width: 100,
    },
    {
      title: '單雙射',
      dataIndex: 'singleOrDoubleColor',
      editable: true,
      width: 100,
    },
    {
      title: '轉換率 ',
      dataIndex: 'conversionRate',
      editable: true,
      width: 100,
    },
    {
      title: '狀態 ',
      dataIndex: 'status',
      editable: true,
      width: 150,
    },
    {
      title: '備註 ',
      dataIndex: 'comment',
      editable: true,
    },

  ];


  // 編輯
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;

  // const handleEdit = (record) => {
  //   setEditingKey(record.id);
  // };

  const handleSave = (row) => {
    try {
      console.log(123123)
      // useUpdateProductionScheduleMutation(row);  // Replace with the appropriate mutation for updating the production schedule
      setEditingKey('');
    } catch (err) {
      console.log('Save failed:', err);
    }
  };
  const columnsWithEditing = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className='box'>
        <ul style={{ display: 'flex', marginBottom: '10px' }}>
          <li style={{ marginRight: '10px' }}>
            <Link to="/">登入頁面</Link>
          </li>

        </ul>
        <div className='title-box'>
          <div className='title'>
            生產計劃排程表
          </div>
          <div className='btn-box'>
            <Select
              placeholder="全部周別"
              style={{ width: 120, marginRight: '15px' }}
              onChange={(value) => setWeekFilter(value)}
            >
              {allWeekOptions}
            </Select>
            <button
              className='export-btn'
              onClick={handleExport}
              style={{ marginRight: '20px', borderRadius: '10px', height: '35px' }}
            >
              <FontAwesomeIcon icon={faFileExport} style={{ color: 'black' }} />
              下載檔案
            </button>
            <button
              className='delete'
              onClick={deleteChecked}
            >
              <FontAwesomeIcon icon={faTrashCan} style={{ color: '#fff' }} />
            </button>

            <button
              className="normal-action"
              onClick={actionChecked}
            >
              <FontAwesomeIcon icon={faPlay} style={{ color: '#fff' }} />
            </button>
            <button
              className="pause"
              onClick={pauseChecked}
            >
              <FontAwesomeIcon icon={faPause} style={{ color: '#fff' }} />
            </button>

            <button
              className='add'
              onClick={handleAdd}
            >
              <FontAwesomeIcon icon={faPlus} style={{ color: '#fff' }} />
            </button>
          </div>

        </div>
        {isSuccess &&
          <Table
            components={{
              body: {
                row: EditableRow,
                cell: EditableCell,
              },
            }}
            rowClassName={(record) => (isEditing(record) ? 'editable-row' : '')}
            bordered
            rowKey={record => record.id}
            dataSource={dataSource}
            columns={columnsWithEditing}
            pagination={{
              total: totalPage,
              current: pagination.page,
              showSizeChanger: true,
              showQuickJumper: true,
              showSizeChanger: false,
              onChange: handleTableChange,
              position: ['bottomCenter'],

            }}
            scroll={{ x: 3300 }}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
          />
        }

      </div>
    </div>
  );
};

export default ProductionSchedule
  ;
