import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import productionScheduleApi from "./api/productionScheduleApi"

const store = configureStore({

    reducer: {
        [productionScheduleApi.reducerPath]: productionScheduleApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productionScheduleApi.middleware,
        )

})

setupListeners(store.dispatch)

export default store
