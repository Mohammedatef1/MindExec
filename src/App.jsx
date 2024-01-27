import Nav from "./components/Nav";
// eslint-disable-next-line no-unused-vars
import { Home, Landing, LeftFrame, Login, MindMap, RightFrme, Signup } from "./sections/section";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

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
    <Router basename="/MindExec">
      <Switch>
        <Route
          path="/"
          exact
          className="transition-curtain"
          component={Landing}
        />
        <Route
          path="/home"
          component={Home}
          className="transition-curtain"
        />
        <Route
          path="/login"
          component={Login}
          className="transition-curtain"
        />
        <Route
          path="/signup"
          component={Signup}
          className="transition-curtain"
        />
        <Route
          path="/editor"
          component={Editor}
          className="transition-curtain"
        />
      </Switch>
    </Router>
  </AppProvider>
);
export default App;
