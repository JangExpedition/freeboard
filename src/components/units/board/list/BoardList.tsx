import { useQuery } from "@apollo/client";
import { FETCH_BOARDS } from "./BoardList.queries";
import * as Styles from "./BoardList.Styles";
import { useRouter } from "next/router";
import {
  IBoard,
  IQuery,
  IQueryFetchBoardsArgs,
} from "@/commons/types/generated/types";
import { getDate } from "@/commons/libararies/utils";

export default function BoardList(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
  );
  const router = useRouter();

  const onClickMoveToBoardDetail = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target instanceof HTMLDivElement) {
      router.push(`/board/${event.target.id}`);
    }
  };

  const onClickMoveToBoardNew = () => {
    router.push("/board/new");
  };

  return (
    <Styles.Wrapper>
      <Styles.TableTop>
        <Styles.Row>
          <Styles.ColumnHeaderBasic>ID</Styles.ColumnHeaderBasic>
          <Styles.ColumnHeaderTitle>제목</Styles.ColumnHeaderTitle>
          <Styles.ColumnHeaderBasic>작성자</Styles.ColumnHeaderBasic>
          <Styles.ColumnHeaderBasic>날짜</Styles.ColumnHeaderBasic>
        </Styles.Row>
      </Styles.TableTop>
      {data?.fetchBoards.map((board: IBoard) => (
        <Styles.Row key={board._id}>
          <Styles.ColumnBasic>
            {String(board._id).slice(-4).toUpperCase()}
          </Styles.ColumnBasic>
          <Styles.ColumnHeaderTitle
            id={board._id}
            onClick={onClickMoveToBoardDetail}
          >
            {board.title}
          </Styles.ColumnHeaderTitle>
          <Styles.ColumnBasic>{board.writer}</Styles.ColumnBasic>
          <Styles.ColumnBasic>{getDate(board.createdAt)}</Styles.ColumnBasic>
        </Styles.Row>
      ))}
      <Styles.TableBottom>
        <Styles.Footer>
          <Styles.Button onClick={onClickMoveToBoardNew}>
            <Styles.PencilIcon src="/images/board/list/write.png" />
            게시물 등록하기
          </Styles.Button>
        </Styles.Footer>
      </Styles.TableBottom>
    </Styles.Wrapper>
  );
}
