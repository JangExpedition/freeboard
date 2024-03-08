import { useRouter } from "next/router";
import {
  InnerButton,
  InnerLogo,
  InnerWrapper,
  Wrapper,
} from "./LayoutHeader.styles";

export default function LayoutHeader() {
  const router = useRouter();

  const onClickLogo = (): void => {
    void router.push("/boards");
  };

  const onClickMoveToLogin = (): void => {
    void router.push("/login");
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo onClick={onClickLogo}>💎 LIVE</InnerLogo>
        <div>
          <InnerButton onClick={onClickMoveToLogin}>로그인</InnerButton>
          <InnerButton>회원가입</InnerButton>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
