import { IQuery, IQueryFetchBoardsArgs } from "@/commons/types/generated/types";
import { ApolloQueryResult } from "@apollo/client";
import { MouseEvent } from "react";

export interface IPaginationsProps {
  count?: number;
  refetch: (
    variables: Partial<IQueryFetchBoardsArgs>,
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
}
