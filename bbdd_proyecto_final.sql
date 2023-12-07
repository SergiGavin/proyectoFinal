DROP DATABASE IF EXISTS `mydb`;
CREATE DATABASE IF NOT EXISTS `mydb`;
USE `mydb`;

-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Usuarios` (
  `id_usuarios` INT AUTO_INCREMENT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellidos` VARCHAR(45) NOT NULL,
  `DNI` VARCHAR(15) NOT NULL UNIQUE,
  `Correo_electronico` VARCHAR(45) NOT NULL UNIQUE,
  `Telefono` INT(15) NOT NULL,
  `Saldo` DECIMAL(10, 2) NOT NULL,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `pass` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_usuarios`));


-- -----------------------------------------------------
-- Table `mydb`.`Libros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Libros` (
  `id_libros` INT AUTO_INCREMENT NOT NULL,
  `Titulo` VARCHAR(45) NOT NULL,
  `Genero` VARCHAR(45) NOT NULL,
  `Autor` VARCHAR(45) NOT NULL,
  `Num_pag` INT NOT NULL,
  `Estado` VARCHAR(45) NOT NULL,
  `Valor` DECIMAL(10, 2) NOT NULL,
  `Foto_portada` TEXT NOT NULL,
  `sinopsis` TEXT NOT NULL,
  PRIMARY KEY (`id_libros`));


-- -----------------------------------------------------
-- Table `mydb`.`Prestamos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Prestamos` (
  `id_usuarios` INT NOT NULL,
  `id_libros` INT NOT NULL,
  `Fecha_prestamo` DATE NOT NULL,
  `Fecha_devolucion` DATE NOT NULL,
  `id_prestamo` INT NOT NULL AUTO_INCREMENT,
  -- PRIMARY KEY (`Usuarios_idUsuarios`, `Libros_idLibros`),
  PRIMARY KEY (`id_prestamo`),
  INDEX `fk_Usuarios_has_Libros_Libros1_idx` (`id_libros` ASC) VISIBLE,
  INDEX `fk_Usuarios_has_Libros_Usuarios_idx` (`id_usuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_has_Libros_Usuarios`
    FOREIGN KEY (`id_usuarios`)
    REFERENCES `Usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_has_Libros_Libros1`
    FOREIGN KEY (`id_libros`)
    REFERENCES `Libros` (`id_libros`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mydb`.`Donaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Donaciones` (
  `id_usuarios` INT NOT NULL,
  `id_libros` INT NOT NULL,
  `Fecha_donacion` DATE NOT NULL,
  `id_donacion` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(15),
  -- PRIMARY KEY (`Usuarios_idUsuarios`, `Libros_idLibros`),
  PRIMARY KEY (`id_donacion`),
  INDEX `fk_Usuarios_has_Libros1_Libros1_idx` (`id_libros` ASC) VISIBLE,
  INDEX `fk_Usuarios_has_Libros1_Usuarios1_idx` (`id_usuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_has_Libros1_Usuarios1`
    FOREIGN KEY (`id_usuarios`)
    REFERENCES `Usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_has_Libros1_Libros1`
    FOREIGN KEY (`id_libros`)
    REFERENCES `Libros` (`id_libros`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE IF NOT EXISTS `temas` (
	`id_tema` INT PRIMARY KEY AUTO_INCREMENT,
    `titulo_tema` VARCHAR(255),
    `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `usuario_creador` INT,
    FOREIGN KEY (`usuario_creador`) REFERENCES `Usuarios` (`id_usuarios`)
);

CREATE TABLE IF NOT EXISTS `mensajes` (
	`mensaje_id` INT PRIMARY KEY AUTO_INCREMENT,
    `contenido` TEXT,
    `fecha_publicacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `autor_id` INT,
    `tema_id` INT, 
    FOREIGN KEY (`autor_id`) REFERENCES `Usuarios`(`id_usuarios`),
    FOREIGN KEY (`tema_id`) REFERENCES `temas`(`id_tema`)
);

INSERT INTO Usuarios (Nombre, Apellidos, DNI, Correo_electronico, Telefono, Saldo, username, pass)
VALUES('Carlos', 'Terrero', '46471738F', 'carlosterrero2@gmail.com', 662076335, 1000, 'chavooo95', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b'),
('Sergi', 'Gavin', '47418649T', 'sergi.gs@hotmail.es', 638454249, 1000, 'sergigav', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb'),
('Maria de los Angeles', 'Molina', '71243876Z', 'mariangelesmolina@gmail.com', 673928683, 1000, 'Arih', '8bfa829b8119a6f39b91fd8decec63830b556e4d88a9da29334d7b0558829f2d');

INSERT INTO Libros (Titulo, Genero, Autor, Num_pag, Estado, Valor, Foto_portada, sinopsis)
VALUES
('El amor en los tiempos del cólera', 'Romance', 'Gabriel García Márquez', 368, 'Bueno', 16.95, 'https://imagessl1.casadellibro.com/a/l/s7/51/9788439728351.webp', 'La historia de amor entre Florentino Ariza y Fermina Daza, personajes cuyas vidas transcurren a lo largo del siglo XIX y principios del XX en distintos pueblos y ciudades de Colombia. Florentino y Fermina se enamoran cuando son jóvenes, pero Fermina termina casándose con un médico adinerado. A pesar de este matrimonio, Florentino nunca dejará de amarla y esperará pacientemente el momento de volver a encontrarse con ella.'),
('El retrato de Dorian Gray', 'Ficción', 'Oscar Wilde', 272, 'Bueno', 14.95, 'https://imagessl2.casadellibro.com/a/l/s7/42/9788467070842.webp', 'El retrato de Dorian Gray es una novela que explora los límites morales y el alma humana. Dorian Gray, un joven bello y seductor, intercambia su alma por la inmortalidad. Mientras su retrato envejece y se vuelve cada vez más oscuro, él permanece joven y hermoso. La historia trata sobre la corrupción moral y los dilemas éticos que acompañan la búsqueda de la eterna juventud y el placer.'),
('El señor de los anillos', 'Fantasía', 'J.R.R. Tolkien', 1392, 'Decente', 19.95, 'https://medios.lamarmota.es/senor-de-los-anillos.jpeg', 'En la Tierra Media, el Señor Oscuro Sauron ordenó a los Elfos que forjaran los Grandes Anillos de Poder. Tres para los reyes Elfos, siete para los Señores Enanos, y nueve para los Hombres Mortales. Pero Saurón también forjó, en secreto, el Anillo Único, que tiene el poder de esclavizar toda la Tierra Media. Con la ayuda de sus amigos y de valientes aliados, el joven hobbit Frodo emprende un peligroso viaje con la misión de destruir el Anillo Único. Pero el malvado Sauron ordena la persecución del grupo, compuesto por Frodo y sus leales amigos hobbits, un mago, un hombre, un elfo y un enano. La misión es casi suicida pero necesaria, pues si Sauron con su ejército de orcos lograra recuperar el Anillo, sería el final de la Tierra Media.'),
('Cien años de soledad', 'Ficción', 'Gabriel García Márquez', 496, 'Bueno', 12.95, 'https://www.rae.es/sites/default/files/portada_cien_anos_de_soledad_0.jpg', 'Muchos años después, frente al pelotón de fusilamiento, el coronel  Aureliano Buendía había de recordar aquella tarde remota en que su padre  lo llevó a conocer el hielo. Macondo era entonces una aldea de veinte  casas de barro y cañabrava construidas a la orilla de un río de aguas  diáfanas que se precipitaban por un lecho de piedras pulidas, blancas y  enormes como huevos prehistóricos. El mundo era tan reciente, que muchas  cosas carecían de nombre, y para mencionarlas había que señalarlas con el dedo'),
('1984', 'Ficción', 'George Orwell', 352, 'Malo', 8.95, 'https://images.cdn2.buscalibre.com/fit-in/360x360/33/f9/33f911d9a7ba713874725a96c341733f.jpg', 'Muchos años después, frente al pelotón de fusilamiento, el coronel  Aureliano Buendía había de recordar aquella tarde remota en que su padre  lo llevó a conocer el hielo. Macondo era entonces una aldea de veinte  casas de barro y cañabrava construidas a la orilla de un río de aguas  diáfanas que se precipitaban por un lecho de piedras pulidas, blancas y  enormes como huevos prehistóricos. El mundo era tan reciente, que muchas  cosas carecían de nombre, y para mencionarlas había que señalarlas con el dedo'),
('Orgullo y prejuicio', 'Clásica', 'Jane Austen', 608, 'Decente', 12.95, 'https://edicionesinvisibles.com/sites/default/files/orgullo_y_prejuicio.jpg', 'La señora Bennet ha criado a sus cinco hijas con el único deseo de encontrar marido. La llegada al vecindario de Charles Bingley, un joven rico y soltero, con algunas amistades despierta el interés de las hermanas Bennet y de las familias vecinas, que verán una excelente oportunidad para cumplir su propósito. Elizabeth, una de las hijas de los Bennet, empezará una singular relación con Darcy, uno de los amigos de Bingley, que desencadenará esta historia de orgullo y prejuicios entre los dos hasta llegar a conocer el verdadero amor. '),
('Matar un ruiseñor', 'Clásica', 'Harper Lee', 416, 'Bueno', 17.90, 'https://images.cdn3.buscalibre.com/fit-in/360x360/74/61/74616e2090e08508e87b37ed2e60df84.jpg', '«Dispara a todos los grajos que quieras, si puedes acertarles, pero recuerda que es pecado matar a un ruiseñor.» Este es el consejo que da a sus hijos un abogado que está defendiendo al verdadero ruiseñor del clásico de Harper Lee: un hombre de color acusado de violar a una joven blanca. Desde la mirada de Jem y Scout Finch, Harper Lee explora con humor y una honestidad insobornable la irracional actitud que en cuestiones de raza y clase social tenían los adultos del Sur profundo de los años treinta. Harper Lee está de plena actualidad por el redescubrimiento de la novela original, rechazada por sus editores en su momento y una de cuyas tramas secundarias es la que dio origen a la novelaMatar a un ruiseñor y a las películas homónima ganadora de varios Oscar. Jean Louise Finch evoca una época de su infancia en Alabama, cuando su padre, Atticus, decidió defender ante los tribunales a un hombre negro acusado de violar a una mujer blanca. Novela de iniciación,Matar a un ruiseñor muestra una comunidad, la del sur de Estados Unidos durante la década de 1930, dominada por los prejuicios raciales, la desconfianza hacia lo diferente, la rigidez de los vínculos familiares y vecinales, así como por un sistema judicial sin apenas garantías para la población de color.'),
('Harry Potter y la piedra filosofal', 'Fantasía', 'J.K. Rowling', 264, 'Decente', 12.95, 'https://m.media-amazon.com/images/I/91R1AixEiLL._AC_UF1000,1000_QL80_.jpg', 'El día en que cumple once años, Harry Potter se entera de que es hijo de dos destacados hechiceros, de los que ha heredado poderes mágicos. En la escuela Hogwarts de Magia y Hechicería, donde se educa con otros niños que también tienen poderes especiales, aprenderá todo lo necesario para ser mago.'),
('Crónicas marcianas', 'Ficción', 'Ray Bradbury', 272, 'Malo', 9.95, 'https://images.cdn3.buscalibre.com/fit-in/360x360/bf/9d/bf9ddc9a99fdcf099a43df45f163b32d.jpg', 'Esta colección de relatos reúne la crónica de la colonización de Marte por parte de la Humanidad, que abandona la Tierra en sucesivas oleadas de cohetes plateados y sueña con reproducir en el planeta rojo una civilización de perritos calientes, cómodos sofás y limonada en el porche al atardecer.'),
('La sombra del viento', 'Drama', 'Carlos Ruiz Zafón', 565, 'Bueno', 22.00, 'https://agora.xtec.cat/iescabanyes/wp-content/uploads/usu559/2019/01/sombradelviento.jpg', 'El Cementerio de los Libros Olvidados, el cuarteto de novelas que arranca con La Sombra del Viento y sigue con El Juego del Ángel, se ha convertido en la gran saga novelística en curso de nuestro tiempo. La leyenda comenzaba en el año 2000, cuando Ruiz Zafón culminaba su primera novela para adultos y estaba a punto de dar a conocer un libro mágico que cambiaría el panorama literario, y que hoy sigue ganando el corazón de miles de lectores en todo el mundo. Un amanecer de 1945, un muchacho es conducido por su padre a un misterioso lugar oculto en el corazón de la ciudad vieja: El Cementerio de los Libros Olvidados. Allí, Daniel Sempere encuentra un libro maldito que cambia el rumbo de su vida y le arrastra a un laberinto de intrigas y secretos enterrados en el alma oscura de la ciudad. La Sombra del Viento es un misterio literario ambientado en la Barcelona de la primera mitad del siglo xx, desde los últimos esplendores del Modernismo hasta las tinieblas de la posguerra. Aunando las técnicas del relato de intriga y suspense, la novela histórica y la comedia de costumbres, La Sombra del Viento es sobre todo una trágica historia de amor cuyo eco se proyecta a través del tiempo. Con gran fuerza narrativa, el autor entrelaza tramas y enigmas a modo de muñecas rusas en un inolvidable relato sobre los secretos del corazón y el embrujo de los libros cuya intriga se mantiene hasta la última página.'),
('Juego de tronos', 'Fantasía', 'George R.R. Martin', 832, 'Bueno', 27.90, 'https://m.media-amazon.com/images/I/71wcxyxVZHL._AC_UF1000,1000_QL80_.jpg', 'Tras el largo verano, el invierno se acerca a los Siete Reinos. Lord Eddars Stark, señor de Invernalia, deja sus dominios para unirse a la corte del rey Robert Baratheon el Usurpador, hombre díscolo y otrora guerrero audaz cuyas mayores aficiones son comer, beber y engendrar bastardos. Eddard Stark desempeñará el cargo de Mano del Rey e intentará desentrañar una maraña de intrigas que pondrá en peligro su vida... y la de los suyos. En un mundo cuyas estaciones duran décadas y en el que retazos de una magia inmemorial y olvidada surgen en los rincones más sombrios y maravillosos, la traición y la lealtad, la compasión y la sed de venganza, el amor y el poder hacen del juego de tronos una poderosa trampa que atrapa en sus fauces a los personajes... y al lector.'),
('El gran Gatsby', 'Drama', 'F. Scott Fitzgerald', 192, 'Bueno', 18.95, 'https://m.media-amazon.com/images/I/61z0MrB6qOS._AC_UF1000,1000_QL80_.jpg', 'Situada en plena Belle Époque estadounidense, luego de la Primera Guerra Mundial, en la zona residencial de Long Island, El gran Gatsby cuenta la historia de un dramático “pentágono” amoroso, a la vez que deja entrever las consecuencias inadvertidas del conflicto bélico, la corrupción económica disfrazada de oportunidad financiera y el declive de una clase social amenazada por su propia ceguera. Jay Gatsby, un hombre atractivo y misterioso, ha vuelto de los campos de batalla en Europa e intenta reconquistar a Daisy, al principio con amagos de opulencia. La joven está casada con Tom Buchanan, fiel creyente en los valores del establishment, incluida la supremacía de la raza blanca y la respetabilidad familiar, lo que no le impide tener amoríos clandestinos. Nick Carraway, el célebre narrador, intentará mostrar los hechos sin juzgar a los actores. El jazz, el lujo, las fiestas, el alcohol y una sexualidad que aspira a romper los corsés impuestos circundan una trama impecable –Francis Scott Fitzgerald consideró que había escrito “la mejor novela de Estados Unidos” hasta entonces– que progresivamente adquiere tintes sombríos. Edith Wharton, T. S. Eliot, John Updike y Haruki Murakami, entre otros varios escritores, encontraron en El gran Gatsby la clave de una novela perfecta. Parábola del desengaño de los ideales juveniles y de la cortesía extrema como represalia sutil, merece ser leída nuevamente o por primera vez.'),
('Don Quijote de la Mancha', 'Clásica', 'Miguel de Cervantes', 1560, 'Decente', 23.95, 'https://www.marcialpons.es/media/img/portadas/2023/4/18/9788408270881jfif', 'El ingenioso hidalgo don Quijote de la Mancha narra las aventuras de Alonso Quijano, un hidalgo pobre que de tanto leer novelas de caballería acaba enloqueciendo y creyendo ser un caballero andante, nombrándose a sí mismo como don Quijote de la Mancha.'),
('Los miserables', 'Clásica', 'Victor Hugo', 1312, 'Decente', 19.95, 'https://www.aglutinaeditores.com/media/resources/public/5d/5dfd/5dfd32726fe7415e8910d01df88b96fa', 'Es la historia de Jean Valjean, un convicto que estuvo injustamente encarcelado por 19 años por haberse robado una rebanada de pan. Al ser liberado de su injusta condena, Valjean trata de escapar de su pasado, lleno de maldad y depravación, para vivir una vida digna y honesta.'),
('Rayuela', 'Ficción', 'Julio Cortázar', 736, 'Bueno', 11.95, 'https://m.media-amazon.com/images/I/41UfZV4MqfL.jpg', 'La historia se desarrolla en la ciudad de París, donde Horacio Oliveira vaga por los puentes de la ciudad en busca de su amante, una mujer uruguaya llamada Lucía. Su relación es apasionada pero sus caracteres son bien distintos: Lucía, más tarde conocida como La Maga, de temperamento pasional, está enamorada de Horacio, más analítico y frío, mientras que él parece no querer involucrarse emocionalmente con ella.'),
('Crimen y castigo', 'Policiaca', 'Fiodor Dostoievski', 752, 'Bueno', 13.95, 'https://global-uploads.webflow.com/6034d7d1f3e0f52c50b2adee/6254541d8ae4df16d4e69bc8_6034d7d1f3e0f54529b2b1a1_Crimen-y-castigo-fiodor-dostoyevski-editorial-alma.jpeg', 'Nadie ha retratado la psicología humana como lo hizo Fiódor Dostoyevski. Su obra, fiel reflejo de una personalidad compleja y atormentada, marca una de las cimas de la narrativa universal. Admirada por generaciones de lectores y autores, Crimen y castigo narra el asesinato cometido por Rodión Raskólnikov, un estudiante arrogante y endeudado cuyo nihilismo anticipa la literatura existencialista. Su descenso a los infierno corre en paralelo al de la ciudad de San Petersburgo, en plena decadencia, que Dostoyevski retrata con pulso firme y una galería de personajes absolutamente memorables.'),
('Moby-Dick', 'Clàsica', 'Herman Melville', 688, 'Malo', 19.90, 'https://m.media-amazon.com/images/I/51XLfXUVO9L._AC_UF1000,1000_QL80_.jpg', 'La obsesiva y enloquecida lucha del capitán Ahab contra la gran ballena blanca no solo es un clásico de la literatura, sino también uno de los últimos grandes mitos del imaginario contemporáneo. Bill Sienkiewicz, aquí en la cúspide de su evolución artística, exalta su aliento épico y simbólico pintando un descenso hacia el abismo donde heroísmo y locura acaban confundiéndose irremediablemente y transmitiendo con viveza la oscura tragedia que se produce cuando, para vencer al mal, se sucumbe ante el mismo mal.  El grafista estadounidense, con sus composiciones en tonos especialmente oscuros, explota a la perfección el aspecto angustioso de la obra y, en particular, la locura asesina del capitán Ahab, sin olvidar la inmensidad del océano y su furia cuando se desata. Por supuesto, los retratos de la tripulación del Pequod son extremadamente fieles a la esencia de cada personaje, lo que nos permite redescubrir las inmensas cualidades literarias de la obra original.  La publicación por Astiberri de esta adaptación del clásico de Herman Melville, realizada por Bill Sienkiewicz hace ahora 30 años, pone en evidencia el valor de una obra que conserva toda su potencia visual.'),
('El principito', 'Infantil', 'Antoine de Saint-Exupéry', 120, 'Bueno', 12.95, 'https://www.bookcenter.es/imagenes/9789877/978987751430.JPG', 'En 2000, Harcourt reeditó con orgullo la obra maestra de Antoine de Saint-Exupéry, El Principito, en un formato nuevo y brillante. Recién traducido por el poeta Richard Howard, ganador del Premio Pulitzer, este clásico atemporal fue acogido por críticos y lectores de todo el país por su pureza y belleza de expresión. Y la querida obra de arte de Saint-Exupéry fue restaurada y remasterizada para presentar su obra en sus colores originales y vibrantes. Ahora Harcourt publica ediciones uniformes a todo color en idiomas extranjeros. La obra de arte restaurada brilla como nunca antes. Estas hermosas y asequibles ediciones seguramente harán las delicias de toda una nueva generación de lectores, estudiantes, niños y adultos para quienes la historia de Saint-Exupéry abrirá la puerta a una nueva comprensión de la vida.'),
('Anna Karenina', 'Clásica', 'León Tolstói', 556, 'Decente', 19.95, 'https://m.media-amazon.com/images/I/716nD8GbvkL._AC_UF1000,1000_QL80_.jpg', 'Anna Karénina, que Tolstói empezó a escribir en 1873 y no vería publicada en forma de libro hasta 1878, es una exhaustiva disquisición sobre la institución familiar y, quizá ante todo, como dice Víctor Gallego (autor de esta nueva traducción), «una fábula sobre la búsqueda de la felicidad». La idea de que la felicidad no consiste en la satisfacción de los deseos preside la detallada descripción de una galería espléndida de personajes que conocen la incertidumbre y la decepción, el vértigo y el tedio, los mayores placeres y las más tristes miserias.'),
('La odisea', 'Ficción', 'Homero', 464, 'Decente', 17.95, 'https://assets-global.website-files.com/6034d7d1f3e0f52c50b2adee/62542902e650b33bf6b7a912_60e710db1c3ed16b7bfff0df_9788418008962_Cub.jpeg', 'Una vez terminada la guerra de Troya, Ulises emprende el regreso a Ítaca donde lo esperan su hijo Telémaco y su fiel esposa Penélope. El viaje se alargará diez interminables años durante los cuales el héroe griego y sus compañeros sufren toda suerte de desventuras. Solo la astucia ayudará a Ulises a llegar sano y salvo a su patria.'),
('El perfume', 'Terror', 'Patrick Süskind', 320, 'Bueno', 7.95, 'https://images.cdn2.buscalibre.com/fit-in/520x520/a6/ce/a6cee3390585e27d1258944ed98ad960.jpg', 'Jean-Baptiste Grenouille es, gracias a su prodi­gioso sentido del olfato, el mejor elaborador de perfumes de todos los tiempos. Pero es un ser gro­tesco, deforme y repulsivo a los ojos de las mujeres. Como venganza a tanta ofensa sufrida a causa de su aspecto físico, elabora un raro perfume que sub­yuga la voluntad de quien lo huele. Así, Jean-Bap­tiste consigue el favor de las damas de la alta socie­dad y el dominio de los poderosos. Existe un único problema: para obtener la esencia elemental de la mágica fragancia se necesitan los fluidos corporales de jovencitas vírgenes, y, para ello, el perfumista no duda en convertirse en un obsesivo, cruel y despiadado asesino.'),
('El nombre del viento', 'Fantasía', 'Patrick Rothfuss', 880, 'Bueno', 10.95, 'https://m.media-amazon.com/images/I/51cGrEjmBDL.jpg', 'En una posada en tierra de nadie, un hombre se dispone a relatar, por primera vez, la auténtica historia de su vida. Una historia que únicamente él conoce y que ha quedado diluida tras los rumores, las conjeturas y los cuentos de taberna que le han convertido en un personaje legendario a quien todos daban ya por muerto: Kvothe... músico, mendigo, ladrón, estudiante, mago, héroe y asesino. Ahora va a revelar la verdad sobre sí mismo. Y para ello debe empezar por el principio: su infancia en una troupe de artistas itinerantes, los años malviviendo como un ladronzuelo en las calles de una gran ciudad y su llegada a una universidad donde esperaba encontrar todas las respuestas que había estado buscando.'),
('Frankenstein', 'Terror', 'Mary Shelley', 168, 'Malo', 13.50, 'https://global-uploads.webflow.com/6034d7d1f3e0f52c50b2adee/625452f43a8fa502af2b8a14_6034d7d1f3e0f525c6b2b272_frankenstein-mary-shelley-editorial-alma.jpeg', '«Si no puedo inspirar amor, desencadenaré el miedo». Robert Walton es un escritor fracasado que se propone explorar el Polo Norte con la esperanza de expandir el conocimiento científico. Durante el viaje, la tripulación rescata a un hombre casi congelado llamado Victor Frankenstein. Frankenstein ve en Walton la misma obsesión que lo ha destruido a él y le cuenta su historia, la de un joven estudiante de ciencias que crea un hombre artificial a partir de fragmentos de cadáveres. Esta escalofriante narración gótica que comenzó cuando Mary Shelley tenía solo dieciocho años de edad, ha pasado a ser la obra de terror más famosa del mundo y sigue siendo una exploración devastadora de los límites de la ambición humana.'),
('Los pilares de la Tierra', 'Ficción', 'Ken Follett', 1040, 'Bueno', 24.90, 'https://m.media-amazon.com/images/I/91jmvHEG3YL._AC_UF1000,1000_QL80_.jpg', 'El gran maestro de la narrativa de acción y suspense nos transporta a la Edad Media, a un fascinante mundo de reyes, damas, caballeros, pugnas feudales, castillos y ciudades amuralladas. El amor y la muerte se entrecruzan vibrantemente en este magistral tapiz cuyo centro es la construcción de una catedral gótica. La historia se inicia con el ahorcamiento público de un inocente y finaliza con la humillación de un rey.'),
('Las uvas de la ira', 'Ficción', 'John Steinbeck', 688, 'Bueno', 18.95, 'https://images.cdn3.buscalibre.com/fit-in/360x360/d5/cf/d5cf867e1bbaef171c4f0b4243351aff.jpg', 'John Steinbeck también sufrió los efectos de la Depresión; fue testigo del éxodo rural masivo que emigra del norte hacia el sur y tomó en los años 30 partido por los explotados, los jornaleros emigrantes." Las uvas de la ira"  es la crónica de una familia depauperada en su viaje hacia una tierra de promisión, buscando trabajo y mejores condiciones de vida. Steinbeck sabe trascender lo puramente propagandístico o moralizante cuando unos personajes de ficción llenos de profundidad y humanidad, auténticos luchadores, no dudan en denunciar los abusos del poder y la despiadada crueldad y desamparo que sufren los más débiles.'),
('El diario de Ana Frank', 'Histórica', 'Ana Frank', 128, 'Malo', 14.95, 'https://images.cdn2.buscalibre.com/fit-in/360x360/ca/68/ca68f22e2929bf812303fdc9cbe05624.jpg', 'Anne Marie Frank (Frankfurt, 1929 – campo de concentración de Bergen-Belsen, Alemania, 1945) fue hija de una familia germana de origen judío. Se trasladó con los suyos a los Países Bajos con la llegada de Hitler al poder en 1933. Durante la Segunda Guerra Mundial, después de la invasión alemana de Holanda en 1940 y de padecer las primeras consecuencias de las leyes antisemitas, Ana y su familia consiguieron esconderse en unas habitaciones traseras, abandonadas y aisladas, de un edificio de oficinas de Ámsterdam, donde permanecieron ocultos desde 1942 hasta 1944, cuando fueron descubiertos por la Gestapo. Ana llevó un diario de ese periodo de reclusión, que su padre, único superviviente de la familia, dio a conocer acabada la guerra, después de que Ana y el resto de la familia hubieran sido detenidos y confinados en un campo de exterminio, donde murieron.'),
('La isla del tesoro', 'Infantil', 'Robert Louis Stevenson', 168, 'Decente', 13.50, 'https://cdn.edelvives.es/docs/catalogo/17815/imgs/original/173313_Fic_Cub_IslaTesoro_EvWeb.jpg', 'Jim Hawkins regenta, junto a sus padres, la posada Almirante Benbow. Su  vida discurre tranquila entre la barra y las mesas hasta que, un día, un  viejo marinero entra en su fonda acarreando un pesado secreto... De la  noche a la mañana el joven Jim se encuentra en la cubierta de la Hispaniola, rodeado de rudos marineros, agasajado por un  misterioso cocinero cojo, ansiosos todos ellos por encontrar el codiciado tesoro del capitán Flint.'),
('Drácula', 'Terror', 'Bram Stoker', 576, 'Bueno', 19.90, 'https://global-uploads.webflow.com/6034d7d1f3e0f52c50b2adee/62545414f3a6fb9f5d120730_6034d7d1f3e0f55ec6b2b1da_Dracula-bram-stocker-editorial-alma.jpeg', 'Jonathan Harker viaja a Transilvania para cerrar un negocio inmobiliario  con un misterioso conde que acaba de comprar varias propiedades en  Londres. Despues de un viaje plagado de ominosas señales, Harker es  recogido en el paso de Borgo por un siniestro carruaje que lo llevará,  acunado por el canto de los lobos, a un castillo en ruinas. Tal es el  inquietante principio de una novela magistral que alumbró uno de los mitos más populares y poderosos de todos los tiempos: Drácula.');

INSERT INTO `mydb`.`Prestamos` (`id_usuarios`, `id_libros`, `Fecha_prestamo`, `Fecha_devolucion`) VALUES ('2', '1', '2023-02-20', '2023-02-25'), ('3', '24', '2023-02-20', '2023-02-25');
INSERT INTO `mydb`.`Donaciones` (`id_usuarios`, `id_libros`, `Fecha_donacion`, `username`) VALUES ('3', '8', '2017-02-20', NULL), ('1', '17', '1995-02-22', NULL);
SELECT * FROM Donaciones;
SELECT * FROM Prestamos;
SELECT * FROM Libros;
SELECT * FROM Usuarios;