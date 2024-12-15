// Importa Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBjxvGCJUNE5_ZNNluobvzVAwyIZGwpeto",
    authDomain: "shinunmk24.firebaseapp.com",
    projectId: "shinunmk24",
    storageBucket: "shinunmk24.firebasestorage.app",
    messagingSenderId: "169077457278",
    appId: "1:169077457278:web:77a86ef3e4c61116ca732f"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a la colección 'usuarios'
const usuariosRef = collection(db, 'usuarios');

// Almacena los nombres para autocompletar
let nombres = [];

// Cargar nombres para el autocompletado
async function cargarNombres() {
    const snapshot = await getDocs(usuariosRef);
    nombres = snapshot.docs.map((doc) => doc.id); // Guarda los nombres en el array
}

// Filtrar sugerencias según el texto ingresado
function filtrarSugerencias(texto) {
    return nombres.filter((nombre) =>
        nombre.toLowerCase().includes(texto.toLowerCase())
    );
}

// Mostrar sugerencias en la lista
function mostrarSugerencias(sugerencias) {
    const lista = document.getElementById('sugerencias');
    lista.innerHTML = ''; // Limpia sugerencias previas

    sugerencias.forEach((sugerencia) => {
        const li = document.createElement('li');
        li.textContent = sugerencia;
        li.addEventListener('click', () => {
            document.getElementById('nombreInput').value = sugerencia;
            lista.innerHTML = ''; // Limpia las sugerencias al seleccionar una
        });
        lista.appendChild(li);
    });
}

// Escucha para el input
document.getElementById('nombreInput').addEventListener('input', (e) => {
    const texto = e.target.value;
    const sugerencias = filtrarSugerencias(texto);
    mostrarSugerencias(sugerencias);
});

// Mostrar acciones al presionar el botón "Buscar"
async function mostrarAcciones() {
    const nombreSeleccionado = document.getElementById('nombreInput').value;

    if (!nombreSeleccionado || !nombres.includes(nombreSeleccionado)) {
        alert("Por favor selecciona un nombre válido");
        return;
    }

    // Referencia a las acciones del usuario seleccionado
    const accionesRef = collection(db, `usuarios/${nombreSeleccionado}/acciones`);
    const snapshot = await getDocs(accionesRef);

    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpia resultados previos

    // Iterar sobre cada acción
    snapshot.forEach((doc) => {
        const data = doc.data(); // Datos del documento (acción)
        const fila = document.createElement('div');
        fila.classList.add('fila');
        fila.textContent = `${data.hora} - ${data.accion}`; // Mostrar hora y acción única
        resultadosDiv.appendChild(fila);
    });
}

// Listener para buscar acciones
document.getElementById('btnBuscar').addEventListener('click', mostrarAcciones);

// Cargar nombres al inicio
cargarNombres();


document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('nombreInput');
    const autocompleteList = document.getElementById('sugerencias');

    // Función para ocultar la lista de autocompletado
    function ocultarAutocomplete() {
        autocompleteList.style.display = 'none';
    }

    // Agregar evento para ocultar el autocompletado al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!input.contains(event.target) && !autocompleteList.contains(event.target)) {
            ocultarAutocomplete();
        }
    });

    // Mostrar la lista de autocompletado cuando el usuario escribe
    input.addEventListener('input', function() {
        if (input.value) {
            autocompleteList.style.display = 'block';
            // Aquí agregar la lógica para filtrar las opciones
        } else {
            autocompleteList.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('nombreInput');
    const clearIcon = document.getElementById('clearIcon');
    const autocompleteList = document.getElementById('autocomplete-list');

    // Función para ocultar la lista de autocompletado
    function ocultarAutocomplete() {
        autocompleteList.style.display = 'none';
    }

    // Mostrar la lista de autocompletado cuando el usuario escribe
    input.addEventListener('input', function() {
        if (input.value) {
            autocompleteList.style.display = 'block';
            clearIcon.style.display = 'block'; // Mostrar la cruz
        } else {
            autocompleteList.style.display = 'none';
            clearIcon.style.display = 'none'; // Ocultar la cruz cuando el input esté vacío
        }
    });

    // Función para resetear el input y ocultar los resultados de autocompletado
    clearIcon.addEventListener('click', function() {
        input.value = '';
        autocompleteList.style.display = 'none';  // Ocultar la lista de autocompletado
        clearIcon.style.display = 'none';         // Ocultar la cruz
    });

    // Agregar evento para ocultar el autocompletado al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!input.contains(event.target) && !autocompleteList.contains(event.target)) {
            ocultarAutocomplete();
            clearIcon.style.display = 'none'; // Ocultar la cruz si se hace clic fuera
        }
    });
});
