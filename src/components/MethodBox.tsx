
import {
  Box,
  Container,
  CustomImg,
  ImgContainer,
  MediumText,
  MethodContainer,
} from "../Styled";
import balance from "../assets/balance.png";
import btc from "../assets/btc.png";
import dolar from "../assets/dollar.png";
import pix from "../assets/pix.png";

enum PayMethodEnum {
  PIX = "PIX",
  PIX_COLA = "PIX_COLA",
  BITCOIN = "BITCOIN",
  DOLAR = "DOLAR",
  SALDO = "SALDO",
}

const images = {
  [PayMethodEnum.PIX]: pix,
  [PayMethodEnum.PIX_COLA]: pix,
  [PayMethodEnum.BITCOIN]: btc,
  [PayMethodEnum.DOLAR]: dolar,
  [PayMethodEnum.SALDO]: balance,
};

const text = {
  [PayMethodEnum.PIX]: "PIX",
  [PayMethodEnum.PIX_COLA]: "PIX Copia e Cola",
  [PayMethodEnum.BITCOIN]: "BITCOIN",
  [PayMethodEnum.DOLAR]: "Dolár",
  [PayMethodEnum.SALDO]: "Saldo",
};

interface MethodBoxProps {
  value: PayMethodEnum;
  setSelected: (value: PayMethodEnum) => void;
  selected: string;
  invisible?: boolean;
}

export const MethodBox = ({
  value,
  setSelected,
  selected,
  invisible,
}: MethodBoxProps) => {
  return (
    <MethodContainer onClick={() => setSelected(value)} invisible={invisible}>
      <Box backgroundcolor={selected === value ? "#4daa0e7f" : "#bceeb13b"}>
        <ImgContainer padding={"0px"}>
          <CustomImg src={images[value]} alt="btc" width="30" height="30" />
        </ImgContainer>
      </Box>
      <Container
        justifyContent="center"
        alignItems="left"
        flexDir="column"
        padding="0px 10px"
      >
        <MediumText fontsize={16} padding={"5px 5px"}>
          {text[value]}
        </MediumText>
        <MediumText
          fontsize={15}
          padding={"0px 5px"}
          color={selected === value ? "green" : "white"}
        >
          {selected === value ? "Selecionado ✔" : "Selecionar"}
        </MediumText>
      </Container>
    </MethodContainer>
  );
};
