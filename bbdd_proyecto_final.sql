CREATE DATABASE IF NOT EXISTS `mydb`;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuarios` (
  `idUsuarios` INT AUTO_INCREMENT NOT NULL,
  `Nombre` VARCHAR(45) NULL,
  `Apellidos` VARCHAR(45) NULL,
  `DNI` VARCHAR(15) NULL,
  `Correo_electronico` VARCHAR(45) NULL,
  `Telefono` INT(15) NULL,
  `Saldo` DECIMAL(10, 2) NULL,
  PRIMARY KEY (`idUsuarios`));


-- -----------------------------------------------------
-- Table `mydb`.`Libros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Libros` (
  `idLibros` INT AUTO_INCREMENT NOT NULL,
  `Titulo` VARCHAR(45) NULL,
  `Genero` VARCHAR(45) NULL,
  `Autor` VARCHAR(45) NULL,
  `Num_pag` INT NULL,
  `Estado` VARCHAR(45) NULL,
  `Valor` DECIMAL(10, 2) NULL,
  `Foto_portada` TEXT,
  PRIMARY KEY (`idLibros`));


-- -----------------------------------------------------
-- Table `mydb`.`Prestamos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Prestamos` (
  `Usuarios_idUsuarios` INT NOT NULL,
  `Libros_idLibros` INT NOT NULL,
  `Fecha_prestamo` DATE NULL,
  `idPrestamo` INT NOT NULL,
  -- PRIMARY KEY (`Usuarios_idUsuarios`, `Libros_idLibros`),
  PRIMARY KEY (`idPrestamo`),
  INDEX `fk_Usuarios_has_Libros_Libros1_idx` (`Libros_idLibros` ASC) VISIBLE,
  INDEX `fk_Usuarios_has_Libros_Usuarios_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_has_Libros_Usuarios`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `mydb`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_has_Libros_Libros1`
    FOREIGN KEY (`Libros_idLibros`)
    REFERENCES `mydb`.`Libros` (`idLibros`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mydb`.`Donaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Donaciones` (
  `Usuarios_idUsuarios` INT NOT NULL,
  `Libros_idLibros` INT NOT NULL,
  `Fecha_donacion` DATE NULL,
  `idDonacion` INT NOT NULL,
  -- PRIMARY KEY (`Usuarios_idUsuarios`, `Libros_idLibros`),
  PRIMARY KEY (`idDonacion`),
  INDEX `fk_Usuarios_has_Libros1_Libros1_idx` (`Libros_idLibros` ASC) VISIBLE,
  INDEX `fk_Usuarios_has_Libros1_Usuarios1_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_has_Libros1_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `mydb`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_has_Libros1_Libros1`
    FOREIGN KEY (`Libros_idLibros`)
    REFERENCES `mydb`.`Libros` (`idLibros`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO Usuarios (Nombre, Apellidos, DNI, Correo_electronico, Telefono, Saldo)
VALUES('Carlos', 'Terrero', '46471738F', 'carlosterrero2@gmail.com', 662076335, 1000),
('Sergi', 'Gavin', '47418649T', 'sergi.gs@hotmail.es', 638454249, 1000),
('Maria de los Angeles', 'Molina', '71243876Z', 'mariangelesmolina@gmail.com', 673928683, 1000);

INSERT INTO Libros (Titulo, Genero, Autor, Num_pag, Estado, Valor, Foto_portada)
VALUES('El señor de los anillos', 'Fantasía', 'J.R.R. Tolkien', 1392, 'Decente', 19.95, 'https://medios.lamarmota.es/senor-de-los-anillos.jpeg'),
  ('Cien años de soledad', 'Ficción', 'Gabriel García Márquez', 496, 'Bueno', 12.95, 'https://www.rae.es/sites/default/files/portada_cien_anos_de_soledad_0.jpg'),
  ('1984', 'Ficción', 'George Orwell', 352, 'Malo', 8.95, 'https://images.cdn2.buscalibre.com/fit-in/360x360/33/f9/33f911d9a7ba713874725a96c341733f.jpg'),
  ('Orgullo y prejuicio', 'Clásica', 'Jane Austen', 608, 'Decente', 12.95, 'https://edicionesinvisibles.com/sites/default/files/orgullo_y_prejuicio.jpg'),
  ('Matar un ruiseñor', 'Clásica', 'Harper Lee', 416, 'Bueno', 17.90, 'https://images.cdn3.buscalibre.com/fit-in/360x360/74/61/74616e2090e08508e87b37ed2e60df84.jpg'),
  ('Harry Potter y la piedra filosofal', 'Fantasía', 'J.K. Rowling', 264, 'Decente', 12.95, 'https://m.media-amazon.com/images/I/91R1AixEiLL._AC_UF1000,1000_QL80_.jpg'),
  ('Crónicas marcianas', 'Ficción', 'Ray Bradbury', 272, 'Malo', 9.95, 'https://images.cdn3.buscalibre.com/fit-in/360x360/bf/9d/bf9ddc9a99fdcf099a43df45f163b32d.jpg'),
  ('La sombra del viento', 'Drama', 'Carlos Ruiz Zafón', 565, 'Bueno', 22.00, 'https://agora.xtec.cat/iescabanyes/wp-content/uploads/usu559/2019/01/sombradelviento.jpg'),
  ('Juego de tronos', 'Fantasía', 'George R.R. Martin', 832, 'Bueno', 27.90, 'https://m.media-amazon.com/images/I/71wcxyxVZHL._AC_UF1000,1000_QL80_.jpg'),
  ('El gran Gatsby', 'Drama', 'F. Scott Fitzgerald', 192, 'Bueno', 18.95, 'https://m.media-amazon.com/images/I/61z0MrB6qOS._AC_UF1000,1000_QL80_.jpg'),
  ('Don Quijote de la Mancha', 'Clásica', 'Miguel de Cervantes', 1560, 'Decente', 23.95, 'https://www.marcialpons.es/media/img/portadas/2023/4/18/9788408270881jfif'),
  ('Los miserables', 'Clásica', 'Victor Hugo', 1312, 'Decente', 19.95, 'https://www.aglutinaeditores.com/media/resources/public/5d/5dfd/5dfd32726fe7415e8910d01df88b96fa'),
  ('En el camino', 'Autobiografia', 'Jack Kerouac', 400, 'Bueno', 13.90, 'https://images.cdn1.buscalibre.com/fit-in/360x360/bc/28/bc28f57ef643d98abc7328a1405158b9.jpg'),
  ('Rayuela', 'Ficción', 'Julio Cortázar', 736, 'Bueno', 11.95, 'https://m.media-amazon.com/images/I/41UfZV4MqfL.jpg'),
  ('El retrato de Dorian Gray', 'Filosofia', 'Oscar Wilde', 240, 'Decente', 4.95, 'https://www.udllibros.com/imagenes/9788494/978849490630.JPG'),
  ('Crimen y castigo', 'Policiaca', 'Fiodor Dostoievski', 752, 'Bueno', 13.95, 'https://global-uploads.webflow.com/6034d7d1f3e0f52c50b2adee/6254541d8ae4df16d4e69bc8_6034d7d1f3e0f54529b2b1a1_Crimen-y-castigo-fiodor-dostoyevski-editorial-alma.jpeg'),
  ('Moby-Dick', 'Clàsica', 'Herman Melville', 688, 'Malo', 19.90, 'https://m.media-amazon.com/images/I/51XLfXUVO9L._AC_UF1000,1000_QL80_.jpg'),
  ('El principito', 'Infantil', 'Antoine de Saint-Exupéry', 120, 'Bueno', 12.95, 'https://www.bookcenter.es/imagenes/9789877/978987751430.JPG'),
  ('Anna Karenina', 'Clásica', 'León Tolstói', 556, 'Decente', 19.95, 'https://m.media-amazon.com/images/I/716nD8GbvkL._AC_UF1000,1000_QL80_.jpg'),
  ('La odisea', 'Ficción', 'Homero', 464, 'Decente', 17.95, 'https://assets-global.website-files.com/6034d7d1f3e0f52c50b2adee/62542902e650b33bf6b7a912_60e710db1c3ed16b7bfff0df_9788418008962_Cub.jpeg'),
  ('El perfume', 'Terror', 'Patrick Süskind', 320, 'Bueno', 7.95, 'https://images.cdn2.buscalibre.com/fit-in/520x520/a6/ce/a6cee3390585e27d1258944ed98ad960.jpg'),
  ('El nombre del viento', 'Fantasía', 'Patrick Rothfuss', 880, 'Bueno', 10.95, 'https://m.media-amazon.com/images/I/51cGrEjmBDL.jpg'),
  ('Cazadores de sombras', 'Fantasía', 'Cassandra Clare', 512, 'Decente', 17.95, 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/201712/26/00106539538493____4__1200x1200.jpg'),
  ('Frankenstein', 'Terror', 'Mary Shelley', 168, 'Malo', 13.50, 'https://global-uploads.webflow.com/6034d7d1f3e0f52c50b2adee/625452f43a8fa502af2b8a14_6034d7d1f3e0f525c6b2b272_frankenstein-mary-shelley-editorial-alma.jpeg'),
  ('Los pilares de la Tierra', 'Ficción', 'Ken Follett', 1040, 'Bueno', 24.90, 'https://m.media-amazon.com/images/I/91jmvHEG3YL._AC_UF1000,1000_QL80_.jpg'),
  ('Las uvas de la ira', 'Ficción', 'John Steinbeck', 688, 'Bueno', 18.95, 'https://images.cdn3.buscalibre.com/fit-in/360x360/d5/cf/d5cf867e1bbaef171c4f0b4243351aff.jpg'),
  ('El diario de Ana Frank', 'Histórica', 'Ana Frank', 128, 'Malo', 14.95, 'https://images.cdn2.buscalibre.com/fit-in/360x360/ca/68/ca68f22e2929bf812303fdc9cbe05624.jpg'),
  ('La isla del tesoro', 'Infantil', 'Robert Louis Stevenson', 168, 'Decente', 13.50, 'https://cdn.edelvives.es/docs/catalogo/17815/imgs/original/173313_Fic_Cub_IslaTesoro_EvWeb.jpg'),
  ('Drácula', 'Terror', 'Bram Stoker', 576, 'Bueno', 19.90, 'https://global-uploads.webflow.com/6034d7d1f3e0f52c50b2adee/62545414f3a6fb9f5d120730_6034d7d1f3e0f55ec6b2b1da_Dracula-bram-stocker-editorial-alma.jpeg');
  
SELECT DISTINCT * FROM Libros ORDER BY idLibros;
SELECT * FROM Usuarios;