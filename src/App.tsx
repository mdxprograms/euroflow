import ReactFlow, { Background } from "reactflow";
import { shallow } from "zustand/shallow";

import { AddEdge, State, useStore } from "./store";
import Osc from "./nodes/Osc";

const nodeTypes = {
  osc: Osc,
};

const selector = (store: State & AddEdge) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});

export default function App() {
  const store = useStore(selector, shallow);

  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onConnect={store.addEdge}
      fitView
    >
      <Background />
    </ReactFlow>
  );
}
