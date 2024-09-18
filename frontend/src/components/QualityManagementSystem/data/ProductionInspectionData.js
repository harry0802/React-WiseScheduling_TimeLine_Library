export const mockLots = [
  {
    productName: "Product A",
    workOrderQuantity: 1000,
    unfinishedQuantity: 200,
    processName: "Assembly",
    children: [
      {
        lotName: "Lot-A-001",
        operator1: "John Doe",
        operator2: "Jane Smith",
        startTime: "2023-06-01T08:00:00Z",
        defectiveQuantity: 5,
        productionQuantity: 795,
      },
    ],
  },
  {
    productName: "Product B",
    workOrderQuantity: 500,
    unfinishedQuantity: 100,
    processName: "Painting",
    children: [
      {
        lotName: "Lot-B-001",
        operator1: "Bob Johnson",
        operator2: "Alice Brown",
        startTime: "2023-06-01T09:30:00Z",
        defectiveQuantity: 2,
        productionQuantity: 398,
      },
    ],
  },
  {
    productName: "Product C",
    workOrderQuantity: 750,
    unfinishedQuantity: 150,
    processName: "Packaging",
    children: [
      {
        lotName: "Lot-C-001",
        operator1: "Charlie Wilson",
        operator2: "Diana Clark",
        startTime: "2023-06-01T10:15:00Z",
        defectiveQuantity: 3,
        productionQuantity: 597,
      },
    ],
  },
];
