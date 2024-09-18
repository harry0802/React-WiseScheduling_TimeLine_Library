import { createLotChild } from "./LotChild";

export function createLot(props) {
  return {
    productName: props.productName,
    workOrderQuantity: props.workOrderQuantity,
    unfinishedQuantity: props.unfinishedQuantity,
    processName: props.processName,
    children: props.children.map(createLotChild),

    addChild(childProps) {
      this.children.push(createLotChild(childProps));
    },

    updateLastChildProductionQuantity(quantity) {
      const lastChild = this.children[this.children.length - 1];
      lastChild.updateProductionQuantity(quantity);
    },

    getLastChild() {
      return this.children[this.children.length - 1];
    },

    hasEmptyProductionQuantity() {
      return !this.getLastChild().productionQuantity;
    },
  };
}
