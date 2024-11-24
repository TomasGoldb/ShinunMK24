import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Función para procesar el archivo CSV
function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async function(e) {
        const contents = e.target.result;
        const rows = contents.split("\n"); // Dividir el archivo en filas

        // Eliminar las filas vacías y procesar cada nombre
        for (const row of rows) {
            const name = row.trim();
            if (name) {
                await agregarUsuarioAFirestore(name);
            }
        }
        alert("Nombres subidos correctamente.");
    };
    reader.readAsText(file);
}

// Función para agregar un usuario a Firestore
async function agregarUsuarioAFirestore(nombre) {
    const usuariosRef = collection(db, "usuarios");
    try {
        await setDoc(doc(usuariosRef, nombre), {
            nombre: nombre
        });
    } catch (error) {
        console.error("Error al agregar el usuario:", error);
    }
}

// Event listener para el botón de carga
document.getElementById("csvFileInput").addEventListener("change", handleFileUpload);
