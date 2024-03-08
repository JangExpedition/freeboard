import BoardDetail from "@/components/units/board/detail/BoardDetail";
import BoardCommentList from "@/components/units/boardComment/list/BoardCommentList";
import BoardCommentWrite from "@/components/units/boardComment/write/BoardCommentWrite";

export default function BoardDetailPage(): JSX.Element {
  return (
    <>
      <BoardDetail />
      <BoardCommentWrite />
      <BoardCommentList />
    </>
  );
}
