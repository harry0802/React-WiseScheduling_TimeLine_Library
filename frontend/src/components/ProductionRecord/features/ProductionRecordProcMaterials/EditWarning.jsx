import { Link } from "react-router-dom";
import { EditWarningMessage, EditWarningLink } from "./ProductionRecordProcMaterials.styled";

const WarningMessage = ({ to, children }) => (
  <div>
    <EditWarningMessage className="color-danger">
      * 該項目已被引用，無法被刪除。如要刪除請至
      <Link to={to}>
        <EditWarningLink>{children}</EditWarningLink>
      </Link>
      編輯
    </EditWarningMessage>
    <EditWarningMessage className="color-danger">
      * 此次修改，該引用項目亦會 "連動"，請確認後再發送
    </EditWarningMessage>
  </div>
);

const EditWarning = ({ isEditing, isAppoint, drawerType, isDuplicate }) => {
  return (
    <>
      {!isAppoint && isEditing ? (
        drawerType !== "material" ? (
          <WarningMessage to="/ProductionRecordPage">產品資訊</WarningMessage>
        ) : (
          <>
            <WarningMessage to="/ProductionRecordPage/inventoryManagement">
              原物料分類
            </WarningMessage>
          </>
        )
      ) : isEditing ? (
        <p>可進行刪除與編輯操作</p>
      ) : (
        ""
      )}
      {isDuplicate && (
        <EditWarningMessage className="color-danger">
          * 相同的製程與物料不可重複 , 請確認後再發送
        </EditWarningMessage>
      )}
    </>
  );
};

export default EditWarning;
