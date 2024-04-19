import React, { useRef } from "react";
import { CustomImg, ImgContainer, ShareLink } from "../Styled";
import copyImg from "../assets/copy.png";
import { useSnackbar } from "notistack";

export const CopyLink = ({
  value,
  backgroundcolor,
}: {
  value: string;
  backgroundcolor?: string;
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
      <ShareLink
        ref={linkRef}
        onClick={handleCopyLink}
        backgroundcolor={backgroundcolor}
      >
        {value}
        <ImgContainer>
          <CustomImg src={copyImg} alt="copy icon" width="30" height="30" />
        </ImgContainer>
      </ShareLink>
    </>
  );
};
