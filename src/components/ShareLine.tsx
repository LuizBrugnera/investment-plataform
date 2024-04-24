import {
  Container,
  CustomImg,
  ShareImgContainer,
  ShareLineContainer,
} from "../Styled";
import zapImg from "../assets/zap.png";
import facebookImg from "../assets/face.png";
import instagramImg from "../assets/insta.png";
import telegramImg from "../assets/telegram.png";
import { CopyLink } from "./CopyLink";
import { useAppContext } from "../appContext";

export const ShareLine = () => {
  const baseUrl = window.location.protocol + "//" + window.location.host;
  const { windowSize, user } = useAppContext();
  return (
    <ShareLineContainer>
      <CopyLink
        nomaxwidth={true}
        value={`${baseUrl}/register/${user.username || ""}`}
      />{" "}
      {windowSize.width! > 1075 && (
        <Container
          width="20%"
          justifyContent="space-between"
          padding="0px 10px 0px 10px"
        >
          <ShareImgContainer
            href={`https://whatsapp.com/${import.meta.env.VITE_WHATSAPP_URL}`}
            target="_blank"
          >
            <CustomImg src={zapImg} alt="copy icon" width="40" height="40" />
          </ShareImgContainer>
          <ShareImgContainer
            href={`https://telegram.com/${import.meta.env.VITE_TELEGRAM_URL}`}
            target="_blank"
          >
            <CustomImg
              src={telegramImg}
              alt="copy icon"
              width="40"
              height="40"
            />
          </ShareImgContainer>
          <ShareImgContainer
            href={`https://instagram.com/${import.meta.env.VITE_INSTAGRAM_URL}`}
            target="_blank"
          >
            <CustomImg
              src={instagramImg}
              alt="copy icon"
              width="40"
              height="40"
            />
          </ShareImgContainer>
          <ShareImgContainer
            href={`https://facebook.com/${import.meta.env.VITE_FACEBOOK_URL}`}
            target="_blank"
          >
            <CustomImg
              src={facebookImg}
              alt="copy icon"
              width="40"
              height="40"
            />
          </ShareImgContainer>
        </Container>
      )}
    </ShareLineContainer>
  );
};
