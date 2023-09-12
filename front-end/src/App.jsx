import axios from "axios";

import Routes from "./Routes";

import { UserContextProvider } from "./UserContext";

function App() {
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
