import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Styles = styled.div`
  max-width: 100%;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  background-color: transparent;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  font-size: 1.25rem;
  font-family: "Arial";
  font-weight: "bold";
`;

function Header({ onClick }) {
  return (
    <Styles>
      <span>Jobs</span>
      <Button text="NEW JOB" header onClick={onClick} />
    </Styles>
  );
}

export default Header;
