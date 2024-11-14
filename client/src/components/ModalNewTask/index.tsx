import Modal from "@/components/Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/services/api";
import { formatISO } from "date-fns";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const ModalNewTask = ({ isOpen, onClose, id }: Props) => {
  const [createTask, { isLoading, error }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.backLog);
  const [tags, setTags] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [lga, setLga] = useState("");
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async () => {
    if (!title || !authorUserId) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "date",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "date",
    });

    const taskData: any = {
      title,
      description,
      tags,
      priority,
      status,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      LGA: lga,
      projectId: Number(id),
    };

    try {
      await createTask(taskData);
      setAlert({ type: "success", message: "Task created successfully!" });
      setTitle("");
      setDescription("");
      setStartDate("");
      setDueDate("");
      setAssignedUserId("");
      setAuthorUserId("");
      setStatus(Status.ToDo);
      setPriority(Priority.backLog);
      setTags("");
      setLga("");
    } catch (error) {
      console.error(error);
      setAlert({
        type: "error",
        message: "Failed to create Task. Please try again.",
      });
    }
  };

  const isFormValid = () => {
    return title && authorUserId;
  };

  const selectStyles = `mb-4 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none`;

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
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
          name="title"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            name=""
            id=""
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="" selected>Select Priority</option>
            <option value={Priority.low}>Low</option>
            <option value={Priority.medium}>Medium</option>
            <option value={Priority.high}>High</option>
            <option value={Priority.urgent}>Urgent</option>
            <option value={Priority.backLog}>Backlog</option>
          </select>
          <select
            name=""
            id=""
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
            <option value={Status.Launch}>Launch</option>
          </select>
        </div>
        <input
          type="text"
          name="tags"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          name="authorUserId"
          className={inputStyles}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          name="assignedUserId"
          className={inputStyles}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />

        <select
          name=""
          id=""
          value={lga}
          onChange={(e) => setLga(e.target.value)}
          className={selectStyles}
        >
          <option value="">Select LGA</option>
          <option value="enugu-east">Enugu-East</option>
          <option value="enugu-west">Enugu-West</option>
          <option value="enugu-north">Enugu-North</option>
          <option value="enugu-south">Enugu-South</option>
        </select>
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
            name="dueDate"
            className={inputStyles}
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border-transparent bg-green-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
