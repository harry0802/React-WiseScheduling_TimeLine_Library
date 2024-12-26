import React, { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useAddProductionSchedulesMutation } from "../../store/api/productionScheduleApi";
import { useGetProductsWithPaginationQuery } from "../ProductionRecord/service/endpoints/productApi";
import { useGetProcessByProductSNsQuery } from "../ProductionRecord/service/endpoints/processApi";
import { TZ } from "../../config/config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function ImportProductionSchedule() {
  const navigate = useNavigate();
  const [addProductionSchedules] = useAddProductionSchedulesMutation();
  const [isOpen, setIsOpen] = useState(true);
  const [productSNsState, setproductSNsState] = useState("");
  const { data: productData } = useGetProductsWithPaginationQuery({});
  const { data: processData } = useGetProcessByProductSNsQuery({
    productSNs: productSNsState,
  });

  const onClose = () => {
    setIsOpen(false);
    navigate("/ProductionSchedulePage");
  };

  const onSubmit = async (data, file) => {
    data.validData.forEach((element) => {
      // remove serialNumber, system generated
      delete element.serialNumber;
      // convert date format
      element.workOrderDate = dayjs.tz(element.workOrderDate, TZ).format();
      element.planOnMachineDate = dayjs
        .tz(element.planOnMachineDate, TZ)
        .format();
      element.planFinishDate = dayjs.tz(element.planFinishDate, TZ).format();
      // convert to number
      element.workOrderQuantity = parseInt(element.workOrderQuantity);
      element.moldingSecond = parseInt(element.moldingSecond);
      element.moldWorkDays = parseInt(element.moldWorkDays);
      element.workDays = parseInt(element.workDays);
      element.dailyWorkingHours = parseInt(element.dailyWorkingHours);
      element.moldCavity = parseInt(element.moldCavity);
      element.week = parseInt(element.week);
      element.conversionRate = parseFloat(element.conversionRate);
      element.dailyCapacity = parseFloat(
        parseFloat(element.dailyCapacity).toFixed(2)
      );
      element.hourlyCapacity = parseFloat(
        parseFloat(element.hourlyCapacity).toFixed(2)
      );
    });

    await addProductionSchedules(data.validData)
      .unwrap()
      .then((payload) => {
        notification.success({
          description: "匯入成功",
          placement: "bottomRight",
          duration: 5,
        });
      })
      .catch((error) => {
        console.error("rejected", error);
        notification.error({
          description: "暫時無法匯入，請稍後再試",
          placement: "bottomRight",
          duration: 5,
        });
      });
  };

  const selectHeaderStepHook = (headerValues, data) => {
    const productSNList = data.map((row) => row[4]);
    const productSNSet = new Set(productSNList);
    const productSNArray = Array.from(productSNSet);
    const productSNs = productSNArray.join(",");
    setproductSNsState(productSNs);
    return { headerValues, data };
  };

  const rowHook = (data, addError) => {
    const { status, productSN, productName, processName } = data;

    // check the format of the date if match yyyy-mm-dd
    const dateRegex = /^\d{4}[\/-]\d{2}[\/-]\d{2}$/;
    if (!dateRegex.test(data.workOrderDate)) {
      addError("workOrderDate", {
        message: "日期格式錯誤，請使用yyyy-mm-dd",
        level: "error",
      });
      return data;
    }
    if (!dateRegex.test(data.planOnMachineDate)) {
      addError("planOnMachineDate", {
        message: "日期格式錯誤，請使用yyyy-mm-dd",
        level: "error",
      });
      return data;
    }
    if (!dateRegex.test(data.planFinishDate)) {
      addError("planFinishDate", {
        message: "日期格式錯誤，請使用yyyy-mm-dd",
        level: "error",
      });
      return data;
    }

    // Check if status is "尚未上機"
    if (status !== "尚未上機") {
      addError("status", { message: "狀態只允許尚未上機", level: "error" });
      return data;
    }

    // Find the product by productSN and productName
    const product = productData.data.find(
      (product) =>
        product.productSN === productSN && product.productName === productName
    );

    if (!product) {
      // If product not found, add errors and exit
      addError("productSN", {
        message: "產品編號或產品名稱不存在",
        level: "error",
      });
      addError("productName", {
        message: "產品編號或產品名稱不存在",
        level: "error",
      });
      addError("processName", {
        message: "需有正確的產品編號和產品名稱，才能確認製程名稱",
        level: "error",
      });
      return data;
    }

    // Find processes related to the product
    const processes = processData.data.filter(
      (process) => process.productId === product.id
    );

    if (processes.length === 0) {
      addError("productSN", {
        message: "此產品尚未建立製程，請先建立製程",
        level: "error",
      });
      addError("productName", {
        message: "此產品尚未建立製程，請先建立製程",
        level: "error",
      });
      return data;
    }

    // Find the specific process by processName
    const process = processes.find(
      (process) => process.processName === processName
    );

    if (!process) {
      addError("processName", {
        message: "找不到對應的製程",
        level: "error",
      });
      return data;
    }

    // Add productId and processId to data
    return {
      ...data,
      productId: product.id,
      processId: process.id,
    };
  };

  const fields = [
    {
      label: "生產區域",
      key: "productionArea",
      alternateMatches: ["生產區域"],
      fieldType: {
        type: "input",
      },
      example: "A",
      validations: [
        {
          rule: "required",
          errorMessage: "生產區域為必填",
          level: "error",
        },
      ],
    },
    {
      label: "機台編號",
      key: "machineSN",
      alternateMatches: ["機台編號"],
      fieldType: {
        type: "input",
      },
      example: "A1",
      validations: [
        {
          rule: "required",
          errorMessage: "機台編號為必填",
          level: "error",
        },
      ],
    },
    {
      label: "序號",
      key: "serialNumber",
      alternateMatches: ["序號"],
      fieldType: {
        type: "input",
      },
      example: "1",
      validations: [
        {
          rule: "required",
          errorMessage: "序號為必填",
          level: "error",
        },
      ],
    },
    {
      label: "單據編號",
      key: "workOrderSN",
      alternateMatches: ["單據編號"],
      fieldType: {
        type: "input",
      },
      example: "202312120001",
      validations: [
        {
          rule: "required",
          errorMessage: "單據編號為必填",
          level: "error",
        },
      ],
    },
    {
      label: "產品編號",
      key: "productSN",
      alternateMatches: ["產品編號"],
      fieldType: {
        type: "input",
      },
      example: "HHE-01003-01",
      validations: [
        {
          rule: "required",
          errorMessage: "產品編號為必填",
          level: "error",
        },
      ],
    },
    {
      label: "產品名稱",
      key: "productName",
      alternateMatches: ["產品名稱"],
      fieldType: {
        type: "input",
      },
      example: "大前殼白",
      validations: [
        {
          rule: "required",
          errorMessage: "產品名稱為必填",
          level: "error",
        },
      ],
    },
    {
      label: "製程名稱",
      key: "processName",
      alternateMatches: ["製程名稱"],
      fieldType: {
        type: "input",
      },
      example: "廠內-成型-IJ01",
      validations: [
        {
          rule: "required",
          errorMessage: "製程名稱為必填",
          level: "error",
        },
      ],
    },
    {
      label: "製令數量",
      key: "workOrderQuantity",
      alternateMatches: ["製令數量"],
      fieldType: {
        type: "input",
      },
      example: "1474",
      validations: [
        {
          rule: "required",
          errorMessage: "製令數量為必填",
          level: "error",
        },
      ],
    },
    {
      label: "製令完工日期",
      key: "workOrderDate",
      alternateMatches: ["製令完工日期"],
      fieldType: {
        type: "input",
      },
      example: "2024/01/25",
      validations: [
        {
          rule: "required",
          errorMessage: "製令完工日期為必填",
          level: "error",
        },
      ],
    },
    {
      label: "成型秒數",
      key: "moldingSecond",
      alternateMatches: ["成型秒數"],
      fieldType: {
        type: "input",
      },
      example: "95",
      validations: [
        {
          rule: "required",
          errorMessage: "成型秒數為必填",
          level: "error",
        },
      ],
    },
    {
      label: "每小時產能",
      key: "hourlyCapacity",
      alternateMatches: ["每小時產能"],
      fieldType: {
        type: "input",
      },
      example: "37",
      validations: [
        {
          rule: "required",
          errorMessage: "每小時產能為必填",
          level: "error",
        },
      ],
    },
    {
      label: "日產能",
      key: "dailyCapacity",
      alternateMatches: ["日產能"],
      fieldType: {
        type: "input",
      },
      example: "422",
      validations: [
        {
          rule: "required",
          errorMessage: "日產能為必填",
          level: "error",
        },
      ],
    },
    {
      label: "預計上機日",
      key: "planOnMachineDate",
      alternateMatches: ["預計上機日"],
      fieldType: {
        type: "input",
      },
      example: "2024/01/08",
      validations: [
        {
          rule: "required",
          errorMessage: "預計上機日為必填",
          level: "error",
        },
      ],
    },
    {
      label: "上下模工作日",
      key: "moldWorkDays",
      alternateMatches: ["上下模工作日"],
      fieldType: {
        type: "input",
      },
      example: "1",
    },
    {
      label: "工作天數",
      key: "workDays",
      alternateMatches: ["工作天數"],
      fieldType: {
        type: "input",
      },
      example: "4",
      validations: [
        {
          rule: "required",
          errorMessage: "工作天數為必填",
          level: "error",
        },
      ],
    },
    {
      label: "預計完成日",
      key: "planFinishDate",
      alternateMatches: ["預計完成日"],
      fieldType: {
        type: "input",
      },
      example: "2024/01/12",
      validations: [
        {
          rule: "required",
          errorMessage: "預計完成日為必填",
          level: "error",
        },
      ],
    },
    {
      label: "備註",
      key: "comment",
      alternateMatches: ["備註"],
      fieldType: {
        type: "input",
      },
      example: "",
    },
    {
      label: "日工時",
      key: "dailyWorkingHours",
      alternateMatches: ["日工時"],
      fieldType: {
        type: "input",
      },
      example: "12",
      validations: [
        {
          rule: "required",
          errorMessage: "日工時為必填",
          level: "error",
        },
      ],
    },
    {
      label: "穴數",
      key: "moldCavity",
      alternateMatches: ["穴數"],
      fieldType: {
        type: "input",
      },
      example: "1",
      validations: [
        {
          rule: "required",
          errorMessage: "穴數為必填",
          level: "error",
        },
      ],
    },
    {
      label: "週別",
      key: "week",
      alternateMatches: ["週別"],
      fieldType: {
        type: "input",
      },
      example: "2",
      validations: [
        {
          rule: "required",
          errorMessage: "週別為必填",
          level: "error",
        },
      ],
    },
    {
      label: "單/雙色",
      key: "singleOrDoubleColor",
      alternateMatches: ["單/雙色"],
      fieldType: {
        type: "input",
      },
      example: "單",
      validations: [
        {
          rule: "required",
          errorMessage: "單/雙色為必填",
          level: "error",
        },
      ],
    },
    {
      label: "轉換率",
      key: "conversionRate",
      alternateMatches: ["轉換率"],
      fieldType: {
        type: "input",
      },
      example: "0.95",
      validations: [
        {
          rule: "required",
          errorMessage: "轉換率為必填",
          level: "error",
        },
      ],
    },
    {
      label: "Status",
      key: "status",
      alternateMatches: ["Status"],
      fieldType: {
        type: "input",
      },
      example: "尚未上機",
      validations: [
        {
          rule: "required",
          errorMessage: "Status為必填",
          level: "error",
        },
      ],
    },
  ];

  const translations = {
    uploadStep: {
      title: "上傳檔案",
      manifestTitle: "預期資料:",
      manifestDescription: "(下一個步驟可以重新命名欄位或者移除欄位)",
      dropzone: {
        title: "Upload .xlsx, .xls or .csv file",
        errorToastDescription: "非合法的檔案格式",
        activeDropzoneTitle: "拖拉檔案至此...",
        buttonTitle: "選擇檔案",
        loadingTitle: "上傳中...",
      },
      selectSheet: {
        title: "選擇工作表",
        nextButtonTitle: "下一步",
        backButtonTitle: "上一步",
      },
    },
    selectHeaderStep: {
      title: "選擇標題列表",
      nextButtonTitle: "下一步",
      backButtonTitle: "上一步",
    },
    matchColumnsStep: {
      title: "配對欄位",
      nextButtonTitle: "下一步",
      backButtonTitle: "上一步",
      userTableTitle: "你的資料表",
      templateTitle: "會變成",
      selectPlaceholder: "選擇欄位...",
      ignoredColumnText: "忽略欄位",
      subSelectPlaceholder: "Select...",
      matchDropdownTitle: "Match",
      unmatched: "無法配對",
      duplicateColumnWarningTitle: "Another column unselected",
      duplicateColumnWarningDescription: "欄位配對不可重複",
    },
    validationStep: {
      title: "驗證資料",
      nextButtonTitle: "確定匯入",
      backButtonTitle: "上一步",
      noRowsMessage: "No data found",
      noRowsMessageWhenFiltered: "No data containing errors",
      discardButtonTitle: "捨棄勾選的資料行",
      filterSwitchTitle: "只顯示有錯誤的資料行",
    },
    alerts: {
      confirmClose: {
        headerTitle: "離開匯入流程",
        bodyText: "你確定要離開? 你目前的資料不會被儲存。",
        cancelButtonTitle: "取消",
        exitButtonTitle: "離開流程",
      },
      submitIncomplete: {
        headerTitle: "發現錯誤",
        bodyText: "發現有資料行存在錯誤。有錯誤的資料行不會被匯入新增。",
        bodyTextSubmitForbidden: "There are still some rows containing errors.",
        cancelButtonTitle: "取消",
        finishButtonTitle: "上傳",
      },
      submitError: {
        title: "Error",
        defaultMessage: "An error occurred while submitting data",
      },
      unmatchedRequiredFields: {
        headerTitle: "有些欄位未配對",
        bodyText: "有些欄位上未配對，你確定要繼續嗎?",
        listTitle: "未配對的欄位:",
        cancelButtonTitle: "取消",
        continueButtonTitle: "繼續",
      },
      toast: {
        error: "Error",
      },
    },
  };

  return (
    <div>
      <ReactSpreadsheetImport
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        fields={fields}
        selectHeaderStepHook={selectHeaderStepHook}
        rowHook={rowHook}
        translations={translations}
      />
    </div>
  );
}
