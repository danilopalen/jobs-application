import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";

const MainContainer = styled.div`
  width: 150px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Label = styled.div`
  font-family: "Arial";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #000000;
  margin-bottom: 5px;
`;

const Button = styled.div`
  background: #ffffff;
  border: 1px solid #b7bdc4;
  border-radius: 3px;
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-family: "Arial";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.02em;
  color: #000000;
  box-sizing: border-box;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  width: calc(100% - 2px);
  height: auto;
  background: #ffffff;
  position: absolute;
  border: 1px solid #b7bdc4;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.32);
  border-radius: 3px;
  top: ${(props) => (props.label ? "56px" : "40px")};
`;

const DropdownItem = styled.div`
  cursor: pointer;
  padding: 12px 16px;
  font-size: 16px;
  font-family: "Arial";
  font-weight: 400;
  font-style: normal;
  line-height: 18px;
  letter-spacing: -0.02em;
  color: #000000;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #ccc;
  }
`;

function Select({ label, options, value, setValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectBox = useRef();
  const dropdown = useRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", onOpenDropdown);

    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", onOpenDropdown);
    };
  });

  const onOpenDropdown = (e) => {
    if (selectBox.current?.contains(e.target)) {
      // inside click
      setIsOpen((prev) => !prev);
      return;
    }
    if (dropdown.current?.contains(e.target)) {
      setIsOpen(true);
      return;
    }
    // outside click
    setIsOpen(false);
  };

  const handleSelectOption = (option) => {
    setValue(option);
    setIsOpen(false);
  };

  return (
    <MainContainer style={{ width: "150px", position: "relative" }}>
      <Label>{label}</Label>
      <Button ref={selectBox}>
        <span>{value || "Select"}</span>
        {isOpen ? <ArrowUp fill="#939CA7" /> : <ArrowDown fill="#939CA7" />}
      </Button>
      {isOpen && (
        <DropdownContainer ref={dropdown} label={label}>
          {options.map((option, i) => (
            <DropdownItem
              key={option + i}
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownContainer>
      )}
    </MainContainer>
  );
}

export default Select;
