import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListUser from './pages/ListUser'
import AddOrEditUser from './pages/AddOrEditUser';


function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" >
            <ListUser />
          </Route>
          <Route exact key='edit' path="/user/:userId" >
            <AddOrEditUser />
          </Route>
          <Route exact key='add' path="/user" >
            <AddOrEditUser />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
