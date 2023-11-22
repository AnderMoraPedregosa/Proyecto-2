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
            padding: 50px;
            margin: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
        }

        h1 {
            color: #d9534f;
            font-size: 8em;
        }

        p {
            font-size: 18px;
            margin-bottom: 20px;
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
  0%, 100% {
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
  0%, 100% {
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
  0%, 100% {
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
  0%, 100% {
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
  0%, 100% {
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
  0%, 100% {
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



    </style>
</head>
<body>
    <div class="container">
        <h1>Error 404</h1>
        <p>Lo sentimos, la página que estás buscando no se encuentra.</p>
        <p>¿Quieres volver a la <a href="/">página principal</a>?</p>
    </div>
<img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca1">
<img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca2">
<img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca3">
<img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca4">
<img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca5">
<img src="../imagenes/mosca.png" alt="mosca" class="mosca" id="mosca6">

</body>
</html>
