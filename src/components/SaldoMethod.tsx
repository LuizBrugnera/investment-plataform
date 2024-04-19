import { BalanceSpan, Container, MediumText, SaldoButton } from "../Styled";
import { useAppContext } from "../appContext";
import { useSnackbar } from "notistack";

export const SaldoMethod = () => {
  const { balance, saldo, value, setSaldo, setBalance } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const { createContract } = useAppContext();
  const handleReload = async () => {
    if (saldo < value) {
      enqueueSnackbar("Saldo insuficiente", { variant: "error" });
      return;
    }

    createContract();

    enqueueSnackbar(`Recarga de R$ ${value} realizada com sucesso`, {
      variant: "success",
    });
    setSaldo(saldo - value);
    setBalance(balance + value);

    /// Aqui você pode chamar uma API para realizar a recarga
  };

  return (
    <Container padding="0px">
      <Container flexDir="column">
        <MediumText
          fontsize={20}
          padding={"10px 0px 20px 0px"}
          fontWeight={600}
        >
          Seu Saldo é de{" "}
          <BalanceSpan>
            {" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(saldo)}
          </BalanceSpan>
        </MediumText>

        <SaldoButton onClick={handleReload}>
          Recarregar{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value)}{" "}
          com seu Saldo
        </SaldoButton>
      </Container>
    </Container>
  );
};
