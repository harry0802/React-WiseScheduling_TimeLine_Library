import React from 'react';
import { Button, Table } from 'antd';
import { saveAs } from 'file-saver';
import Exceljs from 'exceljs';
 
const ExportExcel = (props) => {
  // 定义表格列  
  // cellType表示单元格类型，text表示普通文本，selectOption表示下拉列表
  // cellStartPosition 表示当前key所在excel中单元格初始的位置
  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
      cellType: 'text',
      cellStartPosition: 'A',
    },
    {
      title: '产品颜色',
      dataIndex: 'color',
      key: 'color',
      cellType: 'selectOption',
      cellSelectValue: 'Red',
      cellStartPosition: 'B',
    },
    {
      title: '产品状态',
      dataIndex: 'status',
      key: 'status',
      cellType: 'selectOption',
      cellSelectValue: '销量很好',
      cellStartPosition: 'C',
    },
    {
      title: '产品评论',
      dataIndex: 'comments',
      key: 'comments',
      cellType: 'text',
      cellStartPosition: 'D',
    },
  ];
  // const columns = props.columns
  // 定义表格数据
  const dataSource = [
    {
      name: '产品1',
      color: 'Blue',
      status: '销量很好',
      comments: '好的产品!',
    },
    {
      name: '产品2',
      color: 'Yellow',
      status: '销量一般',
      comments: '可接受的产品！',
    },
    {
      name: '产品3',
      color: 'Green',
      status: '销量一般',
      comments: '可接受的产品！',
    },
    {
      name: '产品4',
      color: 'Green',
      status: '销量一般',
      comments: '可接受的产品！',
    },
    {
      name: '产品5',
      color: 'Yellow',
      status: '销量很差',
      comments: '不可接受的产品！',
    },
    {
      name: '产品6',
      color: 'Red',
      status: '销量很差',
      comments: '不可接受的产品！',
    },
  ];
  // const dataSource =props.dataSource
  // 获取导出的excel的列配置
  const getExcelColumns = () => {
    return columns.map((item) => {
      let items = {
        header: item.title,
        key: item.dataIndex,
        // 这里是为了自定义表格内容的样式（不包含表头）
        style: {
          // 字体样式
          font: { size: 11 },
          // 边框样式
          border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          },
          // 设置水平，垂直对齐方式以及是否换行
          alignment: {
            wrapText: true,
            vertical: 'middle',
            horizontal: 'center',
          },
        },
      };
      switch (item.dataIndex) {
        case 'name':
        case 'comments':
          items['width'] = 25;
          break;
        case 'color':
        case 'status':
          items['width'] = 20;
          break;
      }
      return items;
    });
  };
 
  // 获取导出excel的某一列的下标
  const getSelectCellIndex = (currentSelectCell) => {
    const index = columns.findIndex(
      (item) => item.dataIndex == currentSelectCell
    );
    let indexs = index ? index + 1 : null;
    return indexs;
  };
 
  // 获取需要下拉的字段的下拉列表，正常情况下从值中获取
  const getSelectCellOptionList = (key) => {
    if (key === 'color') {
      return ['Blue', 'Green', 'Yellow', 'Red'];
    } else {
      return [...new Set(dataSource.map((t) => t[key]))];
    }
  };
 
  // 获取下拉列表参数
  const getSelectCellDataList = () => {
    return columns
      .map((item) => {
        if (item.cellType === 'selectOption') {
          return {
            selectedCellKey: item.dataIndex,
            selectedCellIndex: getSelectCellIndex(item.dataIndex),
            selectedCellPosition: item.cellStartPosition,
            selectedCellOptionsList: getSelectCellOptionList(item.dataIndex),
            selectedCellValue: item.cellSelectValue,
          };
        }
      })
      .filter((item) => item !== undefined);
  };
 
  // 导出excel
  const exportToExcel = () => {
    const workbook = new Exceljs.Workbook();
    //创建一个名字为Sheet1的工作表
    const worksheet = workbook.addWorksheet('Sheet1');  
    // worksheet.properties.defaultRowHeight = 15; // 设置默认行高
    worksheet.columns = getExcelColumns();
    worksheet.addRows(dataSource);
    const selectCellDataList = getSelectCellDataList();
    selectCellDataList.forEach((d) => {
      let col_Number = d.selectedCellIndex;
      let col_optionList = d.selectedCellOptionsList;
      let col_startPosition = d.selectedCellPosition;
      let col_selectValue = d.selectedCellValue;
      // 配置excel 单元格下拉选项
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          if (rowNumber > 1) {
            row.height = 20;
            if (colNumber === col_Number) {
              cell.dataValidation = {
                type: 'list',
                allowBlank: true,
                showErrorMessage: true,
                errorStyle: 'error',
                formulae: [`"${col_optionList.join(',')}"`],
              };
            }
          }
        });
      });
      // 设置单元格下拉选中规则
      worksheet.addConditionalFormatting({
        // ref表示下拉框所在位置
        // 如C2:C5 表示从第三列的第二行开始到第五行结束，这些范围都有下拉选项
        ref: `${col_startPosition}2:${col_startPosition}${
          dataSource.length + 1
        }`,
        // 这里设置的规则表示下拉选中的文本是col_selectValue，则改变单元格的填充颜色和字体颜色
        rules: [
          {
            type: 'containsText',  // 表示规则类型是containsText
            operator: 'containsText', // 表示操作是包含当前的文本
            text: col_selectValue,
            style: {
              // 填充的样式，颜色要用16进制，不能带有#
              fill: {
                type: 'pattern',
                pattern: 'solid',
                bgColor: { argb: 'FFFFC0CB' },
              },
              font: {
                color: { argb: 'f00f00' },
              },
            },
          },
        ],
      });
    });
    // 定义表头样式
    let headerStyle = {
      font: {
        name: 'Arial',
        size: 14,
        bold: true,
        color: { argb: '00ffffff' },
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '004f81bc' },
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
    };
 
    // 填充表头的样式
    for (let i = 1; i <= worksheet.columnCount; i++) {
      let cell = worksheet.getCell(1, i);
      cell.font = headerStyle.font;
      cell.fill = headerStyle.fill;
      cell.alignment = headerStyle.alignment;
      cell.border = headerStyle.border;
    }
 
    workbook.xlsx.writeBuffer().then((buffer) => {
      let blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'TEST.xlsx');
    });
  };
 
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered={true}
        pagination={false}
      />
      <div style={{ marginTop: 10 }}>
        <Button type="primary" onClick={exportToExcel}>
          导出Excel
        </Button>
      </div>
    </>
  );
};
 
export default ExportExcel;