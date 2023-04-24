import ReactGA from "react-ga";
import CustomTheme from "./theme/createTheme";
import { Router } from "./router";

ReactGA.initialize("G-7RV8JZXMCF");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <CustomTheme>
      <Router />
    </CustomTheme>
  );
}

export default App;
