"use client"

import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'
import Board from '../BoardView'

type Props = {
    params: {
        id: string
    }
}

const Project = ({ params }: Props) => {
    const { id } = params
    console.log(id)
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false)

  return (
      <div>
          {/* new task */}
          <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "Board" && <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />}
    </div>
  )
}

export default Project