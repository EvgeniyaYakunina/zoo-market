import React, { ChangeEvent, useState } from 'react'
import { Button } from '@/components'
import { nodeType } from '@/services/nodeTypes/nodeTypes.type'
import { useUpdateNodeTypeMutation } from '@/services/nodeTypes/nodeType'

type Props = {
  nodeType: nodeType
  setEditMode: (bool: boolean) => void
}

export const EditNodeType = ({ nodeType, setEditMode }: Props) => {
  const [updateNodeType] = useUpdateNodeTypeMutation()

  const [title, setTitle] = useState(nodeType.type)
  const [description, setDescription] = useState(nodeType.description || '')
  const [isEdit, setIsEdit] = useState(false)
  const [isError, setIsError] = useState<null | string>(null)

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const changeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value)
  }
  const saveBtn = () => {
    if (description.length === 2 || description.length === 1) {
      setIsError('минимум три символа!')

      return
    }
    if (nodeType.type !== title || nodeType.description !== description) {
      setIsEdit(true)
      const desc = description.length > 2 ? description : null

      updateNodeType({ type: title, description: desc, id: nodeType.id }).then(() => {
        setEditMode(false)
        setIsEdit(false)
      })
    } else {
      setEditMode(false)
    }
  }

  return (
    <div className={'tables'} key={nodeType.id}>
      <div className={'table'}>
        <input type="text" value={title} onChange={e => changeTitle(e)} autoFocus />
      </div>
      <div className={'table'}>
        <input type={'text'} value={description} onChange={e => changeDescription(e)} />
        {isError && <span className={'errorMessage'}>{isError}</span>}
      </div>
      <Button variant={'secondary'} onClick={saveBtn} disabled={isEdit}>
        S
      </Button>
    </div>
  )
}
