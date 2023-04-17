import ReactGA from "react-ga";
import Manual from "./Manual";
import { Scan } from "./Scan";
import CustomTheme from "./theme/createTheme";

ReactGA.initialize("G-7RV8JZXMCF");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <CustomTheme>
      <Scan />
    </CustomTheme>
  );
}

export default App;
