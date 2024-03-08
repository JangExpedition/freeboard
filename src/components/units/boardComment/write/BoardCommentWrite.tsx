import { useMutation } from "@apollo/client";
import * as Styles from "./BoardCommentWrite.styles";
import { useState } from "react";
import {
  CREATE_BOARD_COMMENT,
  UPDATE_BOARD_COMMENT,
} from "./BoardCommentWrite.queries";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
  IMutationUpdateBoardCommentArgs,
  IUpdateBoardCommentInput,
} from "@/commons/types/generated/types";
import { useRouter } from "next/router";
import { FETCH_BOARD_COMMENTS } from "../list/BoaerdComments.queries";
import { IBoardCommentWriteProps } from "./BoardCommentWrite.types";

export default function BoardCommentWrite(
  props: IBoardCommentWriteProps,
): JSX.Element {
  const router = useRouter();
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [star, setStar] = useState(0);

  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);

  const [updateBoardComment] = useMutation<
    Pick<IMutation, "updateBoardComment">,
    IMutationUpdateBoardCommentArgs
  >(UPDATE_BOARD_COMMENT);

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

  const onClickUpdate = async (): Promise<void> => {
    if (contents === "") {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    if (password === "") {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    try {
      const updateBoardCommentInput: IUpdateBoardCommentInput = {};
      if (contents !== "") updateBoardCommentInput.contents = contents;
      if (star !== props.el?.rating) updateBoardCommentInput.rating = star;

      if (typeof props.el?._id !== "string") {
        return;
      }
      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password,
          boardCommentId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      props.setIsEdit?.(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <Styles.Wrapper>
      {props.isEdit === false && (
        <>
          <Styles.PencilIcon src="/images/boardComment/write/pencil.png" />
          <span>댓글</span>
        </>
      )}
      <Styles.InputWrapper>
        <Styles.Input
          placeholder="작성자"
          onChange={onChangeWriter}
          value={writer !== "" ? writer : props.el?.writer ?? ""}
          readOnly={props.isEdit}
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
          value={contents !== "" ? contents : props.el?.contents ?? ""}
        />
        <Styles.BottomWrapper>
          <Styles.ContentsLength>
            {contents !== "" ? contents.length : props.el?.contents.length ?? 0}
            /100
          </Styles.ContentsLength>
          <Styles.Button
            onClick={props.isEdit === true ? onClickUpdate : onClickWrite}
          >
            등록하기
          </Styles.Button>
        </Styles.BottomWrapper>
      </Styles.ContentsWrapper>
    </Styles.Wrapper>
  );
}
