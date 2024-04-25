import axios from "axios";
import * as jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";
interface JwtPayload {
  id: number;
  email: string;
  role: string;
  username: string;
  fullname: string;
  exp: number;
}

const decodeToken = (token: string) => {
  try {
    const decoded: JwtPayload = jwtDecode.jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Armazenar e configurar o token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Função de login
export const login = async (email: string, password: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post("/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    }
    return decodeToken(response.data.token);
  } catch (e) {
    throw e;
  }
};

// Função para buscar todos os usuários
export const getUsers = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDocumentArchive = async (url: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get(`/download-archive/${url}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Função para criar um usuário
export const createUser = async (
  email: string,
  fullname: string,
  password: string,
  phone: string,
  username: string
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post("/user", {
      email,
      fullname,
      password,
      phone,
      username,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para criar um contrato
export const createContractApi = async (
  document: File | string,
  documentType: string,
  investmentType: string,
  method: string,
  value: number
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const formData = new FormData();
    const documentIsString = typeof document === "string";

    if (documentIsString) {
      formData.append("documentString", document);
    } else {
      formData.append("documentString", "Arquivo");
      formData.append("documentArchive", document);
      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.onload = function (event: any) {
        const wordArray = CryptoJS.lib.WordArray.create(event.target.result);
        const hash = CryptoJS.MD5(wordArray).toString();
        formData.append("hash", hash);
        console.log("Hash", hash);
      };
      reader.readAsArrayBuffer(document);
    }
    formData.append("documentType", documentType);
    formData.append("investmentType", investmentType);
    formData.append("method", method);
    formData.append("value", value.toString());

    const response = await api.post("/contract", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createContractSaldoApi = async (
  investmentType: string,
  method: string,
  value: number
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post("/contract/saldo", {
      documentString: "Saldo",
      documentType: "Saldo",
      investmentType,
      method,
      value,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Função para buscar contratos de um usuário
export const getUserContracts = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get("/user/contract");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para buscar saldo de um usuário
export const getUserBalance = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get("/user/balance");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para buscar saldo de um usuário (com cálculo detalhado)
export const getUserSaldo = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get("/user/saldo");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveContractApi = async (contractId: number) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.put(`/contract/${contractId}/APPROVED`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectContractApi = async (contractId: number) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.put(`/contract/${contractId}/REJECTED`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
