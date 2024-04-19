import React, { useState } from "react";
import {
  BorderPoints,
  Container,
  ContainerArrayMethods,
  PayMethodContainer,
} from "../Styled";
import { MethodBox } from "./MethodBox";
import { PixColaMethod } from "./PixColaMethod";
import { PixMethod } from "./PixMethod";
import { BitcoinMethod } from "./BitcoinMethod";
import { DolarMethod } from "./DolarMethod";
import { SaldoMethod } from "./SaldoMethod";
import { useAppContext } from "../appContext";

export const PayMethod = () => {
  const { setPayMethod, windowSize } = useAppContext();

  enum PayMethodEnum {
    PIX = "PIX",
    PIX_COLA = "PIX_COLA",
    BITCOIN = "BITCOIN",
    DOLAR = "DOLAR",
    SALDO = "SALDO",
  }

  const payMethodsComponents = {
    [PayMethodEnum.PIX]: <PixMethod />,
    [PayMethodEnum.PIX_COLA]: <PixColaMethod />,
    [PayMethodEnum.BITCOIN]: <BitcoinMethod />,
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
          value={PayMethodEnum.BITCOIN}
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
        {windowSize.width! < 1600 && (
          <MethodBox
            value={PayMethodEnum.SALDO}
            setSelected={handleChangePayMethod}
            selected={selected}
            invisible={true}
          />
        )}
      </ContainerArrayMethods>
      <BorderPoints />
      <Container>{payMethodsComponents[selected]}</Container>
    </PayMethodContainer>
  );
};
