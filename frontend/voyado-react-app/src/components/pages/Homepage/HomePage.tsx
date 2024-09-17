import { Col, Container, Row } from "react-bootstrap";
import "./HomePage.css";
import InputTextField from "../../atoms/InputTextField";
import { useEffect, useState } from "react";
import { GetSearchResponse } from "../../../services/SearchService";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import { SearchResponseDto } from "../../../models/SearchResponseDto";

const HomePage: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [isInputEntered, setIsInputEntered] = useState(false);
  const [searchResponse, setSearchResponse] = useState<
    SearchResponseDto | undefined
  >(undefined);

  useEffect(() => {
    if (inputText.length > 1) setIsInputEntered(true);
    else setIsInputEntered(false);
  }, [inputText]);

  const searchHandler = async () => {
    if (!isInputEntered) return;

    const result = await GetSearchResponse(inputText);
    setSearchResponse(result);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && isInputEntered) {
      searchHandler();
    }
  };

  return (
    <Container fluid className="background-container">
      <Row className="main-section">
        <Col xl={6} lg={6} md={8} sm={10} xs={12} className="action-div">
          <InputTextField
            style={{ maxWidth: "900px" }}
            onChange={(value) => setInputText(value)}
            onKeyDown={handleKeyDown}
            size="lg"
            placeholder="Ange din söksträng..."
          />
          <CustomButton
            isInputEntered={isInputEntered}
            buttonText="Sök"
            size="lg"
            onClick={searchHandler}
          />
        </Col>
      </Row>
      <Row>
        {!searchResponse && (
          <Col
            xl={6}
            lg={6}
            md={8}
            sm={10}
            xs={12}
            className="response-div"
          ></Col>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
