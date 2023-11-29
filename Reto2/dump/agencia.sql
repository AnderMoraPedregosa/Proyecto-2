-- Asegurarse de que la conexión use utf8mb4
SET NAMES utf8;

-- Resto de tu script SQL
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = 'Europe/Madrid';

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    nombre_rol VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE comercios (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono INT(10) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE personas (
    id INT AUTO_INCREMENT,
    dni VARCHAR(9) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    passwd VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    id_rol INT(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_rol) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT,
    apellidos VARCHAR(255) NOT NULL,
    telefono INT(10) NOT NULL,
    id_persona INT(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_persona) REFERENCES personas(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT,
    id_persona INT(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_persona) REFERENCES personas(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comerciantes (
    id INT AUTO_INCREMENT,
    id_comercio INT(10) NOT NULL,
    id_persona INT(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_comercio) REFERENCES comercios(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_persona) REFERENCES personas(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE blogs (
    id INT AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    imagen_blog VARCHAR(255) NOT NULL,
    texto longtext NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    id_comercio INT(10) NOT NULL,
    id_comerciante INT(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_comercio) REFERENCES comercios(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_comerciante) REFERENCES comerciantes(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE anuncios (
    id INT AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    imagen_anuncio VARCHAR(255) NOT NULL,
    descripcion longtext NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    precio DECIMAL(10, 2) NOT NULL, 
    id_categoria INT(10) NOT NULL,
    id_comercio INT(10) NOT NULL,
    id_comerciante INT(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_comercio) REFERENCES comercios(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_comerciante) REFERENCES comerciantes(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE imagenes_anuncios (
    id INT AUTO_INCREMENT,
    id_anuncio INT(10) NOT NULL,
    ruta_imagen VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_anuncio) REFERENCES anuncios(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE logs (
    id INT AUTO_INCREMENT,
    fecha DATETIME NOT NULL,
    id_anuncio INT(10) NOT NULL,
    id_comerciante INT(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_anuncio) REFERENCES anuncios(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_comerciante) REFERENCES comerciantes(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE accion_logs (
    id INT AUTO_INCREMENT,
    nombre_accion VARCHAR(100) NOT NULL,
    id_logs INT(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_logs) REFERENCES logs(id) ON DELETE CASCADE ON UPDATE CASCADE
);



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Inserts for the 'roles' table
INSERT INTO roles (nombre_rol) VALUES 
('admin'), 
('clientes'), 
('comerciantes');

-- Inserts for the 'personas' table
INSERT INTO personas (dni, nombre, passwd, email, id_rol) VALUES 
('123456789', 'Juan', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'juan@email.com', 3),
('987654321', 'Ana', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'ana@email.com', 3),
('555555555', 'Carlos', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'carlos@email.com', 3),
('111111111', 'Laura', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'lauro@email.com', 3),
('999999999', 'Pedro', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'pedro@email.com', 3),
('888888888', 'Sara', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'sara@email.com', 3),
('777777777', 'Alejandro', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'alejandro@email.com', 3),
('111222333', 'María', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'maria@email.com', 3),
('444555666', 'Javier', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'javier@email.com', 3),
('777888999', 'Elena', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'elena@email.com', 3),
('123987456', 'Diego', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'diego@email.com', 3),
('232323232', 'Laura', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'laura@email.com', 2),
('323232323', 'Alberto', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'alberto@email.com', 2),
('121212121', 'Sandra', '$2y$10$brdXSFW4BZxoNqeENkmy0.X.S4BDjErWrgLkzsRja8pGC7JMRR1Fq', 'sandra@email.com', 1);


-- Inserts for the 'clientes' table using the data from the first two 'personas' inserts
INSERT INTO clientes (apellidos, telefono, id_persona) VALUES 
('López', 123456789, 12),
('Gómez', 987654321, 13);


-- Insert for the 'admins' table using the third 'personas' insert
INSERT INTO admins (id_persona) VALUES (14);

-- Inserts for the 'categorias' table
INSERT INTO categorias (nombre) VALUES 
('Electrónica'),
('Ropa'),
('Hogar'),
('Deportes'),
('Juguetes'),
('Automóviles'),
('Electrodomésticos'),
('Libros');


/*COMERCIOS*/

INSERT INTO comercios (nombre, email, telefono, direccion)
VALUES 
('Carrocerias Martinez ', 'carromartinez@email.com', 1234567890, 'Calle Principal 123'),
('Electrodomestis Fagor', 'electrofagor@email.com', 9876543210, 'Avenida Secundaria 456'),
('My House', 'housemy@email.com', 5551112222, 'Calle Comercial 789'),
('ElectroMart', 'electromart@email.com', 1237894560, 'Avenida Tecnológica 321'),
('ModaExpress', 'modaexpress@email.com', 9876543211, 'Plaza de la Moda 567'),
('Librería Lectura', 'librerialectura@email.com', 8765432109, 'Calle de los Libros 234'),
('SuperDeportes', 'superdeportes@email.com', 1112223333, 'Avenida Deportiva 876'),
('Toysaras', 'toysaras@email.com', 333222111, 'Avenida comercio 222');



/*COMERCIANTES*/

INSERT INTO comerciantes (id_comercio, id_persona)
VALUES 
(3, 1),
(4, 2),
(2, 3),
(1, 4),
(7, 5),
(8, 6),
(6, 7),
(5, 8);

/*BLOGS*/
-- Inserciones para la tabla blogs
INSERT INTO blogs (titulo, imagen_blog, texto, fecha_creacion, id_comercio, id_comerciante) VALUES
('Carrocerias Martinez', 'imagenes/negocio4.jpg', 'Tu destino ideal para productos de calidad para coches. Ofrecemos una amplia gama de articulos, desde accesorios hasta herramientas especializadas para tu vehiculo. Brindamos las mejores soluciones y las mas confiables. Tu coche, es nuestro coche', '2023-11-22 10:00:00', 1, 4),
('Electrodomestis Fagor', 'imagenes/negocio5.jpg', 'Desde lavadoras y neveras hasta equipos de cocina de alta tecnologia, ofrecemos una seleccion completa para satisfacer tus necesidades domesticas. Nos comprometemos a proporcionar nuestros mejores productos, asesoramiento experto para hacer tu vida en el hogar mas eficiente y comoda', '2023-11-22 10:30:00', 2, 3),
('My House', 'imagenes/negocio6.jpg', 'Te da la sensacion que a veces falta algo que no sabes que es en tu hogar? Pues en Tienda XYZ lo tenemos seguro! Nuestro compromiso es proporcionar productos de calidad que se adapten a diferentes estilos y necesidades. Si sigues con la espina clavada de que te falta algo, no dudes es pasarte por aqui!', '2023-11-22 11:00:00', 3, 1),
('ElectroMart', 'imagenes/negocio7.jpg', 'El lugar en lina para una amplia gama de productos electronicos. Desde moviles y ordenadores hasta inteligencias artificales parecidas a Alexa o Siri. Garantizamos una experiencia de compra segura y conveniente desde la comodidad de tu hogar. A que esperas?', '2023-11-22 11:30:00', 4, 2),
('ModaExpress', 'imagenes/negocio8.jpg', 'Necesitas esta en vanguardia con la moda! ModaExpress ofrece una amplia gama de prendas para vestir, accesorios, disfraces para esos momentos importantes y divertidos! Brindamos a nuestros clientes las ultimas tendencias de la moda a precios accesibles. Ven y compruebalo!', '2023-11-22 12:00:00', 5, 8),
('LibreriaLectura', 'imagenes/negocio9.jpg', 'Es el destino perfecto para los amantes de la lectura. Ofrecemos una amplia seleccion de libros que abarcan diversos generos, desde clasicos literarios hasta las ultimas novedades editoriales. Coge un libro, un cafe y una manta, y disfruta de tu domingo de lectura.', '2023-11-22 12:30:00', 6, 7),
('SuperDeportes', 'imagenes/negocio10.jpg', 'SuperDeportes, dedicados a impulsar tu pasion por el deporte, bridnando opciones variadas y soluciones especializadas para cada actividad deportiva.', '2023-11-22 13:00:00', 7, 5),
('Gaming gamers', 'imagenes/negocio11.jpg', 'El gaming es el futuro, y nosotros somos el futuro! Desde consolas hasta PCs gaming y sus accesorios. Nuestro compromiso es proporcionar los equipos mas potentes para llevar tu experiencia de juegos a limites donde no habias podido pensar ni que exisitian. Somos tu aliado perfecto para satisfacerte.', '2023-11-22 13:30:00', 8, 6),
('Descubre los tesoros ocultos de Vitoria-Gasteiz', 'imagenes/negocio1.jpg', 'Explora los encantadores comercios locales de Vitoria-Gasteiz y descubre joyas escondidas que hacen única a nuestra ciudad. Desde boutiques pintorescas hasta acogedores cafés, te guiamos a través de los mejores lugares para visitar.', '2023-11-22 10:00:00', 1, 1),
('Experiencias culinarias: Sabores locales que debes probar', 'imagenes/negocio2.jpg', 'Sumérgete en la deliciosa escena culinaria de Vitoria-Gasteiz. Desde tradicionales pintxos hasta platos innovadores, te llevamos en un recorrido gastronómico por los mejores establecimientos locales que debes conocer.', '2023-11-22 10:30:00', 2, 2),
('Historias detrás de los escaparates: Comerciantes locales', 'imagenes/negocio3.jpg', 'Conoce las historias inspiradoras de los comerciantes locales que dan vida a Vitoria-Gasteiz. Desde comercios familiares con décadas de historia hasta emprendedores que están marcando la diferencia, descubre las caras detrás de los negocios locales.', '2023-11-22 11:00:00', 3, 3),
('Arte y cultura: Rincones únicos en nuestra ciudad', 'imagenes/negocio1.jpg', 'Explora la rica escena artística y cultural de Vitoria-Gasteiz. Desde galerías de arte contemporáneo hasta espacios culturales independientes, te llevamos a lugares que inspiran y enriquecen nuestra comunidad.', '2023-11-22 11:30:00', 4, 4),
('Encuentra gangas exclusivas en los mercadillos locales', 'imagenes/negocio2.jpg', 'Descubre tesoros y ofertas especiales explorando los mercadillos locales de Vitoria-Gasteiz. Desde ropa vintage hasta artesanías únicas, te contamos todo lo que necesitas saber para disfrutar de una experiencia de compras auténtica.', '2023-11-22 12:00:00', 1, 1),
('Conectando con la comunidad: Eventos locales imperdibles', 'imagenes/negocio3.jpg', 'Sumérgete en la vida social de Vitoria-Gasteiz participando en eventos locales. Desde ferias artesanales hasta conciertos en vivo, te mantenemos informado sobre las mejores actividades que fortalecen nuestra comunidad.', '2023-11-22 12:30:00', 2, 2),
('Diseño local: Creaciones únicas de nuestros artesanos', 'imagenes/negocio1.jpg', 'Descubre el talento y la creatividad de los artesanos locales de Vitoria-Gasteiz. Desde joyería hecha a mano hasta muebles personalizados, te presentamos las creaciones únicas que hacen brillar a nuestra ciudad.', '2023-11-22 13:00:00', 3, 3),
('Eco-friendly en Vitoria-Gasteiz: Compras sostenibles', 'imagenes/negocio2.jpg', 'Explora las opciones eco-friendly al hacer tus compras en Vitoria-Gasteiz. Desde tiendas de productos orgánicos hasta prácticas de negocios sostenibles, te mostramos cómo contribuir a un estilo de vida más verde en nuestra ciudad.', '2023-11-22 13:30:00', 4, 4),
('Vida nocturna local: Descubre los mejores bares y pubs', 'imagenes/negocio3.jpg', 'Sumérgete en la vibrante vida nocturna de Vitoria-Gasteiz explorando los bares y pubs locales. Desde cócteles artesanales hasta música en vivo, te guiaremos a través de los lugares más destacados para disfrutar de la noche.', '2023-11-22 14:00:00', 1, 1),
('Historia y arquitectura: Un viaje a través del tiempo', 'imagenes/negocio1.jpg', 'Embárcate en un viaje fascinante a través de la historia y la arquitectura de Vitoria-Gasteiz. Desde monumentos emblemáticos hasta edificios históricos, te llevamos a lugares que cuentan la rica historia de nuestra ciudad.', '2023-11-22 14:30:00', 2, 2);


/*ANUNCIOS*/

INSERT INTO anuncios (titulo, imagen_anuncio, descripcion, fecha_creacion, precio, id_categoria, id_comercio, id_comerciante)
VALUES 
('Reposabrazos', 'imagenes/coches1.jpg', 'Reposabrazos compacto, facil de poner,facil de quitar y facil de lavar', NOW(), 100, 6, 1, 4),
('Asiento', 'imagenes/coches2.jpg', 'Asiento piloto y copiloto de diferentes colores', NOW(), 30, 6, 1, 4),
('HTA cleaner', 'imagenes/coches3.jpg', 'Herramienta para limpiar las esquinas imposibles de llegar del coche.', NOW(), 10.99, 6, 1, 4),
('Alfombrilla XXS', 'imagenes/coches4.jpg', 'Alfombrilla con una durabilidad de 5 años, áspero.', NOW(), 29.99, 6, 1, 4),
('Grafiti', 'imagenes/coches5.jpg', 'Pegatina para el coche.Uso único. Debes esperar 1 hora despues de ponerla para mojarla.', NOW(), 3.33, 6, 1, 4),
('BalonBelt', 'imagenes/deportes1.jpg','Colocas "BalonBelt" enganchado a la cintura para practicar y ejercitar el abdomen.', NOW(), 33, 4, 7, 5),
('Rodin', 'imagenes/deportes2.jpg', 'Contiene un aceite para que el enganche con el apoyamanos no chirrie.', NOW(), 2, 4, 7, 5),
('Pulsera balckWatch', 'imagenes/deportes3.jpeg', 'Contiene: Reloj,Bluetooth,ajustes,posibilidad de añadir notificaciones', NOW(), 2, 4, 7, 5),
('Zapatillas led', 'imagenes/deportes4.jpg',  'Hasta 20 colores diferentes.Medidas únicas de 42', NOW(), 78.23, 4, 7, 5),
('Comba', 'imagenes/deportes5.png', 'La cuerda llega a medir 2 metros, de 12 a 84 años.', NOW(), 16, 4, 7, 5),
('Lavadora', 'imagenes/electrodomesticos1.jpg', 'Lavadora 28 velocidades 3 formas de lavado', NOW(), 300.23, 7, 2, 3),
('Nevera', 'imagenes/electrodomesticos2.png', 'Nevera/refrigerador', NOW(), 500.23, 7, 2, 3),
('Licuadora', 'imagenes/electrodomesticos3.jpeg', 'Garantía hasta  3 años', NOW(), 70.23, 7, 2, 3),
('Plancha', 'imagenes/electrodomesticos4.jpeg', 'Garantía hasta  2 años', NOW(), 50.23, 7, 2, 3),
('Plancha', 'imagenes/electrodomesticos5.jpeg', 'Garantía hasta  5 años', NOW(), 40.23, 7, 2, 3),
('Mando USB', 'imagenes/electronica1.jpg', 'Mando para la televisión con USB. Opciones adicionales(netflix,amazonprime..)', NOW(), 33.23, 1, 4, 2),
('Sensor Online', 'imagenes/electronica2.jpg', 'sGarantía hasta  2 años', NOW(), 54.23, 1, 4, 2),
('Alexa', 'imagenes/electronica3.jpg', 'Ultima actualización: hemos añadido a alexa ChatGpt. Garantia de 1 año', NOW(), 77.23, 1, 4, 2),
('Vlackwatch', 'imagenes/electronica4.jpg', 'Contiene: Reloj,Bluetooth,ajustes,posibilidad de añadir notificaciones', NOW(), 120.23, 1, 4, 2),
('Siri', 'imagenes/electronica5.jpg', 'Ultima actualización: hemos añadido a Siri ChatGpt. Garantia de 3meses ', NOW(), 300, 1, 4, 2),
('Turbo Mop', 'imagenes/hogar1.jpg', 'Con un simple botón cambia del uso fregar a mopa.', NOW(), 60, 3, 3, 1),
('Freidora de aire', 'imagenes/hogar2.jpg', 'Ten este producto fuera de alcance de niños. 1 año de garantía', NOW(), 200, 3, 3, 1),
('Dispensador de agua', 'imagenes/hogar3.jpg', 'Necesita agua o cualquier liquido no inflamable para funcionar.', NOW(), 30, 3, 3, 1),
('Grapadora', 'imagenes/hogar4.jpg', 'Puede contener 1000 grapas.', NOW(), 5.99, 3, 3, 1),
('Rascador', 'imagenes/hogar5.jpg', '1 més de garantía', NOW(), 9.99, 3, 3, 1),
('Libro hablador', 'imagenes/juguetes1.jpeg', 'Edad = de 6 meses a 3 años', NOW(), 13.99, 5, 8, 6),
('Mochila Squirtle', 'imagenes/juguetes2.jpeg', 'Del famoso juego Pokemon.Unidades limitadas', NOW(), 19.99, 5, 8, 6),
('Piña juguete', 'imagenes/juguetes3.jpg', 'Mordedor para animales caninos.No contiene pito.', NOW(), 9.99, 5, 8, 6),
('Eva wally para perros', 'imagenes/juguetes4.jpg', 'Dispensa chuches para perros,preparada para los golpes contra la pared y perros', NOW(), 39.99, 5, 8, 6),
('Yoda bebé', 'imagenes/juguetes5.png', 'Juguete para niños de Yoda, de la famosa pelicula Stars Wars', NOW(), 9.99, 5, 8, 6),
('Milenial', 'imagenes/libro1.jpg','Libro sobre los milenials', NOW(), 19.99, 8, 6, 7),
('Así es la puta vida', 'imagenes/libro2.jpg', 'Libro sobre la vida. Escrita por Jordi Wild', NOW(), 99.99, 8, 6, 7),
('Corte de espinas y rosas', 'imagenes/libro3.jpg', 'escrita por SARAH J.MAAS', NOW(), 2.99, 8, 6, 7),
('Auronplay', 'imagenes/libro4.jpg', 'Libro escrito por Auronplay', NOW(), 39.99, 8, 6, 7),
('El libro trol del Rubius', 'imagenes/libro5.jpg', 'Escrito y dirigido por el streamer Elrubius', NOW(), 199.99, 8, 6, 7),
('Disfraz preso', 'imagenes/ropa1.jpg', 'XL. Perfecto para Halloween o Carnavales', NOW(), 199.99, 2, 5, 8),
('Ropa Mujer', 'imagenes/ropa2.jpg',  'Top y leggins a conjunto. Colores: negro', NOW(), 19.99, 2, 5, 8),
('Disfraz Dinosaurio', 'imagenes/ropa3.jpg', 'XL. Perfecto para Halloween o Carnavales.Hinchable.', NOW(), 33.33, 2, 5, 8),
('Disfraz Misa Amane', 'imagenes/ropa4.jpg', 'L. Disfraz de la famosa serie de anime Death Note', NOW(), 44.33, 2, 5, 8),
('Gel Rammstein', 'imagenes/ropa5.jpg', 'Gel de ducha de la famosa banda Rammstein', NOW(), 1000.99, 2, 5, 8);



/*IMAGENES_ANUNCIOS*/

INSERT INTO imagenes_anuncios (id_anuncio, ruta_imagen)
VALUES 
((SELECT id FROM anuncios WHERE titulo = 'Reposabrazos'), 'imagenes/coches1.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Reposabrazos'), 'imagenes/coches1.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Reposabrazos'), 'imagenes/coches1.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Asiento'), 'imagenes/coches2.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Asiento'), 'imagenes/coches2.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Asiento'), 'imagenes/coches2.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Alfombrilla XXS'), 'imagenes/coches4.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Alfombrilla XXS'), 'imagenes/coches4.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Alfombrilla XXS'), 'imagenes/coches4.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Alfombrilla XXS'), 'imagenes/coches4.4.png'),
((SELECT id FROM anuncios WHERE titulo = 'Grafiti'), 'imagenes/coches5.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Grafiti'), 'imagenes/coches5.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Grafiti'), 'imagenes/coches5.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Pulsera balckWatch'), 'imagenes/deportes3.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Pulsera balckWatch'), 'imagenes/deportes3.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Pulsera balckWatch'), 'imagenes/deportes3.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Zapatillas led'), 'imagenes/deportes4.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Zapatillas led'), 'imagenes/deportes4.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Comba'), 'imagenes/deportes5.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Comba'), 'imagenes/deportes5.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Comba'), 'imagenes/deportes5.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Lavadora'), 'imagenes/electrodomesticos1.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Lavadora'), 'imagenes/electrodomesticos1.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Nevera'), 'imagenes/electrodomesticos2.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Nevera'), 'default/electrodomesticos2.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Mando USB'), 'imagenes/electronica1.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Mando USB'), 'imagenes/electronica1.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Mando USB'), 'imagenes/electronica1.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Mando USB'), 'imagenes/electronica1.4.png'),
((SELECT id FROM anuncios WHERE titulo = 'Sensor Online'), 'imagenes/electronica2.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Sensor Online'), 'imagenes/electronica2.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Sensor Online'), 'imagenes/electronica2.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Sensor Online'), 'imagenes/electronica2.4.png'),
((SELECT id FROM anuncios WHERE titulo = 'Alexa'), 'imagenes/electronica3.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Alexa'), 'imagenes/electronica3.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Alexa'), 'imagenes/electronica3.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Alexa'), 'imagenes/electronica3.4.png'),
((SELECT id FROM anuncios WHERE titulo = 'Vlackwatch'), 'imagenes/electronica4.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Vlackwatch'), 'imagenes/electronica4.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Vlackwatch'), 'imagenes/electronica4.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Vlackwatch'), 'imagenes/electronica4.4.png'),
((SELECT id FROM anuncios WHERE titulo = 'Siri'), 'imagenes/electronica5.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Siri'), 'imagenes/electronica5.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Siri'), 'imagenes/electronica5.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Siri'), 'imagenes/electronica5.4.png'),
((SELECT id FROM anuncios WHERE titulo = 'Turbo Mop'), 'imagenes/hogar1.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Turbo Mop'), 'imagenes/hogar1.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Turbo Mop'), 'imagenes/hogar1.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Freidora de aire'), 'imagenes/hogar2.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Freidora de aire'), 'imagenes/hogar2.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Freidora de aire'), 'imagenes/hogar2.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Freidora de aire'), 'imagenes/hogar2.4.png'),
((SELECT id FROM anuncios WHERE titulo = 'Grapadora'), 'imagenes/hogar4.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Grapadora'), 'imagenes/hogar4.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Grapadora'), 'imagenes/hogar4.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Libro hablador'), 'imagenes/juguetes1.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Libro hablador'), 'imagenes/juguetes1.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Libro hablador'), 'imagenes/juguetes1.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Mochila Squirtle'), 'imagenes/juguetes2.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Mochila Squirtle'), 'imagenes/juguetes2.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Piña juguete'), 'imagenes/juguetes3.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Piña juguete'), 'imagenes/juguetes3.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Eva wally para perros'), 'imagenes/juguetes4.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Eva wally para perros'), 'imagenes/juguetes4.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Eva wally para perros'), 'imagenes/juguetes4.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Disfraz preso'), 'imagenes/ropa1.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Ropa Mujer'), 'imagenes/ropa2.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Ropa Mujer'), 'imagenes/ropa2.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Disfraz Dinosaurio'), 'imagenes/ropa3.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Disfraz Dinosaurio'), 'imagenes/ropa3.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Disfraz Dinosaurio'), 'imagenes/ropa3.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Disfraz Dinosaurio'), 'imagenes/ropa3.4.png'),
((SELECT id FROM anuncios WHERE titulo = 'Disfraz Misa Amane'), 'imagenes/ropa4.1.png'),
((SELECT id FROM anuncios WHERE titulo = 'Disfraz Misa Amane'), 'imagenes/ropa4.2.png'),
((SELECT id FROM anuncios WHERE titulo = 'Disfraz Misa Amane'), 'imagenes/ropa4.3.png'),
((SELECT id FROM anuncios WHERE titulo = 'Gel Rammstein'), 'imagenes/ropa5.1.jpg'),
((SELECT id FROM anuncios WHERE titulo = 'Gel Rammstein'), 'imagenes/ropa5.2.jpeg'),
((SELECT id FROM anuncios WHERE titulo = 'Gel Rammstein'), 'imagenes/ropa5.3.png');
