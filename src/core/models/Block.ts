export type BlockType = "text" | "image" | "line";

export interface Block {
  id: string;
  type: BlockType;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
}
