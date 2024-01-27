import Nav from "./components/Nav";
// eslint-disable-next-line no-unused-vars
import { Home, Landing, LeftFrame, Login, MindMap, RightFrme, Signup } from "./sections/section";

import { Route, HashRouter as Router, Switch } from "react-router-dom";

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
          component={Landing}
        />
        <Route
          path="/home"
          component={Home}
        />
        <Route
          path="/login"
          component={Login}
        />
        <Route
          path="/signup"
          component={Signup}
        />
        <Route
          path="/editor"
          component={Editor}
        />
      </Switch>
    </Router>
  </AppProvider>
);
export default App;
