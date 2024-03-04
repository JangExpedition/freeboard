import LayoutHeader from "./header/LayoutHeader";

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  return (
    <>
      <LayoutHeader />
      {props.children}
    </>
  );
}
