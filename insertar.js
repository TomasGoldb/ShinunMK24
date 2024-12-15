import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Función para cargar nombres y configurar el autocompletado
async function cargarNombres() {
    const inputNombre = document.getElementById("nombreInput");
    const listaAutocompletado = document.getElementById("autocomplete-list");

    if (!inputNombre || !listaAutocompletado) {
        console.error("Error: Elementos del DOM no encontrados. Revisa los IDs.");
        return;
    }

    // Obtener nombres desde Firestore
    const usuariosRef = collection(db, "usuarios");
    try {
        const snapshot = await getDocs(usuariosRef);
        const nombres = snapshot.docs.map(doc => doc.id); // Lista de nombres
        console.log("Nombres cargados:", nombres);

        // Evento al escribir en el input
        inputNombre.addEventListener("input", () => {
            const valor = inputNombre.value.toLowerCase();
            listaAutocompletado.innerHTML = ""; // Limpiar lista previa

            if (valor) {
                nombres
                    .filter(nombre => nombre.toLowerCase().includes(valor)) // Filtrar por coincidencias
                    .forEach(nombre => {
                        const item = document.createElement("li");
                        item.textContent = nombre;
                        item.className = "autocomplete-item";
                        item.addEventListener("click", () => {
                            inputNombre.value = nombre; // Rellenar el input
                            listaAutocompletado.innerHTML = ""; // Limpiar la lista
                        });
                        listaAutocompletado.appendChild(item);
                    });
            }
        });

        // Ocultar lista al hacer clic fuera
        document.addEventListener("click", (e) => {
            if (!inputNombre.contains(e.target) && !listaAutocompletado.contains(e.target)) {
                listaAutocompletado.innerHTML = ""; // Limpiar la lista
            }
        });
    } catch (error) {
        console.error("Error al cargar nombres desde Firestore:", error);
    }
}

// Cargar nombres al iniciar
cargarNombres();



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



// Función para obtener la hora actual como string
function obtenerHoraActual() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, "0"); // Asegura 2 dígitos (ej. "08")
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`; // Ejemplo: "12:43"
}

// Subir datos al Firestore
async function subirDatos() {
    const nombreSeleccionado = document.getElementById("nombreInput").value;
    const accionInput = document.getElementById("accionInput").value;

    if (!nombreSeleccionado || !accionInput) {
        alert("Por favor, selecciona un nombre y escribe una acción.");
        return;
    }

    const accionesRef = collection(db, `usuarios/${nombreSeleccionado}/acciones`);

    try {
        await addDoc(accionesRef, {
            hora: obtenerHoraActual(), // Obtiene la hora actual como string
            accion: accionInput.trim() // Acción ingresada
        });

        alert("Datos subidos correctamente.");
        document.getElementById("accionInput").value = ""; // Limpia el campo de texto
    } catch (error) {
        console.error("Error al subir los datos:", error);
        alert("Error al subir los datos. Revisa la consola para más detalles.");
    }
}

// Event Listener para el botón
document.getElementById("btnSubir").addEventListener("click", subirDatos);
