import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import * as Styles from "./BoardDetail.styles";
import { DELETE_BOARD, FETCH_BOARD } from "./BoardDetail.queries";

export default function BoardDetail() {
  const router = useRouter();
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });

  const onClickDeleteBoard = async () => {
    await deleteBoard({
      variables: {
        boardId: data.fetchBoard?._id,
      },
    });

    router.push("/board");
  };

  return (
    <Styles.Wrapper>
      <Styles.CardWrapper>
        <Styles.Header>
          <Styles.AvatarWrapper>
            <Styles.Avatar src="/images/avatar.png" />
            <Styles.Info>
              <Styles.Writer>{data?.fetchBoard?.writer}</Styles.Writer>
              <Styles.CreatedAt>{data?.fetchBoard?.createdAt}</Styles.CreatedAt>
            </Styles.Info>
          </Styles.AvatarWrapper>
        </Styles.Header>
        <Styles.Body>
          <Styles.Title>{data?.fetchBoard?.title}</Styles.Title>
          <Styles.Contents>{data?.fetchBoard?.contents}</Styles.Contents>
        </Styles.Body>
      </Styles.CardWrapper>
      <Styles.ButtonWrapper>
        <Styles.Button>목록으로</Styles.Button>
        <Styles.Button>수정하기</Styles.Button>
        <Styles.Button onClick={onClickDeleteBoard}>삭제하기</Styles.Button>
      </Styles.ButtonWrapper>
    </Styles.Wrapper>
  );
}
