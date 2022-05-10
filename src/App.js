import { useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Job from "./components/Job";
import JobList from "./components/JobList";
import Select from "./components/Select";
import { FlexContainer } from "./components/Styled-components";

const JOBS = [
  {
    id: "JOB-3989300",
    status: "completed",
    creationDate: new Date("May 05, 2022 03:24:00"),
    clientName: "John Doe",
    clientContact: "021 123 4567",
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: "JOB-1989301",
    status: "active",
    creationDate: new Date("May 02, 2022 03:24:00"),
    clientName: "Jane Doe",
    clientContact: "021 123 4567",
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: "JOB-0979321",
    status: "to priced",
    creationDate: new Date("May 03, 2022 03:24:00"),
    clientName: "Danilo Palen",
    clientContact: "021 123 4567",
    notes: "",
  },
];

const NEWJOB = {
  id: `JOB-${Math.floor(Math.random() * 8999999 + 100000)}`,
  status: "",
  creationDate: new Date(),
  clientName: "",
  clientContact: "",
  notes: "",
};

const FILTEROPTIONS = [
  "Scheduled",
  "Active",
  "Invoicing",
  "To priced",
  "Completed",
  "None",
];

const SORTOPTIONS = ["Job number", "Date"];

const FilterContainer = styled.div`
  margin-top: 20px;
  margin-right: 25px;
  display: flex;
`;

const NewJobContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  padding: 50px;
`;

function App() {
  const [initialJobs, setInitialJobs] = useState(JOBS);
  const [jobs, setJobs] = useState(JOBS);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [isCreatingNewJob, setIsCreatingNewJob] = useState(false);

  const onSelectSortOption = (option) => {
    setSortBy(option);
    if (option === "Job number") {
      setJobs(
        initialJobs.sort((a, b) =>
          a.id.localeCompare(b.id, "en", { numeric: true })
        )
      );
    }
    if (option === "Date") {
      setJobs(
        initialJobs.sort(
          (a, b) => new Date(a.creationDate) - new Date(b.creationDate)
        )
      );
    }
  };

  const onSelectFilterOption = (option) => {
    setFilterBy(option);
    if (option === "None") {
      setJobs(initialJobs);
    } else {
      setJobs(initialJobs.filter((job) => job.status === option.toLowerCase()));
    }
  };

  const onCreateNewJob = () => setIsCreatingNewJob(true);

  const updateDetails = (obj) => {
    setJobs((prev) =>
      prev.map((el) => {
        if (el.id === obj.updatedId) {
          return { ...el, [obj.updatedKey]: obj.updatedValue };
        } else {
          return el;
        }
      })
    );
    setInitialJobs((prev) =>
      prev.map((el) => {
        if (el.id === obj.updatedId) {
          return { ...el, [obj.updatedKey]: obj.updatedValue };
        } else {
          return el;
        }
      })
    );
  };

  const closeNewJob = () => setIsCreatingNewJob(false);

  const saveNewJob = (obj) => {
    setJobs((prev) => [obj, ...prev]);
    setInitialJobs((prev) => [obj, ...prev]);
  };

  return (
    <div>
      <Header onClick={onCreateNewJob} />
      <FlexContainer marginTop flexEnd>
        {!isCreatingNewJob && (
          <FilterContainer>
            <Select
              label="Sort by"
              options={SORTOPTIONS}
              value={sortBy}
              setValue={onSelectSortOption}
            />
            <Select
              label="Filter by"
              options={FILTEROPTIONS}
              value={filterBy}
              setValue={onSelectFilterOption}
            />
          </FilterContainer>
        )}
      </FlexContainer>
      {isCreatingNewJob ? (
        <NewJobContainer>
          <Job
            job={NEWJOB}
            updateDetails={updateDetails}
            newJob
            closeNewJob={closeNewJob}
            saveNewJob={saveNewJob}
          />
        </NewJobContainer>
      ) : (
        <JobList jobs={jobs} updateDetails={updateDetails} />
      )}
    </div>
  );
}

export default App;
