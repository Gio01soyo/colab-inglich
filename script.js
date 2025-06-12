// script.js

// Ajustes SVG (deben coincidir con el viewBox en el HTML)
const svgWidth = 100;
const svgHeight = 50;
const animationSpeed = 120; // velocidad en ms

// Espaciados para la animación (en unidades del sistema SVG: 0–100)
const horizontalEdgePadding = 0;
const verticalEdgePadding = 0;
const horizontalCenterPadding = 20;
const verticalCenterPadding = 5;

// Posiciones sucesivas del cursor/selector (en porcentajes para CSS)
const menuPositions = [
  { left: '50%', top: '26.5%', width: '15%', height: '8%' },
  { left: '51%', top: '32.4%', width: '15%', height: '8%' },
  { left: '46%', top: '38%', width: '24%', height: '8%' },
  { left: '43%', top: '43.3%', width: '20%', height: '8%' },
  { left: '45.5%', top: '50%', width: '20%', height: '8%' },
  { left: '39%', top: '55.2%', width: '32%', height: '7%' },
  { left: '40%', top: '61%', width: '20%', height: '8%' },
  { left: '42.5%', top: '66.6%', width: '20%', height: '8%' },
  { left: '41.25%', top: '72%', width: '20%', height: '8%' },
];

let currentMenuItem = 0;

// Coordenadas centrales en sistema SVG
const centerX = svgWidth / 2;
const centerY = svgHeight / 2;
// Rango disponible para generar puntos aleatorios
const w = centerX - horizontalCenterPadding - horizontalEdgePadding;
const h = centerY - verticalCenterPadding - verticalEdgePadding;

// Obtenemos referencias a los elementos SVG usando Snap.svg
const selector = Snap('.selector');
const redLayer = selector.select('.red');
const blueLayer = selector.select('.blue');

// Función que genera cuatro puntos aleatorios dentro de la zona definida
function randomPointsForLayer() {
  return [
    // Punto 1 (el cuadrante superior izquierdo)
    Math.random() * w + horizontalEdgePadding,
    Math.random() * h + verticalEdgePadding,
    // Punto 2 (superior derecho)
    Math.random() * w + centerX + horizontalCenterPadding,
    Math.random() * h + verticalEdgePadding,
    // Punto 3 (inferior derecho)
    Math.random() * w + centerX + horizontalCenterPadding,
    Math.random() * h + centerY + verticalCenterPadding,
    // Punto 4 (inferior izquierdo)
    Math.random() * w + horizontalEdgePadding,
    Math.random() * h + centerY + verticalCenterPadding,
  ];
}

// Función que anima las dos capas (red y blue) a nuevos puntos
const animate = () => {
  [redLayer, blueLayer].forEach((layer) => {
    layer.animate(
      {
        points: randomPointsForLayer(),
      },
      animationSpeed
    );
  });
};

// Manejo de teclas (arriba/abajo) para mover el selector
const keydownHandler = (e) => {
  function moveDown() {
    currentMenuItem++;
    if (currentMenuItem > menuPositions.length - 1) {
      currentMenuItem = menuPositions.length - 1;
    }
    moveCursor();
  }

  function moveUp() {
    currentMenuItem--;
    if (currentMenuItem < 0) {
      currentMenuItem = 0;
    }
    moveCursor();
  }

  switch (e.keyCode) {
    case 38: // Flecha arriba
      moveUp();
      e.preventDefault();
      break;
    case 40: // Flecha abajo
      moveDown();
      e.preventDefault();
      break;
  }
};

// Ajusta la posición/medidas del cursor según menuPositions[currentMenuItem]
const moveCursor = () => {
  const cursorEl = document.querySelector('.selector');
  const pos = menuPositions[currentMenuItem];
  cursorEl.style.left = pos.left;
  cursorEl.style.top = pos.top;
  cursorEl.style.width = pos.width;
  cursorEl.style.height = pos.height;
};

// Cuando la página carga, iniciamos la animación y el listener de teclado
window.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', keydownHandler);
  // Lanza la animación en intervalos regulares
  setInterval(animate, animationSpeed);
  // Posición inicial del cursor
  moveCursor();
});
