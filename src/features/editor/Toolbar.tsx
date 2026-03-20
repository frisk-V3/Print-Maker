import { useEditorStore } from "../../core/store/useEditorStore";

export const Toolbar = () => {
  const addBlock = useEditorStore((s) => s.addBlock);

  return (
    <div>
      <button
        onClick={() =>
          addBlock({
            id: crypto.randomUUID(),
            type: "text",
            x: 50,
            y: 50,
            width: 200,
            height: 50,
            content: "テキスト",
          })
        }
      >
        テキスト追加
      </button>
    </div>
  );
};
