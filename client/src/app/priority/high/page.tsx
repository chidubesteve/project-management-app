import React from 'react'
import ReusablePriorityPage from '../reusablePriorityPage'
import { Priority } from '@/state/services/api'


const High = () => {
  return (
    <ReusablePriorityPage priority={Priority.high}/>
  )
}

export default High