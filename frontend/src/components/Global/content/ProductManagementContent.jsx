import React from "react";
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";

const SystemWrapper = styled.div`
  width: 100%;
`;

const SystemContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`;

const SystemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SystemHeaderTitle = styled.h3`
  color: #fff;
  font-family: Roboto;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25rem;
`;

const SystemSections = styled.section`
  margin-top: 1.187rem;
`;

function SharedManagementSystem({ className, title, routes, defaultAction }) {
  const location = useLocation();

  const currentRoute = routes?.find(
    (route) =>
      location.pathname.startsWith(route.path) &&
      (location.pathname === route.path ||
        location.pathname === `${route.path}/`)
  ) || { Action: defaultAction };

  return (
    <SystemWrapper className={className}>
      <SystemContainer>
        <SystemHeader>
          <SystemHeaderTitle>{title}</SystemHeaderTitle>
          {currentRoute.Action && currentRoute.Action}
        </SystemHeader>

        <SystemSections>
          <Outlet />
        </SystemSections>
      </SystemContainer>
    </SystemWrapper>
  );
}

export default SharedManagementSystem;
