import React, { useState } from "react";
import Modal from "../Modal";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Comment = {
  id: number;
  text: string;
  userId: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
};
const CommentModal = ({ isOpen, onClose, comments }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalComments = comments.length;
    const currentComment = comments[currentIndex];
    
    if (!comments || totalComments === 0) return;

  const handleNext = () => {
    if (currentIndex < totalComments - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
    };
    
      const commentStyles =
    "w-full rounded border border-gray-300 p-2 my-3 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Comments">
      <div className="p-4">
        <p className="mb-2 text-base dark:text-gray-200">
          Comment {currentIndex + 1} of {totalComments}
        </p>
        <div className="text-base dark:text-neutral-500">
          Comment:
          <br />
          <p className={commentStyles}>{currentComment?.text}</p>
        </div>
        <div className="text-base dark:text-neutral-500">
          By:
          <br />
          <p className={commentStyles}>User - {currentComment?.userId}</p>
        </div>
        <div className="mt-4 flex justify-between">
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="text-green-primary hover:text-green-600"
              title="Previous Comment"
            >
              <ArrowLeft />
            </button>
          )}
          {currentIndex < totalComments - 1 && (
            <button
              onClick={handleNext}
              className="text-green-primary hover:text-green-600"
              title="Next Comment"
            >
              <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
