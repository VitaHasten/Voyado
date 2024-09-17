import { Button } from "react-bootstrap";
import "./CustomButton.css";

export interface CustomButtonProps {
  buttonText: string;
  isInputEntered: boolean;
  classname?: string;
  style?: React.CSSProperties;
  size?: "sm" | "lg";
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return (
    <Button
      className={`${props.classname} ${props.isInputEntered ? "animate" : ""}`}
      onClick={props.isInputEntered ? props.onClick : undefined}
    >
      {props.buttonText}
    </Button>
  );
};

export default CustomButton;
