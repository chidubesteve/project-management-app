import React from 'react'
import ReusablePriorityPage from '../reusablePriorityPage'
import { Priority } from '@/state/services/api'


const Urgent = () => {
  return (
    <ReusablePriorityPage priority={Priority.urgent}/>
  )
}

export default Urgent