import { Col, Container, Row } from "react-bootstrap";
import "./HomePage.css";
import InputTextField from "../../atoms/InputTextField";
import { useEffect, useState } from "react";
import { GetSearchResponse } from "../../../services/SearchService";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import { SearchResponseDto } from "../../../models/SearchResponseDto";
import SearchResponseDiv from "../../molecules/SearchResponseDiv";
import ValidationMessageDiv from "../../molecules/ValidationMessageDiv";

const HomePage: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [isInputEntered, setIsInputEntered] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [performedSearchString, setPerformedSearchString] = useState("");
  const [isMaxLengthReached, setIsMaxLengthReached] = useState(false);
  const [searchResponse, setSearchResponse] = useState<
    SearchResponseDto | undefined
  >(undefined);
  const MAX_LETTERS_INPUTFIELD: number = 50;

  useEffect(() => {
    if (inputText.length > 0) setIsInputEntered(true);
    else setIsInputEntered(false);
  }, [inputText]);

  useEffect(() => {
    console.log(searchResponse);
  }, [searchResponse]);

  const searchHandler = async () => {
    if (!isInputEntered || performedSearchString === inputText) return;

    setIsSearching(true);
    try {
      const result = await GetSearchResponse(inputText);
      setPerformedSearchString(inputText);
      setSearchResponse(result);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && isInputEntered) {
      searchHandler();
    }
  };

  return (
    <Container fluid className="background-container">
      <Row className="main-section">
        <Col className="validation-div mx-0 px-0">
          <ValidationMessageDiv
            maxLetters={MAX_LETTERS_INPUTFIELD}
            isMaxLettersReached={isMaxLengthReached}
          />
        </Col>
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={8}
          xs={12}
          className="action-div"
          style={{ maxWidth: "900px" }}
        >
          <InputTextField
            onChange={(value) => setInputText(value)}
            onKeyDown={handleKeyDown}
            size="lg"
            placeholder="Ange din söksträng..."
            maxLetters={MAX_LETTERS_INPUTFIELD}
            isMaxLengthReached={isMaxLengthReached}
            setIsMaxLengthReached={setIsMaxLengthReached}
          />
          <CustomButton
            isInputEntered={isInputEntered}
            buttonText="Sök"
            size="lg"
            onClick={searchHandler}
            isSearching={isSearching}
            classname="mb-1"
            performedSearchString={performedSearchString}
            inputText={inputText}
          />
        </Col>
      </Row>
      <Row className="response-div">
        <Col xl={4} lg={4} md={6} sm={8} xs={12} style={{ maxWidth: "700px" }}>
          <SearchResponseDiv
            searchResponse={searchResponse}
            performedSearchString={performedSearchString}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
