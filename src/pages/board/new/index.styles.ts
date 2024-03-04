import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const Page = styled.div`
  width: 980px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Title = styled.h1`
  width: 100%;
  text-align: center;
`;

export const SectionTitle = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const TextInput = styled.input`
  width: 100%;
`;

export const WriterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WriterBox = styled.div`
  width: 40%;
`;

export const PasswordBox = styled.div`
  width: 40%;
`;

export const Content = styled.textarea`
  width: 100%;
  height: 15rem;
`;
