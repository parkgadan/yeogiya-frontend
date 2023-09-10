import { ReactNode } from "react";
import styled from "@emotion/styled";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <LayoutWrapper>{children}</LayoutWrapper>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 92px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutWrapper = styled.div`
  max-width: 100%;
`;

export default Layout;
