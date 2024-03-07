import { useMutation, useQuery } from "@apollo/client";
import * as Styles from "./BoardCommentList.styles";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  DELETE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from "./BoaerdComments.queries";
import {
  IMutation,
  IMutationDeleteBoardCommentArgs,
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "@/commons/types/generated/types";
import { getDate } from "@/commons/libararies/utils";

export default function BoardCommentList(): JSX.Element {
  const router = useRouter();
  if (typeof router.query.boardId !== "string") {
    return <></>;
  }

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [boardCommentId, setBoardCommentId] = useState("");
  const [password, setPassword] = useState("");

  const { data } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: router.query.boardId as string },
  });

  const [deleteBoardComment] = useMutation<
    Pick<IMutation, "deleteBoardComment">,
    IMutationDeleteBoardCommentArgs
  >(DELETE_BOARD_COMMENT);

  const onClickDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    try {
      await deleteBoardComment({
        variables: { password, boardCommentId },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      setIsOpenDeleteModal(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickOpenDeleteModal = (
    event: React.MouseEvent<HTMLImageElement>,
  ): void => {
    setBoardCommentId(event.currentTarget.id);
    setIsOpenDeleteModal(true);
  };

  const onChangeDeletePassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(event.target.value);
  };

  return (
    <div>
      {isOpenDeleteModal && (
        <Styles.PasswordModal
          visible={true}
          onOk={onClickDelete}
          onCancel={() => setIsOpenDeleteModal(false)}
        >
          <div>비밀번호 입력: </div>
          <Styles.PasswordInput
            type="password"
            onChange={onChangeDeletePassword}
          />
        </Styles.PasswordModal>
      )}
      {data?.fetchBoardComments.map((el) => (
        <Styles.ItemWrapper key={el._id}>
          <Styles.FlexWrapper>
            <Styles.Avatar src="/images/avatar.png" />
            <Styles.MainWrapper>
              <Styles.WriterWrapper>
                <Styles.Writer>{el.writer}</Styles.Writer>
                <Styles.Star value={el.rating} disabled />
              </Styles.WriterWrapper>
              <Styles.Contents>{el.contents}</Styles.Contents>
            </Styles.MainWrapper>
            <Styles.OptionWrapper>
              <Styles.UpdateIcon src="/images/boardComment/list/option_update_icon.png/" />
              <Styles.DeleteIcon
                id={el._id}
                src="/images/boardComment/list/option_delete_icon.png/"
                onClick={onClickOpenDeleteModal}
              />
            </Styles.OptionWrapper>
          </Styles.FlexWrapper>
          <Styles.DateString>{getDate(el?.createdAt)}</Styles.DateString>
        </Styles.ItemWrapper>
      ))}
    </div>
  );
}
