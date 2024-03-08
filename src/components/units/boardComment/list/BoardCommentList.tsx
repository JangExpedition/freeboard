import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_BOARD_COMMENTS } from "./BoaerdComments.queries";
import {
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "@/commons/types/generated/types";
import InfiniteScroll from "react-infinite-scroller";
import BoardCommentListItem from "./BoardCommentListItem";

export default function BoardCommentList(): JSX.Element {
  const router = useRouter();
  if (typeof router.query.boardId !== "string") return <></>;

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: router.query.boardId as string },
  });

  const onLoadMore = (): void => {
    if (data === undefined) return;

    void fetchMore({
      variables: { page: Math.ceil(data?.fetchBoardComments.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult?.fetchBoardComments === undefined)
          return { fetchBoardComments: [...prev.fetchBoardComments] };

        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  return (
    <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
      {data?.fetchBoardComments.map((el) => (
        <BoardCommentListItem key={el._id} el={el} />
      )) ?? <></>}
    </InfiniteScroll>
  );
}
