"use client"

import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'
import Board from '../BoardView'
import List from '../ListView'
import Timeline from '../Timeline'

type Props = {
    params: {
        id: string
    }
}

const Project = ({ params }: Props) => {
    const { id } = params
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false)

  return (
      <div>
          {/* new task */}
          <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "Board" && <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />}
          {activeTab === "List" && <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />}
          {activeTab === "Timeline" && <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />}
    </div>
  )
}

export default Project