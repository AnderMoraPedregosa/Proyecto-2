<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error 404 - Página no encontrada</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      color: #333;
      text-align: center;
      padding: 3.125em;
      margin: 0;
    }

    .container {
      max-width: 37.5em;
      margin: 0 auto;
    }

    h1 {
      color: #d9534f;
      font-size: 8em;
    }

    p {
      font-size: 18px;
      margin-bottom: 1.25em;
    }

    a {
      color: #5bc0de;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .mosca {
      position: fixed;
      animation-duration: 6s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: 2;
      width: 4em;
      height: auto;
    }

    #mosca1 {
      animation-name: moveSquare1;
      top: 10%;
      left: 10%;
      animation-duration: 6s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    #mosca2 {
      animation-name: moveSquare2;
      top: 30%;
      left: 70%;
      animation-duration: 6s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    #mosca3 {
      animation-name: moveSquare3;
      top: 50%;
      left: 40%;
      animation-duration: 6s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    #mosca4 {
      animation-name: moveSquare4;
      top: 70%;
      left: 20%;
      animation-duration: 6s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    #mosca5 {
      animation-name: moveSquare5;
      top: 20%;
      left: 80%;
      animation-duration: 6s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    #mosca6 {
      animation-name: moveSquare6;
      top: 80%;
      left: 50%;
      animation-duration: 6s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    @keyframes moveSquare1 {

      0%,
      100% {
        top: 0%;
        left: 0%;
        transform: scale(4);
      }

      25% {
        top: 70%;
        left: 50%;
        transform: scale(4);
      }

      50% {
        top: 0%;
        left: 100%;
        transform: scale(4);
      }

      75% {
        top: 50%;
        left: 0%;
        transform: scale(4);
      }
    }

    @keyframes moveSquare2 {

      0%,
      100% {
        top: 50%;
        left: 50%;
        transform: scale(4);
      }

      25% {
        top: 90%;
        left: 20%;
        transform: scale(4);
      }

      50% {
        top: 50%;
        left: 0%;
        transform: scale(4);
      }

      75% {
        top: 10%;
        left: 80%;
        transform: scale(4);
      }
    }

    @keyframes moveSquare3 {

      0%,
      100% {
        top: 80%;
        left: 20%;
        transform: scale(4);
      }

      25% {
        top: 20%;
        left: 80%;
        transform: scale(4);
      }

      50% {
        top: 0%;
        left: 0%;
        transform: scale(4);
      }

      75% {
        top: 80%;
        left: 50%;
        transform: scale(4);
      }
    }

    @keyframes moveSquare4 {

      0%,
      100% {
        top: 70%;
        left: 20%;
        transform: scale(4);
      }

      25% {
        top: 30%;
        left: 50%;
        transform: scale(4);
      }

      50% {
        top: 70%;
        left: 80%;
        transform: scale(4);
      }

      75% {
        top: 90%;
        left: 20%;
        transform: scale(4);
      }
    }

    @keyframes moveSquare5 {

      0%,
      100% {
        top: 20%;
        left: 80%;
        transform: scale(4);
      }

      25% {
        top: 80%;
        left: 50%;
        transform: scale(4);
      }

      50% {
        top: 50%;
        left: 20%;
        transform: scale(4);
      }

      75% {
        top: 20%;
        left: 80%;
        transform: scale(4);
      }
    }

    @keyframes moveSquare6 {

      0%,
      100% {
        top: 80%;
        left: 50%;
        transform: scale(4);
      }

      25% {
        top: 50%;
        left: 20%;
        transform: scale(4);
      }

      50% {
        top: 20%;
        left: 80%;
        transform: scale(4);
      }

      75% {
        top: 80%;
        left: 50%;
        transform: scale(4);
      }
    }

    .dino-canvas {
      border: 1px solid #ccc;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Error 404</h1>
    <p>Lo sentimos, la página que estás buscando no se encuentra.</p>
    <p>¿Quieres volver a la <a href="/">página principal</a>?</p>
  </div>
  <canvas id="dinoCanvas" class="dino-canvas" width="800" height="200"></canvas>

  <script>
    const canvas = document.getElementById('dinoCanvas');
    const ctx = canvas.getContext('2d');

    // Cargar imágenes
    const dinoImg = new Image();
    const obstacleImg = new Image();
    dinoImg.src = '../imagenes/dinosaurio.png';
    obstacleImg.src = '../imagenes/meteorito.png';

    // Dinosaurio
    const dino = {
      x: 50,
      y: canvas.height - 50,
      width: 50,
      height: 50,
      jumping: false,
      jumpHeight: 150,
    };

    // Obstacle
    const obstacle = {
      x: canvas.width,
      y: canvas.height - 50,
      width: 20,
      height: 20,
      speed: 2,
    };

    function drawDino() {
      ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    function drawObstacle() {
      ctx.drawImage(obstacleImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    function jump() {
      if (!dino.jumping) {
        dino.jumping = true;

        setTimeout(() => {
          dino.jumping = false;
        }, 500);

        const jumpInterval = setInterval(() => {
          dino.y -= 5;
          if (dino.y <= canvas.height - dino.jumpHeight) {
            clearInterval(jumpInterval);

            const fallInterval = setInterval(() => {
              dino.y += 5;
              if (dino.y >= canvas.height - dino.height) {
                dino.y = canvas.height - dino.height;
                clearInterval(fallInterval);
              }
            }, 20);
          }
        }, 20);
      }
    }

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawDino();
      drawObstacle();

      if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width;
      }

      obstacle.x -= obstacle.speed;

      // Colisión
      if (
        dino.x < obstacle.x + obstacle.width &&
        dino.x + dino.width > obstacle.x &&
        dino.y < obstacle.y + obstacle.height &&
        dino.y + dino.height > obstacle.y
      ) {
        alert('Game Over!');
        resetGame();
      }

      requestAnimationFrame(update);
    }

    function resetGame() {
      dino.y = canvas.height - 50;
      obstacle.x = canvas.width;
      let gameIsOver = false; // Variable de control

      // Espera 1 segundo antes de reiniciar para dar tiempo a cerrar la alerta
      setTimeout(() => {
        gameIsOver = true; // Marcar que el juego ha terminado
        update();
      }, 1000);

      // Limpiar intervalos antiguos si existen
      clearInterval(gameInterval);

      // Intervalo para actualizar el juego
      const gameInterval = setInterval(() => {
        if (gameIsOver) {
          clearInterval(gameInterval); // Detener el intervalo si el juego ha terminado
        } else {
          update();
        }
      }, 20);
    }


    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        jump();
      }
    });

    update();
  </script>
  <img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca1">
  <img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca2">
  <img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca3">
  <img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca4">
  <img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca5">
  <img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca6">
</body>

</html>