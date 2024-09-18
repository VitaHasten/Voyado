import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

export interface InputTextFieldProps {
  classname?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  size?: "sm" | "lg";
  placeholder?: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  maxLetters?: number;
  isMaxLengthReached: boolean;
  setIsMaxLengthReached: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputTextField: React.FC<InputTextFieldProps> = (props) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const trimmedValue = inputValue.trimStart();

    if (inputValue !== trimmedValue) {
      setInputValue(trimmedValue);

      if (props.onChange) {
        props.onChange(trimmedValue);
      }
    }
  }, [inputValue, props]);

  const handleChange = (value: string) => {
    setInputValue(value);

    if (props.maxLetters) {
      props.setIsMaxLengthReached(value.length >= props.maxLetters);
    }

    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <Form.Control
      type="text"
      placeholder={props.placeholder}
      className={props.classname}
      style={props.style}
      size={props.size}
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={props.onKeyDown}
      maxLength={props.maxLetters}
    />
  );
};

export default InputTextField;
