import { createGlobalStyle, styled } from "styled-components";
import { darken } from "polished";

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap');
    body {
        margin: 0;
        padding: 0;
        font-family: "Sora", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        background-color: #060606;
        background-image: 
        radial-gradient(circle at top right, rgba(50, 150, 50, 0.226), transparent 40%),
        radial-gradient(circle at bottom left, rgba(238, 35, 35, 0.103), transparent 40%);
    }
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    `;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  height: 96px;
  background-color: #111722;
  color: #fff;
  border-bottom: 1px solid #575555;
  @media (max-width: 500px) {
    justify-content: center;
    height: 150px;
  }
`;

export const Logo = styled.img`
  width: 160px;
  height: 60px;
  margin: 15px 0px 10px 180px;
  @media (max-width: 1000px) {
    margin: 15px 0px 10px 50px;
  }
  @media (max-width: 500px) {
    margin: 15px 0px 10px 0px;
    width: 170px;
    height: 80px;
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 230vh;
  flex: 1;
`;

export const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const LoginButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding: 30px 0px 0px 0px;
  color: #fff;

  @media (max-width: 1500px) {
    width: 90%;
  }
`;

export const ButtonWithoutBorder = styled.button`
  padding: 10px 20px 10px 0px;
  font-size: 18px;
  cursor: pointer;
  background-color: transparent;
  color: #fff;
  border: none;
`;

interface MediumTextProps {
  fontsize?: number;
  padding?: string;
  color?: string;
  fontWeight?: number;
}

export const MediumText = styled.h2<MediumTextProps>`
  display: flex;
  padding: ${(props) => props.padding || "10px 20px 10px 5px;"};
  font-size: ${(props) => props.fontsize || 20}px;
  color: ${(props) => props.color || "#fff"};
  font-weight: ${(props) => props.fontWeight || 500};
`;
interface ImgContainerProps {
  mousePointer?: string;
  backGround?: boolean;
  padding?: string;
}

export const ImgContainer = styled.div<ImgContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  margin-right: 5px;
  border-radius: 50%;
  padding: ${(props) => props.padding || "1px 0px 0px 10px"};
  background-color: ${(props) =>
    props.backGround ? "#147434" : "transparent"};
  cursor: ${(props) => props.mousePointer || "pointer"};
`;

interface CustomImgProps {
  width?: string;
  height?: string;
  animation?: boolean;
}

export const CustomImg = styled.img<CustomImgProps>`
  width: ${(props) => props.width || "30px"};
  height: ${(props) => props.height || "30px"};
  ${(props) =>
    props.animation
      ? `animation: jump 0.5s;
  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }`
      : ""}
`;

export const ContainerFlex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkImg = styled.img`
  width: 30px;
  height: 30px;
  margin: 0px 10px 0px 0px;
  border-radius: 50%;
  cursor: pointer;
`;

export const LinkContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

interface ContainerProps {
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  padding?: string;
  break?: boolean;
  gap?: string;
  flexDir?: string;
  flex?: number;
  backgroundcolor?: string;
  borderRadius?: string;
  border?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  flex-direction: ${(props) => props.flexDir || "row"};
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding || "20px"};
  flex-wrap: ${(props) => (props.break ? "wrap" : "nowrap")};
  gap: ${(props) => props.gap || "0px"};
  color: #fff;
  ${(props) => (props.flex ? `flex: ${props.flex};` : "")}
  background-color: ${(props) => props.backgroundcolor || "transparent"};
  border-radius: ${(props) => props.borderRadius || "0px"};
  border: ${(props) => props.border || "none"};
`;

interface ShareLinkProps {
  backgroundcolor?: string;
  init?: boolean;
  nomaxwidth?: boolean;
}

export const ShareLink = styled.div<ShareLinkProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.init ? "flex-start" : "space-between;")};
  color: #fff;
  font-size: 17px;
  margin: 0px 10px 0px 0px;
  background-color: ${(props) => props.backgroundcolor || "#19202e"};
  width: 85%;
  padding: 15px;
  border-radius: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 600px;
  cursor: pointer;
  :disabled {
    background-color: #575555;
  }

  @media (max-width: 1075px) {
    width: 100%;
    margin: 0px 0px 0px 0px;
  }
  @media (max-width: 450px) {
    font-size: 13px;
  }
`;

interface ShareLinkNoMaxWidthProps {
  backgroundcolor?: string;
  init?: boolean;
  nomaxwidth?: boolean;
}

export const ShareLinkNoMaxWidth = styled.div<ShareLinkNoMaxWidthProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.init ? "flex-start" : "space-between;")};
  color: #fff;
  font-size: 17px;
  margin: 0px 10px 0px 0px;
  background-color: ${(props) => props.backgroundcolor || "#19202e"};
  width: 85%;
  padding: 15px;
  border-radius: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  :disabled {
    background-color: #575555;
  }

  @media (max-width: 1075px) {
    width: 100%;
    margin: 0px 0px 0px 0px;
  }
  @media (max-width: 450px) {
    font-size: 13px;
  }
`;

export const ShareImgContainer = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1px;
  padding-left: 10px;
  height: 90%;
  border-radius: 50%;
`;

export const BalanceContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 80%;
  min-height: 130px;
  padding: 20px 20px 20px 250px;
  color: #fff;
  font-size: 30px;
  background-color: #19202e;
  border-radius: 10px;

  @media (max-width: 1500px) {
    width: 90%;
    font-size: 25px;
  }
  @media (max-width: 750px) {
    padding: 20px 20px 20px 20px;
    justify-content: center;
    align-content: center;
  }
`;

export const RelativeContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1px;
  padding-left: 10px;
  height: 90%;
`;

export const ImgAbsolute = styled.img`
  position: absolute;
  top: -67px;
  left: -290px;
  width: 250px;
  height: 130px;
`;

export const ChangeValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 30px;
  padding: 20px 20px 20px 20px;
  color: #fff;
  font-size: 20px;
  background-color: #19202e;
  border-radius: 10px;
  @media (max-width: 1500px) {
    width: 90%;
  }
  @media (max-width: 500px) {
    padding: 20px 0px 20px 0px;
  }
`;

export const BorderPoints = styled.div`
  width: 100%;
  border-bottom: 2px dotted #575555;
  border-style: none none dotted;
  padding: 2px 10px 5px 10px;
  margin: 2px 0px 5px 0px;
`;

export const ButtonCircle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #121724;
  color: #fff;
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 1300px) {
    width: 40px;
    height: 40px;
  }
  @media (max-width: 350px) {
    width: 18px;
    height: 18px;
    font-size: 12px;
  }
`;

export const ChangeValueInput = styled.input`
  width: 15%;
  min-width: 170px;
  padding: 10px;
  margin: 10px 15px 10px 15px;
  font-size: 20px;
  border-radius: 10px;
  border: none;
  background-color: #232c3d;
  border: 1px solid #575555;
  text-align: center;
  color: #fff;

  @media (max-width: 500px) {
    font-size: 16px;
    width: 10%;
  }
`;

interface PresetValueButtonProps {
  clicked: boolean;
}

export const PresetValueButton = styled.button<PresetValueButtonProps>`
  padding: 12px 50px;
  font-size: 18px;
  cursor: pointer;
  background-color: ${(props) => (props.clicked ? "#147434" : "#232c3d")};
  width: 18%;
  min-width: 150px;
  color: #fff;
  border: none;
  border-radius: 10px;

  @media (max-width: 1300px) {
    padding: 12px 12px;
  }
`;

export const BorderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 93.4%;
  padding: 20px;
  border: 1px solid #575555;
  border-radius: 10px;
  color: #fff;

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

export const PriceText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;

  @media (max-width: 900px) {
    width: 100%;
    justify-content: flex-start;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const PayMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 30px;
  padding: 20px 20px 20px 20px;
  color: #fff;
  font-size: 20px;
  background-color: #19202e;
  border-radius: 10px;

  @media (max-width: 1500px) {
    width: 90%;
  }

  @media (max-width: 450px) {
    padding: 20px 0px;
  }
`;

interface BoxProps {
  backgroundcolor?: string;
}

export const Box = styled.div<BoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 10px 12px 10px 15px;
  color: #fff;
  font-size: 20px;
  background-color: ${(props) => props.backgroundcolor || "transparent"};
  border-radius: 10px;
  z-index: 1;
`;

export const PixContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 20px 20px 20px;
  color: #fff;
  font-size: 20px;
  background-color: #19202e;
  border-radius: 10px;

  @media (max-width: 1050px) {
    flex-direction: column;
  }

  @media (max-width: 450px) {
    padding: 20px 0px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 15px 10px 15px;
  width: 100%;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  background-color: #232c3d;
  border: 1px solid #575555;
  text-align: center;
  color: #fff;
  text-align: left;
  text-indent: 10px;

  @media (max-width: 1050px) {
    margin: 0px;
  }
`;

export const Button = styled.button`
  padding: 15px 50px;
  margin: 10px 15px 10px 15px;
  font-size: 18px;
  width: 100%;
  cursor: pointer;
  background-color: #147434;
  color: #fff;
  border: none;
  border-radius: 10px;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const ModalContent = styled.div`
  position: relative;
  padding: 20px;
`;

export const CloseSpan = styled.span`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #ff0000;
  cursor: pointer;
`;

export const ModalImg = styled.img`
  max-width: 95%;
  max-height: 95vh;
  display: block;
`;

export const DataBox = styled.div`
  width: 40%;
  min-height: 130px;
  text-align: left;
  padding: 6px;
  margin: 9px;
  border-bottom: solid 1px black;
`;

export const ContainerWithBorderLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  width: 100%;
  height: 300px;
  padding: 10px 20px;
  border-left: 1px solid #575555;

  @media (max-width: 1180px) {
    border-left: none;
  }
`;

export const AttachProof = styled.button`
  width: 80%;
  padding: 10px 20px;
  margin: 30px 0px 10px 15px;
  font-size: 16px;
  cursor: pointer;
  background-color: #147434;
  color: #fff;
  border: none;
  border-radius: 10px;

  @media (max-width: 1500px) {
    width: 90%;
  }
`;

interface SendProofProps {
  disabled?: boolean;
}

export const SendProof = styled.button<SendProofProps>`
  width: 80%;
  padding: 10px 20px;
  margin: 10px 0px 10px 15px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background-color: ${(props) => (props.disabled ? "#053f1850" : "#147434")};
  color: #fff;
  border: none;
  border-radius: 10px;
  :disabled {
    background-color: #147434;
  }

  @media (max-width: 1500px) {
    width: 90%;
  }
`;

export const BalanceSpan = styled.span`
  font-size: 22px;
  color: #28bd0a;
  font-weight: 600;
  margin-left: 10px;
`;

export const SaldoButton = styled.button`
  padding: 15px 50px;
  margin: 10px 15px 10px 15px;
  font-size: 18px;
  width: 30%;
  cursor: pointer;
  background-color: #147434;
  color: #fff;
  border: none;
  border-radius: 10px;

  @media (max-width: 980px) {
    width: 40%;
  }
  @media (max-width: 855px) {
    padding: 15px 20px;
  }
  @media (max-width: 750px) {
    width: 50%;
  }
  @media (max-width: 600px) {
    width: 60%;
  }
`;

export const ContractsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 30px;
  padding: 20px 20px 20px 20px;
  margin-bottom: 100px;
  color: #fff;
  font-size: 20px;
  background-color: #19202e;
  border-radius: 10px;
  @media (max-width: 1500px) {
    width: 90%;
  }
`;

export const HorizontalLine = styled.hr`
  width: 100%;
  border: 1px solid #575555;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin-top: 30px;
  padding: 20px 20px 20px 20px;
  color: #fff;
  font-size: 20px;
  background-color: transparent;
  border-radius: 10px;

  @media (max-width: 1250px) {
    width: 40%;
  }
  @media (max-width: 850px) {
    width: 60%;
  }
  @media (max-width: 550px) {
    width: 80%;
  }
`;

export const InputForm = styled.input`
  padding: 10px 15px;
  margin: 10px 0px 10px 0px;
  width: 100%;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  background-color: #232c3d;
  border: 1px solid #575555;
  text-align: center;
  color: #fff;
  text-align: left;
  text-indent: 10px;
`;

interface ButtonFormProps {
  disabled?: boolean;
  color?: string;
  backgroundcolor?: string;
  margin?: string;
}

export const ButtonForm = styled.button<ButtonFormProps>`
  padding: 10px 40px;
  margin: ${(props) => props.margin || "10px 0px 10px 0px"};
  font-size: 18px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => props.backgroundcolor || "#147434"};
  color: #fff;
  border: none;
`;

interface TitleFormProps {
  color?: string;
  fontsize?: string;
  fontWeight?: string;
  padding?: string;
  margin?: string;
}

export const TitleForm = styled.h2<TitleFormProps>`
  font-size: ${(props) => props.fontsize || "45px;"};
  color: ${(props) => props.color || "#fff"};
  font-weight: ${(props) => props.fontWeight || "600"};
  padding: ${(props) => props.padding || "30px 10px;"};
  margin: ${(props) => props.margin || "50px 0px 0px 0px;"};
`;

export const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  width: 100%;
`;

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const InputCheckbox = styled.input`
  margin: 10px 10px 10px 3px;
  border: 1px solid #575555;
  background-color: #232c3d;
  color: #fff;
`;

export const InvestmentTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 30px;
  padding: 20px 20px 20px 20px;
  color: #fff;
  font-size: 20px;
  background-color: #19202e;
  border-radius: 10px;

  @media (max-width: 1500px) {
    width: 90%;
  }
  @media (max-width: 450px) {
    padding: 20px 0px;
  }
`;

export const ConfigBox = styled.div`
  position: absolute;
  top: 100%;
  right: 50;
  background: #13330f5c;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0px 10px 0px 30px;
  z-index: 100;
  transition: opacity 0.5s ease;
  animation: fadein 0.5s;
  opacity: 1;
  transform: translateY(0);
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ShareLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 80%;
  padding: 20px 20px 20px 0px;
  color: #fff;
  background-color: transparent;
  border-radius: 0px;
  border: none;

  @media (max-width: 1500px) {
    width: 90%;
  }

  @media (max-width: 1075px) {
    padding: 20px 0px;
  }
`;

interface ContainerInvestmentProps {
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  padding?: string;
  break?: boolean;
  gap?: string;
  flexDir?: string;
  flex?: number;
  backgroundcolor?: string;
  borderRadius?: string;
  border?: string;
  minWidth?: string;
}

export const ContainerInvestment = styled.div<ContainerInvestmentProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  flex-direction: ${(props) => props.flexDir || "row"};
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding || "20px"};
  flex-wrap: ${(props) => (props.break ? "wrap" : "nowrap")};
  gap: ${(props) => props.gap || "0px"};
  color: #fff;
  ${(props) => (props.flex ? `flex: ${props.flex};` : "")}
  background-color: ${(props) => props.backgroundcolor || "transparent"};
  border-radius: ${(props) => props.borderRadius || "0px"};
  border: ${(props) => props.border || "none"};
  min-width: ${(props) => props.minWidth || ""};

  @media (max-width: 690px) {
    gap: 20px;
  }
  @media (max-width: 450px) {
    padding: 20px 5px;
  }
`;

interface MethodContainerProps {
  invisible?: boolean;
}

export const MethodContainer = styled.div<MethodContainerProps>`
  visibility: ${(props) => (props.invisible ? "hidden" : "visible")};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 30%;
  padding: 20px 20px 20px 20px;
  color: #fff;
  font-size: 20px;
  background-color: #19202e;
  border-radius: 10px;
  min-width: 250px;
  @media (max-width: 1180px) {
    max-width: 45%;
  }
  @media (max-width: 760px) {
    min-width: 300px;
  }
  @media (max-width: 450px) {
    padding: 20px 5px;
    min-width: 200px;
  }
`;

export const ContainerArrayMethods = styled.div<MethodContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 20px;
  color: #fff;
  font-size: 20px;
  @media (max-width: 1180px) {
    justify-content: center;
    padding: 20px 120px;
  }
  @media (max-width: 980px) {
    justify-content: center;
    padding: 20px 20px;
  }
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

export const MethodWrapContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 20px 20px 20px;
  color: #fff;
  font-size: 20px;
  background-color: #19202e;
  border-radius: 10px;
  @media (max-width: 1180px) {
    flex-wrap: wrap;
  }
`;

export const PixContainerMethod = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0px;
  color: #fff;
  font-size: 20px;
  @media (max-width: 1600px) {
    flex-wrap: wrap;
  }
`;

export const PixInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0px 10px 0px 10px;
  color: #fff;
  font-size: 20px;
  flex-wrap: wrap;
  @media (max-width: 1450px) {
    margin-top: 20px;
    min-width: 350px;
    justify-content: center;
    align-items: center;
  }
`;

export const ContractRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  padding: 20px 20px 20px 20px;
  color: #fff;
  font-size: 20px;
  background-color: #19202e;
  border-radius: 10px;
  @media (max-width: 1180px) {
    flex-wrap: wrap;
  }
`;

export const ContractBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 31.3%;

  padding: 5px 5px 5px 5px;
  margin: 30px 10px 10px 10px;

  color: #fff;
  font-size: 20px;
  min-height: 600px;
  background-color: #19202e;
  border-radius: 10px;
  border: 1px solid #575555;
  @media (max-width: 1500px) {
    width: 48%;
  }
  @media (max-width: 1500px) {
    width: 47%;
  }
  @media (max-width: 990px) {
    width: 100%;
  }
`;

export const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 230vh;
  flex: 1;
`;

interface ButtonContractProps {
  backgroundcolor?: "Rejected" | "Approved";
  invisible?: boolean;
}

export const ButtonContract = styled.button<ButtonContractProps>`
  padding: 15px 50px;
  margin: 10px 20px;
  font-size: 18px;
  width: 90%;
  cursor: pointer;
  background-color: ${(props) =>
    props.backgroundcolor === "Rejected" ? "#d83030" : "#147434"};
  color: #fff;
  border: none;
  border-radius: 10px;
  visibility: ${(props) => (props.invisible ? "hidden" : "visible")};

  &:active {
    background-color: ${(props) =>
      darken(
        0.1,
        props.backgroundcolor === "Rejected" ? "#d83030" : "#147434"
      )};
  }
`;
