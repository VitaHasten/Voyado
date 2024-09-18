import { Col, Row } from "react-bootstrap";

export interface ValidationMessageDivProps {
  maxLetters: number;
  isMaxLettersReached: boolean;
}

const ValidationMessageDiv: React.FC<ValidationMessageDivProps> = (props) => {
  return (
    <>
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
