import { useEffect, useState } from "react";
import {
  BorderContainer,
  BorderPoints,
  ButtonCircle,
  ChangeValueContainer,
  ChangeValueInput,
  Container,
  CustomImg,
  ImgContainer,
  PriceText,
} from "../Styled";
import { PresetValue } from "./PresetValue";
import dolar_img from "../assets/dollar.png";
import btc_img from "../assets/btc.png";
import { useAppContext } from "../appContext";

interface ChangeValueProps {
  visualValue: string;
  setValue: (visualValue: string) => void;
}

enum PayMethodEnum {
  PIX = "PIX",
  PIX_COLA = "PIX_COLA",
  BITCOIN = "BITCOIN",
  DOLAR = "DOLAR",
  SALDO = "SALDO",
}

export const ChangeValue = ({ visualValue, setValue }: ChangeValueProps) => {
  const { value, payMethod } = useAppContext();

  const [TotalValue, setTotalValue] = useState(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  );

  const [dolar, setDolar] = useState(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(5.5)
  );

  const [btc, setBtc] = useState(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(343000)
  );

  const values = [100, 300, 500, 1000, 3000, 5000, 10000, 30000, 50000, 100000];

  const extractNumberFromCurrency = (visualValue: string) => {
    let cleaned = visualValue.replace("R$", "").trim();
    cleaned = cleaned.replace(/\./g, "");
    if (cleaned.includes(",")) {
      const parts = cleaned.split(",");
      return parseInt(parts[0]);
    }
    return parseInt(cleaned);
  };

  const buttonHandler = (operation: string) => {
    if (operation === "sub") {
      const numbers = extractNumberFromCurrency(visualValue);
      const newValue = (numbers - 1) * 10;
      const formattedValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(newValue);
      setValue(formattedValue);
    } else {
      const numbers = extractNumberFromCurrency(visualValue);
      const newValue = (numbers + 1) * 10;
      const formattedValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(newValue);
      setValue(formattedValue);
    }
  };

  useEffect(() => {
    const updateDolarAndBtc = async () => {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setDolar(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(data.rates.BRL)
      );

      const responseBtc = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
      );
      const dataBtc = await responseBtc.json();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setBtc(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(
          parseFloat(dataBtc.bpi.USD.rate.replace(",", "")) * data.rates.BRL
        )
      );
    };
    updateDolarAndBtc();
  }, [dolar, btc]);

  useEffect(() => {
    if (payMethod === PayMethodEnum.DOLAR) {
      setTotalValue(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "USD",
        }).format(value / parseFloat(dolar.replace("R$", "").replace(",", ".")))
      );
    } else if (payMethod === PayMethodEnum.BITCOIN) {
      setTotalValue(
        `BTC ${(value / extractNumberFromCurrency(btc)).toFixed(8)}`
      );
    } else {
      setTotalValue(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)
      );
    }
  }, [payMethod, setValue, dolar, value, btc]);

  return (
    <ChangeValueContainer>
      <Container justifyContent="left"> Escolha o valor desejado</Container>
      <BorderPoints />
      <Container justifyContent="center">
        <ButtonCircle onClick={() => buttonHandler("sub")}>-</ButtonCircle>
        <ChangeValueInput
          type="texto"
          value={visualValue}
          onChange={(e) => setValue(e.target.value)}
        ></ChangeValueInput>
        <ButtonCircle onClick={() => buttonHandler("sum")}>+</ButtonCircle>
      </Container>
      <Container justifyContent="center" break={true} gap="20px">
        {values.map((v, index) => (
          <PresetValue
            key={index}
            value={v}
            setValue={setValue}
            clicked={v === extractNumberFromCurrency(visualValue)}
          />
        ))}
      </Container>
      <BorderContainer>
        <PriceText>
          <ImgContainer mousePointer="cursor">
            <CustomImg src={dolar_img} alt="real" width="30" height="30" />
          </ImgContainer>
          Valor total: {TotalValue}
        </PriceText>
        <PriceText>
          <ImgContainer mousePointer="cursor">
            <CustomImg src={dolar_img} alt="dollar" width="30" height="30" />
          </ImgContainer>
          Valor do Dólar: {dolar}
          {" (BRL)"}
        </PriceText>
        <PriceText>
          <ImgContainer mousePointer="cursor">
            <CustomImg src={btc_img} alt="btc" width="30" height="30" />
          </ImgContainer>
          BTC: {btc}
          {" (BRL)"}
        </PriceText>
      </BorderContainer>
    </ChangeValueContainer>
  );
};
