export function createLotChild(props) {
  return {
    ...props,
    updateInspectionQuantity(quantity) {
      this.inspectionQuantity = quantity;
    },
    updateGoodQuantity(quantity) {
      this.goodQuantity = quantity;
    },
  };
}
