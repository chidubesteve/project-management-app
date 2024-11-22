import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/services/api";

const Medium = () => {
  return <ReusablePriorityPage priority={Priority.medium} />;
};

export default Medium;
