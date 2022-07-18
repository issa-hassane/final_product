import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Filter from "./Filter";
import Home from "./Home";
import Overview from "./Overview";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/filter">
            <Filter />
          </Route>
          <Route path="/overview">
            <Overview />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
export default App;
