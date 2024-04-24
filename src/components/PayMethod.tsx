import { useState } from "react";
import {
  BorderPoints,
  Container,
  ContainerArrayMethods,
  PayMethodContainer,
} from "../Styled";
import { MethodBox } from "./MethodBox";
import { PixColaMethod } from "./PixColaMethod";
import { PixMethod } from "./PixMethod";
import { DolarMethod } from "./DolarMethod";
import { SaldoMethod } from "./SaldoMethod";
import { useAppContext } from "../appContext";

export const PayMethod = () => {
  const { setPayMethod } = useAppContext();

  enum PayMethodEnum {
    PIX = "PIX",
    PIX_COLA = "PIX_COLA",
    DOLAR = "DOLAR",
    SALDO = "SALDO",
  }

  const payMethodsComponents = {
    [PayMethodEnum.PIX]: <PixMethod />,
    [PayMethodEnum.PIX_COLA]: <PixColaMethod />,
    [PayMethodEnum.DOLAR]: <DolarMethod />,
    [PayMethodEnum.SALDO]: <SaldoMethod />,
  };

  const [selected, setSelected] = useState<PayMethodEnum>(
    PayMethodEnum.PIX_COLA
  );

  const handleChangePayMethod = (method: PayMethodEnum) => {
    setPayMethod(method);
    setSelected(method);
  };

  return (
    <PayMethodContainer>
      <Container justifyContent="left"> Escolha o valor desejado</Container>
      <BorderPoints />
      <ContainerArrayMethods>
        <MethodBox
          value={PayMethodEnum.PIX_COLA}
          setSelected={handleChangePayMethod}
          selected={selected}
        />
        <MethodBox
          value={PayMethodEnum.PIX}
          setSelected={handleChangePayMethod}
          selected={selected}
        />
        <MethodBox
          value={PayMethodEnum.DOLAR}
          setSelected={handleChangePayMethod}
          selected={selected}
        />
        <MethodBox
          value={PayMethodEnum.SALDO}
          setSelected={handleChangePayMethod}
          selected={selected}
        />
      </ContainerArrayMethods>
      <BorderPoints />
      <Container>{payMethodsComponents[selected]}</Container>
    </PayMethodContainer>
  );
};
