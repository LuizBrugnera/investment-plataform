
import {
  ContainerWithBorderLeft,
  CustomImg,
  DataBox,
  ImgContainer,
  MediumText,
  MethodWrapContainer,
  PixContainerMethod,
  PixInfoContainer,
} from "../Styled";
import pixqrcode from "../assets/pixqrcodewithoutvalue.png";
import { CopyLink } from "./CopyLink";
import { ReciverDocument } from "./ReciverDocument";

const Data = [
  {
    title: "Titular da Conta",
    data: "i7 Consultoria",
  },
  {
    title: "Agencia",
    data: "0001",
  },
  {
    title: "Banco",
    data: "461 - Asaas I.P S.A",
  },
  {
    title: "Número da Conta",
    data: "3496712-5",
  },
];

export const PixMethod = () => {
  return (
    <MethodWrapContainer>
      <PixContainerMethod>
        <ImgContainer padding={"0px"}>
          <CustomImg
            src={pixqrcode}
            alt="qrcode pix"
            width="250"
            height="250"
            animation={true}
          />
        </ImgContainer>
        <PixInfoContainer>
          {Data.map((data, index) => (
            <DataBox key={index}>
              <MediumText fontsize={18} padding={"5px 10px"} fontWeight={600}>
                {data.title}
              </MediumText>
              <MediumText
                fontsize={16}
                padding={"2px 10px 10px 10px"}
                fontWeight={400}
              >
                {" "}
                {data.data}
              </MediumText>
            </DataBox>
          ))}
        </PixInfoContainer>
      </PixContainerMethod>
      <ContainerWithBorderLeft>
        <MediumText
          fontsize={20}
          padding={"10px 0px 20px 0px"}
          fontWeight={600}
        >
          Chave pix (ALEATORIA):
        </MediumText>
        <CopyLink value="chavealeatoria" backgroundcolor="#232c3d" />
        <ReciverDocument type="Pix" />
      </ContainerWithBorderLeft>
    </MethodWrapContainer>
  );
};
