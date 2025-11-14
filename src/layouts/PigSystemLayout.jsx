import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { Outlet, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {
  HomeOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  DeleteOutlined,
  ApiOutlined
} from '@ant-design/icons'
import { colors } from '../designTokens'
import AntdThemeStyles from '../styles/antdTheme'

const { Sider, Content } = Layout

// Styled Layout 容器
const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: ${colors.background.primary};
`

const StyledSider = styled(Sider)`
  &.ant-layout-sider {
    background: ${colors.background.secondary};
    border-right: 1px solid ${colors.accent.gold}40;

    .ant-layout-sider-trigger {
      background: ${colors.background.secondary};
      border-top: 1px solid ${colors.accent.gold}40;
      color: ${colors.accent.gold};
      transition: all 0.3s;

      &:hover {
        background: ${colors.accent.gold}20;
        color: ${colors.accent.gold};
      }
    }
  }
`

const SiderHeader = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${colors.accent.gold}40;
  padding: 0 16px;
  background: ${colors.background.primary};
  overflow: hidden;
  white-space: nowrap;
`

const StyledMenu = styled(Menu)`
  &.ant-menu {
    background: transparent;
    border-right: none;
    color: ${colors.text.inverse};

    .ant-menu-item {
      color: ${colors.text.inverse};

      border-radius: 6px;
      transition: all 0.3s;
      font-size: 15px;
      font-weight: 500;

      &:hover {
        background: ${colors.accent.gold}20;
        color: ${colors.accent.gold} !important;
      }

      &.ant-menu-item-selected {
        background: transparent;
        color: ${colors.accent.gold};
        font-weight: 600;

        &::after {
          display: none;
        }

        &:hover {
          background: ${colors.accent.gold}20;
        }
      }

      a {
        color: inherit;
      }

      .anticon {
        color: inherit;
        font-size: 18px;
      }
    }
  }
`

const StyledContent = styled(Content)`
  padding: 24px;
  background: ${colors.background.primary};
  min-height: calc(100vh - 64px);
`

const PageHeader = styled.div`
  background: ${colors.background.secondary};
  padding: 16px 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid ${colors.accent.gold}40;
  box-shadow: 0 2px 8px ${colors.accent.gold}20;
`

const PageTitle = styled.h1`
  color: ${colors.accent.gold};
  font-size: 26px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: 0.5px;

  .anticon {
    font-size: 30px;
  }
`

const Breadcrumb = styled.div`
  color: ${colors.text.inverse};
  font-size: 14px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.8;

  a {
    color: ${colors.text.inverse};
    text-decoration: none;
    transition: all 0.3s;
    font-weight: 500;

    &:hover {
      color: ${colors.accent.gold};
      opacity: 1;
    }
  }

  .separator {
    color: ${colors.text.inverse};
    opacity: 0.4;
  }

  span:last-child {
    color: ${colors.accent.gold};
    font-weight: 600;
  }
`

function PigSystemLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const menuItems = [
    {
      key: '/pig-house-inventory',
      icon: <DatabaseOutlined />,
      label: <Link to='/pig-house-inventory'>豬舍庫存管理</Link>
    },
    {
      key: '/sow-breeding-records',
      icon: <ExperimentOutlined />,
      label: <Link to='/sow-breeding-records'>種豬繁殖記錄</Link>
    },
    {
      key: '/culling-boar',
      icon: <DeleteOutlined />,
      label: <Link to='/culling-boar'>公豬淘汰管理</Link>
    },
    {
      key: '/boargenotype',
      icon: <ApiOutlined />,
      label: <Link to='/boargenotype'>公豬基因型管理</Link>
    },
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to='/'>返回首頁</Link>
    }
  ]

  // 根據路徑獲取頁面標題和圖標
  const getPageInfo = () => {
    const currentItem = menuItems.find((item) => item.key === location.pathname)
    if (!currentItem)
      return { title: '養豬場管理系統', icon: <DatabaseOutlined /> }

    return {
      title: currentItem.label.props.children,
      icon: currentItem.icon
    }
  }

  const pageInfo = getPageInfo()

  return (
    <>
      <AntdThemeStyles />
      <StyledLayout>
        <StyledSider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint='lg'
          width={250}
        >
          <SiderHeader>
            {!collapsed && (
              <span
                style={{
                  color: colors.accent.gold,
                  fontSize: 18,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  letterSpacing: '0.5px'
                }}
              >
                🐷 養豬場系統
              </span>
            )}
            {collapsed && <span style={{ fontSize: 28 }}>🐷</span>}
          </SiderHeader>
          <StyledMenu
            mode='inline'
            selectedKeys={[location.pathname]}
            items={menuItems}
          />
        </StyledSider>
        <Layout>
          <StyledContent>
            <PageHeader>
              <PageTitle>
                {pageInfo.icon}
                {pageInfo.title}
              </PageTitle>
              <Breadcrumb>
                <Link to='/'>首頁</Link>
                <span className='separator'>/</span>
                <span>養豬場管理系統</span>
                <span className='separator'>/</span>
                <span style={{ color: colors.accent.gold }}>
                  {pageInfo.title}
                </span>
              </Breadcrumb>
            </PageHeader>
            <Outlet />
          </StyledContent>
        </Layout>
      </StyledLayout>
    </>
  )
}

export default PigSystemLayout

