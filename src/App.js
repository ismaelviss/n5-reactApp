import logo from './logo.svg';
import './App.css';
import PermissionsList from './components/PermissionsList.js';
import PermissionAdd from './components/PermissionAdd';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Link, Stack, Divider } from '@mui/material';
import React, {useCallback} from 'react';
import PermissionUpdate from './components/PermissionUpdate';

function App() {
  
  
  return (
    
    <Router>
      <div className="App">
        <h1>Lista de permisos</h1>
        <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />} justifyContent="center" alignItems="center">
          <Link href="/" underline="hover" variant="button">Permisos</Link>
          <Link href="/create" underline="hover" variant="button">Solicitar permiso</Link>
        </Stack>
        <br />
        
        <Routes>
          <Route exact path='/' element={<PermissionsList />}></Route>
          <Route exact path='/create' element={<PermissionAdd />}></Route>
          <Route exact path='/update/:id' element={<PermissionUpdate />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
