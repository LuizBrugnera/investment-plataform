import  { useState } from "react";
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

export const HeaderDashboard = () => {
  const [showLogoutBox, setShowLogoutBox] = useState(false);

  const handleConfigClick = () => {
    console.log("Configurações clicado");
    setShowLogoutBox(!showLogoutBox);
  };

  const handleLogoutClick = () => {
    // Adicione aqui a lógica para realizar o logout
    console.log("Sair clicado");
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
        <ButtonWithoutBorder>Configurações</ButtonWithoutBorder>
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
