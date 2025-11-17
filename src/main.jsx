import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// ⚡ 只在開發環境載入 DevTools
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import wiseSchedulingApiSlice from './components/WiseScheduling/services/apiSlice'
import App from './App.jsx'
import theme from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'

// 檢測是否為開發環境
const isDevelopment = import.meta.env.DEV

// 創建 QueryClient 實例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 窗口重新聚焦時不重新獲取數據
      retry: 1, // 失敗時重試 1 次
      staleTime: 1000 * 60 * 5 // 數據 5 分鐘後過期
    }
  }
})

// 創建 Redux Store (for WiseScheduling RTK Query)
const store = configureStore({
  reducer: {
    [wiseSchedulingApiSlice.reducerPath]: wiseSchedulingApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wiseSchedulingApiSlice.middleware)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <App />
          {/* ⚡ 只在開發環境顯示 DevTools */}
          {isDevelopment && <ReactQueryDevtools />}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)

