import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

// 使用 styled-components 重新定義元件
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background-color: #2c2c2c;
  color: #f5f5f5;
  box-shadow: 0 2px 8px rgba(21, 147, 235, 0.1);
  border-bottom: 1px solid #1593EB;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`

const NavBrand = styled.div`
  h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1593EB;
    letter-spacing: 0.05em;
  }
`

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
    justify-content: space-between;
  }
`

const NavItem = styled.li`
  margin-left: 1.5rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`

const StyledNavLink = styled(NavLink)`
  color: #e0e0e0;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    color: #1593EB;
    background-color: rgba(21, 147, 235, 0.1);
  }

  &.active {
    color: #1593EB;
    background-color: rgba(21, 147, 235, 0.15);
    border-bottom: 2px solid #1593EB;
  }
`

const Navbar = () => {
  return (
    <Nav>
      <NavBrand>
        <h1>時間軸專案</h1>
      </NavBrand>
      <NavMenu>
        <NavItem>
          <StyledNavLink
            to='/'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            首頁
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink
            to='/timeline'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            時間軸
          </StyledNavLink>
        </NavItem>

        {/* [等待刪除] 數據滑動器導航連結已移除
        <NavItem>
          <StyledNavLink to="/slider" className={({ isActive }) => isActive ? 'active' : ''}>
            數據滑動器
          </StyledNavLink>
        </NavItem>
        */}

        <NavItem>
          <StyledNavLink
            to='/about'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            關於
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink
            to='/contact'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            聯絡
          </StyledNavLink>
        </NavItem>
      </NavMenu>
    </Nav>
  )
}

export default Navbar

