// Importa Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Cargar nombres en el input select
async function cargarNombres() {
    const snapshot = await getDocs(usuariosRef);
    const nombreInput = document.getElementById('nombreInput');
    snapshot.forEach((doc) => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = doc.id;
        nombreInput.appendChild(option);
    });
}

// Mostrar acciones al presionar el botón "Buscar"
async function mostrarAcciones() {
    const nombreSeleccionado = document.getElementById('nombreInput').value;

    if (!nombreSeleccionado) {
        alert("Por favor selecciona un nombre");
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


// Listeners
document.getElementById('btnBuscar').addEventListener('click', mostrarAcciones);

// Cargar nombres al inicio
cargarNombres();
