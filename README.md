# n5.view
## pagina web en react que permite administrar los permisos mediante la comunicación con un web Api:
* consultar permisos
* solicitar permisos
* actualizar permisos

## tecnologias usads
* react
* materia-ui
* router
* axios
* docker
* yarn

## Para levantar el proyecto se debe realizar los siguientes pasos
#### clonar el proyecto
`git clone https://github.com/ismaelviss/n5-reactApp.git`
#### Instalar dependencias
`yarn install`
#### Levantar el proyecto
`npm start`

## Se puede levantar todo el proyecto ejecutando el archivo docker-compose.yml que se encuenta en: https://github.com/ismaelviss/n5-webapi.git
#### clonarl el proyecto
`git clone https://github.com/ismaelviss/n5-webapi.git`
#### ingresar a la carpeta donde se clono el repositorio y ejcutar el siguiente comando
`docker compose up -d`

finalmente se levanta el proyecto en `http://localhost:8000/`


## Imagenes del proyecto
### lista de permisos
![consulta](https://raw.githubusercontent.com/ismaelviss/n5-reactApp/master/stuff/consulta_permisos.png)

### Pantalla de solicitar permiso
![solicitar](https://raw.githubusercontent.com/ismaelviss/n5-reactApp/master/stuff/solicitar_permiso.png)

### Pantalla de solicitar permiso
![solicitar](https://raw.githubusercontent.com/ismaelviss/n5-reactApp/master/stuff/solicitar_permiso.png)

### Pantalla de permiso creado
![creado](https://raw.githubusercontent.com/ismaelviss/n5-reactApp/master/stuff/crear_permisos.png)

### Pantalla de actualizar permiso
![creado](https://raw.githubusercontent.com/ismaelviss/n5-reactApp/master/stuff/actualizar_permiso.png)

### Pantalla de permiso actualizado
![creado](https://raw.githubusercontent.com/ismaelviss/n5-reactApp/master/stuff/actualizar_exito.png)
