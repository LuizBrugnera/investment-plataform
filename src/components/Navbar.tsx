import { Logo, Nav, ShareImgContainer } from "../Styled";
import icon from "../assets/icon.png";

/// icone no meio de quando estiver pequeno e quando estiver grande no canto esquerdo

export const Navbar = () => {
  return (
    <Nav>
      <ShareImgContainer href="/">
        <Logo src={icon} alt="logo" />
      </ShareImgContainer>
    </Nav>
  );
};
