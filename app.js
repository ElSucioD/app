window.onload = function() 
{
btnRegistrar = document.getElementById("btnRegistrar");
ingreso = document.getElementById("ingreso");
registro = document.getElementById("registro");
principal = document.getElementById("principal");
txtCorreo = document.getElementById("correoR");
txtNombre = document.getElementById("nombreR");
txtContrasena = document.getElementById("contrasenaR");
txtConfirmacion = document.getElementById("confirmacionR");
txtFecha = document.getElementById("fechaR");
btnRegistro = document.getElementById("btnRegistro");
btnIngresar = document.getElementById("btnIngresar");
nombreP = document.getElementById("nombreP");
mensajeM = document.getElementById("mensajeM");
correoM = document.getElementById("correoM");
photo = document.getElementById("photo");
camara = document.getElementById("camara");
abrir = document.getElementById("abrir");
redactar = document.getElementById("redactar");
Mensajes = document.getElementById("Mensajes");
correo = document.getElementById("correo");

if(localStorage.getItem("login") !== "1")
{
    ingreso.style.display = "block";
    principal.style.display = "none";
    redactar.style.display = "none";
    camara = document.getElementById("camara").style.display = "none";
}
else 
{
    ingreso.style.display = "none";
    principal.style.display = "block";
    redactar.style.display = "block";
    nombre = localStorage.getItem = ("nombre");
    correo = localStorage.getItem = ("correo");
    document.getElementById("nombreP").innerHTML = nombre;
}
}
btnRegistrar.addEventListener("click", function() 
{
    ingreso.style.display ="none";
    registro.style.display ="block";
});
btnregistro.addEventListener("click", function()
{
    if(txtCorreo.value == "") 
    {
    alert("debes ingresar tu correo");
    txtCorreo.classList.add("errorCampo");
    return false;
    }
    else {
        txtCorreo.classList.remove("errorCampo");
    }
    if(txtNombre.value == "")
    {
    alert("idebes ingresar tu nombre");
    return false;
    }
    else {
        txtNombre.classList.remove("errorCampo");
    }
    if(txtContrasena.value == "")
    {
    alert("debes ingresar una contraseña");
    return false;
    }
    else {
        txtContrasena.classList.remove("errorCampo");
    }
    if(txtConfirmacion.value == "")
    {
    alert("confirma tu contraseña");
    return false;
    }
    else {
        txtConfirmacion.classList.remove("errorCampo");
    }
    if(txtContrasena.value !==txtConfirmacion.value)
    {
        alert("no coincide la contraseña");
    return false;
    }
    if(txtFecha.value == "")
    {
    alert("la fecha no puede quedar en blanco");
    return false;
    }   
    let datos = new FormData ();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);

    fetch("http://tpaodcm.orgfree.com/registro.php",
    {
        method: 'POST', body: datos
    })

        .then(function(response)
        {
            if(response.ok)
            {
                alert("usuario registrado");
            }
            else{
                alert("ocurrio un error al registrarse");
                console.log(response);
            }
        })
        .catch(function(err)
        {
            alert("ocurrio un error inesperado");
            console.log(err);
        })

    });
    btnIngresar.addEventListener("click",function(){
        if(correo.value ==""){
            alert("El correo no puede quedar vacio");
            correo.classList.add("errorCampo");
            return false;
        }
        else{
            correo.classList.remove("errorCampo");
        }
   
        if(contrasena.value ==""){
            alert("la contraseña no puede quedar vacia");
            contrasena.classList.add("errorCampo");
            return false;
        }
        else{
            contrasena.classList.remove("errorCampo");
        }
        
        let datos =new FormData();
        datos.append("correo", correo.value);
        datos.append("contrasena", contrasena.value);

        fetch("http://tpaodcm.orgfree.com/ingreso.php",
        {
            method: 'POST',
            body: datos
        })
        .then(function(response){
           return response.json();
        })
        .then(function(data){
            if(data.error == "contrasena"){
            alert("Contraseña incorrecta");
            }
            else if (data.error == "usuario")
            {
                alert("El correo no esta registrado");
            }
            else {
                nombre =data.nombre;
                correo =data.correo;
                document.getElementById("ingreso").style.display="none";
                principal.style.display="block";
                Mensajes.style.display="block";
                document.getElementById("nombreP").innerHTML =nombre;
                localStorage.setItem("login", 1);
                localStorage.setItem("nombre", nombre);
                localStorage.setItem("correo", correo);
                leerM();
            }
        })
        .catch(function(err){
            alert("Ocurrio un error");
            console.log(err);
        });
    });
    enviarM.addEventListener("click", function(){
        if(correoM.value == ""){
            alert ("Debes escribir usuario");
            correoM.classList.add("errorCampo");
            return false;
        }
        else {
            correoM.classList.remove("errorCampo");
        }
        if(mensajeM.value == ""){
            alert ("Debes escribir el mensaje");
            mensajeM.classList.add("errorCampo");
            return false;
        }
        else {
            correoM.classList.remove("errorCampo");
        }
        let metaMensaje = new FormData();
        metaMensaje.append("correoM", correoM.value);
        metaMensaje.append("mensajeM", mensajeM.value);
    
        fetch ("http://tpaodcm.orgfree.com/registrarMensaje.php", {
            method: 'POST',
            body: metaMensaje
        })
        .then (function(response){
            if (response.ok) {
                alert ("Mensaje Enviado");
            }
            else {
                alert("Ocurrio un error");
                console.log(response);
            }
            })
            .catch(function(err) {
                alert("ocurrio un error");
                console.log(err);
            }); 
    });
    function mensajes(){
        redactar.style.display = "block";
        document.getElementById("Mensajes").style.display = "block";
        document.getElementById("camara").style.display = "none";
        cerrarBarra();
    }
    function cerrarsesion() {
        cerrarBarra();
        localStorage.removeItem("nombre");
        localStorage.removeItem("correo");
        localStorage.removeItem("login", 0);
        redactar.style.display = "none";
        document.getElementById("principal").style.display = "none";
        document.getElementById("Mensajes").style.display = "none";
        document.getElementById("camara").style.display = "none";
        document.getElementById("ingreso").style.display = "block";
    }
    function abrirBarra(){
        document.getElementById("barraMenu").style.width="250px";
    }
    function cerrarBarra(){
        document.getElementById("barraMenu").style.width="0";
    }
    function leerM()
    {
        let datosLM = new FormData();
        datosLM.append("correousuario", correo); 
        fetch("http://tpaodcm.orgfree.com/leerMensajes.php",
        {
            method: 'POST',
            body: datosLM
        })
        .then(function(response){
           return response.json();
        })
        .then(function(data){
            for(let x = 0; x < data.length; x++)
            {
                document.getElementById("Mensajes").innerHTML = document.getElementById("Mensajes").innerHTML + data[x].Mensajes + "<br>" + data[x].fechahora + "<br>";
            }
            });
    }
    document.getElementById("abrir").addEventListener("click", function()
    {
        camera.click();
    });
    camera.addEventListener("change", function(e) {
        ruta = URL.createObjectURL(e.target.files[0]);
        obtenerLugar();
        photo.src = ruta;
        if (obtenerSO() == "iOS") {
            let link = document.createElement('a');
            link.download = "test.png";
            //link.href = photo.toDataURL("image/png").replace("image/png", "image/octet-stream");
            link.href = ruta;
            link.click();
            alert("Foto capturada");
        }
    });
    function tomarFoto() 
{
    redactar.style.display = "none";
    Mensajes.style.display ="none";
    document.getElementById("camara").style.display ="block";
}
function obtenerSO(){
    let so = null;
    let platform= window.navigator.platform,
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        if(iosPlatforms.includes(platform)){
            so= 'iOS';
        }
}
// Obtener lugar 
function obtenerLugar(){
coordenadas = {lat: 0, lon:0};
navigator.geolocation.getCurrentPosition(function(position){
    coordenadas ={lat: position.coords.latitude, lon:position.coords.longitude}
    fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat +"&lon="+ coordenadas.lon)
    .then(response=> response.json())
    .then(data=>{
        document.getElementById("lugar").value=data.address.country + "" + data.address.state;
    })
    .catch(error =>{
        console.log(error);
        coordenadas= {lat: 0, lon:0};
    });
});
}
mapa.addEventListener('click', function(){
window.open("http://openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon=" + coordenadas.lon + "&zoom=20");
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('../sw.js').then( () => {
        console.log('Service Worker Registered')
      });
    });
  }   