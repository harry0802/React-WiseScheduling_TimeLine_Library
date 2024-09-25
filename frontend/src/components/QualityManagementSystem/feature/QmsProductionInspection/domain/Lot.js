import { createLotChild } from "./LotChild";

// Factory function to create a Lot object
export function createLot(props) {
  return {
    // Basic properties of the Lot
    ...props,
    // Create LotChild objects for each child in the props
    children: props.children.map(createLotChild),

    // Method to add a new child to the Lot
    addChild(childProps) {
      this.children.push(createLotChild(childProps));
    },

    //  Method to update the production quantity of the last child
    // ? but seen like only one child
    updateLastChildInspectionQuantity(quantity) {
      const lastChild = this.children.at(-1);

      lastChild.updateInspectionQuantity(quantity);
    },
    updateLastChildGoodQuantity(quantity) {
      const lastChild = this.children.at(-1);
      lastChild.updateGoodQuantity(quantity);
    },

    // Method to get the last child of the Lot
    getLastChild() {
      return this.children[this.children.length - 1];
    },

    // Method to check if the last child has an empty production quantity
    hasEmptyProductionQuantity() {
      const lastChild = this.getLastChild();
      return !lastChild.inspectionQuantity || !lastChild.goodQuantity;
    },
  };
}
