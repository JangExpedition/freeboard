import { useQuery } from "@apollo/client";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import * as Styles from "./BoardList.Styles";
import { useRouter } from "next/router";
import {
  IBoard,
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "@/commons/types/generated/types";
import { getDate } from "@/commons/libararies/utils";
import Paginations from "@/components/pagination/Paginations";

export default function BoardList(): JSX.Element {
  const router = useRouter();

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const { data: dataBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const onClickMoveToBoardDetail = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target instanceof HTMLDivElement) {
      router.push(`/boards/${event.target.id}`);
    }
  };

  const onClickMoveToBoardNew = () => {
    router.push("/boards/new");
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
          <Paginations
            refetch={refetch}
            count={dataBoardsCount?.fetchBoardsCount}
          />
          <Styles.Button onClick={onClickMoveToBoardNew}>
            <Styles.PencilIcon src="/images/board/list/write.png" />
            게시물 등록하기
          </Styles.Button>
        </Styles.Footer>
      </Styles.TableBottom>
    </Styles.Wrapper>
  );
}
