import React from "react";
import { ButtonContainer } from "./Styled-components";

function Button({ header, text, onClick, saveButton }) {
  return (
    <ButtonContainer header={header} onClick={onClick} saveButton={saveButton}>
      {text}
    </ButtonContainer>
  );
}

export default Button;
