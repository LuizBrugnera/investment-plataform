import { useSnackbar } from "notistack";
import React from "react";

// Defina o tipo para o valor do contexto
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

type User = {
  name: string;
  username: string;
  email: string;
  phone: string;
};

enum StatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

type Contract = {
  id?: number;
  value: number;
  date: Date;
  method: PayMethodEnum;
  investmentType: InvestmentTypeEnum;
  status: StatusEnum;
  document?: Document;
};

type WindowSize = {
  width: number | null;
  height: number | null;
};

type Document = {
  archive: string;
  type: string;
};

interface AppContextType {
  user: User;
  balance: number;
  saldo: number;
  value: number;
  investType: InvestmentTypeEnum;
  payMethod: PayMethodEnum;
  contracts: Contract[];
  pixCpf: string;
  document: Document;
  pixCellphone: string;
  windowSize: WindowSize;
  setPixCpf: (value: string) => void;
  setPixCellphone: (value: string) => void;
  setBalance: (value: number) => void;
  setSaldo: (value: number) => void;
  setValue: (value: number) => void;
  setDocument: React.Dispatch<React.SetStateAction<Document>>;
  setInvestType: React.Dispatch<React.SetStateAction<InvestmentTypeEnum>>;
  setPayMethod: React.Dispatch<React.SetStateAction<PayMethodEnum>>;
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  createContract: () => void;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = React.useState({} as User);
  const [balance, setBalance] = React.useState(100);
  const [saldo, setSaldo] = React.useState(50);
  const [value, setValue] = React.useState(100);
  const [investType, setInvestType] = React.useState(
    InvestmentTypeEnum.SIX_MONTHS
  );
  const [payMethod, setPayMethod] = React.useState(PayMethodEnum.PIX_COLA);
  const [contracts, setContracts] = React.useState([] as Contract[]);
  const [pixCpf, setPixCpf] = React.useState("");
  const [pixCellphone, setPixCellphone] = React.useState("");
  const [document, setDocument] = React.useState({} as Document);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState({
    width: null as number | null,
    height: null as number | null,
  });

  const createContract = async () => {
    if (value <= 0) {
      enqueueSnackbar("Valor inválido!", {
        variant: "error",
      });
      return;
    }

    setContracts([
      ...contracts,
      {
        date: new Date(),
        value: value,
        method: PayMethodEnum.PIX_COLA,
        investmentType: investType,
        status: StatusEnum.PENDING,
        document,
      },
    ]);

    enqueueSnackbar("Contrato gerado com sucesso!", {
      variant: "success",
    });

    // chama a api
  };

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        balance,
        setBalance,
        saldo,
        setSaldo,
        investType,
        setInvestType,
        value,
        setValue,
        payMethod,
        setPayMethod,
        contracts,
        setContracts,
        pixCpf,
        setPixCpf,
        pixCellphone,
        setPixCellphone,
        document,
        setDocument,
        windowSize,
        createContract,
        setLoggedIn,
        loggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = (): AppContextType => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
