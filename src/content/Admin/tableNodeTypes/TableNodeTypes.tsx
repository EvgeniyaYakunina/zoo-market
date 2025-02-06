import React, { useState } from 'react'
import '../admin.css'
import { Button } from '@/components'
import { useGetAllNodeTypesQuery, useRemoveNodeTypeMutation } from '@/services/nodeTypes/nodeType'
import { NodeType } from '@/content/Admin/tableNodeTypes/nodeType/NodeType'
import { AddNodeType } from '@/content/Admin/tableNodeTypes/addNodeType/AddNodeType'

export const TableNodeTypes = () => {
  const { data: nodeTypes, isLoading } = useGetAllNodeTypesQuery({})
  useRemoveNodeTypeMutation()
  const [isNewNodeType, setIsNewNodeType] = useState(false)

  if (isLoading) {
    return <div>Loading...</div>
  }
  const clickSaveNewNodeType = () => {
    setIsNewNodeType(false)
  }

  return (
    <div className={'container'}>
      <div className={'characteristicsBlock'}>
        <div className={'Title'}>
          <span>Название</span>
          <span>Описание</span>
        </div>

        <div className={'tablesBlock'}>
          {nodeTypes?.items.map(c => {
            return (
              <NodeType
                key={c.id}
                nodeType={c}
                // setCharacterId={setCharacterId}
                // setIsView={setIsView}
              />
            )
          })}
          {isNewNodeType ? (
            <AddNodeType clickSaveNewNodeType={clickSaveNewNodeType} />
          ) : (
            <Button onClick={() => setIsNewNodeType(true)}>Добавить</Button>
          )}
        </div>
      </div>
    </div>
  )
}
