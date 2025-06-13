import LeftFrame from "../components/layout/LeftFrame";
import MindMap from "../components/layout/MindMap";
import Nav from "../components/layout/Nav";
import RightFrame from "../components/layout/RightFrame";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const Editor = () => {

  return (
    <main className="max-h-screen overflow-hidden">
      <Nav />
      <section className="w-full h-[calc(100vh-81px)]">
        <PanelGroup  direction="horizontal">
          <Panel defaultSize={25} minSize={10} maxSize={25}>
            <div className="relative h-full">
              <LeftFrame />
            </div>
          </Panel>

          <PanelResizeHandle className="w-px bg-primary-light" />

          <Panel defaultSize={50} minSize={50} >
            <div className="relative h-full">
              <MindMap />
            </div>
          </Panel>

          <PanelResizeHandle className="w-px bg-primary-light" />

          <Panel defaultSize={25} minSize={10} maxSize={25}>
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
