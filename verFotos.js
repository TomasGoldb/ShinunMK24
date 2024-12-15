// Importación de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC20Cd64Ft_N1e48FHQSWXLUWFZ-ZDHW6o",
    authDomain: "shinunfile.firebaseapp.com",
    projectId: "shinunfile",
    storageBucket: "shinunfile.firebasestorage.app",
    messagingSenderId: "840995620433",
    appId: "1:840995620433:web:8af5fe3fbb56dd8bbd1a70"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Escuchar cambios en la colección de fotos
const fotosRef = collection(db, "fotos");
onSnapshot(fotosRef, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            const newImageUrl = change.doc.data().url;
            showImage(newImageUrl);
        }
    });
}, (error) => {
    console.error("Error al escuchar los cambios en Firestore:", error);
});

// Función para mostrar la imagen durante 5 segundos
function showImage(imageUrl) {
    const imageDisplay = document.getElementById('imageDisplay');
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = "Imagen de la galería";
    imageDisplay.innerHTML = ''; // Limpiar cualquier imagen anterior
    imageDisplay.appendChild(img);

    // Estilo de imagen
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.border = '2px solid #ccc';
    img.style.borderRadius = '8px';

    // Ocultar la imagen después de 5 segundos
    setTimeout(() => {
        imageDisplay.innerHTML = ''; // Eliminar la imagen después de 5 segundos
    }, 5000); // 5000 ms = 5 segundos
}
