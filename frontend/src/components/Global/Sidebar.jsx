import React, { useState } from "react";
import {
  ScheduleOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
  SettingOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

//! =============== 1. 設定與常量 ===============
//* 這個區塊包含所有專案配置，便於統一管理

/**
 * @constant MENU_ITEMS
 * @description 側邊欄選單項目配置
 * @example
 * // 使用方式
 * <Menu items={MENU_ITEMS} />
 *
 * @notes
 * - 每個項目應包含 key, icon, label 和可選的 children
 * - key 值與路由路徑對應
 */
const MENU_ITEMS = [
  {
    key: "production",
    icon: <ScheduleOutlined />,
    label: "生管部門",
    children: [
      {
        key: "ProductionSchedulePage",
        label: "計畫排程表",
      },
      {
        key: "FactoryQuotationManagementSystem",
        label: "廠內報價系統",
      },
      {
        key: "ProductionRecordPage",
        label: "產品履歷BOM系統",
      },
      {
        key: "CostWiseSystemPage",
        label: "智慧成本分析表",
      },
      {
        key: "SmartScheduling",
        label: "智慧排程",
      },
    ],
  },
  {
    key: "quality",
    icon: <SafetyCertificateOutlined />,
    label: "品管部門",
    children: [
      {
        key: "QualityManagementSystem",
        label: "即時品檢系統",
      },
    ],
  },
  {
    key: "sales",
    icon: <ShoppingOutlined />,
    label: "業務部門",
    children: [
      {
        key: "SalesQuotationManagementSystem",
        label: "業務報價系統",
      },
    ],
  },
  {
    key: "molding",
    icon: <SettingOutlined />,
    label: "成型部門",
    children: [
      {
        key: "MachineMaintenance",
        label: "機台保養表",
      },
      {
        key: "MoldMaintenance",
        label: "模具保養表",
      },
      {
        key: "MachineSelectPage",
        label: "派工系統",
      },
      {
        key: "MachineStatusBoard",
        label: "機台狀態操作面板",
      },
    ],
  },
];

// 排除機台選擇頁面
const EXCLUDED_PAGES = [
  "/",
  "/MachineSelectPage",
  "/ProductionReportPage",
  "/LeaderSignPage",
  "/ProductionDetailPage",
  "/OperatorSignPage",
  "/ProductionInspectionPage",
];

/**
 * @constant DEFAULT_OPEN_KEYS
 * @description 預設展開的選單項目
 */
const DEFAULT_OPEN_KEYS = ["production", "quality", "sales", "molding"];

/**
 * @constant PATH_PATTERNS
 * @description 定義路徑模式的常量
 */
const PATH_PATTERNS = {
  ROOT: "",
  TRAILING_SLASHES: /\/+$/,
};

/**
 * @function normalizePath
 * @description 標準化路徑格式
 */
const normalizePath = (path) =>
  path.replace(PATH_PATTERNS.TRAILING_SLASHES, "");

/**
 * @function isRootPath
 * @description 檢查是否為根路徑
 */
const isRootPath = (path) => normalizePath(path) === PATH_PATTERNS.ROOT;

/**
 * @function isPathMatch
 * @description 檢查路徑是否匹配（精確匹配或前綴匹配）
 */
const isPathMatch = (currentPath, targetPath) => {
  const normalized = normalizePath(currentPath);
  return normalized === targetPath || normalized.startsWith(`${targetPath}/`);
};

/**
 * @function shouldHideSidebar
 * @description 決定是否應該隱藏側邊欄
 */
const shouldHideSidebar = (pathname) => {
  // 🧠 優先處理根路徑
  if (isRootPath(pathname)) {
    return true;
  }

  // ✨ 檢查是否在排除列表中
  return EXCLUDED_PAGES.some((path) => isPathMatch(pathname, path));
};

//! =============== 2. 類型與介面 ===============
//* 定義所有資料結構，幫助理解資料流向

/**
 * @typedef {Object} MenuItem
 * @description 選單項目的資料結構
 * @property {string} key - 唯一識別符，也用於路由導航
 * @property {React.ReactNode} icon - 項目圖標
 * @property {string} label - 顯示文字
 * @property {MenuItem[]} [children] - 子選單項目
 */

//! =============== 3. 核心功能 ===============
//* 主要業務邏輯區，每個功能都配有詳細說明

/**
 * @function Sidebar
 * @description 側邊欄組件，提供應用導航功能
 * @returns {React.ReactNode} - 側邊欄組件
 *
 * @example
 * // 在 Layout 中使用
 * <Layout>
 *   <Sidebar />
 *   <Content />
 * </Layout>
 *
 * @notes
 * - 在首頁（路徑為 "/"）不顯示側邊欄
 * - 支持折疊/展開功能
 * - 自動根據當前路徑選中對應選單項
 */
const Sidebar = () => {
  // 狀態管理
  const [collapsed, setCollapsed] = useState(false);

  // 路由相關 hooks
  const navigate = useNavigate();
  const location = useLocation();

  const isExcludedPage = shouldHideSidebar(location.pathname);

  // 取得當前路徑作為選中項目
  const selectedKey =
    location.pathname.split("/")[1] || "ProductionSchedulePage";

  /**
   * @function handleMenuClick
   * @description 處理選單點擊事件
   * @param {Object} params - 選單點擊參數
   * @param {string} params.key - 被點擊的選單項鍵值
   */
  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  // 如果是首頁，則不渲染 Sidebar
  if (isExcludedPage) {
    return null;
  }

  return (
    <SidebarContainer>
      <StyledSider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <BurgerMenu>
          <Button
            type="text"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ color: "white" }}
          />
        </BurgerMenu>
        <StyledMenu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={DEFAULT_OPEN_KEYS}
          items={MENU_ITEMS}
          onClick={handleMenuClick}
        />
      </StyledSider>
    </SidebarContainer>
  );
};

//! =============== 4. 工具函數 ===============
//* 通用功能區，可被多個模組復用

// 此組件無需額外工具函數

//! =============== 5. 樣式組件 ===============
//* 樣式相關的組件定義

/**
 * @component StyledSider
 * @description 自定義樣式的 Sider 組件
 *
 * @notes
 * - 移除了背景色
 * - 設置了 100vh 高度
 */
const StyledSider = styled(Layout.Sider)`
  // 布局定位
  .ant-layout-sider-children {
    height: 100vh;
    left: 0;
  }

  // 視覺樣式
  &.ant-layout-sider {
    background: none;
  }
`;

/**
 * @component StyledMenu
 * @description 自定義樣式的 Menu 組件
 *
 * @notes
 * - 移除了背景色
 * - 自定義了字體大小和粗細
 */
const StyledMenu = styled(Menu)`
  // 視覺樣式
  &.ant-menu-dark {
    background: none;

    &.ant-menu-inline .ant-menu-sub.ant-menu-inline {
      background: none;
    }
  }

  // 主類別樣式
  .ant-menu-submenu-title {
    font-size: 20px;
    font-weight: 600;
    .anticon {
      font-size: 20px;
    }
  }

  // 子類別樣式
  .ant-menu-item {
    font-size: 18px;
    font-weight: 400;
  }
`;

/**
 * @component Logo
 * @description Logo 區域
 *
 * @notes
 * - 目前設為隱藏
 * - 保留位置以便後續添加實際 Logo
 */
const Logo = styled.div`
  // 盒模型
  height: 32px;
  margin: 16px;

  // 視覺樣式
  background: rgba(255, 255, 255, 0.3);
  display: none;
`;

/**
 * @component BurgerMenu
 * @description 漢堡選單按鈕區域
 *
 * @notes
 * - 控制側邊欄的展開/收合
 */
const BurgerMenu = styled.div`
  // 布局定位
  text-align: right;

  // 盒模型
  padding: 0 24px;
  margin-bottom: 16px;

  // 視覺樣式
  font-size: 20px;

  svg {
    fill: #ffffff;
  }
`;

/**
 * @component SidebarContainer
 * @description 側邊欄容器
 *
 * @notes
 * - 控制側邊欄的整體布局和定位
 */
const SidebarContainer = styled.div`
  // 布局定位
  .ant-layout-sider {
    height: 100vh;
    left: 0;
    z-index: 1;
  }

  // 盒模型
  padding-top: 14px;
`;

export default Sidebar;
