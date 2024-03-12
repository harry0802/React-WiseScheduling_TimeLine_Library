import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import productionScheduleApi from "./api/productionScheduleApi"
import productionAssignmentApi from "./api/productionAssignmentApi"

const store = configureStore({

    reducer: {
        [productionScheduleApi.reducerPath]: productionScheduleApi.reducer,
        [productionAssignmentApi.reducerPath]: productionAssignmentApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productionScheduleApi.middleware,
            productionAssignmentApi.middleware,
        )

})

setupListeners(store.dispatch)

export default store
