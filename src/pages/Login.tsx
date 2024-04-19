import { useNavigate } from "react-router-dom";
import {
  ButtonForm,
  ContainerLeft,
  FormContainer,
  InputForm,
  LoginContainer,
  MediumText,
  TitleForm,
} from "../Styled";
import { useState } from "react";
// import { useAppContext } from "../appContext";

function LoginPage({ setLoggedIn }: { setLoggedIn: (value: boolean) => void }) {
  const navigate = useNavigate();
  // const { setUser } = useAppContext();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    setLoggedIn(true);
    // setUser({ email, name, phone, username });
    navigate("/dashboard");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <LoginContainer>
      <FormContainer>
        <TitleForm>Bem vindo de volta!</TitleForm>
        <ContainerLeft>
          <MediumText padding="3px 0px" fontWeight={400} fontsize={18}>
            Seu Email
          </MediumText>
          <InputForm
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </ContainerLeft>
        <ContainerLeft>
          <MediumText padding="3px 0px" fontWeight={400} fontsize={18}>
            Sua Senha
          </MediumText>
          <InputForm
            placeholder="*******"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </ContainerLeft>
        <ButtonForm onClick={handleLogin} margin="20px 0px 0px 0px">
          Entrar
        </ButtonForm>
        <ButtonForm
          onClick={handleRegister}
          margin="5px 0px 5px 0px"
          backgroundcolor="#14743499"
        >
          Não tem uma conta? Cadastre-se
        </ButtonForm>
      </FormContainer>
    </LoginContainer>
  );
}

export default LoginPage;
