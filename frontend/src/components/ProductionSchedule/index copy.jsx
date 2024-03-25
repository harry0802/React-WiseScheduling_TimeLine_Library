import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Table, Select, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { useGetProductionScheduleQuery } from "../../store/api/productionScheduleApi";

import "./index.scss";

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
      console.log("Save failed:", errInfo);
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
  const {
    data: ProductionScheduleData,
    meta,
    isSuccess,
  } = useGetProductionScheduleQuery(page, size);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const fetchRecords = (page, pageSize) => {
    setLoading(true);
    useGetProductionScheduleQuery(page, pageSize);
    setDataSource(ProductionScheduleData);
    setTotalPassengers(meta.totalpages);
    setLoading(false);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const defaultColumns = [
    {
      title: "編號 ",
      dataIndex: "id",
      width: 80,
      fixed: true,
      editable: true,
    },
    {
      title: "製令單號 ",
      dataIndex: "workOrderSN",
      width: 170,
      fixed: true,
      editable: true,
    },
    {
      title: "產品名稱",
      width: 180,
      dataIndex: "productName",
      fixed: true,
      editable: true,
    },
    {
      title: "置令數量",
      dataIndex: "workOrderQuantity",
      editable: true,
      width: 150,
    },
    {
      title: "置令開立日期",
      dataIndex: "workOrderDate",
      width: 150,
      editable: true,
    },
    {
      title: "成型秒數",
      dataIndex: "moldingSecond",
      editable: true,
      width: 100,
    },
    {
      title: "穴數",
      dataIndex: "moldCavity",
      editable: true,
      width: 70,
    },
    {
      title: "生產區域                     ",
      dataIndex: "productionArea",
      width: 130,

      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 90, background: "none", color: "#fff" }}
        >
          <Option value="A">A</Option>
          <Option value="B">B</Option>
          <Option value="C">C</Option>
        </Select>
      ),
    },
    {
      title: "機台編號      ",
      dataIndex: "machineSN",
      editable: true,
      width: 100,
    },
    {
      title: "預計上機日",
      dataIndex: "planFinishDate",
      editable: true,
      width: 150,
    },
    {
      title: "預計完成日",
      dataIndex: "planFinishDate",
      editable: true,
      width: 150,
    },
    {
      title: "上下機工作日",
      dataIndex: "actualFinishDate",
      editable: true,
      width: 150,
    },
    {
      title: "日工時",
      dataIndex: "dailyWorkingHours",
      editable: true,
      width: 100,
    },
    {
      title: "實際上機日",
      dataIndex: "actualOnMachineDate",
      editable: true,
      width: 150,
    },
    {
      title: "實際完成日",
      dataIndex: "actualFinishDate",
      editable: true,
      width: 150,
    },
    {
      title: "週別",
      dataIndex: "week",
      editable: true,
      width: 80,
    },
    {
      title: "產能小時",
      dataIndex: "hourlyCapacity",
      editable: true,
      width: 100,
    },
    {
      title: "日產能",
      dataIndex: "dailyCapacity",
      editable: true,
      width: 100,
    },
    {
      title: "工作天數",
      dataIndex: "workDays",
      editable: true,
      width: 100,
    },
    {
      title: "單雙射",
      dataIndex: "singleOrDoubleColor",
      editable: true,
      width: 100,
    },
    {
      title: "轉換率 ",
      dataIndex: "conversionRate",
      editable: true,
      width: 100,
    },
    {
      title: "狀態 ",
      dataIndex: "status",
      editable: true,
      width: 150,
    },
    {
      title: "備註 ",
      dataIndex: "comment",
      editable: true,
    },
  ];

  const columns = defaultColumns.map((col) => {
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
        key: record.key, // Add key to EditableCell
      }),
    };
  });

  return (
    <div>
      <div className="box">
        <ul style={{ display: "flex", marginBottom: "10px" }}>
          <li style={{ marginRight: "10px" }}>
            <Link to="/">登入頁面</Link>
          </li>
        </ul>
        <div className="title-box">
          <div className="title">生產計劃排程表</div>
          <div className="btn-box">
            <DatePicker.RangePicker
              style={{
                marginRight: "10px",
                height: "30px",
                marginTop: "5px",
                width: "500px",
              }}
            />
            <Input.Search
              placeholder="搜尋..."
              style={{ marginRight: "15px", marginTop: "5px", width: "200px" }}
            />
            <button className="delete">
              <FontAwesomeIcon icon={faTrashCan} style={{ color: "#fff" }} />
            </button>

            <button className="active">
              <FontAwesomeIcon icon={faPlay} style={{ color: "#fff" }} />
            </button>
            <button className="faPause">
              <FontAwesomeIcon icon={faPause} style={{ color: "#fff" }} />
            </button>

            <button className="add">
              <FontAwesomeIcon icon={faPlus} style={{ color: "#fff" }} />
            </button>
          </div>
        </div>
        {isSuccess && (
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            rowSelection
            dataSource={ProductionScheduleData}
            columns={columns}
            pagination={{
              total: totalpages,
              pageSize: 10,
              position: ["bottomCenter"],
              onChange: (page, pageSize) => {
                fetchRecords(page, pageSize);
              },
            }}
            scroll={{
              x: 3300,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductionSchedule;
