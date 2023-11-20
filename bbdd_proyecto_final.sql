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

/*INSERT INTO Libros (Titulo, Genero, Autor, Num_pag, Estado, Valor)
VALUES('El camino de los reyes', 'Fantasia', 'Brandon Sanderson', 1200, 'Bueno', 33.15);*/
SELECT * FROM Libros;