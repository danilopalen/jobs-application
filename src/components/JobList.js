import React from "react";
import styled from "styled-components";
import Job from "./Job";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  padding: 50px;
`;

function JobList({ jobs, updateDetails }) {
  return (
    <Styles>
      {jobs.map((job) => (
        <Job key={job.id} job={job} updateDetails={updateDetails} />
      ))}
    </Styles>
  );
}

export default JobList;
