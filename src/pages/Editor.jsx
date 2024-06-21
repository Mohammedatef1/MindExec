import LeftFrame from "../components/layout/LeftFrame";
import MindMap from "../components/layout/MindMap";
import Nav from "../components/layout/Nav";
import RightFrme from "../components/layout/RightFrame";

const Editor = () => (
  <main className="max-h-screen overflow-hidden">
    <Nav />
    <section className="w-full flex h-[calc(100vh-72px)]">
      <LeftFrame />
      <MindMap />
      <RightFrme />
    </section>
  </main>
);

export default Editor;
