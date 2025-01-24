'use client'

import React, { useState, useRef } from 'react'
import { debounce } from 'lodash'
import TextareaAutosize from 'react-textarea-autosize'

interface InputProps {
  initialValue: string
  projectId: string
}

const ProjectTitleInput: React.FC<InputProps> = ({
  initialValue,
  projectId,
}) => {
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const debouncedUpdateName = debounce(async (newValue: string) => {
    try {
      /* await updateProjectNameAction(newValue, projectId) */
    } catch (error) {
      console.log('Failed to update name', error)
      alert('Failed to update name')
    }
  }, 500)

  const onBlur = async () => {
    /* await updateProjectNameAction(value, projectId) */
  }

  const handleChange = (value: string) => {
    setValue(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      debouncedUpdateName(value)
      inputRef.current?.blur()
    }
  }

  return (
    <div className=" flex justify-center items-center m-auto w-full text-4xl antialiased font-semibold truncate">
      <TextareaAutosize
        ref={inputRef}
        onBlur={onBlur}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="overflow-x-auto text-center break-words resize-none focus:border-b-2 focus:ring-0 focus:ring-opacity-0 focus:outline-none"
        value={value}
      />
    </div>
  )
}

export default ProjectTitleInput
