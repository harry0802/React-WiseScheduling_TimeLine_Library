import ProductAddtionLayout from "../../Global/layout/ProductAddtionLayout";
import QmsPdInfo from "../components/QmsPdInfo";

function QmsAddtions() {
  const breadcrumbs = [
    { to: "/QuotationManagementSystem", label: "編輯產品資訊" },
    { label: "業務報價管理系統" },
  ];

  return (
    <ProductAddtionLayout breadcrumbs={breadcrumbs}>
      <QmsPdInfo />
    </ProductAddtionLayout>
  );
}

export default QmsAddtions;
