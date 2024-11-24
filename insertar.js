import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, doc, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Llenar el dropdown con los nombres existentes
async function cargarNombres() {
    const usuariosRef = collection(db, "usuarios");
    const snapshot = await getDocs(usuariosRef);
    const nombreSelect = document.getElementById("nombreSelect");

    snapshot.forEach((doc) => {
        const option = document.createElement("option");
        option.value = doc.id; // ID del documento (nombre del usuario)
        option.textContent = doc.id; // Muestra el ID como texto en el dropdown
        nombreSelect.appendChild(option);
    });
}

// Función para obtener la hora actual como string
function obtenerHoraActual() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, "0"); // Asegura 2 dígitos (ej. "08")
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`; // Ejemplo: "12:43"
}

// Subir datos al Firestore
async function subirDatos() {
    const nombreSeleccionado = document.getElementById("nombreSelect").value;
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

// Cargar nombres al cargar la página
cargarNombres();
