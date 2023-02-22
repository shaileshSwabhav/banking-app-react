import './App.css';
import Bank from "./pages/bank/components/Bank";
import Account from './pages/account/components/Account';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './pages/not-found/components/NotFound';
import Login from './pages/authentication/Login';
import { Customer } from './pages/customer/components/Customer';
import Transaction from './pages/account/components/Transaction';
import Logout from './pages/logout/Logout';

function App() {

  return (
    <>
      <Routes>
        {/* specify default route */}
        <Route path='' element={<Navigate to="/login" />}></Route>

        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />

        <Route path='/banks'>
          <Route index element={<Bank />} />
          <Route path=':bankID/accounts' element={<Account />} />
        </Route>

        <Route path='/accounts' element={<Account />} />
        <Route path='/accounts/:accountID/transactions' element={<Transaction />} />
        <Route path='/customers' element={<Customer />} />
        <Route path='/customers/:accountID/transactions' element={<Transaction />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
