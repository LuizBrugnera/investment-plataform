import React, { useRef, useState } from "react";
import { AttachProof, SendProof } from "../Styled";
import { useAppContext } from "../appContext";
import { useSnackbar } from "notistack";

export const ReciverDocument = ({ type }: { type: string }) => {
  const { setDocument, createContract } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setPdfFile(file);
    }
  };

  const handleButtonClick = () => {
    setDocument({
      archive: "",
      type: type,
    });
    fileInputRef.current?.click();
  };

  const handleSendProof = () => {
    if (pdfFile) {
      const document = {
        archive: pdfFile,
        type: type,
      };
      setDocument(document);
      enqueueSnackbar("Comprovante enviado com sucesso!", {
        variant: "success",
      });
      createContract(document);
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
