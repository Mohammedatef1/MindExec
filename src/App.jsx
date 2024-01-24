import Nav from "./components/Nav";
// eslint-disable-next-line no-unused-vars
import { Home, LeftFrame, Login, MindMap, RightFrme, Signup } from "./sections/section";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppProvider from "./AppProvider";

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

const App = () => (
  <AppProvider>
    <Home/>
  </AppProvider>
);
export default App;
