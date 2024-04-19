import { useState } from "react";
import {
  ButtonWithoutBorder,
  ConfigBox,
  ContainerFlex,
  CustomImg,
  Header,
  ImgContainer,
  MediumText,
} from "../Styled";
import configImg from "../assets/config-white.png";
import moneyImg from "../assets/money.png";
import { useAppContext } from "../appContext";

export const HeaderDashboard = () => {
  const [showLogoutBox, setShowLogoutBox] = useState(false);
  const { setLoggedIn, windowSize } = useAppContext();
  const handleConfigClick = () => {
    console.log("Configurações clicado");
    setShowLogoutBox(!showLogoutBox);
  };

  const handleLogoutClick = () => {
    setLoggedIn(false);
  };

  return (
    <Header>
      <ContainerFlex>
        <ImgContainer mousePointer="cursor">
          <CustomImg src={moneyImg} alt="money icon" width="70" height="70" />
        </ImgContainer>
        <MediumText>
          Vamos contratar! <br /> Nome
        </MediumText>
      </ContainerFlex>

      <ContainerFlex onClick={handleConfigClick}>
        <ImgContainer>
          <CustomImg src={configImg} alt="config icon" width="30" height="30" />
        </ImgContainer>
        {windowSize.width! > 500 && <MediumText>Configurações</MediumText>}
        {showLogoutBox && (
          <ConfigBox>
            <ButtonWithoutBorder onClick={handleLogoutClick}>
              Sair
            </ButtonWithoutBorder>
          </ConfigBox>
        )}
      </ContainerFlex>
    </Header>
  );
};
