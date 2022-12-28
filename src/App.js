import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Main from "./pages/main/Main";

/**
 * App wrapper.
 */
const App = () => {

  return (
    <div id="wrapper">
      <ReactNotifications />
      <Main />
    </div>
  );
}

export default App;