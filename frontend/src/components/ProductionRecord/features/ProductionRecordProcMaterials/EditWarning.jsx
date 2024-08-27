import { Link } from "react-router-dom";
import styles from "./ProductionRecordProcMaterials.module.scss";

const WarningMessage = ({ to, children }) => (
  <div>
    <p className={styles["edit-warning__message"]}>
      該項目已被引用，無法被刪除。如要刪除請至
      <Link to={to} className={styles["edit-warning__link"]}>
        {children}
      </Link>
      編輯
    </p>
    <p className={styles["edit-warning__message"]}>
      此次修改，該引用項目亦會 "連動"，請確認後再發送
    </p>
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
        <p className={styles["edit-warning__message"]}>
          相同的製程與物料不可重複 , 請確認後再發送
        </p>
      )}
    </>
  );
};

export default EditWarning;
