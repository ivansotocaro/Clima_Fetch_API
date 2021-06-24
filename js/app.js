const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  let ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  // Primera letra en mayusuca
  ciudad = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);

  // Validar
  if (ciudad == "" && pais == "") {
    mostrarError("Ambos campos son obligatorios");
  } else {
    // Consultar en la API
    consultarApiClima(ciudad, pais);
  }
}

function consultarApiClima(ciudad, pais) {
  // endpint
  const apiKey = "e5b274bdecb46bfd72185a2a3d2ced76";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      // limpio el html para poder insertar el proximo resultado
      limpiarHTML();
      // validar error 404
      if (datos.cod == "404") {
        mostrarError(`La ciudad no fue encontrada.`);
      } else {
        mostrarClima(datos);
      }
    })
    .catch((error) =>
      console.error("Error al realizar la peticion a la apiClima " + error)
    );
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  // Declaracion de las variables

  // Convertir de KELVIN a CELSIUS(centigrado);
  const centrigrados = KelvinACentrigrado(temp);
  const max = KelvinACentrigrado(temp_max);
  const min = KelvinACentrigrado(temp_min);

  // Nombre de la ciudad
  // const nombreCiudad = document.createElement("p");
  // nombreCiudad.textContent = `Clima en ${name}`;
  // nombreCiudad.classList.add("font-bold", "text-2xl");

  const nombreCiudad = template("p", `Clima en ${name}`, [
    "font-bold",
    "text-2xl",
  ]);

  // Temperatura normal
  // const TempActual = document.createElement("p");
  // TempActual.innerHTML = `${centrigrados} &#8451;`;
  // TempActual.classList.add("font-bold", "text-6xl");
  const TempActual = template("p", `${centrigrados} &#8451;`, [
    "font-bold",
    "text-6xl",
  ]);

  // Temperatura max
  // const tempMax = document.createElement("p");
  // tempMax.innerHTML = `Max: ${max} &#8451;`;
  // tempMax.classList.add("text-xl");

  const tempMax = template("p", `Max: ${max} &#8451;`, ["text-xl"]);

  // Temperatura min
  // const tempMin = document.createElement("p");
  // tempMin.innerHTML = `Min: ${min} &#8451;`;
  // tempMin.classList.add("text-xl");

  const tempMin = template("p", `Min: ${min} &#8451;`, ["text-xl"]);

  // Div para contener todos los elementos anteriores
  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(TempActual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);

  // Espacio donde se podran los demas elementos
  resultado.appendChild(resultadoDiv);
}

// Funcion para convertir de KELVIN a CELSIUS(centigrado);
const KelvinACentrigrado = (temp) => parseInt(temp - 273.15);

function mostrarError(msg) {
  const alertaClass = document.querySelector(".bg-red-100");

  //Crear una alerta
  if (!alertaClass) {
    const alert = document.createElement("div");

    alert.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alert.innerHTML = `
      <strong class='font-bold'>Error!<strong>
      <span class='block'>${msg}</span>
    `;

    container.appendChild(alert);

    //Eliminar alerta
    setTimeout(() => {
      alert.remove();
    }, 4000);

    //
  }
}

function template(tipo, texto, clases) {
  const elemento = document.createElement(tipo);
  elemento.innerHTML = texto;

  clases.forEach((clase) => {
    elemento.classList.add(clase);
  });

  return elemento;
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
