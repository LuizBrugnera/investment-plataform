import { useState } from "react";
import {
  BalanceContainer,
  Container,
  CustomImg,
  ImgAbsolute,
  ImgContainer,
  MediumText,
  RelativeContainer,
} from "../Styled";
import balanceIcon from "../assets/balance-icon.png";
import closeEye from "../assets/close-eye.png";
import openEye from "../assets/open-eye.png";
import { useAppContext } from "../appContext";

export const Balance = () => {
  const { saldo,  balance,  windowSize } = useAppContext();

  const [isBlurred, setIsBlurred] = useState(true);
  const toggleBlur = () => setIsBlurred(!isBlurred);

  return (
    <BalanceContainer>
      {windowSize.width! > 1200 ? (
        <>
          <RelativeContainer>
            <ImgAbsolute src={balanceIcon} alt="balance icon" />
          </RelativeContainer>{" "}
          Seu saldo é de
          <div
            style={{
              filter: isBlurred ? "blur(10px)" : "none",
              marginLeft: "0.5em",
              marginRight: "1.2em",
            }}
          >
            R$ {saldo.toFixed(2).replace(".", ",")}
          </div>
          |{" "}
          <div
            style={{
              marginLeft: "1em",
              marginRight: "0.1em",
            }}
          >
            Banca total
          </div>
          <div
            style={{
              filter: isBlurred ? "blur(10px)" : "none",
              marginLeft: "0.5em",
            }}
          >
            R$ {balance.toFixed(2).replace(".", ",")}
          </div>
          <ImgContainer>
            <CustomImg
              src={isBlurred ? closeEye : openEye}
              alt="copy icon"
              width="40"
              height="40"
              onClick={toggleBlur}
            />
          </ImgContainer>
        </>
      ) : (
        <>
          {windowSize.width! > 750 && (
            <RelativeContainer>
              <ImgAbsolute src={balanceIcon} alt="balance icon" />
            </RelativeContainer>
          )}

          <Container flexDir="column" alignItems="left" justifyContent="center">
            <MediumText fontsize={windowSize.width! < 700 ? 14 : 20}>
              Seu saldo é de
              <div
                style={{
                  filter: isBlurred ? "blur(10px)" : "none",
                  marginLeft: "0.5em",
                  marginRight: "1.2em",
                  display: "inline",
                }}
              >
                R$ {saldo.toFixed(2).replace(".", ",")}
              </div>
            </MediumText>
            <MediumText fontsize={windowSize.width! < 700 ? 14 : 20}>
              <div
                style={{ marginTop: windowSize.width! < 700 ? "9px" : "6px" }}
              >
                Banca total
                <div
                  style={{
                    filter: isBlurred ? "blur(10px)" : "none",
                    marginLeft: "0.5em",
                    display: "inline",
                  }}
                >
                  R$ {balance.toFixed(2).replace(".", ",")}
                </div>
              </div>
              <ImgContainer>
                <CustomImg
                  src={isBlurred ? closeEye : openEye}
                  alt="eye icon"
                  width="40"
                  height="40"
                  onClick={toggleBlur}
                />
              </ImgContainer>
            </MediumText>
          </Container>
        </>
      )}
    </BalanceContainer>
  );
};
