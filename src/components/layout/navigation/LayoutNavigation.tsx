import { Fragment } from "react";
import { MenuItem, Wrapper } from "./LayoutNavigation.styles";
import { useRouter } from "next/router";
import type { MouseEvent } from "react";

const NAVIGATION_MENUS = [
  { name: "라이브게시판", page: "/boards" },
  { name: "라이브상품", page: "/markets" },
  { name: "마이페이지", page: "/mypages" },
];

export default function LayoutNavigation(): JSX.Element {
  const router = useRouter();

  const onClickMenu = (event: MouseEvent<HTMLDivElement>): void => {
    void router.push(event.currentTarget.id);
  };

  return (
    <Wrapper>
      {NAVIGATION_MENUS.map((el) => (
        <Fragment key={el.page}>
          <MenuItem id={el.page} onClick={onClickMenu}>
            {el.name}
          </MenuItem>
        </Fragment>
      ))}
    </Wrapper>
  );
}
