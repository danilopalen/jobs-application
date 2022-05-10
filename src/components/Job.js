import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Select from "./Select";
import { FlexContainer, Input, TextArea } from "./Styled-components";

const JobContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 16px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-bottom: 20px;
  border-radius: 3px;
  color: rgba(0, 0, 0, 0.87);
  background-color: #fff;
  cursor: pointer;
`;

const Status = styled.div`
  background: ${(props) =>
    props.status.toLowerCase() === "active"
      ? "#01C853"
      : props.status.toLowerCase() === "invoicing"
      ? "#FFCC00"
      : props.status.toLowerCase() === "to priced"
      ? "#DC1F22"
      : "#009AC8"};
  padding: 4px 6px 3px;
  border-radius: 3px;
  width: fit-content;
  color: ${(props) =>
    props.status.toLowerCase() === "active" ||
    props.status.toLowerCase() === "invoicing"
      ? "#000"
      : "#fff"};
  height: 36px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const Heading = styled.div`
  font-family: "Arial";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const Label = styled.div`
  font-family: "Arial";
  font-size: 14px;
  font-weight: ${(props) => (props.value ? "normal" : "bold")};
  line-height: 18px;
  display: flex;
  align-items: center;
  color: #4b5b6d;
`;

const formatDate = (dateTime) => {
  const creationDate = new Date(dateTime);
  const date = `${creationDate.getDate()}/${
    creationDate.getMonth() + 1
  }/${creationDate.getFullYear()}`;
  const time = creationDate.getHours() + ":" + creationDate.getMinutes();
  return date + " " + time;
};

const STATUSOPTIONS = [
  "scheduled",
  "active",
  "invoicing",
  "to priced",
  "completed",
];

function Job({ job, updateDetails, newJob, closeNewJob, saveNewJob }) {
  const [showMore, setShowMore] = useState(newJob ? true : false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [clientName, setClientName] = useState(job.clientName);
  const [clientContact, setClientContact] = useState(job.clientContact);
  const [notes, setNotes] = useState(job.notes);
  const [status, setStatus] = useState(job.status);
  const dateTime = formatDate(job.creationDate);
  const textArea = useRef();

  const handleClick = () => {
    if (newJob) return;
    setShowMore((prev) => !prev);
  };

  const onEditNotes = () => {
    const end = notes.length;
    setTimeout(() => {
      textArea.current.setSelectionRange(end, end);
      textArea.current.focus();
    }, 10);
    setIsEditing(true);
  };

  const onSaveNotes = () => {
    setIsEditing(false);
    updateDetails({
      updatedId: job.id,
      updatedKey: "notes",
      updatedValue: notes,
    });
  };

  const onUpdateNotes = (e) => {
    const input = e.target.value;
    setNotes(input);
  };

  const onUpdateClientName = (e) => {
    const input = e.target.value;
    setClientName(input);
  };

  const onUpdateClientContact = (e) => {
    const input = e.target.value;
    setClientContact(input);
  };

  const onEditStatus = () => setIsEditingStatus(true);

  const onUpdateStatus = (option) => {
    setStatus(option);
  };

  const onSaveStatus = () => {
    setIsEditingStatus(false);
    updateDetails({
      updatedId: job.id,
      updatedKey: "status",
      updatedValue: status,
    });
  };

  const onSaveNewJob = () => {
    saveNewJob({ ...job, status, clientName, clientContact, notes });
    closeNewJob();
  };

  return (
    <JobContainer onClick={handleClick}>
      <FlexContainer spaceBetween centeraligned>
        <Heading>{job.id}</Heading>
        {isEditingStatus || newJob ? (
          <div onClick={(e) => e.stopPropagation()}>
            <Select
              options={STATUSOPTIONS}
              value={status}
              setValue={onUpdateStatus}
            />
          </div>
        ) : (
          status && <Status status={status}>{status}</Status>
        )}
      </FlexContainer>
      {showMore && (
        <>
          <FlexContainer centeraligned>
            <Label>Creation date and time&nbsp;</Label>
            <Label value>{dateTime}</Label>
          </FlexContainer>
          <FlexContainer centeraligned>
            <Label>Client name&nbsp;</Label>
            {newJob ? (
              <Input
                type="text"
                value={clientName}
                onChange={onUpdateClientName}
              />
            ) : (
              <Label value>{clientName}</Label>
            )}
          </FlexContainer>
          <FlexContainer centeraligned>
            <Label>Contact&nbsp;</Label>
            {newJob ? (
              <Input
                type="text"
                value={clientContact}
                onChange={onUpdateClientContact}
              />
            ) : (
              <Label value>{clientContact}</Label>
            )}
          </FlexContainer>
          <FlexContainer
            marginBottom
            column
            onClick={(e) => e.stopPropagation()}
          >
            <Label>Notes&nbsp;</Label>
            {isEditing || newJob ? (
              <TextArea
                rows="10"
                type="text"
                value={notes}
                ref={textArea}
                placeholder="Comments, progress etc."
                onChange={onUpdateNotes}
              />
            ) : (
              <Label value>{notes}</Label>
            )}
          </FlexContainer>
          <FlexContainer onClick={(e) => e.stopPropagation()} flexEnd>
            {newJob ? (
              <>
                <Button text="cancel" onClick={closeNewJob} />
                <div style={{ marginLeft: "10px" }}>
                  <Button saveButton text="save" onClick={onSaveNewJob} />
                </div>
              </>
            ) : (
              <>
                {notes && !isEditing && (
                  <Button text="edit notes" onClick={onEditNotes} />
                )}
                {!notes && !isEditing && (
                  <Button text="add notes" onClick={onEditNotes} />
                )}
                {notes && isEditing && (
                  <Button saveButton text="save notes" onClick={onSaveNotes} />
                )}
                <div style={{ marginLeft: "10px" }}>
                  {isEditingStatus ? (
                    <Button
                      saveButton
                      text="save status"
                      onClick={onSaveStatus}
                    />
                  ) : (
                    <Button text="edit status" onClick={onEditStatus} />
                  )}
                </div>
              </>
            )}
          </FlexContainer>
        </>
      )}
    </JobContainer>
  );
}

export default Job;
