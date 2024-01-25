import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Table, Select, Form, Input, Button, message, Modal, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import {
  useGetProductionScheduleQuery,
  // useDelProductionScheduleMutation,
  usePauseStausMutation,
  useCancelStausMutation,
  useActionStausMutation,
  useAddProductionScheduleMutation,
  useUpdateProductionScheduleMutation
} from "../../store/api/productionScheduleApi";
import './index.scss';
// import SimpleDemo from './SimpleDemo';
import { saveAs } from 'file-saver';
import Exceljs from 'exceljs';
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

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
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
      // rules={[
      //   {
      //     required: true,
      //     message: `${title} is required.`,
      //   },
      // ]}
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



const ProductionSchedule = (props) => {
  // 設定初始當前頁面以及分頁一頁有幾個資料
  const [pagination, setPagination] = useState({
    current: 1, /*當前分頁位址*/
    pageSize: 10, // 默认值为 10
    pageSizeOptions: ['10', '20', '50', '100'],/*分頁數量*/
  });
  const [totalPage, setTotalPage] = useState(1);/*總分頁*/
  const [dataSource, setDataSource] = useState([]);/*回傳資料*/

  const { data, isLoading, isSuccess, refetch } = useGetProductionScheduleQuery({
    size: pagination.pageSizeOptions,/*分頁數量*/
    page: pagination.current,/*想取得的分頁位址*/
    enabled: true, // 確保自動觸發一次查詢

  });

  //page參數是為Table裡配置pagination取得的當前分頁 
  const handleTableChange = (page, size) => {
    console.log('size66666', size);
    console.log('pagee66666', page);
    const newPagination = {
      ...pagination,
      page: size !== pagination.pageSize ? 1 : +page,
      pageSize: size,
    }; setPagination(newPagination);
    // console.log(first)
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



  // 新增製令單
  const handleAdd = async () => {
    if (selectedRowKeys.length > 0) {
      message.warning('請先取消勾選增製令單才能新增項目');
      return;
    }

    if ((weekFilter == "") || (weekFilter == null)) {

      try {
        // 显示确认对话框
        Modal.confirm({
          title: '確認新增',
          content: '確定要新增製令單嗎？',
          okText: '確定',
          cancelText: '取消',
          onOk: async () => {
            try {
              message.success('新增製令單成功');

              const newData = {
                workOrderSN: "",
                productSN: "",
                productName: "",
                workOrderQuantity: 1000,
                workOrderDate: nowDate,
              };

              // 添加製令單
              const addedItem = await addProductionSchedule(newData);

              // Refetch 数据以获取更新后的列表
              refetch();

            } catch (error) {
              console.error('新增製令單時發生錯誤:', error);
            }
          },
        });
      } catch (error) {
        console.error('處理新增製令單時發生錯誤:', error);
      }
    } else {
      message.warning('請先選擇全部周別後,再進行新增製令單的動作');
      return;
    }
  };

  const [selectionType, setSelectionType] = useState('checkbox');

  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 追蹤選中的行的 id

  // const [delProductionSchedule] = useDelProductionScheduleMutation();
  const [pauseStaus] = usePauseStausMutation();
  const [cancelStaus] = useCancelStausMutation();
  //勾選刪除
  const deleteChecked = async () => {
    // Get the selected rows' ids
    if (selectedRowKeys.length === 0) {
      message.warning('請先勾選要取消生產的項目');
      return;
    }
    const stringIds = JSON.stringify(selectedRowKeys);

    Modal.confirm({
      title: '確認刪除',
      content: '確定要取消生產選中的項目嗎？',
      okText: '確定',
      cancelText: '取消',
      onOk: async () => {
        try {
          // Delete the selected production schedules
          // await delProductionSchedule(stringIds);
          // message.success('已取消生產該筆單據');

          // Filter out the deleted items from the current dataSource
          // const updatedDataSource = dataSource.filter((item) => !selectedRowKeys.includes(item.id));
          // setDataSource(updatedDataSource);
          // 清0
          // setSelectedRowKeys([]);
          // 將勾選的欄位更改其屬性 status 值為"暫停動作"
          await cancelStaus(stringIds);

          // 清空勾選
          // setSelectedRowKeys([]);

          message.success('目前狀態已變為暫停生產!!');

        } catch (error) {
          console.error('Error deleting production schedule:', error);
        }
      },
    });
  };


  // 勾選令機具暫停動作
  const pauseChecked = () => {
    // Get the selected rows' ids
    if (selectedRowKeys.length === 0) {
      message.warning('請先勾選要暫停的項目');
      return;
    }
    const stringIds = JSON.stringify(selectedRowKeys);

    // 显示确认对话框
    Modal.confirm({
      title: '確認暫停生產',
      content: '確定要將所選項目的暫停生產嗎？',
      okText: '確定',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 將勾選的欄位更改其屬性 status 值為"暫停動作"
          await pauseStaus(stringIds);

          // 清空勾選
          // setSelectedRowKeys([]);

          message.success('目前狀態已變為暫停生產!!');
        } catch (error) {
          console.error('Error pausing production schedules:', error);
        }
      },
    });
  };

  const [actionStaus] = useActionStausMutation();

  // 勾選令機具開始動作
  const actionChecked = () => {
    // Get the selected rows' ids
    if (selectedRowKeys.length === 0) {
      message.warning('請先勾選要啟動的項目');
      return;
    }
    const stringIds = JSON.stringify(selectedRowKeys);

    // 显示确认对话框
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

          message.success('目前狀態已變為on-going');
        } catch (error) {
          console.error('Error starting production schedules:', error);
        }
      },
    });
  };

  // 勾選設定
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      selectedRowKeys,

        setSelectedRowKeys(selectedRowKeys); // 更新選中的行

      // console.log(`selectedRowKeysId: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  console.log('rowSelection:', rowSelection); // 添加这行代码进行输出


  const { Option } = Select;
  const allWeekOptions = [
    <Option key={0} value={''} label="全部周別">
      全部周別
    </Option>,
    ...[...Array(52).keys()].map((week) => (
      <Option key={week + 1} value={week + 1} label={`第${week + 1}周`}>
        第{week + 1}周
      </Option>
    ))
  ];


  // 周別篩選
  const [weekFilter, setWeekFilter] = useState(null); // State to store the selected week filter

  const { data: filterData, isSuccess: filterIsSuccess } = useGetProductionScheduleQuery({
    week_filter: weekFilter ? (weekFilter).toString() : null, size: pagination.pageSizeOptions,
    page: 1,

  });


  // console.log('dataSource', dataSource);

  // 定義需要重新抓取的參數
  const [needExportData, setNeedExportData] = useState(null);
  const refetchParams = weekFilter !== null ? { week_filter: weekFilter.toString() } : {};

  const { data: needExportDataSource, isSuccess: needExportDataIsSuccess, refetch: refetchExport } = useGetProductionScheduleQuery({
    ...refetchParams,
  });

  useEffect(() => {
    if (isSuccess) {
      const { data: dataSource, meta } = data;
      console.log('dataSource', dataSource);
      
      setTotalPage(meta.total_count);
      setDataSource(dataSource);
    }

    if (filterIsSuccess && weekFilter !== null) {
      const { data: filterDataSource, meta } = filterData;
      const newPagination = {
        ...pagination,
        page: 1,
      };
      setPagination(newPagination);
      setTotalPage(meta.total_count);
      setDataSource(filterDataSource);

    }
    const fetchData = async () => {
      // 重新抓取數據
      await refetchExport(refetchParams);

      if (needExportDataIsSuccess) {
        const { data } = needExportDataSource;
        setNeedExportData(data);
      }
    };

    fetchData();


  }, [weekFilter, refetchExport, needExportDataIsSuccess, needExportDataSource, isSuccess, data]);


  const defaultColumns = [

    {
      title: '編號 ',
      dataIndex: 'id',
      width: 60,
      fixed: true,
      editable: false,

    },
    {
      title: '狀態 ',
      dataIndex: 'status',
      fixed: true,
      width: 80,
    },
    {
      title: '製令單號 ',
      dataIndex: 'workOrderSN',
      width: 80,
      fixed: true,
      editable: true,
    },

    {
      title: '產品名稱',
      width: 80,
      dataIndex: 'productName',
      // fixed: true,
      editable: true,
    },
    {
      title: '產品編號',
      width: 80,
      dataIndex: 'productSN',
      // fixed: true,
      editable: true,
    },
    {
      title: '製令數量',
      dataIndex: 'workOrderQuantity',
      editable: true,
      width: 80,
      type: "number",
    },
    {
      title: '製令開立日期',
      dataIndex: 'workOrderDate',
      width: 100,
      editable: true,
    },
    {
      title: '成型秒數',
      dataIndex: 'moldingSecond',
      editable: true,
      width: 80,
      type: "number",
    },
    {
      title: '穴數',
      dataIndex: 'moldCavity',
      editable: true,
      width: 50,
      type: "number",
    },
    {
      title: '生產區域',
      dataIndex: 'productionArea',
      width: 80,
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 90, background: 'none', color: '#fff' }}
          onChange={(value) => handleProductionAreaChange(value, record)}

        >
          <Option value="A">A</Option>
          <Option value="B">B</Option>
          <Option value="C">C</Option>
          <Option value="D">D</Option>
        </Select>
      ),

    },
    {
      title: '機台編號',
      dataIndex: 'machineSN',
      editable: true,
      width: 80,
    },
    {
      title: '預計上機日',
      dataIndex: 'planOnMachineDate',
      editable: true,
      width: 100,
    },
    {
      title: '預計完成日',
      dataIndex: 'planFinishDate',
      editable: true,
      width: 100,
    },
    {
      title: '上下機工作日',
      dataIndex: 'actualFinishDate',
      editable: true,
      width: 100,
    },
    {
      title: '日工時',
      dataIndex: 'dailyWorkingHours',
      editable: true,
      width: 60,
      type: "number",
    },
    {
      title: '實際上機日',
      dataIndex: 'actualOnMachineDate',
      editable: true,
      width: 100,
    },
    {
      title: '實際完成日',
      dataIndex: 'actualFinishDate',
      editable: true,
      width: 100,
    },
    {
      title: '週別',
      dataIndex: 'week',
      editable: true,
      width: 50,
      type: "number",
    },
    {
      title: '產能小時',
      dataIndex: 'hourlyCapacity',
      editable: true,
      width: 70,
      type: "number",
    },
    {
      title: '日產能',
      dataIndex: 'dailyCapacity',
      editable: true,
      width: 60,
      type: "number",
    },
    {
      title: '工作天數',
      dataIndex: 'workDays',
      editable: true,
      width: 70,
      type: "number",
    },
    {
      title: '單雙射',
      dataIndex: 'singleOrDoubleColor',
      editable: true,
      width: 70,
    },
    {
      title: '轉換率 ',
      dataIndex: 'conversionRate',
      editable: true,
      width: 60,
      type: "float",
    },

    {
      title: '備註 ',
      dataIndex: 'comment',
      editable: true,
      width: 300,
    },

  ];


  // 編輯
  const [UpdateProductionSchedule] = useUpdateProductionScheduleMutation();

  const handleSave = async (row) => {
    try {
      // Check if there are changes in the data
      const isDataChanged = Object.keys(row).some((key) => row[key] !== dataSource.find((item) => item.id === row.id)[key]);

      if (!isDataChanged) {
        // If there are no changes, you can choose to return or show a message
        // message.info('No changes detected.');
        return;
      }

      // Perform the optimistic update on the client side
      const updatedData = dataSource.map((item) => (item.id === row.id ? { ...item, ...row } : item));
      setDataSource(updatedData);

      // Perform the actual update on the server side
      const response = await UpdateProductionSchedule({ id: row.id, data: row });

      // If the server update is successful, show a success message
      // message.success('修改數據成功123');
      if (response.success) {
        message.success('修改數據成功');
        // 如果需要执行其他操作，可以在此处添加逻辑
        // ...
      } else {
        message.error('修改數據失敗');
        // 如果需要执行其他操作，可以在此处添加逻辑
        // ...
      }
    } catch (error) {
      // Handle the error (e.g., display an error message to the user, revert changes, etc.)
      message.error('修改數據失敗');
    }
  };


  const handleProductionAreaChange = async (value, record) => {
    try {
      // Assuming `record` has an `id` field, update the corresponding data on the client side
      const updatedData = dataSource.map((item) => {
        if (item.id === record.id) {
          return { ...item, productionArea: value };
        }
        return item;
      });
      setDataSource(updatedData);

      // Send a request to the server to update the data
      await UpdateProductionSchedule({ id: record.id, data: { productionArea: value } });

      // If the server update is successful, no action is needed
      message.success('修改數據成功');
    } catch (error) {
      // Handle the error (e.g., display a message to the user, revert changes, etc.)
      console.error('Error updating production area:', error);
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      key: col.dataIndex, // 添加了這一行，使用 dataIndex 作為 key
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  // console.log('weekFilter', weekFilter);
  // 匯出功能
  const exportToExcel = () => {
    const workbook = new Exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // 设置表格列
    worksheet.columns = getExcelColumns();
    // const titleRow1 = worksheet.addRow(['隆廷實業有限公司']);
    // titleRow1.font = { bold: true, color: { argb: '00ffffff' } }; // 设置标题行样式
    // const titleRow2 = worksheet.addRow(['生產排程週計畫表']);
    // titleRow2.font = { bold: true, color: { argb: '00ffffff' } }; // 设置标题行样式

    // 添加数据行
    worksheet.addRows(dataSource);

    // 设置表头样式
    let headerStyle = {
      font: {
        name: 'Arial',
        size: 14,
        // bold: true,
        // color: { argb: '00ffffff' },
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: '#fff',
      },
      alignment: {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
      },
      border: {
        top: { style: 'double' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      },
      width: 300
    };

    // 填充表头样式
    for (let i = 1; i <= worksheet.columnCount; i++) {
      let cell = worksheet.getCell(1, i);
      cell.font = headerStyle.font;
      cell.fill = headerStyle.fill;
      cell.alignment = headerStyle.alignment;
      cell.border = headerStyle.border;
    }

    // 将工作簿写入缓冲区，并保存为Excel文件
    workbook.xlsx.writeBuffer().then((buffer) => {
      let blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'ProductionSchedule.xlsx');
    });
  };
  const getExcelColumns = () => {
    return columns.map((item) => {
      let items = {
        header: item.title,
        key: item.dataIndex,
        style: {
          font: { size: 11 },
          border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          },
          alignment: {
            wrapText: true,
            vertical: 'middle',
            horizontal: 'center',
          },
        },
      };
      // 添加其他样式配置...
      switch (item.dataIndex) {
        case 'id':
          items['width'] = 10;
          break;
        case 'workOrderSN':
          items['width'] = 25;
          break;
        case 'productName':
          items['width'] = 25;
          break;
        case 'workOrderQuantity':
          items['width'] = 15;
          break;
        case 'workOrderDate':
          items['width'] = 25;
          break;
        case 'moldingSecond':
          items['width'] = 15;
          break;
        case 'moldCavity':
          items['width'] = 10;
          break;
        case 'productionArea':
          items['width'] = 15;
          break;
        case 'machineSN':
          items['width'] = 25;
          break;
        case 'planOnMachineDate':
          items['width'] = 25;
          break;
        case 'planFinishDate':
          items['width'] = 25;
          break;
        case 'actualFinishDate':
          items['width'] = 25;
          break;
        case 'dailyWorkingHours':
          items['width'] = 10;
          break;
        case 'actualOnMachineDate':
          items['width'] = 25;
          break;
        case 'week':
          items['width'] = 10;
          break;
        case 'hourlyCapacity':
          items['width'] = 15;
          break;
        case 'dailyCapacity':
          items['width'] = 10;
          break;
        case 'workDays':
          items['width'] = 15;
          break;
        case 'singleOrDoubleColor':
          items['width'] = 10;
          break;
        case 'conversionRate':
          items['width'] = 10;
          break;
        case 'status':
          items['width'] = 15;
          break;
        case 'comment':
          items['width'] = 10;
          break;
      }
      return items;
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }




  return (
    <div>
      <div className='box'>
        {/* <ul style={{ display: 'flex', marginBottom: '10px' }}>
          <li style={{ marginRight: '10px' }}>
            <Link to="/">登入頁面</Link>
          </li>

        </ul> */}
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
            <Tooltip title="取消生產">

              <button
                className='delete'
                onClick={deleteChecked}
              >
                <FontAwesomeIcon icon={faTrashCan} style={{ color: '#fff' }} />
              </button>
            </Tooltip>
            <Tooltip title="開始生產">


              <button
                className="normal-action"
                onClick={actionChecked}
              >
                <FontAwesomeIcon icon={faPlay} style={{ color: '#fff' }} />
              </button>
            </Tooltip>
            <Tooltip title="暫停生產">

              <button
                className="pause"
                onClick={pauseChecked}
              >
                <FontAwesomeIcon icon={faPause} style={{ color: '#fff' }} />
              </button>
            </Tooltip>
            <Tooltip title="新增製令單">

              <button
                className='add'
                onClick={handleAdd}
              >
                <FontAwesomeIcon icon={faPlus} style={{ color: '#fff' }} />
              </button>
            </Tooltip>

          </div>

        </div>
        {isSuccess &&
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            rowKey="id"  // 在這裡指定 'id' 作為每一行的唯一標識
            dataSource={dataSource}
            columns={columns}
            pagination={{
              total: totalPage,
              current: pagination.page, /*當前分頁位址*/
              showSizeChanger: true,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: pagination.pageSizeOptions,
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
        {
          (dataSource.length > 0) &&
          <Button key="downloadExcel" type="ghost" onClick={exportToExcel} className='exportBtn'>
            匯出
          </Button>
        }
      </div>
    </div>
  );
};

export default ProductionSchedule
  ;
