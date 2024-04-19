import React, { useState } from "react";
import {
  ButtonForm,
  ContainerLeft,
  FormContainer,
  InputCheckbox,
  InputForm,
  MediumText,
  RegisterContainer,
  TitleForm,
} from "../Styled";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const Register = () => {
  const { affiliate } = useParams();
  console.log(affiliate);
  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const navigate = useNavigate();

  const formatPhone = (value: string): string => {
    // Remove todos os caracteres não numéricos
    let cleaned = value.replace(/\D/g, "");

    // Formata como (54) 99999-9999
    if (cleaned.length > 6) {
      cleaned = `(${cleaned.slice(0, 2)}) ${cleaned.slice(
        2,
        7
      )}-${cleaned.slice(7, 11)}`;
    } else if (cleaned.length > 2) {
      cleaned = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length > 0) {
      cleaned = `(${cleaned}`;
    }

    return cleaned;
  };

  const handleChangePhone = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    const formattedPhone = formatPhone(value);
    setPhone(formattedPhone);
  };

  const allFill = () => {
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      username === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Preencha todos os campos");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!allFill()) return;

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha precisa ter no mínimo 6 caracteres");
      return;
    }

    if (!checked) {
      toast.error("Você precisa concordar com os termos de uso");
      return;
    }

    if (phone.length < 14) {
      toast.error("Preencha o campo de telefone corretamente");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Email inválido");
      return;
    }

    toast.success("Usuário cadastrado com sucesso!");
    toast.success("Entrando...");
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <RegisterContainer>
      <ToastContainer />
      <FormContainer>
        <MediumText padding="3px 0px" fontWeight={400} fontsize={18}>
          {affiliate ? `Você foi indicado por ${affiliate}` : ""}
        </MediumText>
        <TitleForm margin="0px 0px 0px 0px" padding="10px 0px">
          Cadastre-se Gratuitamente!
        </TitleForm>
        <ContainerLeft>
          <MediumText padding="3px 0px" fontWeight={400} fontsize={18}>
            Nome Completo
          </MediumText>
          <InputForm
            placeholder="Ex.: Lucas Jorge da Silva"
            maxLength={55}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </ContainerLeft>
        <ContainerLeft>
          <MediumText padding="3px 0px" fontWeight={400} fontsize={18}>
            Email
          </MediumText>
          <InputForm
            placeholder="Ex.: lucasjorge@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </ContainerLeft>
        <ContainerLeft>
          <MediumText padding="3px 0px" fontWeight={400} fontsize={18}>
            Telefone
          </MediumText>
          <InputForm
            placeholder="Ex.: (52)99999-9999"
            value={phone}
            onChange={(e) => handleChangePhone(e)}
            maxLength={15}
          />
        </ContainerLeft>
        <ContainerLeft>
          <MediumText padding="3px 0px" fontWeight={400} fontsize={18}>
            Login
          </MediumText>
          <InputForm
            placeholder="Ex.: lucas_jorge"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </ContainerLeft>
        <ContainerLeft>
          <MediumText padding="3px 0px" fontWeight={400} fontsize={18}>
            Senha
          </MediumText>
          <InputForm
            placeholder="**********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </ContainerLeft>
        <ContainerLeft>
          <MediumText padding="3px 0px" fontWeight={400} fontsize={18}>
            Confirme sua Senha
          </MediumText>
          <InputForm
            placeholder="**********"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </ContainerLeft>
        <ContainerLeft>
          <MediumText padding="3px 0px" fontWeight={400} fontsize={16}>
            <InputCheckbox
              type="checkbox"
              onChange={() => setChecked(!checked)}
            />
            Eu concordo com os termos e condições de uso
          </MediumText>
        </ContainerLeft>
        <ButtonForm onClick={handleRegister} margin="20px 0px 0px 0px">
          Criar Conta
        </ButtonForm>
      </FormContainer>
    </RegisterContainer>
  );
};
