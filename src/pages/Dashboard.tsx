import { DashboardContainer } from "../Styled";
import { HeaderDashboard } from "../components/HeaderDashboard";
import { ShareLine } from "../components/ShareLine";
import { Balance } from "../components/Balance";
import { ChangeValue } from "../components/ChangeValue";
import { useState } from "react";
import { PayMethod } from "../components/PayMethod";
import { Contracts } from "../components/Contracts";
import { InvestmentType } from "../components/InvestmentType";
import { useAppContext } from "../appContext";

function DashboardPage() {
  const [visualValue, setVisualValue] = useState("R$ 100,00");
  const { setValue } = useAppContext();

  const extractNumberFromCurrency = (value: string) => {
    let cut = false;
    let cleaned = value.replace("R$", "").trim();
    cleaned = cleaned.replace(/\./g, "");
    if (cleaned.includes(",")) {
      const parts = cleaned.split(",");
      const decimalPart = parts[1];

      if (!(decimalPart.length > 2)) {
        cut = true;
      } else {
        cut = false;
        const lastDigit = decimalPart[decimalPart.length - 1];
        return parseInt(parts[0] + lastDigit);
      }
      cleaned = cut ? (+parts[0] / 10).toString() : parts[0];
    } else {
      cleaned = cleaned.replace(/\D/g, "");
    }

    return parseInt(cleaned, 10);
  };

  const formatedSetValue = (value: string) => {
    const numbers = extractNumberFromCurrency(value);
    setValue(numbers);
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(+numbers);

    setVisualValue(formattedValue);
  };

  return (
    <DashboardContainer>
      <HeaderDashboard />
      <ShareLine />
      <Balance />
      <ChangeValue visualValue={visualValue} setValue={formatedSetValue} />
      <InvestmentType />
      <PayMethod />
      <Contracts />
    </DashboardContainer>
  );
}

export default DashboardPage;
