
import {
  ContractBox,
  ContractRowContainer,
  ContractsContainer,
  HorizontalLine,
  MediumText,
} from "../Styled";
import { useAppContext } from "../appContext";
enum InvestmentTypeEnum {
  SIX_MONTHS = "SIX_MONTHS",
  ONE_YEAR = "ONE_YEAR",
}

enum PayMethodEnum {
  PIX = "PIX",
  PIX_COLA = "PIX_COLA",
  BITCOIN = "BITCOIN",
  DOLAR = "DOLAR",
  SALDO = "SALDO",
}

enum StatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
export const Contracts = () => {
  const { contracts } = useAppContext();

  const formatStatus = (status: StatusEnum) => {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "APPROVED":
        return "Aprovado";
      case "REJECTED":
        return "Rejeitado";
      default:
        return "Pendente";
    }
  };

  const formatMethod = (method: PayMethodEnum) => {
    switch (method) {
      case "PIX":
        return "Pix";
      case "PIX_COLA":
        return "Pix Cola";
      case "BITCOIN":
        return "Bitcoin";
      case "DOLAR":
        return "Dólar";
      case "SALDO":
        return "Saldo";
      default:
        return "Pix";
    }
  };

  const formatInvestmentType = (investmentType: InvestmentTypeEnum) => {
    switch (investmentType) {
      case "SIX_MONTHS":
        return "6 meses";
      case "ONE_YEAR":
        return "1 ano";
      default:
        return "6 meses";
    }
  };

  return (
    <ContractsContainer>
      <MediumText fontsize={25} fontWeight={600} padding="30px">
        Seus Contratos
      </MediumText>

      <HorizontalLine />
      <ContractRowContainer>
        {contracts && contracts.length > 0 ? (
          contracts.map((contract, index) => (
            <ContractBox key={index}>
              <MediumText fontsize={20} padding="10px">
                Contrato {index + 1}
              </MediumText>
              <MediumText fontsize={16} padding="10px">
                Status:{" "}
                <span
                  style={
                    contract.status === StatusEnum.APPROVED
                      ? { color: "green", marginLeft: "5px" }
                      : contract.status === StatusEnum.REJECTED
                      ? { color: "red", marginLeft: "5px" }
                      : { color: "orange", marginLeft: "5px" }
                  }
                >
                  {formatStatus(contract.status)}
                </span>
              </MediumText>
              <MediumText fontsize={16} padding="10px">
                Valor:{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(contract.value)}
              </MediumText>
              <MediumText fontsize={16} padding="10px">
                Método de pagamento: {formatMethod(contract.method)}
              </MediumText>
              <MediumText fontsize={16} padding="10px">
                Tipo de investimento:{" "}
                {formatInvestmentType(contract.investmentType)}
              </MediumText>

              <HorizontalLine />
            </ContractBox>
          ))
        ) : (
          <MediumText fontsize={20} padding={"30px 0px 20px 0px"}>
            Você não possui contratos ativos
          </MediumText>
        )}
      </ContractRowContainer>
    </ContractsContainer>
  );
};
