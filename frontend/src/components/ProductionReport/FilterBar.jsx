import React, { useState } from "react";
import { Select, Input, DatePicker } from "antd";
import { WORKORDER_STATUS } from "../../config/enum";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./FilterBar.module.scss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function FilterBar({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  statusState,
  setStatusState,
  expiryState,
  setExpiryState,
  keywordTypeState,
  setKeywordTypeState,
  keywordState,
  setKeywordState,
}) {
  const { Option } = Select;

  // 製令單狀態
  const allStatusOptions = [
    <Option key={0} value={WORKORDER_STATUS.ALL} label={WORKORDER_STATUS.ALL}>
      所有狀態
    </Option>,
    <Option
      key={1}
      value={WORKORDER_STATUS.NOT_YET}
      label={WORKORDER_STATUS.NOT_YET}
    >
      {WORKORDER_STATUS.NOT_YET}
    </Option>,
    <Option
      key={2}
      value={WORKORDER_STATUS.ON_GOING}
      label={WORKORDER_STATUS.ON_GOING}
    >
      {WORKORDER_STATUS.ON_GOING}
    </Option>,
    <Option key={3} value={WORKORDER_STATUS.DONE} label={WORKORDER_STATUS.DONE}>
      {WORKORDER_STATUS.DONE}
    </Option>,
    <Option
      key={4}
      value={WORKORDER_STATUS.PAUSE}
      label={WORKORDER_STATUS.PAUSE}
    >
      {WORKORDER_STATUS.PAUSE}
    </Option>,
  ];

  // 製令單期限
  const allExpiryOptions = [
    <Option key={0} value={"無限期"} label="無限期">
      無限期
    </Option>,
    <Option key={1} value={"即將到期"} label="即將到期">
      即將到期
    </Option>,
    <Option key={2} value={"已經過期"} label="已經過期">
      已經過期
    </Option>,
  ];

  // 關鍵字搜尋類型
  const allKeywordTypeOptions = [
    <Option key={0} value={"workOrderSN"} label="workOrderSN">
      製令單號
    </Option>,
    <Option key={1} value={"productName"} label="productName">
      產品名稱
    </Option>,
  ];

  // 日期換算成週數
  const getWeekNumber = (date) => {
    if (!date) return "";
    date = new Date(date);
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  };
  const [startWeekNo, setStartWeekNo] = useState(getWeekNumber(startDate)); // 週數
  const [endWeekNo, setEndWeekNo] = useState(getWeekNumber(endDate)); // 週數

  return (
    <div className={styles.filterBar}>
      <div className={styles.startDate}>
        <DatePicker
          defaultValue={dayjs(startDate)}
          format="YYYY/MM/DD"
          onChange={(date, dateString) => {
            setStartDate(dateString);
            setStartWeekNo(getWeekNumber(dateString));
          }}
        />
        <div className={styles.weekNo}>{startWeekNo} 週</div>
      </div>
      <span className={styles.dateTo}>~</span>
      <div className={styles.endDate}>
        <DatePicker
          defaultValue={dayjs(endDate)}
          format="YYYY/MM/DD"
          onChange={(date, dateString) => {
            setEndDate(dateString);
            setEndWeekNo(getWeekNumber(dateString));
          }}
        />
        <div className={styles.weekNo}>{endWeekNo} 週</div>
      </div>

      <div className={styles.selectBox}>
        {/* 篩選狀態 */}
        <Select
          className={styles.statusFilter}
          placeholder="所有狀態"
          style={{ width: 120 }}
          onChange={(value) => setStatusState(value)}
        >
          {allStatusOptions}
        </Select>

        {/* 篩選期限 */}
        <Select
          className={styles.expiryFilter}
          placeholder="無限期"
          style={{ width: 120 }}
          onChange={(value) => setExpiryState(value)}
        >
          {allExpiryOptions}
        </Select>

        {/* 篩選關鍵字搜尋類型 */}
        <Select
          className={styles.keywordTypeFilter}
          placeholder="製令單號"
          style={{ width: 120 }}
          onChange={(value) => setKeywordTypeState(value)}
        >
          {allKeywordTypeOptions}
        </Select>

        <Input
          className={styles.keywordSearch}
          placeholder="請輸入關鍵字查詢..."
          style={{ width: 160 }}
          suffix={<SearchOutlined />}
          onInput={(e) => setKeywordState(e.target.value)}
        ></Input>
      </div>
    </div>
  );
}
