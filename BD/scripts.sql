-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema gestionturnosdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gestionturnosdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gestionturnosdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `gestionturnosdb` ;

-- -----------------------------------------------------
-- Table `gestionturnosdb`.`modulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionturnosdb`.`modulos` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `activo` TINYINT(1) NULL DEFAULT '1',
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gestionturnosdb`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionturnosdb`.`clientes` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `apellidos` VARCHAR(255) NULL DEFAULT NULL,
  `dni` VARCHAR(255) NULL DEFAULT NULL,
  `nombres` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gestionturnosdb`.`tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionturnosdb`.`tickets` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(20) NULL DEFAULT 'Pendiente',
  `fecha` DATETIME(6) NULL DEFAULT NULL,
  `numero_ticket` VARCHAR(255) NULL DEFAULT NULL,
  `id_cliente` BIGINT NULL DEFAULT NULL,
  `id_modulo` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKs0208pjcp66p8it247byuo138` (`id_cliente` ASC) VISIBLE,
  INDEX `FK5nu57giglxd3aqd6a5yjmeacx` (`id_modulo` ASC) VISIBLE,
  CONSTRAINT `FK5nu57giglxd3aqd6a5yjmeacx`
    FOREIGN KEY (`id_modulo`)
    REFERENCES `gestionturnosdb`.`modulos` (`id`),
  CONSTRAINT `FKs0208pjcp66p8it247byuo138`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `gestionturnosdb`.`clientes` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gestionturnosdb`.`servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionturnosdb`.`servicios` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `activo` TINYINT(1) NULL DEFAULT '1',
  `imagen` LONGBLOB NULL DEFAULT NULL,
  `nombre_servicio` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gestionturnosdb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionturnosdb`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `apellido` VARCHAR(255) NULL DEFAULT NULL,
  `cedula` VARCHAR(255) NULL DEFAULT NULL,
  `contrasena` VARCHAR(255) NULL DEFAULT NULL,
  `correo_electronico` VARCHAR(255) NULL DEFAULT NULL,
  `estado` BIT(1) NOT NULL,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `role` VARCHAR(255) NULL DEFAULT NULL,
  `telefono` VARCHAR(255) NULL DEFAULT NULL,
  `username` VARCHAR(255) NOT NULL,
  `id_servicio` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKsrxf5imuo54dyn87fbvxwiv5d` (`id_servicio` ASC) VISIBLE,
  CONSTRAINT `FKsrxf5imuo54dyn87fbvxwiv5d`
    FOREIGN KEY (`id_servicio`)
    REFERENCES `gestionturnosdb`.`servicios` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gestionturnosdb`.`atenciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionturnosdb`.`atenciones` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(20) NULL DEFAULT 'Pendiente',
  `fecha_hora_fin` DATETIME(6) NULL DEFAULT NULL,
  `fecha_hora_inicio` DATETIME(6) NULL DEFAULT NULL,
  `id_ticket` BIGINT NULL DEFAULT NULL,
  `id_usuario` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK1cb16wfqofx66ekmiqp9uineq` (`id_ticket` ASC) VISIBLE,
  INDEX `FKph5l0cieax3hms63qvv20076m` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `FK1cb16wfqofx66ekmiqp9uineq`
    FOREIGN KEY (`id_ticket`)
    REFERENCES `gestionturnosdb`.`tickets` (`id`),
  CONSTRAINT `FKph5l0cieax3hms63qvv20076m`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `gestionturnosdb`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gestionturnosdb`.`servicios_modulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionturnosdb`.`servicios_modulos` (
  `id_modulo` BIGINT NOT NULL,
  `id_servicio` BIGINT NOT NULL,
  INDEX `FKig81gpb9vxwopmt4ujqg1gutt` (`id_servicio` ASC) VISIBLE,
  INDEX `FKdup31sgm8sw9jalikhtbqptx8` (`id_modulo` ASC) VISIBLE,
  CONSTRAINT `FKdup31sgm8sw9jalikhtbqptx8`
    FOREIGN KEY (`id_modulo`)
    REFERENCES `gestionturnosdb`.`modulos` (`id`),
  CONSTRAINT `FKig81gpb9vxwopmt4ujqg1gutt`
    FOREIGN KEY (`id_servicio`)
    REFERENCES `gestionturnosdb`.`servicios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
