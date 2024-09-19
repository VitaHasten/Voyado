import { Col, Container, Row } from "react-bootstrap";
import "./HomePage.css";
import InputTextField from "../../atoms/InputTextField";
import { useEffect, useState } from "react";
import { GetSearchResponse } from "../../../services/SearchService";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import { SearchResponseDto } from "../../../models/SearchResponseDto";
import SearchResponseDiv from "../../molecules/SearchResponseDiv";
import ValidationMessageDiv from "../../molecules/ValidationMessageDiv";
import { AxiosError } from "axios";

const HomePage: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [isInputEntered, setIsInputEntered] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [performedSearchString, setPerformedSearchString] = useState("");
  const [isMaxLengthReached, setIsMaxLengthReached] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchResponse, setSearchResponse] = useState<
    SearchResponseDto | undefined
  >(undefined);
  const MAX_LETTERS_INPUTFIELD: number = 75;

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
    setErrorMessage(null);
    try {
      const result = await GetSearchResponse(inputText);
      setPerformedSearchString(inputText);
      if (result.success) setSearchResponse(result);
      else if (result.errorResponseString !== undefined)
        setErrorMessage(result.errorResponseString);
    } catch (error: any) {
      console.error("Error during search:", error);

      if (error.isAxiosError) {
        const axiosError = error as AxiosError;

        if (axiosError.code === "ERR_NETWORK") {
          setErrorMessage(
            `Nätverksfel: Kunde inte ansluta till servern. Detaljer: ${axiosError.message}`
          );
        } else if (axiosError.response) {
          setErrorMessage(
            `Serverfel: ${axiosError.response.status} - ${
              axiosError.response.statusText
            }. Data: ${JSON.stringify(axiosError.response.data)}`
          );
        } else {
          setErrorMessage(`Axios fel: ${axiosError.message}`);
        }
      } else {
        setErrorMessage(
          `Ett fel inträffade: ${error.message || JSON.stringify(error)}`
        );
      }
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
            backendError={searchResponse?.errorResponseString}
            errorMessage={errorMessage}
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
