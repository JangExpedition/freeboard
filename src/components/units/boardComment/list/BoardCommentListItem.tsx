import * as Styles from "./BoardCommentList.styles";
import { useState } from "react";
import { useRouter } from "next/router";
import { IBoardCommentListItemProps } from "./BoardCommentList.types";
import {
  IMutation,
  IMutationDeleteBoardCommentArgs,
} from "@/commons/types/generated/types";
import {
  DELETE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from "./BoaerdComments.queries";
import BoardCommentWrite from "../write/BoardCommentWrite";
import { useMutation } from "@apollo/client";
import { getDate } from "@/commons/libararies/utils";

export default function BoardCommentListItem(
  props: IBoardCommentListItemProps,
): JSX.Element {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [password, setPassword] = useState("");

  const [deleteBoardComment] = useMutation<
    Pick<IMutation, "deleteBoardComment">,
    IMutationDeleteBoardCommentArgs
  >(DELETE_BOARD_COMMENT);

  const onClickUpdate = (): void => {
    setIsEdit(true);
  };

  const onClickDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    try {
      await deleteBoardComment({
        variables: { password, boardCommentId: props.el._id },
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
    setIsOpenDeleteModal(true);
  };

  const onChangeDeletePassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(event.target.value);
  };

  return (
    <>
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
      {!isEdit ? (
        <Styles.ItemWrapper key={props.el._id}>
          <Styles.FlexWrapper>
            <Styles.Avatar src="/images/avatar.png" />
            <Styles.MainWrapper>
              <Styles.WriterWrapper>
                <Styles.Writer>{props.el.writer}</Styles.Writer>
                <Styles.Star value={props.el.rating} disabled />
              </Styles.WriterWrapper>
              <Styles.Contents>{props.el.contents}</Styles.Contents>
            </Styles.MainWrapper>
            <Styles.OptionWrapper>
              <Styles.UpdateIcon
                src="/images/boardComment/list/option_update_icon.png/"
                onClick={onClickUpdate}
              />
              <Styles.DeleteIcon
                src="/images/boardComment/list/option_delete_icon.png/"
                onClick={onClickOpenDeleteModal}
              />
            </Styles.OptionWrapper>
          </Styles.FlexWrapper>
          <Styles.DateString>{getDate(props.el?.createdAt)}</Styles.DateString>
        </Styles.ItemWrapper>
      ) : (
        <BoardCommentWrite isEdit={true} setIsEdit={setIsEdit} el={props.el} />
      )}
    </>
  );
}
