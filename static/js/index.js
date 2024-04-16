const login = document.getElementById("login")
const loginOpciones = document.getElementById("login-opciones")
const loginTexto = document.getElementById("login-texto")
const terminosYCondiciones = document.getElementById("TerminosYCondiciones")
const quienesSomos = document.getElementById("QuienesSomos")


const login_confirmado = iniciado => {
    if (iniciado) {
        login.innerHTML = ``
        login.innerHTML = `
      <p class="encabezado-en-linea" id="login-texto">Bienvenido</p>
      <div class="menu-dropdown" id="login-opciones">
          <a href="templates/perfil.html">Perfil</a>
          <a href="templates/historial.html">Historial</a>
      </div>`
    }
    else {
        login.innerHTML = ``
        login.innerHTML = `
      <img class="encabezado-en-linea icono" src="static/img/header/key.png" alt="llave">
      <p class="encabezado-en-linea" id="login-texto">Ingresar</p>`
        localStorage.removeItem("usuarioLogueado")
    }
}

const guardadoLogin = () => {
    let iniciado
    if (localStorage.getItem("usuarioLogueado") === null) {
        iniciado = false
    }
    else {
        iniciado = true
        usuario = localStorage.getItem("usuarioLogueado")
    }
    login_confirmado(iniciado)
    return iniciado
}

const validateEmail = email => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    return reg.test(email)
}

login.onclick = () => {
    if (!iniciado) {
        (async () => {
            const { value: datos_login } = await Swal.fire({
                title: "Loguearse",
                html:
                    'Email: <input type="email" id="swal-input1" class="swal2-input">' +
                    'Clave: <input type="password" id="swal-input2" class="swal2-input">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value
                    ]
                },
                confirmButtonColor: "#356194",
                confirmButtonText: "Ingresar",
                footer: '<a href="templates/registro.html">¿No tienes cuenta? Registrate</a>'
            })
            if (validateEmail(datos_login[0])) {
                iniciado = true
                localStorage.setItem("usuarioLogueado", datos_login[0])
                login_confirmado(iniciado)
            }
            else {
                Swal.fire(`Datos no válidos`)
            }
        })()
    }
    else {
        iniciado = false
        login_confirmado(iniciado)
    }
}

terminosYCondiciones.onclick = () => {
    Swal.fire({
        title: "Términos y condiciones",
        text: "Casa Lista nunca compartirá sus datos personales, más allá de su nombre, apellido, zona en donde vive y número de teléfono",
        icon: "info",
        confirmButtonText: "Confirmar"
    });
}

quienesSomos.onclick = () => {
    const equipo = "Desarrolladores:\n- Eduardo Ojeda\n- Franco Andres Riggio\n- Silvia Gomez\nUI/UX:\n- Noelia Sciorra"
    Swal.fire({
        title: "¿Quiénes somos?",
        icon: "info",
        html: '<pre>' + equipo + '</pre>',
        confirmButtonText: "Confirmar"
    });
}

let iniciado = guardadoLogin()