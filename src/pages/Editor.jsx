import { useRef } from "react";
import LeftFrame from "../components/layout/LeftFrame";
import MindMap from "../components/layout/MindMap";
import Nav from "../components/layout/Nav";
import RightFrame from "../components/layout/RightFrame";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { X } from "lucide-react";

const Editor = () => {

  const leftFrameRef = useRef()

  const layoutChangeHandler = (sizes) => {
    
    

  }

  return (
    <main className="max-h-screen overflow-hidden">
      <Nav />
      <section className="w-full h-[calc(100vh-81px)]">
        <PanelGroup autoSaveId="mindExecEditor" direction="horizontal" onLayout={layoutChangeHandler}>
          <Panel collapsible collapsedSize={0} ref={leftFrameRef} defaultSize={25} minSize={15} maxSize={25}>
            <div className="min-w-64 relative h-full">
              <button onClick={() => {
                leftFrameRef.current.collapse()
              }} className="absolute top-2 left-2">
                <X />
              </button>
              <LeftFrame />
            </div>
          </Panel>

          <PanelResizeHandle className="w-px bg-primary-light !cursor-col-resize" />

          <Panel defaultSize={50} minSize={50} >
            <div className="relative h-full">
              <MindMap />
            </div>
          </Panel>

          <PanelResizeHandle className="w-px bg-primary-light !cursor-col-resize" />

          <Panel defaultSize={25} minSize={15} maxSize={25}>
            <div className="relative h-full">
              <RightFrame />
            </div>
          </Panel>
        </PanelGroup>
      </section>
    </main>
  );
};

export default Editor;
