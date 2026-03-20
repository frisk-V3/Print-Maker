import { useEditorStore } from "../../core/store/useEditorStore";
import { BlockRenderer } from "./BlockRenderer";

export const EditorCanvas = () => {
  const blocks = useEditorStore((s) => s.blocks);

  return (
    <div className="page">
      {blocks.map((b) => (
        <BlockRenderer key={b.id} block={b} />
      ))}
    </div>
  );
};
