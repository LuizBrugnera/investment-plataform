import { useState } from "react";
import {
  BorderPoints,
  Container,
  ContainerInvestment,
  InvestmentTypeContainer,
  MediumText,
} from "../Styled";
import { useAppContext } from "../appContext";

enum InvestmentTypeEnum {
  SIX_MONTHS = "SIX_MONTHS",
  ONE_YEAR = "ONE_YEAR",
}

export const InvestmentType = () => {
  const [selected, setSelected] = useState<InvestmentTypeEnum>(
    InvestmentTypeEnum.SIX_MONTHS
  );

  const { setInvestType } = useAppContext();

  const handleChangeInvestType = (type: InvestmentTypeEnum) => {
    setInvestType(type);
    setSelected(type);
  };

  return (
    <InvestmentTypeContainer>
      <Container justifyContent="left">
        {" "}
        Escolha qual tipo de investimento você deseja
      </Container>
      <BorderPoints />
      <ContainerInvestment
        justifyContent="space-around"
        padding="20px 20px"
        gap={"60px"}
        width="80%"
      >
        <ContainerInvestment
          minWidth="100px"
          onClick={() => handleChangeInvestType(InvestmentTypeEnum.SIX_MONTHS)}
          backgroundcolor={"#232c3d"}
          borderRadius="5px"
          flexDir="column"
          border={`${
            selected === InvestmentTypeEnum.SIX_MONTHS
              ? "1px solid #30e739"
              : "none"
          }`}
        >
          <MediumText fontsize={16} padding={"15px 10px"}>
            Seis meses
          </MediumText>
          <BorderPoints />
          <MediumText fontsize={16} padding={"15px 10px"} color="#30e739">
            120% em 6 Meses
          </MediumText>
        </ContainerInvestment>
        <ContainerInvestment
          onClick={() => handleChangeInvestType(InvestmentTypeEnum.ONE_YEAR)}
          backgroundcolor={"#232c3d"}
          borderRadius="5px"
          flexDir="column"
          border={`${
            selected === InvestmentTypeEnum.ONE_YEAR
              ? "1px solid #30e739"
              : "none"
          }`}
        >
          <MediumText fontsize={16} padding={"15px 10px"}>
            Um ano
          </MediumText>
          <BorderPoints />
          <MediumText fontsize={16} padding={"15px 10px"} color="#30e739">
            250% Em 12 Meses
          </MediumText>
        </ContainerInvestment>
      </ContainerInvestment>
    </InvestmentTypeContainer>
  );
};
