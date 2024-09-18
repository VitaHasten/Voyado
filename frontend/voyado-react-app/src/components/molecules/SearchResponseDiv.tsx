import { Col, Row, Table, Image } from "react-bootstrap";
import { SearchResponseDto } from "../../models/SearchResponseDto";

export interface SearchResponseDivProps {
  searchResponse?: SearchResponseDto;
  performedSearchString: string;
}

const SearchResponseDiv: React.FC<SearchResponseDivProps> = (props) => {
  const GOOGLE_IMAGE_URL: string = `/images/google.png`;
  const BING_IMAGE_URL: string = `/images/bing.jpg`;

  const formatHitNumber = (nr: number) => {
    if (nr === 0) {
      return "Din sökning genererade inga sökträffar.";
    }

    if (nr >= 1000000) {
      const millions = Math.floor(nr / 1000000);
      return `${millions.toLocaleString()} M`;
    } else if (nr >= 100000) {
      const tenThousands = Math.floor(nr / 10000) * 10000;
      return tenThousands.toLocaleString();
    } else if (nr >= 10000) {
      const thousands = Math.floor(nr / 1000) * 1000;
      return thousands.toLocaleString();
    } else if (nr >= 1000) {
      const hundreds = Math.floor(nr / 100) * 100;
      return hundreds.toLocaleString();
    }

    return nr.toLocaleString();
  };

  const formatResponseTimeNumber = (nr: number): string => {
    if (nr < 1000) {
      return `${nr} ms`;
    } else {
      const seconds = (nr / 1000).toFixed(1);
      return `${seconds} sekunder`;
    }
  };

  return (
    <Row>
      <Col>
        {props.searchResponse && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <Table>
              <thead>
                {props.performedSearchString !== "" && (
                  <tr>
                    <th colSpan={2} style={{ textAlign: "center" }}>
                      <h5>"{props.performedSearchString}"</h5>
                    </th>
                  </tr>
                )}
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    Totalt antal sökträffar:{" "}
                    {formatHitNumber(props.searchResponse.totalSumOfHits)}
                  </td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td style={{ textAlign: "center", width: "50%" }}>
                    <Image
                      src={GOOGLE_IMAGE_URL}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                      {props.searchResponse.numberOfGoogleHits > 0 &&
                        formatHitNumber(
                          props.searchResponse.numberOfGoogleHits
                        )}
                    </div>
                  </td>
                  <td style={{ textAlign: "center", width: "50%" }}>
                    <Image
                      src={BING_IMAGE_URL}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                      {props.searchResponse.numberOfBingHits > 0 &&
                        formatHitNumber(props.searchResponse.numberOfBingHits)}
                    </div>
                  </td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Sökningen genererades på:{" "}
                    {formatResponseTimeNumber(
                      props.searchResponse.responseTime
                    )}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default SearchResponseDiv;
