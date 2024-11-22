import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/services/api";

const Low = () => {
  return <ReusablePriorityPage priority={Priority.low} />;
};

export default Low;
