import { Col, Row } from "react-bootstrap";

export interface ValidationMessageDivProps {
  maxLetters: number;
  isMaxLettersReached: boolean;
  backendError?: string;
  errorMessage?: string | null;
}

const ValidationMessageDiv: React.FC<ValidationMessageDivProps> = (props) => {
  return (
    <>
      {props.backendError && (
        <div
          style={{
            backgroundColor: "gold",
          }}
        >
          <Row>
            <Col>
              <h4>{props.backendError}</h4>
            </Col>
          </Row>
        </div>
      )}
      {props.errorMessage && (
        <div
          style={{
            backgroundColor: "gold",
          }}
        >
          <Row>
            <Col>
              <h4>{props.errorMessage}</h4>
            </Col>
          </Row>
        </div>
      )}
      {props.isMaxLettersReached && (
        <div
          style={{
            backgroundColor: "gold",
          }}
        >
          <Row>
            <Col>
              <h4>Maximalt antal tecken uppnått! ({props.maxLetters})</h4>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ValidationMessageDiv;
