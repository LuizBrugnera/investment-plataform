import React, { useRef, useState } from "react";
import { AttachProof, SendProof } from "../Styled";
import { useAppContext } from "../appContext";
import { useSnackbar } from "notistack";

export const ReciverDocument = ({ type }: { type: string }) => {
  const { setDocument, createContract } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type === "application/pdf") {
      setPdfFile(URL.createObjectURL(file));
    } else {
      alert("Por favor, carregue um arquivo PDF.");
      setPdfFile(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSendProof = () => {
    if (pdfFile) {
      setDocument({
        archive: pdfFile,
        type: type,
      });
      enqueueSnackbar("Comprovante enviado com sucesso!", {
        variant: "success",
      });
      createContract();
      setPdfFile(null);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <AttachProof onClick={handleButtonClick}>Anexar Comprovante</AttachProof>
      <SendProof disabled={pdfFile ? false : true} onClick={handleSendProof}>
        Enviar Comprovante
      </SendProof>
    </>
  );
};
