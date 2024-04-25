import { useSnackbar } from "notistack";
import React from "react";
import {
  createContractApi,
  createContractSaldoApi,
  getUserBalance,
  getUserContracts,
  getUserSaldo,
} from "./services/UserService";

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
  id: number;
  fullname: string;
  username: string;
  email: string;
  role: string;
};

enum StatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

type Contract = {
  id?: number;
  userId: number;
  value: number;
  method: PayMethodEnum;
  investmentType: InvestmentTypeEnum;
  status: StatusEnum;
  document?: Document;
  startDate: Date;
  endDate: Date;
};

type WindowSize = {
  width: number | null;
  height: number | null;
};

type Document = {
  archive: File | string;
  type: string;
  documentString?: string;
  documentUrl?: string;
};

interface ContractDB {
  createdAt: string;
  documentUrl: string;
  documentString: string;
  documentType: string;
  endDate: string;
  id: number;
  investmentType: string;
  method: string;
  startDate: string;
  status: string;
  updatedAt: string;
  userId: number;
  value: number;
}

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
  createContract: (documentLocal?: Document) => void;
  loginToken: string;
  setLoginToken: React.Dispatch<React.SetStateAction<string>>;
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
  const [loginToken, setLoginToken] = React.useState("");

  const createContract = async (documentLocal?: Document) => {
    if (value <= 0) {
      enqueueSnackbar("Valor inválido!", {
        variant: "error",
      });
      return;
    }
    console.log("Creating contract");
    const startDate = new Date();

    const months = investType === InvestmentTypeEnum.SIX_MONTHS ? 6 : 12;

    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + months);

    setContracts([
      ...contracts,
      {
        userId: user.id,
        startDate,
        endDate,
        value: value,
        method: payMethod,
        investmentType: investType,
        status: StatusEnum.PENDING,
        document,
      },
    ]);

    enqueueSnackbar("Contrato gerado com sucesso!", {
      variant: "success",
    });

    const documentApi = {
      archive: documentLocal?.archive || document.archive,
      type: documentLocal?.type || document.type,
    };

    if (payMethod === PayMethodEnum.SALDO) {
      await createContractSaldoApi(investType, payMethod, value);
    } else {
      await createContractApi(
        documentApi.archive,
        documentApi.type,
        investType,
        payMethod,
        value
      );
    }
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

  React.useEffect(() => {
    if (loggedIn) {
      const updateData = async () => {
        getUserContracts().then((data: ContractDB[]) => {
          const contractsData = data.map((contract: ContractDB) => ({
            id: contract.id,
            userId: contract.userId,
            value: contract.value,
            startDate: new Date(contract.startDate),
            endDate: new Date(contract.endDate),
            method: contract.method as PayMethodEnum,
            investmentType: contract.investmentType as InvestmentTypeEnum,
            status: contract.status as StatusEnum,
            document: {
              archive: contract.documentUrl,
              type: contract.documentType,
              documentString: contract.documentString,
              documentUrl: contract.documentUrl,
            } as Document,
          }));

          if (user.role === "ADMIN") {
            const orderedContracts = contractsData.sort((a, b) => {
              if (a.status === StatusEnum.PENDING) {
                return -1;
              } else if (a.status === StatusEnum.APPROVED) {
                return 1;
              } else {
                return 0;
              }
            });
            setContracts(orderedContracts);
          } else {
            setContracts(contractsData);
          }
        });
        getUserBalance().then((data) => setBalance(data.balance));
        getUserSaldo().then((data) => setSaldo(data.saldo));
      };

      updateData();
    }
  }, [loggedIn, user]);

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
        loginToken,
        setLoginToken,
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
