import { useEffect } from 'react'

/**
 * @function useDocumentTitle
 * @description 自定義 Hook 用於動態設置文檔標題
 * @param {string} title - 要設置的標題
 * @param {string} suffix - 標題後綴 (可選)
 */
export const useDocumentTitle = (title, suffix = "Harry's </> Corner") => {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title ? `${title} | ${suffix}` : suffix

    // 清理函數：組件卸載時恢復標題
    return () => {
      document.title = prevTitle
    }
  }, [title, suffix])
}

export default useDocumentTitle
