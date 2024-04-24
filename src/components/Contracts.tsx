import {
  ButtonContract,
  ContractBox,
  ContractRowContainer,
  ContractsContainer,
  HorizontalLine,
  MediumText,
} from "../Styled";
import { useAppContext } from "../appContext";
import { approveContractApi, rejectContractApi } from "../services/UserService";
import DownloadDocument from "./DownloadDocument";
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
export const Contracts = ({ admin }: { admin?: boolean }) => {
  const { contracts, setContracts } = useAppContext();

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

  const approveContract = (contractId: number) => {
    console.log(`Contrato ${contractId} aprovado!`);

    const newContracts = contracts.map((contract) => {
      if (contract.id === contractId) {
        return { ...contract, status: StatusEnum.APPROVED };
      }
      return contract;
    });

    setContracts(newContracts);

    approveContractApi(contractId);

    // chamar api para aprovar contrato
  };

  const rejectContract = (contractId: number) => {
    console.log(`Contrato ${contractId} rejeitado!`);

    const newContracts = contracts.map((contract) => {
      if (contract.id === contractId) {
        return { ...contract, status: StatusEnum.REJECTED };
      }
      return contract;
    });

    setContracts(newContracts);

    rejectContractApi(contractId);
  };

  const testUrl = (url?: string) => {
    const regex = /documentArchive/i;

    if (!url) {
      return false;
    }

    if (regex.test(url)) {
      return true;
    } else {
      return false;
    }
  };

  const formatDate = (date: Date) => {
    if (!(date instanceof Date)) {
      throw new TypeError(
        "O argumento fornecido deve ser uma instância de Date."
      );
    }

    const day = date.getDate(); // Pega o dia do mês (1-31)
    const month = date.getMonth() + 1; // Pega o mês (0-11) e adiciona 1 porque Janeiro é 0
    const year = date.getFullYear(); // Pega o ano com quatro dígitos

    // Preenche com zero à esquerda se o dia ou mês for menor que 10
    const formatDay = day < 10 ? "0" + day : day;
    const formatMonth = month < 10 ? "0" + month : month;

    return `${formatDay}/${formatMonth}/${year}`;
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
                Data de Início {formatDate(contract.startDate)}
              </MediumText>
              <MediumText fontsize={16} padding="10px">
                Data do Fim: {formatDate(contract.endDate)}
              </MediumText>
              <MediumText fontsize={16} padding="10px">
                Método de pagamento: {formatMethod(contract.method)}
              </MediumText>
              <MediumText fontsize={16} padding="10px 0px 0px 0px">
                Documento:
              </MediumText>
              <MediumText fontsize={16} padding="10px 70px 10px 70px">
                {testUrl(contract.document?.documentUrl)
                  ? DownloadDocument({
                      url: contract.document?.documentUrl ?? "",
                    })
                  : contract.document?.documentString || "Não informado"}
              </MediumText>
              <MediumText fontsize={16} padding="10px">
                Tipo: {contract.document?.type || "Não informado"}
              </MediumText>
              <MediumText fontsize={16} padding="10px 10px 30px 10px">
                Tipo de investimento:{" "}
                {formatInvestmentType(contract.investmentType)}
              </MediumText>

              {admin && contract.status === StatusEnum.PENDING && (
                <>
                  <ButtonContract
                    onClick={() => approveContract(Number(contract.id))}
                    backgroundcolor="Approved"
                  >
                    Aprovar
                  </ButtonContract>
                  <ButtonContract
                    onClick={() => rejectContract(Number(contract.id))}
                    backgroundcolor="Rejected"
                  >
                    Rejeitar
                  </ButtonContract>
                </>
              )}
              {admin && contract.status !== StatusEnum.PENDING && (
                <>
                  <ButtonContract
                    onClick={() => console.log(`Aprovado`)}
                    invisible={true}
                  >
                    Aprovar
                  </ButtonContract>
                  <ButtonContract
                    onClick={() => console.log("Rejeitado")}
                    invisible={true}
                  >
                    Rejeitar
                  </ButtonContract>
                </>
              )}

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
