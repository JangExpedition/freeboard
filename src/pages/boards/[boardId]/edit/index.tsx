import { IQuery, IQueryFetchBoardArgs } from "@/commons/types/generated/types";
import { FETCH_BOARD } from "@/components/units/board/detail/BoardDetail.queries";
import BoardWrite from "@/components/units/board/write/BoardWrite";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function BoardEditPage() {
  const router = useRouter();

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: { boardId: router.query.boardId as string },
    },
  );

  return <BoardWrite isEdit={true} data={data} />;
}
