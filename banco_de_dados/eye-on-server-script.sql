-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eye-on-server
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eye-on-server
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eye-on-server` DEFAULT CHARACTER SET utf8 ;
USE `eye-on-server` ;

-- -----------------------------------------------------
-- Table `eye-on-server`.`empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`empresa` (
  `idEmpresa` INT NOT NULL,
  `nomeFantasia` VARCHAR(45) NULL,
  `cnpj` CHAR(14) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`idEmpresa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eye-on-server`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`usuario` (
  `idusuario` INT NOT NULL,
  `fkEmpresa` INT NULL,
  `nome` VARCHAR(45) NULL,
  `root` INT NULL,
  `senha` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`idusuario`),
  INDEX `fk_usuario_empresa_idx` (`fkEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_empresa`
    FOREIGN KEY (`fkEmpresa`)
    REFERENCES `eye-on-server`.`empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
