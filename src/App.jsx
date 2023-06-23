import { createContext, useState } from "react";
import Routes from './routes'
import { ToastContainer } from 'react-toastify';
import './App.scss'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'antd/dist/reset.css';
export const UserContext = createContext();

function App() {
  const [isLoggedIn, setLogin] = useState(false)
  const [collapsed, setCollapsed] = useState(true);
  const [marketplaces, setMarketplaces] = useState([])
  const [marketplace, setMarketplace] = useState('')
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    error: "",
  });

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setLogin, userData, setUserData, collapsed, setCollapsed, marketplaces, setMarketplaces, marketplace, setMarketplace }}
    >
      <>
        <Routes/>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </>
    </UserContext.Provider>
  );
}

export default App;