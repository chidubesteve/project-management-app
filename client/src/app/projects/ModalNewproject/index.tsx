import Modal from "@/components/Modal";
import { useCreateProjectMutation } from "@/state/services/api";
import { formatISO } from "date-fns";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading, error }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("");
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "date",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "date",
    });

    const projectData: any = {
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    if (userId) {
      projectData.userId = Number(userId);
    }

    try {
      await createProject(projectData);
      setAlert({ type: "success", message: "Project created successfully!" });
      setProjectName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setUserId("");
    } catch (error) {
      console.error(error);
      setAlert({
        type: "error",
        message: "Failed to create project. Please try again.",
      });
    }
  };

  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      {/* Alert for Success/Error Messages */}
      {alert && (
        <Alert
          severity={alert.type}
          onClose={() => setAlert(null)}
          className="mb-4"
        >
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          {alert.message}
        </Alert>
      )}

      <form
        action="submit"
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          name="projectName"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            name="startDate"
            className={inputStyles}
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            name="endDate"
            className={inputStyles}
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <input
          type="number"
          name="userId"
          className={inputStyles}
          placeholder="User Id (Optional)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border-transparent bg-green-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
