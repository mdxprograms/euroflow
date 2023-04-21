import {
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { nanoid } from "nanoid";
import { create } from "zustand";

import { OscProps } from "./nodes/Osc";

export type State = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  updateNode: (id: OscProps["id"], data: OscProps["data"]) => void;
  onEdgesChange: OnEdgesChange;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AddEdge = { addEdge: (data: any) => void };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Create = State & AddEdge;

export const useStore = create<Create>((set, get) => ({
  nodes: [
    {
      id: "a",
      type: "osc",
      data: { frequency: 220, type: "sine" },
      position: { x: 0, y: 0 },
    },
    { id: "b", data: { label: "gain" }, position: { x: 50, y: 50 } },
    { id: "c", data: { label: "output" }, position: { x: -50, y: 100 } },
  ],
  edges: [],

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  updateNode(id, data) {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addEdge(data: any) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
  },
}));
