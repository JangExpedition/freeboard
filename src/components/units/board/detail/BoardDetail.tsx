import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import * as Styles from "./BoardDetail.styles";
import { DELETE_BOARD, FETCH_BOARD } from "./BoardDetail.queries";
import {
  IMutation,
  IMutationDeleteBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from "@/commons/types/generated/types";
import { getDate } from "@/commons/libararies/utils";
import { Tooltip } from "antd";

export default function BoardDetail() {
  const router = useRouter();
  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD);

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: { boardId: router.query.boardId as string },
    },
  );

  const onClickDeleteBoard = async (): Promise<void> => {
    await deleteBoard({
      variables: {
        boardId: router.query.boardId as string,
      },
    });

    router.push("/board");
  };

  const onClickMoveToBoardEdit = () => {
    router.push(`/board/${router.query.boardId}/edit`);
  };

  return (
    <Styles.Wrapper>
      <Styles.CardWrapper>
        <Styles.Header>
          <Styles.AvatarWrapper>
            <Styles.Avatar src="/images/avatar.png" />
            <Styles.Info>
              <Styles.Writer>{data?.fetchBoard?.writer}</Styles.Writer>
              <Styles.CreatedAt>
                {getDate(data?.fetchBoard?.createdAt)}
              </Styles.CreatedAt>
            </Styles.Info>
          </Styles.AvatarWrapper>
          <Styles.IconWrapper>
            <Styles.LinkIcon src="/images/board/detail/link.png" />
            <Tooltip
              placement="topRight"
              title={`${data?.fetchBoard.boardAddress?.address ?? ""} ${
                data?.fetchBoard.boardAddress?.addressDetail ?? ""
              }`}
            >
              <Styles.LocationIcon src="/images/board/detail/location.png" />
            </Tooltip>
          </Styles.IconWrapper>
        </Styles.Header>
        <Styles.Body>
          <Styles.Title>{data?.fetchBoard?.title}</Styles.Title>
          <Styles.Contents>{data?.fetchBoard?.contents}</Styles.Contents>
          {data?.fetchBoard.youtubeUrl !== "" && (
            <Styles.Youtube
              url={data?.fetchBoard.youtubeUrl ?? ""}
              width="486px"
              height="240px"
            />
          )}
        </Styles.Body>
      </Styles.CardWrapper>
      <Styles.ButtonWrapper>
        <Styles.Button>목록으로</Styles.Button>
        <Styles.Button onClick={onClickMoveToBoardEdit}>수정하기</Styles.Button>
        <Styles.Button onClick={onClickDeleteBoard}>삭제하기</Styles.Button>
      </Styles.ButtonWrapper>
    </Styles.Wrapper>
  );
}
