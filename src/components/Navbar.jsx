import { useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { colors } from '../designTokens/colors'
import { spacing } from '../designTokens/spacing'
import useNavbarSelector, {
  delayedSelectorUpdate
} from '../hooks/useNavbarSelector'

//! =============== 1. Styled Components ===============

const NAVBAR_BG = colors.background.primary

const NavbarContainer = styled.nav`
  overflow: hidden;
  background: ${NAVBAR_BG};
  padding: 0;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid ${colors.accent.primary}80;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const NavbarBrand = styled.div`
  padding: ${spacing.xs} ${spacing.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 1.6rem;
  letter-spacing: 0.02em;
  user-select: none;

  &:hover {
    transform: scale(1.05);
  }

  .text {
    color: ${colors.text.inverse};
    font-family: 'EDIX', 'Georgia', 'Palatino Linotype', 'Book Antiqua',
      'Times New Roman', serif;
    font-weight: 700;
    font-style: italic;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5),
      0 0 1px rgba(255, 255, 255, 0.3);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0.05em;
  }

  .bracket {
    color: ${colors.accent.primary};
    font-weight: 900;
    font-size: 1.8rem;
    font-family: 'Arial Black', 'Arial', sans-serif;
    text-shadow: 0 0 12px ${colors.accent.primary}ff,
      0 0 20px ${colors.accent.primary}99, 2px 2px 6px rgba(0, 0, 0, 0.7);
    transform: scale(1.1);
    display: inline-block;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    gap: 4px;

    .bracket {
      font-size: 1.5rem;
    }
  }
`

const NavbarContent = styled.div`
  overflow: visible;
  position: relative;

  @media (max-width: 991px) {
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  }
`

const NavMenu = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  position: relative;

  @media (max-width: 991px) {
    flex-direction: column;
  }
`

const NavItem = styled.li`
  list-style-type: none;
  float: left;
  position: relative;
  z-index: 2;

  @media (max-width: 991px) {
    float: none;
  }
`

const StyledNavLink = styled(NavLink)`
  color: ${colors.text.inverseSecondary};
  text-decoration: none;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 20px;
  transition: all 0.3s ease;
  position: relative;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: ${colors.text.inverse};
  }

  &.active {
    color: ${colors.background.primary};
    background-color: transparent;
  }

  @media (max-width: 991px) {
    padding: 12px 30px;
  }
`

const HoriSelector = styled.div`
  display: ${(props) => (props.$width === 0 ? 'none' : 'inline-block')};
  position: absolute;
  bottom: 0;
  left: ${(props) => props.$left}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  transform: translateY(${(props) => -props.$top}px);
  transition: ${(props) =>
    props.$isInitialized
      ? 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      : 'none'};
  background: ${colors.background.surface};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0 -2px 10px ${colors.accent.primary}40;
  z-index: 1;

  @media (max-width: 991px) {
    margin-top: 0;
    margin-left: 10px;
    border-radius: 0;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    transform: none;
    top: ${(props) => props.$top}px;
    bottom: auto;
  }
`

const SelectorLeft = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background: ${colors.background.surface};
  bottom: 0;
  left: -25px;

  &:before {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${NAVBAR_BG};
    bottom: 0;
    left: -25px;
  }

  @media (max-width: 991px) {
    top: -25px;
    left: auto;
    right: 10px;

    &:before {
      left: -25px;
      top: -25px;
    }
  }
`

const SelectorRight = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background: ${colors.background.surface};
  bottom: 0;
  right: -25px;

  &:before {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${NAVBAR_BG};
    bottom: 0;
    right: -25px;
  }

  @media (max-width: 991px) {
    bottom: -25px;
    right: 10px;

    &:before {
      bottom: -25px;
      left: -25px;
    }
  }
`

const NavbarToggler = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 10px;
  display: none;

  @media (max-width: 991px) {
    display: block;
    position: absolute;
    top: ${spacing.md};
    right: ${spacing.md};
  }
`

//! =============== 2. Navigation Items Config ===============

/**
 * @typedef {Object} NavItem
 * @property {string} to - Route path
 * @property {string} label - Display text
 * @property {string} icon - Iconify icon name
 */

/**
 * Navigation menu items configuration
 * @type {NavItem[]}
 */
const navItems = [
  { to: '/', label: '首頁', icon: 'mdi:home' },
  { to: '/timeline', label: '時間軸', icon: 'mdi:timeline-clock' },
  { to: '/about', label: '關於', icon: 'mdi:account-circle' },
  { to: '/contact', label: '聯絡', icon: 'mdi:email' }
]

//! =============== 3. Main Component ===============

/**
 * Navbar component with animated selector for active route
 *
 * @description
 * Main navigation component featuring:
 * - Animated selector that highlights the active navigation item
 * - Responsive mobile menu with toggle
 * - Smooth transitions and hover effects
 * - Clickable brand logo for home navigation
 *
 * @component
 * @example
 * <Navbar />
 */
const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const navMenuRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  // Use custom hook for selector positioning and animation
  const { selectorStyle, isInitialized, updateSelector } = useNavbarSelector(
    navMenuRef,
    location.pathname
  )

  /**
   * Handle mobile menu toggle
   * Updates selector position after animation completes
   */
  const handleToggle = () => {
    setIsOpen(!isOpen)
    delayedSelectorUpdate(updateSelector)
  }

  /**
   * Navigate to home page when logo is clicked
   */
  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <NavbarContainer>
      <NavbarBrand onClick={handleLogoClick}>
        <span className='text'>Harry&apos;s</span>
        <span className='bracket'>&lt;/&gt;</span>
        <span className='text'>Corner</span>
      </NavbarBrand>

      <NavbarToggler onClick={handleToggle}>
        <Icon
          icon='mdi:menu'
          width='24'
          height='24'
        />
      </NavbarToggler>

      <NavbarContent $isOpen={isOpen}>
        <NavMenu ref={navMenuRef}>
          <HoriSelector
            $top={selectorStyle.top}
            $left={selectorStyle.left}
            $width={selectorStyle.width}
            $height={selectorStyle.height}
            $isInitialized={isInitialized}
          >
            <SelectorLeft />
            <SelectorRight />
          </HoriSelector>

          {navItems.map((item) => (
            <NavItem key={item.to}>
              <StyledNavLink to={item.to}>
                <Icon icon={item.icon} />
                {item.label}
              </StyledNavLink>
            </NavItem>
          ))}
        </NavMenu>
      </NavbarContent>
    </NavbarContainer>
  )
}

export default Navbar

