import { Button } from '@/components'
import React, { ChangeEvent, useState } from 'react'
import { useCreateNodeTypeMutation } from '@/services/nodeTypes/nodeType'

type Props = {
  clickSaveNewNodeType: () => void
}

export const AddNodeType = ({ clickSaveNewNodeType }: Props) => {
  const [createNodeType, { isLoading }] = useCreateNodeTypeMutation()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<null | string>(null)

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const changeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value)
  }

  const submitBtn = () => {
    if (title.length > 0) {
      createNodeType({ type: title, description: description }).then(() => {
        clickSaveNewNodeType()
      })
    }
    clickSaveNewNodeType()
  }

  return (
    <div className={'tables'}>
      <div className={'table'}>
        <input type="text" value={title} onChange={e => changeTitle(e)} />
      </div>
      <div className={'table'}>
        <input type="text" value={description || ''} onChange={e => changeDescription(e)} />
      </div>
      <Button variant={'secondary'} onClick={submitBtn} disabled={isLoading}>
        A
      </Button>
    </div>
  )
}
