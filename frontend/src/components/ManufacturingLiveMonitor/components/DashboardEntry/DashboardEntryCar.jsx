import { useRef, useEffect } from 'react'

import VanillaTilt from 'vanilla-tilt'
import styles from './styles.module.css'

/**
 * @function DashboardEntry
 * @description 科技感的儀表板入口卡片，具有傾斜交互效果
 * @param {Object} props - 組件屬性
 * @param {string} props.title - 卡片標題
 * @param {string} props.description - 卡片描述內容
 * @param {string} props.icon - Material 圖標名稱
 * @param {string} props.color - 卡片的主色調
 * @param {Object} props.stats - 卡片的統計數據
 * @param {Function} props.onClick - 點擊卡片時的回調函數
 * @returns {JSX.Element} 渲染的卡片組件
 */
function DashboardEntryCar({
  title,
  description,
  icon,
  color,
  stats,
  onClick
}) {
  const cardRef = useRef(null)

  // ✨ 應用 vanilla-tilt 效果
  useEffect(() => {
    // 確保 DOM 元素已經存在
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 10, // 最大傾斜角度
        speed: 400, // 傾斜轉換速度
        glare: true, // 啟用光澤效果
        'max-glare': 0.3, // 最大光澤不透明度
        scale: 1.05, // 縮放比例
        perspective: 1000, // 透視效果
        gyroscope: false, // 禁用陀螺儀
        transition: true, // 啟用過渡效果
        easing: 'cubic-bezier(.03,.98,.52,.99)' // 緩動函數
      })
    }

    // 清理函數
    return () => {
      if (cardRef.current && cardRef.current.vanillaTilt) {
        cardRef.current.vanillaTilt.destroy()
      }
    }
  }, [])

  // 根據趨勢決定樣式類別
  const getTrendClass = (trend) => {
    switch (trend) {
      case 'up':
        return styles.trendUp
      case 'down':
        return styles.trendDown
      default:
        return styles.trendStable
    }
  }

  // 根據趨勢獲取圖標
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'trending_up'
      case 'down':
        return 'trending_down'
      default:
        return 'trending_flat'
    }
  }

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onClick={onClick}
      style={{
        '--card-color': color,
        '--card-gradient': `linear-gradient(135deg, ${color} 0%, rgba(0,0,0,0.7) 100%)`
      }}
      data-tilt-glare
    >
      <div className={styles.cardContent}>
        <div className={styles.iconContainer}>
          <span className={`${styles.icon} material-icons`}>{icon}</span>
        </div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        {stats && (
          <div className={styles.stats}>
            <div className={styles.statValue}>{stats.value}</div>
            <div
              className={`${styles.statTrend} ${getTrendClass(stats.trend)}`}
            >
              <span className='material-icons'>
                {getTrendIcon(stats.trend)}
              </span>
              <span>{stats.change}</span>
            </div>
          </div>
        )}

        <div className={styles.cardOverlay}></div>
        <div className={styles.cardRing}></div>
      </div>
    </div>
  )
}

export default DashboardEntryCar

