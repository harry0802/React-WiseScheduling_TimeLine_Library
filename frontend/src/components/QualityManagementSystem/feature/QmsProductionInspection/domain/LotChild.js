export function createLotChild(props) {
  return {
    lotName: props.lotName,
    operator1: props.operator1,
    operator2: props.operator2,
    startTime: props.startTime,
    defectiveQuantity: props.defectiveQuantity,
    productionQuantity: props.productionQuantity,

    updateProductionQuantity(quantity) {
      this.productionQuantity = quantity;
    },
  };
}
