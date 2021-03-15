import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import DeleteStream from "./components/streams/deleteStream";
import EditStream from "./components/streams/editStream";
import CreateStream from "./components/streams/createStream";
import ShowStream from "./components/streams/showStream";
import StreamList from "./components/streams/streamList";
import history from "./history";

function App() {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={CreateStream} />
            <Route path="/streams/edit/:id" exact component={EditStream} />
            <Route path="/streams/delete/:id" exact component={DeleteStream} />
            <Route path="/streams/:id" exact component={ShowStream} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
