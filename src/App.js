import './App.css';
import Navbar from './layout/Navbar/Navbar';
// import Footer from './layout/Footer/Footer';
import Bank from "./pages/bank/components/Bank";
import Account from './pages/account/components/Account';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './pages/not-found/components/NotFound';
import Login from './pages/authentication/Login';
import { useEffect } from 'react';
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const appName = "Yess"
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isAuthenticated", 0)

  useEffect(() => {
    console.log(isAuthenticated);
  }, [])

  return (
    <>
      <Navbar appName={appName} />
      <Routes>
        {/* specify default route */}
        <Route path='' element={<Navigate to="/login" />}></Route>

        <Route path='/login' element={<Login />} />

        <Route path='/banks'>
          <Route index element={<Bank />} />
          <Route path=':bankID/accounts' element={<Account />} />
        </Route>

        <Route path='/accounts' element={<Account />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
