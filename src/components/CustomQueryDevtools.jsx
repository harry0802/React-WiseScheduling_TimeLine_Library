import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const CustomQueryDevtools = () => {
  return (
    <>
      {/* 放置 DevTools 在 DOM 中的特定位置 */}
      <div
        id="query-devtools-container"
        style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999 }}
      >
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
          buttonPosition="bottom-right"
        />
      </div>
    </>
  );
};

export default CustomQueryDevtools;
