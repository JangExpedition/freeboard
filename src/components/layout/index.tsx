import styled from "@emotion/styled";
import LayoutHeader from "./header/LayoutHeader";

interface ILayoutProps {
  children: JSX.Element;
}

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Layout(props: ILayoutProps): JSX.Element {
  return (
    <>
      <LayoutHeader />
      <Body>{props.children}</Body>
    </>
  );
}
