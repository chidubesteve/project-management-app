import React from 'react'
import ReusablePriorityPage from '../reusablePriorityPage'
import { Priority } from '@/state/services/api'


const BackLog = () => {
  return (
    <ReusablePriorityPage priority={Priority.backLog}/>
  )
}

export default BackLog