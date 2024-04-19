import { PresetValueButton } from "../Styled";

interface PresetValueProps {
  value: number;
  setValue: (value: string) => void;
  clicked: boolean;
}

export const PresetValue = ({ value, setValue, clicked }: PresetValueProps) => {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  const handlerClick = () => {
    setValue(value.toString());
  };
  return (
    <PresetValueButton clicked={clicked} onClick={handlerClick}>
      {formattedValue}
    </PresetValueButton>
  );
};
