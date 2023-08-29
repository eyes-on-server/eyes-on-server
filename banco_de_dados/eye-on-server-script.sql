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
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `nomeFantasia` VARCHAR(120) NULL,
  `cnpj` CHAR(14) NULL,
  `email` VARCHAR(120) NULL,
  PRIMARY KEY (`idEmpresa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eye-on-server`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `fkEmpresa` INT NOT NULL,
  `nome` VARCHAR(120) NULL,
  `root` INT NULL,
  `senha` VARCHAR(120) NULL,
  `email` VARCHAR(120) NULL,
  PRIMARY KEY (`idUsuario`, `fkEmpresa`),
  INDEX `fk_usuario_empresa_idx` (`fkEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_empresa`
    FOREIGN KEY (`fkEmpresa`)
    REFERENCES `eye-on-server`.`empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eye-on-server`.`servidor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`servidor` (
  `idServidor` INT NOT NULL AUTO_INCREMENT,
  `fkEmpresa` INT NOT NULL,
  `nomeServidor` VARCHAR(120) NULL,
  `tipoServidor` VARCHAR(120) NULL,
  `descricaoServidor` TEXT NULL,
  `localServidor` VARCHAR(120) NULL,
  PRIMARY KEY (`idServidor`),
  INDEX `fk_servidor_empresa1_idx` (`fkEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_servidor_empresa1`
    FOREIGN KEY (`fkEmpresa`)
    REFERENCES `eye-on-server`.`empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eye-on-server`.`medida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`medida` (
  `idMedida` INT NOT NULL AUTO_INCREMENT,
  `tipoMedida` VARCHAR(10) NULL,
  PRIMARY KEY (`idMedida`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eye-on-server`.`componente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`componente` (
  `idComponente` INT NOT NULL AUTO_INCREMENT,
  `fkServidor` INT NOT NULL,
  `nomeComponente` VARCHAR(120) NULL,
  `modeloComponete` VARCHAR(120) NULL,
  `valor` DECIMAL(6,3) NULL,
  `dataHora` DATETIME NULL,
  `medida_idMedida` INT NOT NULL,
  PRIMARY KEY (`idComponente`, `medida_idMedida`),
  INDEX `fk_hardware_servidor1_idx` (`fkServidor` ASC) VISIBLE,
  INDEX `fk_componente_medida1_idx` (`medida_idMedida` ASC) VISIBLE,
  CONSTRAINT `fk_hardware_servidor1`
    FOREIGN KEY (`fkServidor`)
    REFERENCES `eye-on-server`.`servidor` (`idServidor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_componente_medida1`
    FOREIGN KEY (`medida_idMedida`)
    REFERENCES `eye-on-server`.`medida` (`idMedida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eye-on-server`.`chamados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`chamados` (
  `idChamados` INT NOT NULL AUTO_INCREMENT,
  `fkComponente` INT NOT NULL,
  `tituloChamado` VARCHAR(120) NULL,
  `descricaoChamado` TEXT NULL,
  `dataHoraAbertura` DATETIME NULL,
  `statusChamado` VARCHAR(60) NULL,
  PRIMARY KEY (`idChamados`, `fkComponente`),
  INDEX `fk_chamados_componente1_idx` (`fkComponente` ASC) VISIBLE,
  CONSTRAINT `fk_chamados_componente1`
    FOREIGN KEY (`fkComponente`)
    REFERENCES `eye-on-server`.`componente` (`idComponente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
