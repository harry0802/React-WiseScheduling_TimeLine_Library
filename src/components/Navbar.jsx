import { useRef, useState, useCallback, memo } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { colors } from '../designTokens/colors'
import { spacing } from '../designTokens/spacing'
import { screenSizes } from '../styles/SharedStyles'
import HamburgerMenu from './HamburgerMenu'
import useNavbarSelector, {
  delayedSelectorUpdate
} from '../hooks/useNavbarSelector'

//! =============== 1. Types & Interfaces ===============

/**
 * @typedef {Object} NavItemConfig
 * @property {string} to - Route path
 * @property {string} label - Display text
 * @property {string} src - Icon image path
 */

//! =============== 2. Constants & Configuration ===============

const NAVBAR_BG = colors.background.primary

/**
 * Navigation menu items configuration
 * @type {NavItemConfig[]}
 */
const navItems = [
  {
    to: '/',
    label: '首頁',
    src: '/React-WiseScheduling_TimeLine_Library/Icon/hammer.png'
  },
  {
    to: '/timeline',
    label: '時間軸',
    src: '/React-WiseScheduling_TimeLine_Library/Icon/bow-and-arrow.png'
  },
  {
    to: '/about',
    label: '關於',
    src: '/React-WiseScheduling_TimeLine_Library/Icon/laser-sword.png'
  },
  {
    to: '/contact',
    label: '聯絡',
    src: '/React-WiseScheduling_TimeLine_Library/Icon/aircraft.png'
  }
]

//! =============== 3. Styled Components ===============

const NavbarContainer = styled.nav`
  /* Layout & Positioning */
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  /* Box Model */
  padding: 0;

  /* Visual Styles */
  background: ${NAVBAR_BG};
  border-bottom: 1px solid ${colors.accent.primary}80;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  /* Desktop Layout */
  @media (min-width: ${screenSizes.desktop}) {
    justify-content: space-between;
  }
`

const NavbarBrand = styled.div`
  /* Layout & Positioning */
  display: inline-flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  /* Box Model */
  padding: ${spacing.xs} ${spacing.sm};
  gap: 4px;

  /* Visual Styles */
  font-size: 1.3rem;
  letter-spacing: 0.02em;

  /* Effects */
  transition: all 0.3s ease;

  /* Other */
  cursor: pointer;
  user-select: none;

  &:hover {
    transform: translateX(-50%) scale(1.05);
  }

  /* Desktop Layout */
  @media (min-width: ${screenSizes.desktop}) {
    position: static;
    transform: none;

    &:hover {
      transform: scale(1.05);
    }
  }

  .text {
    color: ${colors.text.inverse};
    font-family: 'EDIX', 'Georgia', 'Palatino Linotype', 'Book Antiqua',
      'Times New Roman', serif;
    font-weight: 700;
    font-style: italic;
    letter-spacing: 0.05em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5),
      0 0 1px rgba(255, 255, 255, 0.3);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .mobile-only {
    display: inline;
  }

  .desktop-only {
    display: none;
  }

  .bracket {
    color: ${colors.accent.primary};
    font-family: 'Arial Black', 'Arial', sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    text-shadow: 0 0 12px ${colors.accent.primary}ff,
      0 0 20px ${colors.accent.primary}99, 2px 2px 6px rgba(0, 0, 0, 0.7);
    transform: scale(1.1);
    display: inline-block;
  }

  /* Tablet & Desktop */
  @media (min-width: ${screenSizes.tablet}) {
    gap: 6px;
    font-size: 1.6rem;

    .mobile-only {
      display: none;
    }

    .desktop-only {
      display: inline;
    }

    .bracket {
      font-size: 1.8rem;
    }
  }
`

const NavbarContent = styled.div`
  /* Layout & Positioning (Mobile First) */
  display: none;
  position: relative;
  overflow: visible;

  /* Desktop Layout - 只在桌面版顯示 */
  @media (min-width: ${screenSizes.desktop}) {
    display: block;
  }
`

const NavMenu = styled.ul`
  /* Layout & Positioning (Mobile First) */
  display: flex;
  flex-direction: column;
  position: relative;

  /* Box Model */
  padding: 0;
  margin: 0;

  /* Visual Styles */
  list-style: none;

  /* Desktop Layout */
  @media (min-width: ${screenSizes.desktop}) {
    flex-direction: row;
  }
`

const NavItem = styled.li`
  /* Layout & Positioning (Mobile First) */
  position: relative;
  float: none;

  /* Visual Styles */
  list-style-type: none;

  /* Other */
  z-index: 2;

  /* Desktop Layout */
  @media (min-width: ${screenSizes.desktop}) {
    float: left;
  }
`

const StyledNavLink = styled(NavLink)`
  /* Layout & Positioning (Mobile First) */
  display: flex;
  align-items: center;
  position: relative;

  /* Box Model */
  padding: 12px 30px;
  gap: 10px;

  /* Visual Styles */
  color: ${colors.text.inverseSecondary};
  font-size: 15px;
  text-decoration: none;
  background-color: transparent;

  /* Effects */
  transition: all 0.3s ease;

  img {
    display: block;
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  &:hover {
    color: ${colors.text.inverse};
  }

  &.active {
    color: ${colors.background.primary};
  }

  /* Desktop Layout */
  @media (min-width: ${screenSizes.desktop}) {
    padding: 20px 20px;
  }
`

const HoriSelector = styled.div`
  /* Layout & Positioning (Mobile First) */
  display: ${(props) => (props.$width === 0 ? 'none' : 'inline-block')};
  position: absolute;
  top: ${(props) => props.$top}px;
  bottom: auto;
  left: ${(props) => props.$left}px;

  /* Box Model */
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  margin-top: 0;
  margin-left: 10px;

  /* Visual Styles */
  background: ${colors.background.surface};
  border-radius: 0;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  box-shadow: 0 -2px 10px ${colors.accent.primary}40;

  /* Effects */
  transform: none;
  transition: ${(props) =>
    props.$isInitialized
      ? 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      : 'none'};

  /* Other */
  z-index: 1;

  /* Desktop Layout */
  @media (min-width: ${screenSizes.desktop}) {
    bottom: 0;
    top: auto;
    margin-left: 0;
    border-radius: 0;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    transform: translateY(${(props) => -props.$top}px);
  }
`

const SelectorLeft = styled.div`
  /* Layout & Positioning (Mobile First) */
  position: absolute;
  top: -25px;
  left: auto;
  right: 10px;

  /* Box Model */
  width: 25px;
  height: 25px;

  /* Visual Styles */
  background: ${colors.background.surface};

  &:before {
    content: '';
    position: absolute;
    top: -25px;
    left: -25px;
    width: 50px;
    height: 50px;
    background: ${NAVBAR_BG};
    border-radius: 50%;
  }

  /* Desktop Layout */
  @media (min-width: ${screenSizes.desktop}) {
    top: auto;
    bottom: 0;
    left: -25px;
    right: auto;

    &:before {
      top: auto;
      bottom: 0;
    }
  }
`

const SelectorRight = styled.div`
  /* Layout & Positioning (Mobile First) */
  position: absolute;
  bottom: -25px;
  right: 10px;

  /* Box Model */
  width: 25px;
  height: 25px;

  /* Visual Styles */
  background: ${colors.background.surface};

  &:before {
    content: '';
    position: absolute;
    bottom: -25px;
    left: -25px;
    width: 50px;
    height: 50px;
    background: ${NAVBAR_BG};
    border-radius: 50%;
  }

  /* Desktop Layout */
  @media (min-width: ${screenSizes.desktop}) {
    bottom: 0;
    right: -25px;

    &:before {
      bottom: 0;
      left: auto;
      right: -25px;
    }
  }
`

const NavbarToggler = styled.button`
  /* Layout & Positioning (Mobile First) */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Box Model */
  padding: ${spacing.xs} ${spacing.sm};
  margin-left: ${spacing.xs};

  /* Visual Styles */
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;

  /* Other */
  cursor: pointer;

  /* Desktop Layout - 隱藏漢堡選單 */
  @media (min-width: ${screenSizes.desktop}) {
    display: none;
  }
`

//! =============== 4. Main Component ===============

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
function Navbar() {
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
  const handleToggle = useCallback(() => {
    setIsOpen((prevOpen) => !prevOpen)
    delayedSelectorUpdate(updateSelector)
  }, [updateSelector])

  /**
   * Navigate to home page when logo is clicked
   */
  const handleLogoClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <>
      <NavbarContainer>
        <NavbarToggler>
          <HamburgerMenu
            size='1.5rem'
            color={colors.text.inverse}
            checked={isOpen}
            onChange={handleToggle}
          />
        </NavbarToggler>

        <NavbarBrand onClick={handleLogoClick}>
          <span className='text mobile-only'>H</span>
          <span className='text desktop-only'>Harry&apos;s</span>
          <span className='bracket'>&lt;/&gt;</span>
          <span className='text desktop-only'>Corner</span>
          <span className='text mobile-only'>C</span>
        </NavbarBrand>

        <NavbarContent>
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
                  <img
                    src={item.src}
                    alt={item.label}
                  />
                  {item.label}
                </StyledNavLink>
              </NavItem>
            ))}
          </NavMenu>
        </NavbarContent>
      </NavbarContainer>

      {/* Mobile Drawer */}
      <Drawer
        anchor='right'
        open={isOpen}
        onClose={handleToggle}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: colors.background.primary,
            color: colors.text.inverse,
            borderLeft: `2px solid ${colors.accent.primary}`
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: spacing.md,
            borderBottom: `1px solid ${colors.border.light}`
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '1.3rem',
              letterSpacing: '0.02em',
              '& .text': {
                color: colors.text.inverse,
                fontFamily: '"EDIX", "Georgia", serif',
                fontWeight: 700,
                fontStyle: 'italic',
                letterSpacing: '0.05em'
              },
              '& .bracket': {
                color: colors.accent.primary,
                fontFamily: '"Arial Black", "Arial", sans-serif',
                fontWeight: 900,
                fontSize: '1.5rem',
                textShadow: `0 0 12px ${colors.accent.primary}ff`
              }
            }}
          >
            <span className='text'>H</span>
            <span className='bracket'>&lt;/&gt;</span>
          </Box>
          <IconButton
            onClick={handleToggle}
            sx={{ color: colors.text.inverse }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Menu Items */}
        <List sx={{ padding: spacing.sm }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.to}
              onClick={() => {
                navigate(item.to)
              }}
              sx={{
                borderRadius: '8px',
                marginBottom: spacing.xs,
                padding: spacing.sm,
                '&:hover': {
                  backgroundColor: colors.accent.primary + '20'
                },
                '&.Mui-selected': {
                  backgroundColor: colors.background.surface,
                  color: colors.background.primary,
                  '&:hover': {
                    backgroundColor: colors.background.surface
                  }
                }
              }}
              selected={location.pathname === item.to}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <img
                  src={item.src}
                  alt={item.label}
                  style={{ width: 24, height: 24 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '15px',
                  fontWeight: 500
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default memo(Navbar)

