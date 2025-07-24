/**
 * @fileoverview 全域側邊欄組件 - 製造管理系統導航選單
 * @description 提供統一的側邊欄導航功能，支援多部門選單、動態隱藏、新分頁開啟等功能
 * @version 2.0.0
 * @author FlaskPlastic Development Team
 * @since 2024-07-24
 *
 * @features
 * - 多部門分類選單 (生管、品管、業務、成型)
 * - 智能頁面隱藏機制
 * - 新分頁開啟支援
 * - 響應式摺疊功能
 * - 無障礙設計支援
 *
 * @dependencies
 * - React 18+ with Hooks
 * - Ant Design Components
 * - React Router v6
 * - styled-components
 */

import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
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

// ===================================================================================================
// 🔧 設定常量與配置 (Configuration Constants)
// ===================================================================================================

/**
 * @constant {Array<MenuGroupConfig>} MENU_CONFIG
 * @description 主選單配置 - 定義所有部門的選單結構和路由規則
 *
 * @typedef {Object} MenuGroupConfig
 * @property {string} key - 選單群組唯一識別碼
 * @property {React.ReactNode} icon - 顯示圖示
 * @property {string} label - 顯示標籤
 * @property {Array<MenuItemConfig>} children - 子選單項目
 *
 * @typedef {Object} MenuItemConfig
 * @property {string} key - 選單項目唯一識別碼 (對應路由)
 * @property {string} label - 顯示標籤
 * @property {boolean} [hideSidebar] - 是否在該頁面隱藏側邊欄
 * @property {boolean} [openInNewTab] - 是否在新分頁開啟
 */
const MENU_CONFIG = [
  {
    key: "production",
    icon: <ScheduleOutlined />,
    label: "生管部門",
    children: [
      { key: "ProductionSchedulePage", label: "計畫排程表" },
      { key: "FactoryQuotationManagementSystem", label: "廠內報價系統" },
      { key: "ProductionRecordPage", label: "產品履歷BOM系統" },
      { key: "CostWiseSystemPage", label: "智慧成本分析表" },
      { key: "SmartScheduling", label: "智慧排程" },
    ],
  },
  {
    key: "quality",
    icon: <SafetyCertificateOutlined />,
    label: "品管部門",
    children: [{ key: "QualityManagementSystem", label: "即時品檢系統" }],
  },
  {
    key: "sales",
    icon: <ShoppingOutlined />,
    label: "業務部門",
    children: [
      { key: "SalesQuotationManagementSystem", label: "業務報價系統" },
    ],
  },
  {
    key: "molding",
    icon: <SettingOutlined />,
    label: "成型部門",
    children: [
      { key: "MachineMaintenance", label: "機台保養表" },
      { key: "MoldMaintenance", label: "模具保養表" },
      { key: "MachineSelectPage", label: "派工系統", hideSidebar: true },
      {
        key: "MachineStatusBoard",
        label: "機台狀態操作面板",
        hideSidebar: true,
      },
      //
      {
        key: "FactoryPerformanceDashboard",
        label: "廠區績效儀表板",
        openInNewTab: true,
        hideSidebar: true,
      },
      {
        key: "RealTimeOEEMonitor",
        label: "施工養護綜合數據",
        openInNewTab: true,
        hideSidebar: true,
      },
      {
        key: "ProductionProgressTracker",
        label: "即時生產進度追蹤",
        openInNewTab: true,
        hideSidebar: true,
      },
      // ! 因為這個頁面 ERP 沒有提供資料 所以先隱藏
      // {
      //   key: "DeliveryTrendAnalyzer",
      //   label: "交付趨勢分析",
      //   openInNewTab: true,
      //   hideSidebar: true,
      // },
      {
        key: "OEEInsightSystem",
        label: "全廠設備稼動分析",
        openInNewTab: true,
        hideSidebar: true,
      },
    ],
  },
];

// ===================================================================================================
// 📝 類型定義與 PropTypes (Type Definitions)
// ===================================================================================================

/**
 * @typedef {Object} SidebarLogicReturn
 * @property {boolean} collapsed - 側邊欄摺疊狀態
 * @property {boolean} isExcludedPage - 當前頁面是否應隱藏側邊欄
 * @property {string} selectedKey - 當前選中的選單項目
 * @property {Function} handleMenuClick - 選單點擊處理函數
 * @property {Function} toggleCollapsed - 切換摺疊狀態函數
 */

/**
 * @typedef {Object} ProcessedMenuConfig
 * @property {Array} menuItemsForAntd - 適用於 Ant Design Menu 的選單項目
 * @property {Set} newTabRoutes - 需要在新分頁開啟的路由集合
 * @property {Set} excludedPages - 需要隱藏側邊欄的頁面路徑集合
 */

// ===================================================================================================
// 🚀 核心功能函數 (Core Functions)
// ===================================================================================================

/**
 * 提取所有選單項目為扁平化陣列
 * @param {Array<MenuGroupConfig>} config - 原始選單配置
 * @returns {Array<MenuItemConfig>} 扁平化的選單項目陣列
 */
const extractAllMenuItems = (config) => {
  return config.flatMap((group) => group.children || []);
};

/**
 * 建立需要在新分頁開啟的路由集合
 * @param {Array<MenuItemConfig>} items - 選單項目陣列
 * @returns {Set<string>} 新分頁路由集合
 */
const createNewTabRoutes = (items) => {
  return new Set(
    items.filter((item) => item.openInNewTab).map((item) => item.key)
  );
};

/**
 * 建立需要隱藏側邊欄的頁面路徑集合
 * @param {Array<MenuItemConfig>} items - 選單項目陣列
 * @returns {Set<string>} 隱藏頁面路徑集合
 */
const createExcludedPages = (items) => {
  const staticExcludedPages = [
    "/",
    "/ProductionReportPage",
    "/LeaderSignPage",
    "/ProductionDetailPage",
    "/OperatorSignPage",
    "/ProductionInspectionPage",
  ];

  const dynamicExcludedPages = items
    .filter((item) => item.hideSidebar)
    .map((item) => `/${item.key}`);

  return new Set([...staticExcludedPages, ...dynamicExcludedPages]);
};

/**
 * 清理選單項目，移除非 DOM 屬性以符合 Ant Design Menu 要求
 * @param {Array<MenuGroupConfig>} config - 原始選單配置
 * @returns {Array} 清理後的選單項目
 */
const cleanMenuItemsForAntd = (config) => {
  return config.map((group) => ({
    key: group.key,
    icon: group.icon,
    label: group.label,
    children: group.children?.map((child) => ({
      key: child.key,
      label: child.label,
      // 移除 hideSidebar 和 openInNewTab 等非 DOM 屬性
    })),
  }));
};

/**
 * 處理選單配置，生成所有衍生設定
 * @param {Array<MenuGroupConfig>} config - 原始選單配置
 * @returns {ProcessedMenuConfig} 處理後的選單配置物件
 */
const processMenuConfig = (config) => {
  const allItems = extractAllMenuItems(config);

  return {
    menuItemsForAntd: cleanMenuItemsForAntd(config),
    newTabRoutes: createNewTabRoutes(allItems),
    excludedPages: createExcludedPages(allItems),
  };
};

// 執行配置處理，生成靜態設定常量
const { menuItemsForAntd, newTabRoutes, excludedPages } =
  processMenuConfig(MENU_CONFIG);

/**
 * @constant {Array<string>} DEFAULT_OPEN_KEYS
 * @description 預設展開的選單群組鍵值
 */
const DEFAULT_OPEN_KEYS = menuItemsForAntd.map((group) => group.key);

// ===================================================================================================
// 🛠️ 工具函數與輔助方法 (Utility Functions)
// ===================================================================================================

/**
 * 決定當前頁面路徑是否應該隱藏側邊欄
 * @param {string} pathname - 當前頁面路徑
 * @returns {boolean} 是否應該隱藏側邊欄
 *
 * @example
 * shouldHideSidebar('/MachineSelectPage') // true (因為設定了 hideSidebar)
 * shouldHideSidebar('/ProductionSchedulePage') // false (一般頁面)
 * shouldHideSidebar('/') // true (首頁隱藏)
 */
const shouldHideSidebar = (pathname) => {
  // 正規化路徑：移除尾部斜線，空路徑轉為根路徑
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return excludedPages.has(normalizedPath);
};

/**
 * 安全的導航處理函數，包含錯誤恢復機制
 * @param {string} key - 目標路由鍵值
 * @param {Function} navigate - React Router 導航函數
 * @param {Set<string>} newTabRoutes - 新分頁路由集合
 */
const handleSafeNavigation = (key, navigate, newTabRoutes) => {
  try {
    if (newTabRoutes.has(key)) {
      window.open(`/${key}`, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/${key}`);
    }
  } catch (error) {
    console.error(`選單導航錯誤 [${key}]:`, error);
    // 錯誤恢復：回退到直接導航
    navigate(`/${key}`);
  }
};

/**
 * 側邊欄業務邏輯 Custom Hook
 * @description 封裝側邊欄的所有狀態管理和事件處理邏輯
 * @returns {SidebarLogicReturn} 側邊欄邏輯狀態和方法
 *
 * @features
 * - 摺疊狀態管理
 * - 當前頁面檢測
 * - 選中項目計算
 * - 安全的選單導航
 * - 效能優化的事件處理
 */
const useSidebarLogic = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 計算當前頁面是否應該隱藏側邊欄
  const isExcludedPage = useMemo(
    () => shouldHideSidebar(location.pathname),
    [location.pathname]
  );

  // 從路徑中提取當前選中的選單項目
  const selectedKey = useMemo(() => {
    const pathSegment = location.pathname.split("/")[1];
    return pathSegment || "ProductionSchedulePage";
  }, [location.pathname]);

  // 選單點擊處理函數 - 支援新分頁和一般導航
  const handleMenuClick = useCallback(
    ({ key }) => {
      handleSafeNavigation(key, navigate, newTabRoutes);
    },
    [navigate]
  );

  // 切換摺疊狀態
  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return {
    collapsed,
    isExcludedPage,
    selectedKey,
    handleMenuClick,
    toggleCollapsed,
  };
};

// ===================================================================================================
// 🎨 UI 組件 (React Components)
// ===================================================================================================
/**
 * 漢堡選單切換按鈕組件
 * @param {Object} props - 組件屬性
 * @param {boolean} props.collapsed - 側邊欄摺疊狀態
 * @param {Function} props.onToggle - 切換摺疊狀態的回調函數
 * @returns {JSX.Element} 漢堡選單按鈕 JSX
 */
const BurgerMenuSection = ({ collapsed, onToggle }) => (
  <BurgerMenu>
    <Button
      type="text"
      icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
      onClick={onToggle}
      style={{ color: "white" }}
      aria-label={collapsed ? "展開選單" : "收合選單"}
    />
  </BurgerMenu>
);

BurgerMenuSection.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

/**
 * 主導航選單組件
 * @param {Object} props - 組件屬性
 * @param {string} props.selectedKey - 當前選中的選單項目鍵值
 * @param {Function} props.onMenuClick - 選單項目點擊回調函數
 * @returns {JSX.Element} 導航選單 JSX
 */
const NavigationMenu = ({ selectedKey, onMenuClick }) => (
  <StyledMenu
    theme="dark"
    mode="inline"
    selectedKeys={[selectedKey]}
    defaultOpenKeys={DEFAULT_OPEN_KEYS}
    items={menuItemsForAntd}
    onClick={onMenuClick}
  />
);

NavigationMenu.propTypes = {
  selectedKey: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

/**
 * 主側邊欄組件
 * @description 製造管理系統的主要導航介面，提供多部門選單和智能隱藏功能
 * @returns {JSX.Element|null} 側邊欄 JSX 或 null (當頁面需要隱藏時)
 *
 * @features
 * - 響應式摺疊設計
 * - 智能頁面隱藏
 * - 無障礙支援
 * - 效能優化 (React.memo)
 */
const Sidebar = () => {
  const {
    collapsed,
    isExcludedPage,
    selectedKey,
    handleMenuClick,
    toggleCollapsed,
  } = useSidebarLogic();

  // 早期返回：隱藏頁面不渲染側邊欄 (Push Ifs Up 原則)
  if (isExcludedPage) {
    return null;
  }

  return (
    <SidebarContainer>
      <StyledSider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <BurgerMenuSection collapsed={collapsed} onToggle={toggleCollapsed} />
        <NavigationMenu
          selectedKey={selectedKey}
          onMenuClick={handleMenuClick}
        />
      </StyledSider>
    </SidebarContainer>
  );
};

// ===================================================================================================
// 💅 樣式組件 (Styled Components)
// ===================================================================================================
// 遵循 CSS 開發標準：BEM 思維 + 屬性排序 (布局→盒模型→視覺→其他)

/**
 * 樣式常量定義
 */
const STYLE_CONSTANTS = {
  COLORS: {
    WHITE: "#ffffff",
    WHITE_TRANSPARENT: "rgba(255, 255, 255, 0.3)",
  },
  SPACING: {
    SMALL: "14px",
    MEDIUM: "16px",
    LARGE: "24px",
  },
  DIMENSIONS: {
    SIDEBAR_HEIGHT: "100vh",
    LOGO_HEIGHT: "32px",
  },
  TYPOGRAPHY: {
    FONT_SIZE_ICON: "20px",
    FONT_SIZE_SUBMENU: "20px",
    FONT_SIZE_ITEM: "18px",
    FONT_WEIGHT_BOLD: 600,
    FONT_WEIGHT_NORMAL: 400,
  },
  Z_INDEX: {
    SIDEBAR: 1,
  },
};

/**
 * @component StyledSider
 * @description 自定義樣式的側邊欄 Sider 組件
 * @extends Layout.Sider
 */
const StyledSider = styled(Layout.Sider)`
  /* BBC 標準合規性: 巢狀層級 ≤ 2 */
  .ant-layout-sider-children {
    /* 布局定位 */
    position: relative;
    left: 0;
    /* 盒模型 */
    height: ${STYLE_CONSTANTS.DIMENSIONS.SIDEBAR_HEIGHT};
  }

  &.ant-layout-sider {
    /* 視覺樣式 */
    background: none;
  }
`;

/**
 * @component StyledMenu
 * @description 自定義樣式的導航選單組件
 * @extends Menu
 */
const StyledMenu = styled(Menu)`
  &.ant-menu-dark {
    /* 視覺樣式 */
    background: none;

    /* BEM 標準合規性: 巢狀層級 ≤ 3 */
    &.ant-menu-inline .ant-menu-sub.ant-menu-inline {
      /* 視覺樣式 */
      background: none;
    }
  }

  /* 選單子標題樣式 */
  .ant-menu-submenu-title {
    /* 視覺樣式 */
    font-size: ${STYLE_CONSTANTS.TYPOGRAPHY.FONT_SIZE_SUBMENU};
    font-weight: ${STYLE_CONSTANTS.TYPOGRAPHY.FONT_WEIGHT_BOLD};

    /* 圖示樣式 */
    .anticon {
      /* 視覺樣式 */
      font-size: ${STYLE_CONSTANTS.TYPOGRAPHY.FONT_SIZE_ICON};
    }
  }

  /* 選單項目樣式 */
  .ant-menu-item {
    /* 視覺樣式 */
    font-size: ${STYLE_CONSTANTS.TYPOGRAPHY.FONT_SIZE_ITEM};
    font-weight: ${STYLE_CONSTANTS.TYPOGRAPHY.FONT_WEIGHT_NORMAL};
  }
`;

/**
 * @component Logo
 * @description Logo 顯示區域 (目前隱藏，保留供未來使用)
 */
const Logo = styled.div`
  /* 布局定位 */
  display: none;
  /* 盒模型 */
  height: ${STYLE_CONSTANTS.DIMENSIONS.LOGO_HEIGHT};
  margin: ${STYLE_CONSTANTS.SPACING.MEDIUM};
  /* 視覺樣式 */
  background: ${STYLE_CONSTANTS.COLORS.WHITE_TRANSPARENT};
`;

/**
 * @component BurgerMenu
 * @description 漢堡選單切換按鈕容器
 */
const BurgerMenu = styled.div`
  /* 盒模型 */
  padding: 0 ${STYLE_CONSTANTS.SPACING.LARGE};
  margin-bottom: ${STYLE_CONSTANTS.SPACING.MEDIUM};
  /* 視覺樣式 */
  font-size: ${STYLE_CONSTANTS.TYPOGRAPHY.FONT_SIZE_ICON};
  text-align: right;

  /* SVG 圖示樣式 */
  svg {
    /* 視覺樣式 */
    fill: ${STYLE_CONSTANTS.COLORS.WHITE};
  }
`;

/**
 * @component SidebarContainer
 * @description 側邊欄最外層容器
 */
const SidebarContainer = styled.div`
  /* 盒模型 */
  padding-top: ${STYLE_CONSTANTS.SPACING.SMALL};

  /* Ant Design Sider 覆寫樣式 */
  .ant-layout-sider {
    /* 布局定位 */
    position: relative;
    left: 0;
    /* 盒模型 */
    height: ${STYLE_CONSTANTS.DIMENSIONS.SIDEBAR_HEIGHT};
    /* 其他屬性 */
    z-index: ${STYLE_CONSTANTS.Z_INDEX.SIDEBAR};
  }
`;

// ===================================================================================================
// 📤 組件匯出 (Component Export)
// ===================================================================================================

/**
 * 匯出主側邊欄組件，使用 React.memo 進行效能優化
 * @description 避免在 props 未變更時進行不必要的重新渲染
 */
export default React.memo(Sidebar);
