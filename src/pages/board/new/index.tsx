import {
  Content,
  Page,
  PasswordBox,
  SectionTitle,
  TextInput,
  Title,
  Wrapper,
  WriterBox,
  WriterWrapper,
} from "./index.styles";

export default function BoardNewPage(): JSX.Element {
  return (
    <Wrapper>
      <Page>
        <Title>게시물 등록</Title>
        <WriterWrapper>
          <WriterBox>
            <SectionTitle>작성자</SectionTitle>
            <TextInput type="text" placeholder="이름을 적어주세요." />
          </WriterBox>
          <PasswordBox>
            <SectionTitle>비밀번호</SectionTitle>
            <TextInput type="password" placeholder="비밀번호를 입력해주세요." />
          </PasswordBox>
        </WriterWrapper>
        <SectionTitle>제목</SectionTitle>
        <TextInput type="text" placeholder="제목을 작성해주세요." />
        <SectionTitle>내용</SectionTitle>
        <Content></Content>
        <SectionTitle>주소</SectionTitle>
      </Page>
    </Wrapper>
  );
}
