import { useRef } from "react";
import {
  CustomImg,
  ImgContainer,
  ShareLink,
  ShareLinkNoMaxWidth,
} from "../Styled";
import copyImg from "../assets/copy.png";
import { useSnackbar } from "notistack";

export const CopyLink = ({
  value,
  backgroundcolor,
  init,
  nomaxwidth,
}: {
  value: string;
  backgroundcolor?: string;
  init?: boolean;
  nomaxwidth?: boolean;
}) => {
  const linkRef = useRef<HTMLDivElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleCopyLink = () => {
    const link = value;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        enqueueSnackbar(`Link copiado com sucesso!`, {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Erro ao copiar link!`, {
          variant: "error",
        });
        console.log(err);
      });
  };

  return (
    <>
      {nomaxwidth ? (
        <ShareLinkNoMaxWidth
          ref={linkRef}
          onClick={handleCopyLink}
          backgroundcolor={backgroundcolor}
          init={init}
        >
          {init && (
            <ImgContainer>
              <CustomImg src={copyImg} alt="copy icon" width="30" height="30" />
            </ImgContainer>
          )}
          {value}
          {!init && (
            <ImgContainer>
              <CustomImg src={copyImg} alt="copy icon" width="30" height="30" />
            </ImgContainer>
          )}
        </ShareLinkNoMaxWidth>
      ) : (
        <ShareLink
          ref={linkRef}
          onClick={handleCopyLink}
          backgroundcolor={backgroundcolor}
          init={init}
        >
          {init && (
            <ImgContainer>
              <CustomImg src={copyImg} alt="copy icon" width="30" height="30" />
            </ImgContainer>
          )}
          {value}
          {!init && (
            <ImgContainer>
              <CustomImg src={copyImg} alt="copy icon" width="30" height="30" />
            </ImgContainer>
          )}
        </ShareLink>
      )}
    </>
  );
};
