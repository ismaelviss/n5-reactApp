import axios from "axios";
import React from "react";
import { Button, Stack, Divider, TextField, Box, Grid, Select, MenuItem, InputLabel, FormControl, Modal, Typography } from '@mui/material';
import { BrowserRouter as Router, useParams } from "react-router-dom";

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

export default function PermissionUpdate() {
  var [permission, setPermission] = React.useState({
    employeeName: "",
    employeeLastName: "",
    permissionTypeId: 0
  });
  let { id } = useParams();
  const [permissionTypeId, setPermissionTypeId] = React.useState(0);
  const [permissionTypes, setPermissionTypes] = React.useState([]);
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [errorName, setErrorName] = React.useState({ band: false, errorText: "" });
  const [errorLastName, setErrorLastName] = React.useState({ band: false, errorText: "" });
  const [errorPermissionTypeId, setErrorPermissionTypeId] = React.useState({ band: false, errorText: "" });
  const [message, setMessage] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = (event) => {
    setOpen(false);
  }

  React.useEffect(() => {
    axios.get(`${baseURL}permission/` + id).then((response) => {
      if (response.status === 200) {
        setPermission(response.data);
        setName(response.data.employeeName);
        setLastName(response.data.employeeLastName);
        setPermissionTypeId(response.data.permissionTypeId)
      }
    });

    axios.get(`${baseURL}permissiontype`).then((response) => {
      if (response.status === 200)
        setPermissionTypes(response.data);
    });

  }, []);

  const handleChange = (event) => {
    setPermissionTypeId(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  function updatePermission() {

    var band = 0;
    if (name === null || name.length < 1) {
      setErrorName({ band: true, errorText: "datos incorrectos" })
      band++;
    }
    else {
      setErrorName({ band: false, errorText: "" })
    }

    if (lastName === null || lastName.length < 1) {
      setErrorLastName({ band: true, errorText: "datos incorrectos" })
      band++;
    }
    else {
      setErrorLastName({ band: false, errorText: "" })
    }

    if (permissionTypeId === null || permissionTypeId === 0) {
      setErrorPermissionTypeId({ band: true, errorText: "datos incorrectos" })
      band++;
    }
    else {
      setErrorPermissionTypeId({ band: false, errorText: "" })
    }

    if (band === 0) {
      axios
        .put(`${baseURL}permission/` + id, {
          employeeName: name,
          employeeLastName: lastName,
          permissionTypeId: permissionTypeId
        })
        .then((response) => {
          setOpen(true);
          if (response.status === 200) {
            setPermission(response.data);
            setMessage("Actualización con exito!");
          }
          else {
            setMessage("Ocurrio un error al actualizar")
          }
        });
    }
  }

  if (!permission || !permissionTypes) return "No existe el permiso o los tipos de permisos!"

  return (
    <Stack direction="column" spacing={2} divider={<Divider orientation="vertical" flexItem />} justifyContent="center" alignItems="center">
      <div>
        <h2>Actualizar permiso</h2>
        <br />
        <div>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <div>
              <TextField error={errorName.band} helperText={errorName.errorText} id="nameText" label="Nombre" variant="filled" value={name} onChange={handleChangeName} defaultValue="" />
              <TextField error={errorLastName.band} helperText={errorLastName.errorText} id="lastNameText" label="Apellido" variant="filled" value={lastName} onChange={handleChangeLastName} defaultValue="" />
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
          <Button variant="contained" onClick={updatePermission}>Actualizar permiso</Button>
          <br />
          <Modal
            disableEnforceFocus
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                {message}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </Stack>
  );
}