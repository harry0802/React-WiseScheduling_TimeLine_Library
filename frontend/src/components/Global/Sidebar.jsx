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

// =================================================================
//! =============== 1. 集中化設定 (Centralized Configuration) ===============
// =================================================================
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

// =================================================================
//! =============== 2. 衍生設定處理 (Derived Configurations) ===============
// =================================================================
/**
 * 將複雜的衍生邏輯封裝成一個獨立函數，降低主模組的認知負荷。
 * @param {Array} config - 原始的選單設定
 * @returns {{menuItemsForAntd: Array, newTabRoutes: Set, excludedPages: Set}}
 */
function processMenuConfig(config) {
  // 步驟 1: 扁平化所有子選單項目，方便後續處理
  const allItems = config.flatMap((group) => group.children || []);

  // 步驟 2: 產生需要「在新分頁開啟」的路由集合
  const newTabRoutes = new Set(
    allItems.filter((item) => item.openInNewTab).map((item) => item.key)
  );

  // 步驟 3: 產生需要「隱藏側邊欄」的頁面路徑集合
  const excludedPages = new Set([
    "/",
    "/ProductionReportPage",
    "/LeaderSignPage",
    "/ProductionDetailPage",
    "/OperatorSignPage",
    "/ProductionInspectionPage",
    ...allItems
      .filter((item) => item.hideSidebar)
      .map((item) => `/${item.key}`),
  ]);

  // 步驟 4: 返回一個包含所有衍生設定的物件
  return {
    menuItemsForAntd: config,
    newTabRoutes,
    excludedPages,
  };
}

// 執行衍生函數，一次性取得所有需要的設定
const { menuItemsForAntd, newTabRoutes, excludedPages } =
  processMenuConfig(MENU_CONFIG);

const DEFAULT_OPEN_KEYS = menuItemsForAntd.map((group) => group.key);

// =================================================================
//! =============== 3. 工具函數 (Utilities) ===============
// =================================================================
/**
 * @function shouldHideSidebar
 * @description 決定是否應該隱藏側邊欄。
 * @param {string} pathname - 當前頁面路徑
 * @returns {boolean}
 */
const shouldHideSidebar = (pathname) => {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return excludedPages.has(normalizedPath);
};

// =================================================================
//! =============== 4. Custom Hooks (Business Logic) ===============
// =================================================================
const useSidebarLogic = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isExcludedPage = useMemo(
    () => shouldHideSidebar(location.pathname),
    [location.pathname]
  );
  const selectedKey =
    location.pathname.split("/")[1] || "ProductionSchedulePage";

  const handleMenuClick = useCallback(
    ({ key }) => {
      try {
        if (newTabRoutes.has(key)) {
          window.open(`/${key}`, "_blank", "noopener,noreferrer");
        } else {
          navigate(`/${key}`);
        }
      } catch (error) {
        console.error("選單導航錯誤:", error);
        navigate(`/${key}`);
      }
    },
    [navigate]
  );

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

// =================================================================
//! =============== 5. UI 組件 (Components) ===============
// =================================================================
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

const Sidebar = () => {
  const {
    collapsed,
    isExcludedPage,
    selectedKey,
    handleMenuClick,
    toggleCollapsed,
  } = useSidebarLogic();

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

// =================================================================
//! =============== 6. 樣式組件 (Styled Components) ===============
// =================================================================
// 💡 以下所有樣式組件均已按照 `CSS 樣式開發規範 v1.0` 進行重構。

/**
 * @component StyledSider
 * @description 自定義樣式的 Sider 組件
 */
const StyledSider = styled(Layout.Sider)`
  /* BBC 標準合規性: 巢狀層級 2 */
  .ant-layout-sider-children {
    /* 布局定位 */
    left: 0;
    /* 盒模型 */
    height: 100vh;
  }

  &.ant-layout-sider {
    /* 視覺樣式 */
    background: none;
  }
`;

/**
 * @component StyledMenu
 * @description 自定義樣式的 Menu 組件
 */
const StyledMenu = styled(Menu)`
  &.ant-menu-dark {
    /* 視覺樣式 */
    background: none;

    /* BBC 標準合規性: 巢狀層級 3 */
    &.ant-menu-inline .ant-menu-sub.ant-menu-inline {
      /* 視覺樣式 */
      background: none;
    }
  }

  /* BBC 標準合規性: 巢狀層級 2 */
  .ant-menu-submenu-title {
    /* 視覺樣式 */
    font-size: 20px;
    font-weight: 600;

    /* BBC 標準合規性: 巢狀層級 3 */
    .anticon {
      /* 視覺樣式 */
      font-size: 20px;
    }
  }

  .ant-menu-item {
    /* 視覺樣式 */
    font-size: 18px;
    font-weight: 400;
  }
`;

/**
 * @component Logo
 * @description Logo 區域
 */
const Logo = styled.div`
  /* 布局定位 */
  display: none;
  /* 盒模型 */
  height: 32px;
  margin: 16px;
  /* 視覺樣式 */
  background: rgba(255, 255, 255, 0.3);
`;

/**
 * @component BurgerMenu
 * @description 漢堡選單按鈕區域
 */
const BurgerMenu = styled.div`
  /* 盒模型 */
  padding: 0 24px;
  margin-bottom: 16px;
  /* 視覺樣式 */
  font-size: 20px;
  text-align: right;

  /* BBC 標準合規性: 巢狀層級 2 */
  svg {
    /* 視覺樣式 */
    fill: #ffffff;
  }
`;

/**
 * @component SidebarContainer
 * @description 側邊欄容器
 */
const SidebarContainer = styled.div`
  /* 盒模型 */
  padding-top: 14px;

  /* BBC 標準合規性: 巢狀層級 2 */
  .ant-layout-sider {
    /* 布局定位 */
    left: 0;
    /* 盒模型 */
    height: 100vh;
    /* 其他屬性 */
    z-index: 1;
  }
`;

export default React.memo(Sidebar);
