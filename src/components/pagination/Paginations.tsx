import { useState } from "react";
import type { MouseEvent } from "react";
import { Page } from "./Paginations.styles";
import { IPaginationsProps } from "./Paginations.types";

export default function Paginations(props: IPaginationsProps): JSX.Element {
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);
  const lastPage = Math.ceil((props.count ?? 10) / 10);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    const activedPage = Number(event.currentTarget.id);
    setActivedPage(activedPage);
    void props.refetch({ page: activedPage });
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    setActivedPage(startPage - 10);
    void props.refetch({ page: startPage - 10 });
  };

  const onClickNextPage = (): void => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      setActivedPage(startPage + 10);
      void props.refetch({ page: startPage + 10 });
    }
  };

  return (
    <div>
      <Page onClick={onClickPrevPage}>{`<`}</Page>
      {new Array(10).fill(1).map(
        (_, index) =>
          startPage + index <= lastPage && (
            <Page
              key={startPage + index}
              onClick={onClickPage}
              id={String(startPage + index)}
              isActive={startPage + index === activedPage}
            >
              {startPage + index}
            </Page>
          ),
      )}
      <Page onClick={onClickNextPage}>{`>`}</Page>
    </div>
  );
}
