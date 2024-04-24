import { useEffect, useState } from "react";
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
import { useAppContext } from "../appContext";
import { login } from "../services/UserService";
import { useSnackbar } from "notistack";

function LoginPage() {
  const navigate = useNavigate();
  const { setLoggedIn, setUser } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      const user = await login(trimmedEmail, trimmedPassword);
      if (user) {
        setUser({
          email: user.email,
          fullname: user.fullname,
          username: user.username,
          id: user.id,
          role: user.role,
        });
        setLoggedIn(true);
        navigate(user.role === "ADMIN" ? "/admin" : "/dashboard");
      } else {
        enqueueSnackbar("Email ou Senha Incorretos!", { variant: "error" });
      }
    } catch (error) {
      console.error("Login error:", error);
      enqueueSnackbar("Erro ao fazer login!", { variant: "error" });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && email.trim() && password.trim()) {
        handleLogin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]); // Incluindo email e password nas dependências

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
