import { Form } from "react-bootstrap";
export interface InputTextFieldProps {
  classname?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  size?: "sm" | "lg";
  placeholder?: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const InputTextField: React.FC<InputTextFieldProps> = (props) => {
  return (
    <Form.Control
      type="text"
      placeholder={props.placeholder}
      className={props.classname}
      style={props.style}
      size={props.size}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
      onKeyDown={props.onKeyDown}
    />
  );
};

export default InputTextField;
