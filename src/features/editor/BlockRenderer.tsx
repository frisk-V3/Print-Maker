import { Block } from "../../core/models/Block";

export const BlockRenderer = ({ block }: { block: Block }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: block.x,
        top: block.y,
        width: block.width,
        height: block.height,
        border: "1px solid #ccc",
      }}
    >
      {block.type === "text" && <div>{block.content}</div>}
    </div>
  );
};
