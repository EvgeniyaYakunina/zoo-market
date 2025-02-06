import React, { useState } from 'react'
import { Button } from '@/components'
import { useRemoveNodeTypeMutation } from '@/services/nodeTypes/nodeType'
import { nodeType } from '@/services/nodeTypes/nodeTypes.type'
import { EditNodeType } from '@/content/Admin/tableNodeTypes/editNodeType/EditNodeType'

type Props = {
  nodeType: nodeType
}

export const NodeType = ({ nodeType }: Props) => {
  const [removeNodeType, { isLoading: isLoadingRemoveNode }] = useRemoveNodeTypeMutation()
  const [editMode, setEditMode] = useState(false)

  const removeNodeTypeHandler = () => {
    removeNodeType(nodeType.id)
  }
  const doubleClick = () => {
    setEditMode(true)
  }

  return (
    <>
      {editMode ? (
        <EditNodeType nodeType={nodeType} setEditMode={setEditMode} />
      ) : (
        <div className={'tables'} key={nodeType.id}>
          <div className={'table pointer'} onDoubleClick={doubleClick}>
            {nodeType.type}
          </div>
          <div className={'table pointer'} onDoubleClick={doubleClick}>
            <span className={'hidden'}>{nodeType.description}</span>
          </div>
          <Button onClick={removeNodeTypeHandler} disabled={isLoadingRemoveNode}>
            X
          </Button>
        </div>
      )}
    </>
  )
}
