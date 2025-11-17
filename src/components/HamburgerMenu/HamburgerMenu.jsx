import PropTypes from 'prop-types'
import { StyledHamburgerLabel } from './HamburgerMenu.styles'

//! =============== 1. Types & Interfaces ===============

/**
 * @typedef {Object} HamburgerMenuProps
 * @property {string} [size] - 控制圖示縮放的基礎 font-size (例如 "1rem", "1.5rem")
 * @property {string} [color] - SVG 線條的顏色
 * @property {string} [className] - 自定義 class
 * @property {boolean} [checked] - (受控) 外部傳入的選中狀態
 * @property {function} [onChange] - (受控) 狀態改變時的回調
 */

//! =============== 2. Main Component ===============

/**
 * HamburgerMenu - 具動畫效果的 SVG 漢堡選單圖示
 *
 * @description
 * 受控組件設計，可與父組件的狀態管理整合
 * - 點擊時旋轉 -45deg 並轉換為 X 形狀
 * - 使用 CSS stroke-dasharray 動畫
 * - 支援自定義尺寸和顏色
 *
 * @param {HamburgerMenuProps} props
 * @returns {JSX.Element}
 *
 * @example
 * <HamburgerMenu
 *   size="1.5rem"
 *   color="#ffffff"
 *   checked={isOpen}
 *   onChange={handleToggle}
 * />
 */
function HamburgerMenu({ size, color, className, checked, onChange }) {
  return (
    <StyledHamburgerLabel
      size={size}
      color={color}
      className={className}
      data-testid="hamburger-menu"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label="Toggle menu"
      />
      <svg viewBox="0 0 32 32">
        <path
          className="line line-top-bottom"
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        />
        <path className="line" d="M7 16 27 16" />
      </svg>
    </StyledHamburgerLabel>
  )
}

HamburgerMenu.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

export default HamburgerMenu
