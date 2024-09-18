import { Button, Spinner } from "react-bootstrap";
import "./CustomButton.css";

export interface CustomButtonProps {
  buttonText: string;
  isInputEntered: boolean;
  classname?: string;
  style?: React.CSSProperties;
  size?: "sm" | "lg";
  onClick?: () => void;
  isSearching: boolean;
  performedSearchString?: string;
  inputText?: string;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return (
    <Button
      className={`${props.classname} ${
        props.isInputEntered && props.performedSearchString !== props.inputText
          ? "animate"
          : ""
      }`}
      onClick={props.isInputEntered ? props.onClick : undefined}
    >
      {!props.isSearching ? props.buttonText : <Spinner />}
    </Button>
  );
};

export default CustomButton;
