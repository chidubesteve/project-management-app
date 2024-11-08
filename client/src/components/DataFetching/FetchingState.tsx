import { CircularProgress } from '@mui/material'
import React from 'react'

const FetchingState = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <CircularProgress size={"3.5rem"} className='text-green-500 dark:text-green-600' />
    </div>
  );
}

export default FetchingState