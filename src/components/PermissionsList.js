import React from 'react';
import axios from 'axios';
import Moment from 'moment';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Link, Button } from '@mui/material';

const baseURL = process.env.REACT_APP_API_URL;

export default function PermissionsList() {
  const [permissions, setPermissions] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL + "permission").then((response) => {
      if (response.status === 200)
        setPermissions(response.data);
    });
  }, []);

  Moment.locale('es');

  if (!permissions) return "No existen permisos";

  return (


    <TableContainer>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Nombre Empleado</TableCell>
            <TableCell>Apellido Empleado</TableCell>
            <TableCell>Id Tipo Permiso</TableCell>
            <TableCell>Tipo Permiso</TableCell>
            <TableCell>Fecha de Permiso</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {permissions.map((row) => (
          <TableRow hover key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{row.id}</TableCell>
            <TableCell>{row.employeeName}</TableCell>
            <TableCell>{row.employeeLastName}</TableCell>
            <TableCell>{row.permissionTypeId}</TableCell>
            <TableCell>{row.permissionType.description}</TableCell>
            <TableCell>{Moment(row.permissionDate).format("YYYY-MM-DD - HH:mm:ss GMT")}</TableCell>
            <Button component={Link} href={"/update/" + row.id}>Actualizar</Button>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}