import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../designTokens/colors'
import { spacing } from '../designTokens/spacing'

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
    font-family: 'EDIX', 'Georgia', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', serif;
    font-weight: 700;
    font-style: italic;
    text-shadow:
      2px 2px 4px rgba(0, 0, 0, 0.5),
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
    text-shadow:
      0 0 12px ${colors.accent.primary}ff,
      0 0 20px ${colors.accent.primary}99,
      2px 2px 6px rgba(0, 0, 0, 0.7);
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
  padding: 20px 20px;
  transition: all 0.3s ease;
  position: relative;

  i {
    margin-right: 10px;
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
  display: inline-block;
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
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

const navItems = [
  { to: '/', label: '首頁', icon: 'tachometer-alt' },
  { to: '/timeline', label: '時間軸', icon: 'calendar-alt' },
  { to: '/about', label: '關於', icon: 'address-book' },
  { to: '/contact', label: '聯絡', icon: 'copy' }
]

//! =============== 3. Main Component ===============

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const navMenuRef = useRef(null)
  const [selectorStyle, setSelectorStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  })
  const [isOpen, setIsOpen] = useState(false)

  const updateSelector = () => {
    if (!navMenuRef.current) return

    const activeItem = navMenuRef.current.querySelector('.active')
    if (!activeItem) return

    const activeParent = activeItem.parentElement
    const rect = activeParent.getBoundingClientRect()

    setSelectorStyle({
      top: activeParent.offsetTop,
      left: activeParent.offsetLeft,
      width: rect.width,
      height: rect.height
    })
  }

  useEffect(() => {
    // 初始化和路由變化時更新 selector
    const timer = setTimeout(updateSelector, 100)
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    // 視窗 resize 時更新
    const handleResize = () => {
      setTimeout(updateSelector, 100)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    setTimeout(updateSelector, 300)
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <NavbarContainer>
      <NavbarBrand onClick={handleLogoClick}>
        <span className="text">Harry&apos;s</span>
        <span className="bracket">&lt;/&gt;</span>
        <span className="text">Corner</span>
      </NavbarBrand>

      <NavbarToggler onClick={handleToggle}>
        <i className='fas fa-bars'></i>
      </NavbarToggler>

      <NavbarContent $isOpen={isOpen}>
        <NavMenu ref={navMenuRef}>
          <HoriSelector
            $top={selectorStyle.top}
            $left={selectorStyle.left}
            $width={selectorStyle.width}
            $height={selectorStyle.height}
          >
            <SelectorLeft />
            <SelectorRight />
          </HoriSelector>

          {navItems.map((item) => (
            <NavItem key={item.to}>
              <StyledNavLink to={item.to}>
                <i className={`far fa-${item.icon}`}></i>
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

