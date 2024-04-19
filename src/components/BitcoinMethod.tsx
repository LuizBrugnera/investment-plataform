import React from "react";
import {
  Container,
  ContainerWithBorderLeft,
  CustomImg,
  ImgContainer,
  MediumText,
  MethodWrapContainer,
} from "../Styled";
import { CopyLink } from "./CopyLink";
import { ReciverDocument } from "./ReciverDocument";
import pixqrcode from "../assets/pixqrcodewithoutvalue.png";

export const BitcoinMethod = () => {
  return (
    <MethodWrapContainer>
      <Container padding="0px" justifyContent="center" alignItems="center">
        <ImgContainer padding={"0px"}>
          <CustomImg
            src={pixqrcode}
            alt="qrcode pix"
            width="250"
            height="250"
            animation={true}
          />
        </ImgContainer>
      </Container>
      <ContainerWithBorderLeft>
        <MediumText
          fontsize={20}
          padding={"10px 0px 20px 0px"}
          fontWeight={600}
        >
          Código da Carteira:
        </MediumText>
        <CopyLink value="chave da carteira BTC" backgroundcolor="#232c3d" />
        <ReciverDocument type="BTC" />
      </ContainerWithBorderLeft>
    </MethodWrapContainer>
  );
};
