/*
services/
├── api/
│   ├── apiSlice.ts
│   ├── types.ts
│   └── endpoints/
│       ├── customerApi.ts
│       ├── machineApi.ts
│       ├── quotationApi.ts
│       ├── processApi.ts
│       ├── shippingApi.ts
│       └── optionApi.ts
*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../../store/api/apiConfig";

const salesQuotationApiSlice = createApi({
  reducerPath: "salesQuotationApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  tagTypes: [
    "Quotation",
    "Customer",
    "Machine",
    "Option",
    "Process",
    "Shipping",
  ],
  endpoints: () => ({}),
});

export default salesQuotationApiSlice;
/*
在組件中使用
import { useGetCustomersQuery } from '@/services/api/endpoints/customerApi';
import { useCreateQuotationMutation } from '@/services/api/endpoints/quotationApi';
import { useUpdateProcessMutation } from '@/services/api/endpoints/processApi';

const QuotationForm = () => {
  const { data: customers } = useGetCustomersQuery();
  const [createQuotation] = useCreateQuotationMutation();
  const [updateProcess] = useUpdateProcessMutation();

  使用這些 hooks...
};
*/
