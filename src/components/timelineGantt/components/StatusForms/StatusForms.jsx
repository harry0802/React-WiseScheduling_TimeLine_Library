// components/StatusForms/StatusController.jsx
import { memo } from "react";
import OrderCreated from "./OrderCreated";
import Idle from "./Idle";
import Setup from "./Setup";
import Testing from "./Testing";
import Stopped from "./Stopped";
import { MACHINE_STATUS } from "../../configs/constants";

// ✨ 狀態表單控制器
const StatusController = ({ status, item, disabled }) => {
  // 💡 根據狀態返回對應表單
  const renderStatusForm = () => {
    switch (status) {
      case MACHINE_STATUS.ORDER_CREATED:
        return <OrderCreated item={item} disabled={disabled} />;
      case MACHINE_STATUS.IDLE:
        return <Idle item={item} disabled={disabled} />;
      case MACHINE_STATUS.SETUP:
        return <Setup item={item} disabled={disabled} />;
      case MACHINE_STATUS.TESTING:
        return <Testing item={item} disabled={disabled} />;
      case MACHINE_STATUS.STOPPED:
        return <Stopped item={item} disabled={disabled} />;
      default:
        return null;
    }
  };

  return <div>{renderStatusForm()}</div>;
};

export default memo(StatusController);
