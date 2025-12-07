/* eslint-disable react/prop-types */
import { Container, Filter, CheckMark } from "./styles";

export default function PopUp({ closePopUp }) {
  return (
    <Filter>
      <Container on onClick={closePopUp}>
        <div className="center">
          <CheckMark>
            <i className="fa-solid fa-circle-check" />
          </CheckMark>
          <p>Reciclagem confirmada!</p>
        </div>
      </Container>
    </Filter>
  );
}
