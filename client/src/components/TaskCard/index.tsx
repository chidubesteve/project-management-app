import { Task } from "@/state/services/api";
import { formatDateToLocalTime } from "@/utils/dateFormater";
import Image from "next/image";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow-md dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments: </strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`https://project-mgt-s3-images-bucket.s3.us-east-1.amazonaws.com/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName || "Task Attachment"}
                width={400}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}
      <p>
        <strong>ID: </strong>
        {task.id}
      </p>
      <p>
        <strong>Title: </strong>
        {task.title}
      </p>
      <p>
        <strong>Description: </strong>
        {task.description || "No description provided"}
      </p>
      <p>
        <strong>Status: </strong>
        {task.status}
      </p>
      <p>
        <strong>Priority: </strong>
        {task.priority}
      </p>
      <p>
        <strong>Tags: </strong>
        {task.tags || "No tags available"}
      </p>
      <p>
        <strong>Start Date: </strong>
        {task.startDate ? formatDateToLocalTime(task.startDate) : "Not set"}
      </p>
      <p>
        <strong>Due Date: </strong>
        {task.dueDate ? formatDateToLocalTime(task.dueDate) : "Not set"}
      </p>
      <p>
        <strong>Author: </strong>
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p>
        <strong>Assignee: </strong>
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
    </div>
  );
};

export default TaskCard;
