import React from 'react';
import axios from 'axios';
import { Button, Stack, Divider, TextField, Box, Grid, Select, MenuItem, InputLabel, FormControl, Modal, Typography } from '@mui/material';

const baseURL = process.env.REACT_APP_API_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function PermissionAdd() {
  const [permissionTypeId, setPermissionTypeId] = React.useState(0);
  const [permissionTypes, setPermissionTypes] = React.useState([]);
  const [name, setName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [errorName, setErrorName] = React.useState({ band: false, errorText: "" });
  const [errorLastName, setErrorLastName] = React.useState({ band: false, errorText: "" });
  const [errorPermissionTypeId, setErrorPermissionTypeId] = React.useState({ band: false, errorText: "" });

  const handleOpen = () => setOpen(true);
  const handleClose = (event) => {
    setOpen(false);
    setName("");
    setLastName("");
    setPermissionTypeId();
  }

  const handleChange = (event) => {
    setPermissionTypeId(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  React.useEffect(() => {
    axios.get(`${baseURL}permissiontype`).then((response) => {
      setPermissionTypes(response.data);
    });
  }, []);

  function createPermission() {
    var errors = 0;
    if (name === null || name.length < 1) {
      setErrorName({ band: true, errorText: "datos incorrectos" })
      errors++;
    }
    else {
      setErrorName({ band: false, errorText: "" })
    }

    if (lastName === null || lastName.length < 1) {
      setErrorLastName({ band: true, errorText: "datos incorrectos" })
      errors++;
    }
    else {
      setErrorLastName({ band: false, errorText: "" })
    }

    if (permissionTypeId === null || permissionTypeId === 0) {
      setErrorPermissionTypeId({ band: true, errorText: "datos incorrectos" })
      errors++;
    }
    else {
      setErrorPermissionTypeId({ band: false, errorText: "" })
    }

    if (errors === 0) {
      axios.post(`${baseURL}permission`, {
        employeeName: name,
        employeeLastName: lastName,
        permissionTypeId: permissionTypeId
      }, { headers: {} })
        .then((response) => {
          if (response.status === 201)
            setOpen(true);
        });
    }
  }
  
  if (!permissionTypes) return "No existen tipos de permisos!"

  return (

    <Stack direction="column" spacing={2} divider={<Divider orientation="vertical" flexItem />} justifyContent="center" alignItems="center">
      <h2>Agregar permiso</h2>
      <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off">

          <div>
            <TextField error={errorName.band} helperText={errorName.errorText} id="nameText" label="Nombre" variant="filled" value={name} onChange={handleChangeName} />
            <TextField error={errorLastName.band} helperText={errorLastName.errorText} id="lastNameText" label="Apellido" variant="filled" value={lastName} onChange={handleChangeLastName} />
          </div>
          <div>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="permissionTypeId-label">Tipo de permiso</InputLabel>
              <Select
                labelId="permissionTypeId-label"
                id="permissionTypeId"
                value={permissionTypeId}
                onChange={handleChange}
                error={errorPermissionTypeId.band}
                helperText={errorPermissionTypeId.errorText}>
                {
                  permissionTypes?.map((row) => (
                    <MenuItem value={row.id}>{row.description}</MenuItem>
                  ))
                }

              </Select>
            </FormControl>
          </div>

        </Box>

        <br />
        <br />
        <Button variant="contained" onClick={createPermission}>Crear permiso</Button>
        <br />
        <div>

          <Modal
            disableEnforceFocus
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                Se agrego de manera exitosa el permiso para el empleado {name}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </Stack>
  );
}