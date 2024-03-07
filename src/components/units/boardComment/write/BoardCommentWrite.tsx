import { useMutation } from "@apollo/client";
import * as Styles from "./BoardCommentWrite.styles";
import { useState } from "react";
import { CREATE_BOARD_COMMENT } from "./BoardCommentWrite.queries";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
} from "@/commons/types/generated/types";
import { useRouter } from "next/router";
import { FETCH_BOARD_COMMENTS } from "../list/BoaerdComments.queries";

export default function BoardCommentWrite(): JSX.Element {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [star, setStar] = useState(0);

  const router = useRouter();
  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);

  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onClickWrite = async () => {
    try {
      if (typeof router.query.boardId !== "string") {
        return;
      }

      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating: star,
          },
          boardId: router.query.boardId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }

    setWriter("");
    setPassword("");
    setContents("");
    setStar(0);
  };

  return (
    <Styles.Wrapper>
      <>
        <Styles.PencilIcon src="/images/boardComment/write/pencil.png" />
        <span>댓글</span>
      </>
      <Styles.InputWrapper>
        <Styles.Input
          placeholder="작성자"
          onChange={onChangeWriter}
          value={writer}
        />
        <Styles.Input
          type="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
          value={password}
        />
        <Styles.Star onChange={setStar} value={star} />
      </Styles.InputWrapper>
      <Styles.ContentsWrapper>
        <Styles.Contents
          maxLength={100}
          onChange={onChangeContents}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          value={contents}
        />
        <Styles.BottomWrapper>
          <Styles.ContentsLength>{contents.length}/100</Styles.ContentsLength>
          <Styles.Button onClick={onClickWrite}>등록하기</Styles.Button>
        </Styles.BottomWrapper>
      </Styles.ContentsWrapper>
    </Styles.Wrapper>
  );
}
