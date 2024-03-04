import { useMutation } from "@apollo/client";
import * as Styles from "./BoardWrite.styles";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CREATE_BOARD } from "./BoardWrite.queries";

export default function BoardWrite(): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [contents, setContents] = useState("");

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const [createBoard] = useMutation(CREATE_BOARD);

  useEffect(() => {
    if (writer && password && subject && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [writer, password, subject, contents]);

  const onChangeWriter = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setWriter(target.value);
    if (target.value !== "") {
      setWriterError("");
    }
  };

  const onChangePassword = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setPassword(target.value);
    if (target.value !== "") {
      setPasswordError("");
    }
  };

  const onChangeSubject = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setSubject(target.value);
    if (target.value !== "") {
      setSubjectError("");
    }
  };

  const onChangeContents = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setContents(target.value);
    if (target.value !== "") {
      setContentsError("");
    }
  };

  const onClickSubmit = async () => {
    if (!writer) {
      setWriterError("작성자를 입력해주세요.");
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (!subject) {
      setSubjectError("제목을 입력해주세요.");
    }
    if (!contents) {
      setContentsError("내용을 입력해주세요.");
    }
    if (writer && password && subject && contents) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer,
              password,
              title: subject,
              contents,
            },
          },
        });
        const { _id } = result.data.createBoard;
        router.push(`/board/${_id}`);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <Styles.Wrapper>
      <Styles.Title>게시물 등록</Styles.Title>
      <Styles.WriterWrapper>
        <Styles.InputWrapper>
          <Styles.Label>작성자</Styles.Label>
          <Styles.Writer
            type="text"
            onChange={onChangeWriter}
            placeholder="이름을 적어주세요."
          />
          <Styles.Error>{writerError}</Styles.Error>
        </Styles.InputWrapper>
        <Styles.InputWrapper>
          <Styles.Label>비밀번호</Styles.Label>
          <Styles.Password
            type="password"
            onChange={onChangePassword}
            placeholder="비밀번호를 작성해주세요."
          />
          <Styles.Error>{passwordError}</Styles.Error>
        </Styles.InputWrapper>
      </Styles.WriterWrapper>
      <Styles.InputWrapper>
        <Styles.Label>제목</Styles.Label>
        <Styles.Subject
          type="text"
          onChange={onChangeSubject}
          placeholder="제목을 작성해주세요."
        />
        <Styles.Error>{subjectError}</Styles.Error>
      </Styles.InputWrapper>
      <Styles.InputWrapper>
        <Styles.Label>내용</Styles.Label>
        <Styles.Contents
          onChange={onChangeContents}
          placeholder="내용을 작성해주세요."
        />
        <Styles.Error>{contentsError}</Styles.Error>
      </Styles.InputWrapper>
      <Styles.InputWrapper>
        <Styles.Label>주소</Styles.Label>
        <Styles.ZipcodeWrapper>
          <Styles.Zipcode placeholder="07250" />
          <Styles.SearchButton>우편번호 검색</Styles.SearchButton>
        </Styles.ZipcodeWrapper>
        <Styles.Address></Styles.Address>
        <Styles.Address></Styles.Address>
      </Styles.InputWrapper>
      <Styles.InputWrapper>
        <Styles.Label>유튜브</Styles.Label>
        <Styles.Youtube placeholder="링크를 복사해주세요." />
      </Styles.InputWrapper>
      <Styles.InputWrapper>
        <Styles.Label>사진첨부</Styles.Label>
        <Styles.UploadButton>+</Styles.UploadButton>
        <Styles.UploadButton>+</Styles.UploadButton>
        <Styles.UploadButton>+</Styles.UploadButton>
      </Styles.InputWrapper>
      <Styles.OptionWrapper>
        <Styles.Label>메인설정</Styles.Label>
        <Styles.RadioButton type="radio" id="youtube" name="radio-button" />
        <Styles.RadioLabel>유튜브</Styles.RadioLabel>
        <Styles.RadioButton type="radio" id="image" name="radio-button" />
        <Styles.RadioLabel>사진</Styles.RadioLabel>
      </Styles.OptionWrapper>
      <Styles.ButtonWrapper>
        <Styles.SubmitButton onClick={onClickSubmit} disabled={isActive}>
          등록하기
        </Styles.SubmitButton>
      </Styles.ButtonWrapper>
    </Styles.Wrapper>
  );
}
