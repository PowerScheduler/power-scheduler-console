import type { Graph } from "@antv/x6"

export const exportJSON = (graph: Graph) => {
  const graphCellData = graph.toJSON().cells
  const nodeId2ChildrenIds = getNodeChildrenMap(graph)
  graphCellData
    .filter((it) => it.shape === 'workflow-node')
    .forEach((it) => {
      it.data!!.workflowNodeCode = it.id
      it.data!!.workflowNodeChildCodes = nodeId2ChildrenIds.get(it.id!!) || []
    })
  return graphCellData
}

const getNodeChildrenMap = (graph: Graph) => {
  const edges = graph!!.getEdges()
  const map = new Map<string, string[]>()
  edges.forEach((edge) => {
    const sourceId = edge.getSourceCellId()
    const targetId = edge.getTargetCellId()
    if (map.has(sourceId)) {
      map.get(sourceId)!.push(targetId)
    } else {
      map.set(sourceId, [targetId])
    }
  })
  return map
}