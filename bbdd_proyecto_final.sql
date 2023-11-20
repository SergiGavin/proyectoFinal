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
  PRIMARY KEY (`idLibros`));


-- -----------------------------------------------------
-- Table `mydb`.`Prestamos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Prestamos` (
  `Usuarios_idUsuarios` INT NOT NULL,
  `Libros_idLibros` INT NOT NULL,
  `Fecha_prestamo` DATE NULL,
  PRIMARY KEY (`Usuarios_idUsuarios`, `Libros_idLibros`),
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
  PRIMARY KEY (`Usuarios_idUsuarios`, `Libros_idLibros`),
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

INSERT INTO Libros (Titulo, Genero, Autor, Num_pag, Estado, Valor)
VALUES('El señor de los anillos', 'Fantasía', 'J.R.R. Tolkien', 1200, 'Decente', 45.99),
  ('Cien años de soledad', 'Realismo mágico', 'Gabriel García Márquez', 368, 'Bueno', 28.50),
  ('1984', 'Distopía', 'George Orwell', 328, 'Malo', 22.99),
  ('Orgullo y prejuicio', 'Novela romántica', 'Jane Austen', 432, 'Decente', 30.00),
  ('Matar un ruiseñor', 'Novela clásica', 'Harper Lee', 384, 'Bueno', 26.75),
  ('Harry Potter y la piedra filosofal', 'Fantasía', 'J.K. Rowling', 336, 'Decente', 32.99),
  ('Crónicas marcianas', 'Ciencia ficción', 'Ray Bradbury', 288, 'Malo', 18.75),
  ('La sombra del viento', 'Novela histórica', 'Carlos Ruiz Zafón', 544, 'Bueno', 35.20),
  ('Juego de tronos', 'Fantasía', 'George R.R. Martin', 694, 'Bueno', 40.50),
  ('El gran Gatsby', 'Novela modernista', 'F. Scott Fitzgerald', 200, 'Bueno', 24.99),
  ('Don Quijote de la Mancha', 'Novela clásica', 'Miguel de Cervantes', 992, 'Decente', 29.99),
  ('Los miserables', 'Novela histórica', 'Victor Hugo', 1463, 'Decente', 48.75),
  ('En el camino', 'Novela de viaje', 'Jack Kerouac', 320, 'Bueno', 27.50),
  ('Rayuela', 'Novela experimental', 'Julio Cortázar', 576, 'Bueno', 23.45),
  ('El retrato de Dorian Gray', 'Novela gótica', 'Oscar Wilde', 254, 'Decente', 34.25),
  ('Crimen y castigo', 'Novela psicológica', 'Fiodor Dostoievski', 551, 'Bueno', 38.99),
  ('Moby-Dick', 'Novela aventura', 'Herman Melville', 624, 'Malo', 29.75),
  ('El principito', 'Literatura infantil', 'Antoine de Saint-Exupéry', 96, 'Bueno', 20.15),
  ('Anna Karenina', 'Novela realista', 'León Tolstói', 864, 'Decente', 42.80),
  ('La odisea', 'Épica', 'Homero', 416, 'Decente', 25.99),
  ('El perfume', 'Novela histórica', 'Patrick Süskind', 255, 'Bueno', 37.25),
  ('El nombre del viento', 'Fantasía', 'Patrick Rothfuss', 662, 'Bueno', 33.99),
  ('Cazadores de sombras', 'Fantasía urbana', 'Cassandra Clare', 485, 'Decente', 36.50),
  ('Frankenstein', 'Novela gótica', 'Mary Shelley', 280, 'Malo', 22.80),
  ('Los pilares de la Tierra', 'Novela histórica', 'Ken Follett', 973, 'Bueno', 41.99),
  ('Las uvas de la ira', 'Novela realista', 'John Steinbeck', 464, 'Bueno', 39.75),
  ('El diario de Ana Frank', 'Diario', 'Ana Frank', 283, 'Malo', 21.50),
  ('La isla del tesoro', 'Novela de aventuras', 'Robert Louis Stevenson', 311, 'Decente', 26.99),
  ('Drácula', 'Novela gótica', 'Bram Stoker', 418, 'Bueno', 32.20);
SELECT * FROM Libros;