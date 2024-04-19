import React, { ChangeEvent, useState } from "react";
import {
  Button,
  CloseSpan,
  Container,
  Input,
  MediumText,
  Modal,
  ModalContent,
  ModalImg,
  PixContainer,
} from "../Styled";

import { useSnackbar } from "notistack";

import pixqrcode from "../assets/pixqrcode.png";
import { useAppContext } from "../appContext";
``;

export const PixColaMethod = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    pixCellphone,
    setPixCellphone,
    setPixCpf,
    pixCpf,
    value,
    createContract,
  } = useAppContext();

  const formatCpf = (value: string) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.length > 9) {
      cleaned =
        cleaned.slice(0, 3) +
        "." +
        cleaned.slice(3, 6) +
        "." +
        cleaned.slice(6, 9) +
        "-" +
        cleaned.slice(9, 11);
    } else if (cleaned.length > 6) {
      cleaned =
        cleaned.slice(0, 3) +
        "." +
        cleaned.slice(3, 6) +
        "." +
        cleaned.slice(6, 9);
    } else if (cleaned.length > 3) {
      cleaned = cleaned.slice(0, 3) + "." + cleaned.slice(3, 6);
    }

    return cleaned;
  };

  const formatPhone = (value: string): string => {
    // Remove todos os caracteres não numéricos
    let cleaned = value.replace(/\D/g, "");

    // Formata como (54) 99999-9999
    if (cleaned.length > 6) {
      cleaned = `(${cleaned.slice(0, 2)}) ${cleaned.slice(
        2,
        7
      )}-${cleaned.slice(7, 11)}`;
    } else if (cleaned.length > 2) {
      cleaned = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length > 0) {
      cleaned = `(${cleaned}`;
    }

    return cleaned;
  };

  const handleChangePhone = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    const formattedPhone = formatPhone(value);
    setPixCellphone(formattedPhone);
  };

  const handleChangeCpf = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCpf = formatCpf(value);
    setPixCpf(formattedCpf);
  };

  const handleQrcode = async () => {
    if (pixCellphone.length < 15 || pixCpf.length < 14) {
      enqueueSnackbar(`Precisamos de um telefone e um CPF válidos!`, {
        variant: "error",
      });
      return;
    }
    enqueueSnackbar(`QRCODE para PIX de ${value} Gerado com Sucesso!!!`, {
      variant: "success",
    });
    toggleModal();
    createContract();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PixContainer>
      <Container flexDir="column" alignItems="left">
        <MediumText fontsize={17}>Telefone</MediumText>
        <Input
          placeholder="Ex: (53)99999-9999"
          value={pixCellphone}
          onChange={(e) => handleChangePhone(e)}
          maxLength={15}
        />
      </Container>
      <Container flexDir="column" alignItems="left">
        <MediumText fontsize={17}>Digite seu CPF</MediumText>
        <Input
          placeholder="EX: 000.000.000-00"
          value={pixCpf}
          onChange={(e) => handleChangeCpf(e)}
          maxLength={14}
        />
      </Container>
      <Container flexDir="column">
        <MediumText color="#19202e" fontsize={17}>
          .
        </MediumText>
        <Button onClick={handleQrcode}>Gerar QR Code</Button>
      </Container>
      {isOpen && (
        <Modal>
          <ModalContent>
            <CloseSpan onClick={toggleModal}>&times;</CloseSpan>
            <ModalImg src={pixqrcode} alt="Modal" className="modal-image" />
          </ModalContent>
        </Modal>
      )}
    </PixContainer>
  );
};
