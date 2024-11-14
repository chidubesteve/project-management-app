import { Project } from "@/state/services/api";
import { formatDateToLocalTime } from "@/utils/dateFormater";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="mb-3 rounded p-4 shadow dark:bg-dark-secondary dark:text-white">
      <h3>
        <strong>Name: </strong>
        {project.name}
      </h3>
      <p>
        {" "}
        <strong>Description: </strong>
        {project.description}
      </p>
      <p>
        <strong>Start Date: </strong>{" "}
        {project.startDate ? formatDateToLocalTime(project.startDate) : "N/A"}
      </p>
      <p>
        <strong>End Date: </strong>{" "}
        {project.endDate ? formatDateToLocalTime(project.endDate) : "N/A"}
      </p>
    </div>
  );
};

export default ProjectCard;
