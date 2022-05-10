import styled from "styled-components";

export const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items: ${(props) => (props.centeraligned ? "center" : "flex-start")};
  justify-content: ${(props) =>
    props.spaceBetween
      ? "space-between"
      : props.centered
      ? "center"
      : props.flexEnd
      ? "flex-end"
      : "flex-start"};
  margin-bottom: ${(props) => (props.marginBottom ? "10px" : 0)};
  margin-top: ${(props) => (props.marginTop ? "10px" : 0)};
`;

export const ButtonContainer = styled.div`
  color: ${(props) =>
    props.header ? "#000" : props.saveButton ? "#fff" : "rgb(113, 128, 147)"};
  font-size: ${(props) => (props.header ? "0.875rem" : "0.8125rem")};
  font-weight: ${(props) => (props.header ? "bold" : "normal")};
  border-radius: 3px;
  background: ${(props) => (props.saveButton ? "#009AC8" : "transparent")};
  padding: 10px 15px;
  font-family: "Arial";
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.saveButton ? "" : "rgba(0, 0, 0, 0.04)"};
  }
`;

export const TextArea = styled.textarea`
  padding: 5px 10px;
  border-radius: 3px;
  border: 1px solid #b7bdc4;
  font-size: 14px;
  font-family: Arial;
  line-height: 18px;
  letter-spacing: -0.02em;
  resize: vertical;
  width: -webkit-fill-available;
  color: #4b5b6d;
  &:focus {
    border: 1px solid #009ac8;
    outline: none;
  }
  &::placeholder {
    font-size: 14px;
    font-family: Arial;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: #000000;
    opacity: 0.5;
  }
`;

export const Input = styled.input`
  padding: 5px 10px;
  margin: 5px 0;
  border-radius: 3px;
  border: 1px solid #b7bdc4;
  font-size: 14px;
  font-family: Arial;
  line-height: 18px;
  letter-spacing: -0.02em;
  resize: vertical;
  flex: 1;
  color: #4b5b6d;
  &:focus {
    border: 1px solid #009ac8;
    outline: none;
  }
  &::placeholder {
    font-size: 14px;
    font-family: Arial;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: #000000;
    opacity: 0.5;
  }
`;
