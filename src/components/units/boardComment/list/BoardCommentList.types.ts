import type {
  IBoardComment,
  IQuery,
} from "../../../../commons/types/generated/types";

export interface IBoardCommentListScrollProps {
  data?: Pick<IQuery, "fetchBoardComments">;
  onLoadMore: () => void;
}

export interface IBoardCommentListItemProps {
  el: IBoardComment;
}
