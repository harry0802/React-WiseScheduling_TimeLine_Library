/*
* 1. 配置文件調整
   /configs/
   ├── orderStatus.js       // 狀態定義與配置
   ├── formConfig.js        // 表單配置擴充
   └── validation.js        // 驗證規則擴充

*2. 元件拆分
   /components/ItemDialog/
   ├── index.jsx            // 主元件
   ├── OrderInfo.jsx        // 製令單資訊
   ├── StatusInfo.jsx       // 狀態資訊
   ├── TimeInfo.jsx         // 時間資訊
   └── StatusForms/         // 各狀態專用表單
       ├── OrderCreated.jsx // 製立單
       ├── Idle.jsx         // 待機中
       ├── Setup.jsx        // 上模與調機
       ├── Testing.jsx      // 產品試模
       └── Stopped.jsx      // 機台停機

*3. 工具函數擴充
    /utils/
   ├── formUtils.js         // 表單處理擴充
   ├── statusUtils.js       // 狀態處理邏輯
   └── validationUtils.js   // 驗證邏輯
*/

import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import OrderInfo from "./OrderInfo";
import TimeInfo from "./TimeInfo";
import StatusForms from "../StatusForms/StatusForms";
import StatusInfo from "./StatusInfo";
import { formUtils } from "../../utils/formUtils";
import { MACHINE_STATUS } from "../../configs/constants";

// components/ItemDialog/index.jsx
const ItemDialog = ({
  isOpen,
  onClose,
  item,
  mode = "view",
  onSave,
  onDelete,
  groups,
}) => {
  const [showStatusDialog, setShowStatusDialog] = useState(false);

  // 使用 react-hook-form
  const methods = useForm({
    defaultValues: {
      // 基礎資訊
      id: "",
      group: "",
      area: "",
      timeLineStatus: MACHINE_STATUS.ORDER_CREATED,

      // 表單需要的扁平化欄位
      productName: "",
      process: "",
      quantity: 0,
      completedQty: 0,
      orderStatus: "尚未上機",

      // 時間相關
      plannedStart: null, // orderInfo.start
      plannedEnd: null, // orderInfo.end
      actualStart: null, // status.startTime
      actualEnd: null, // status.endTime

      // 狀態相關
      reason: "",
      product: "",
    },
  });

  const { handleSubmit, watch, setValue } = methods;
  const currentStatus = watch("timeLineStatus");

  // 初始化表單
  useEffect(() => {
    if (item) {
      methods.reset({
        // 基礎資訊
        id: item.id,
        group: item.group,
        area: item.area,
        timeLineStatus: item.timeLineStatus,

        // 扁平化欄位
        productName: item.orderInfo.productName,
        process: item.orderInfo.process,
        quantity: item.orderInfo.quantity,
        completedQty: item.orderInfo.completedQty,
        orderStatus: item.orderInfo.orderStatus,

        // 時間相關
        plannedStart: item.orderInfo.start,
        plannedEnd: item.orderInfo.end,
        actualStart: item.status.startTime,
        actualEnd: item.status.endTime,

        // 狀態相關
        reason: item.status.reason || "",
        product: item.status.product || "",
      });
    }
  }, [item, methods]);

  // 提交時重組資料結構
  const onSubmit = (data) => {
    const updatedItem = {
      // 基礎資訊
      id: data.id,
      group: data.group,
      area: data.area,
      timeLineStatus: data.timeLineStatus,

      // 狀態資訊
      status: {
        startTime: data.actualStart,
        endTime: data.actualEnd,
        reason: data.reason,
        product: data.product,
      },

      // 訂單資訊
      orderInfo: {
        start: data.plannedStart,
        end: data.plannedEnd,
        actualStart: data.actualStart,
        actualEnd: data.actualEnd,
        productId: item.orderInfo.productId, // 保留原有值
        productName: data.productName,
        quantity: data.quantity,
        completedQty: data.completedQty,
        process: data.process,
        orderStatus: data.orderStatus,
      },

      // 視覺相關
      className: item.className,
      content: item.content,
    };

    onSave(updatedItem);
    onClose();
  };

  if (!item) return null;

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>製令單詳細資訊</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <OrderInfo disabled={mode === "view"} groups={groups} />
                <StatusInfo
                  disabled={mode === "view"}
                  onStatusClick={() => setShowStatusDialog(true)}
                  groups={groups}
                  open={showStatusDialog}
                  onClose={() => setShowStatusDialog(false)}
                />
                <StatusForms
                  status={currentStatus}
                  disabled={mode === "view"}
                />
                <TimeInfo disabled={mode === "view"} />
              </Grid>
            </DialogContent>
            <DialogActions>
              {mode === "edit" && (
                <Button onClick={onDelete} color="error" sx={{ mr: "auto" }}>
                  刪除
                </Button>
              )}
              <Button onClick={onClose}>取消</Button>
              {mode !== "view" && (
                <Button type="submit" variant="contained">
                  保存
                </Button>
              )}
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

      {/* 狀態切換對話框 */}
      <StatusInfo
        open={showStatusDialog}
        onClose={() => setShowStatusDialog(false)}
        currentStatus={currentStatus}
        onStatusChange={(newStatus) => {
          setValue("timeLineStatus", newStatus);
          setShowStatusDialog(false);
        }}
      />
    </>
  );
};

export default ItemDialog;
