import { create } from "zustand";
import { Block } from "../models/Block";

interface EditorState {
  blocks: Block[];
  addBlock: (block: Block) => void;
  updateBlock: (id: string, partial: Partial<Block>) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  blocks: [],

  addBlock: (block) =>
    set((state) => ({
      blocks: [...state.blocks, block],
    })),

  updateBlock: (id, partial) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id ? { ...b, ...partial } : b
      ),
    })),
}));
