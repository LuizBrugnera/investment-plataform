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
  const name = "luiz";
  const { windowSize } = useAppContext();
  return (
    <ShareLineContainer>
      <CopyLink value={`${baseUrl}/register/${name}`} />{" "}
      {windowSize.width! > 1075 && (
        <Container
          width="20%"
          justifyContent="space-between"
          padding="0px 10px 0px 10px"
        >
          <ShareImgContainer
            href="https://i7trader.app/clients/reidosexo"
            target="_blank"
          >
            <CustomImg src={zapImg} alt="copy icon" width="40" height="40" />
          </ShareImgContainer>
          <ShareImgContainer
            href="https://i7trader.app/clients/reidosexo"
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
            href="https://i7trader.app/clients/reidosexo"
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
            href="https://i7trader.app/clients/reidosexo"
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
