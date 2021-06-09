import { HashRouter, Route } from "react-router-dom";
import Navigation from "./routes/Navigation";
import Home from "./routes/Home";
import Calculation from "./routes/Calculation";
import Inquiry from "./routes/Inquiry";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route path="/calculation" component={Calculation} />
      <Route path="/inquiry" component={Inquiry} />
    </HashRouter>
  );
}

export default App;