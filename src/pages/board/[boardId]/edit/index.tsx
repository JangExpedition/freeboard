import { FETCH_BOARD } from "@/components/units/board/detail/BoardDetail.queries";
import BoardWrite from "@/components/units/board/write/BoardWrite";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function BoardEditPage() {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });

  return <BoardWrite isEdit={true} data={data} />;
}
