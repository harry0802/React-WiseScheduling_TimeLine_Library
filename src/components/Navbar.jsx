import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// 使用 styled-components 重新定義元件
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const NavBrand = styled.div`
  h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
    justify-content: space-between;
  }
`;

const NavItem = styled.li`
  margin-left: 1.5rem;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #ccc;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
  
  &.active {
    color: #61dafb;
    border-bottom: 2px solid #61dafb;
    padding-bottom: 3px;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavBrand>
        <h1>時間軸專案</h1>
      </NavBrand>
      <NavMenu>
        <NavItem>
          <StyledNavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            首頁
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/timeline" className={({ isActive }) => isActive ? 'active' : ''}>
            時間軸
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/slider" className={({ isActive }) => isActive ? 'active' : ''}>
            數據滑動器
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
            關於
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
            聯絡
          </StyledNavLink>
        </NavItem>
      </NavMenu>
    </Nav>
  );
};

export default Navbar;
