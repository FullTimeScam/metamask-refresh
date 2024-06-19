import { Button, Flex, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { JsonRpcSigner } from "ethers";
import { FC, useEffect, useState } from "react";

// 로그인 하고 새로고침했을 때 로그인이 풀리지 않게 하는 방법
// 로그인 정보를 로컬스토리지에 저장
// 새로고침 했을 때 로컬스토리지에 정보가 있는지 확인
// 정보가 있다면 그 정보를 사용해서 로그인
// *로그인 버튼을 없애고 useEffect만 쓰면 로그인 버튼 없이 바로 로그인창이 뜨도록 할 수 있다.

const App: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  const getSigner = async () => {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);

    setSigner(await provider.getSigner());
  };

  const onClickMetamask = async () => {
    try {
      getSigner();

      localStorage.setItem("isLogin", "true");
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogout = () => {
    setSigner(null);

    localStorage.removeItem("isLogin");
  };

  useEffect(() => {
    const localIsLogin = localStorage.getItem("isLogin");

    if (localIsLogin === "true") {
      getSigner();
    }
  }, []);

  return (
    <Flex
      bgColor="red.100"
      w="100%"
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      {signer ? (
        <>
          <Text>{signer.address}</Text>
          <Button onClick={onClickLogout}>로그아웃</Button>
        </>
      ) : (
        <Button onClick={onClickMetamask}>🦊 로그인</Button>
      )}
    </Flex>
  );
};

export default App;
