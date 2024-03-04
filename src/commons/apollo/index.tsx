import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface ApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: ApolloSettingProps): JSX.Element {
  const client = new ApolloClient({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
