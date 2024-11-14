"use client";

import FetchingError from "@/components/DataFetching/FetchingError";
import FetchingState from "@/components/DataFetching/FetchingState";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/state/services/api";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchQuery, { skip: searchQuery.length < 3 });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    500,
  );

  useEffect(() => {
    handleSearch.cancel;
  }, [handleSearch.cancel]);
  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border bg-transparent p-3 text-lg placeholder-gray-500 shadow dark:text-white dark:placeholder-white"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <FetchingState />}
        {isError && (
          <FetchingError message="Error occurred while fetching search results" />
        )}
        {!isLoading && !isError && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks.length > 0 && (
              <h2 className="mb-3 text-lg font-semibold dark:text-white">
                Tasks
              </h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {searchResults.projects && searchResults.projects.length > 0 && (
              <h2 className="mb-3 text-lg font-semibold dark:text-white">
                Projects
              </h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {searchResults.users && searchResults.users.length > 0 && (
              <h2 className="mb-3 text-lg font-semibold dark:text-white">
                Users
              </h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
