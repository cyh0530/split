import ReactGA from "react-ga";
import Manual from "./Manual";

ReactGA.initialize("G-7RV8JZXMCF");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
    return <Manual />
}

export default App;
