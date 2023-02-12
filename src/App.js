import './App.css';
import Navbar from './layout/Navbar/Navbar';
// import Footer from './layout/Footer/Footer';
import Bank from "./pages/bank/components/Bank";
import Account from './pages/account/components/Account';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/not-found/components/NotFound';
import Login from './pages/authentication/Login';

function App() {
  const appName = "RBI"

  return (
    <>
      <Navbar appName={appName} />
      <Routes>

        <Route index path='/login' element={<Login />} />

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
