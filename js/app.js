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

function consultarApiClima(ciudad, pais) {
  const apiKey = "e5b274bdecb46bfd72185a2a3d2ced76";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      console.log(datos);
      if (datos.cod == "404") {
        mostrarError(`La ciudad no fue encontrada.`);
      }
    })
    .catch((error) =>
      console.error("Error al realizar la peticion a la apiClima " + error)
    );
}
