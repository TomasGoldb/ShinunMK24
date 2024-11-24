// Parámetros de la animación
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const columns = Math.floor(canvasWidth / 20); // Número de columnas de caracteres
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@#%^&*()_+=-';
const speed = 100; // Velocidad de desplazamiento de los caracteres

let drops = [];

// Crear las columnas con las posiciones iniciales de los caracteres
for (let x = 0; x < columns; x++) {
    drops[x] = 0; // Inicializar la posición de cada columna
}

// Crear el lienzo para los caracteres
const canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Establecer el estilo del texto
ctx.font = '20px monospace';
ctx.fillStyle = '#00ff00'; // Color verde

// Función para dibujar los caracteres
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fondo negro con opacidad para crear efecto de desvanecimiento
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, drops[i] * 20);

        // Reiniciar la posición de la gota cuando llegue al final de la pantalla
        if (drops[i] * 20 > canvasHeight && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Mover las gotas hacia abajo
        drops[i]++;
    }
}

// Llamar a la función `draw` cada `speed` milisegundos
setInterval(draw, speed);
