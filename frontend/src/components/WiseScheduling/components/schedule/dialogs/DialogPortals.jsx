/**
 * @file DialogPortals.jsx
 * @description 集中管理所有對話框 Portal 的組件
 * @version 1.0.0
 */

import React from "react";
import ItemDialogPortal from "./ItemDialogPortal";
import DeleteDialogPortal from "./DeleteDialogPortal";

/**
 * @component DialogPortals
 * @description 集中管理所有對話框 Portal 的組件
 */
function DialogPortals() {
  // 只是一個容器，不包含任何可視元素，只渲染子組件
  return (
    <>
      <ItemDialogPortal />
      <DeleteDialogPortal />
    </>
  );
}

export default DialogPortals;
