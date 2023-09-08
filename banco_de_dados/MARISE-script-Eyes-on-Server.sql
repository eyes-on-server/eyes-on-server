-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema eye-on-server
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eye-on-server
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eye-on-server` DEFAULT CHARACTER SET utf8mb3 ;
USE `eye-on-server` ;

-- -----------------------------------------------------
-- Table `eye-on-server`.`empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `nomeFantasia` VARCHAR(120) NULL DEFAULT NULL,
  `cnpj` CHAR(14) NULL DEFAULT NULL,
  `email` VARCHAR(120) NULL DEFAULT NULL,
  PRIMARY KEY (`idEmpresa`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `eye-on-server`.`servidor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`servidor` (
  `idServidor` INT NOT NULL AUTO_INCREMENT,
  `fkEmpresa` INT NULL DEFAULT NULL,
  `nomeServidor` VARCHAR(120) NULL DEFAULT NULL,
  `tipoServidor` VARCHAR(120) NULL DEFAULT NULL,
  `descricaoServidor` VARCHAR(120) NULL DEFAULT NULL,
  `localServidor` VARCHAR(120) NULL DEFAULT NULL,
  PRIMARY KEY (`idServidor`),
  INDEX `fk_servidor_empresa_idx` (`fkEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_servidor_empresa`
    FOREIGN KEY (`fkEmpresa`)
    REFERENCES `eye-on-server`.`empresa` (`idEmpresa`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `eye-on-server`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `fkEmpresa` INT NULL DEFAULT NULL,
  `nome` VARCHAR(120) NULL DEFAULT NULL,
  `root` INT,
  `senha` VARCHAR(120) NULL DEFAULT NULL,
  `email` VARCHAR(120) NULL DEFAULT NULL,
  PRIMARY KEY (`idusuario`),
  INDEX `fk_usuario_empresa_idx` (`fkEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_empresa`
    FOREIGN KEY (`fkEmpresa`)
    REFERENCES `eye-on-server`.`empresa` (`idEmpresa`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `eye-on-server`.`CPU`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`CPU` (
  `idCPU` INT NOT NULL AUTO_INCREMENT,
  `nomeCPU` VARCHAR(60),
  `frequenciaCPU` DECIMAL(5,2) NULL,
  `porcentagemUso` DECIMAL(5,2) NULL,
  `fkServidor` INT NOT NULL,
  `dataLeitura` DATE NULL,
  `horaLeitura` TIME NULL,
  PRIMARY KEY (`idCPU`),
  INDEX `fk_CPU_servidor1_idx` (`fkServidor` ASC) VISIBLE,
  CONSTRAINT `fk_CPU_servidor1`
    FOREIGN KEY (`fkServidor`)
    REFERENCES `eye-on-server`.`servidor` (`idServidor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eye-on-server`.`disco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`disco` (
  `idDisco` INT NOT NULL AUTO_INCREMENT,
  `nomeDisco` VARCHAR(60),
  `velocidadeLeitura` DECIMAL(5,2) NULL,
  `velociodadeGravacao` DECIMAL(5,2) NULL,
  `fkServidor` INT NOT NULL,
  `dataLeitura` DATE NULL,
  `horaLeitura` TIME NULL,
  PRIMARY KEY (`idDisco`),
  INDEX `fk_disco_servidor1_idx` (`fkServidor` ASC) VISIBLE,
  CONSTRAINT `fk_disco_servidor1`
    FOREIGN KEY (`fkServidor`)
    REFERENCES `eye-on-server`.`servidor` (`idServidor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eye-on-server`.`memoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`memoria` (
  `idMemoria` INT NOT NULL AUTO_INCREMENT,
  `nomeMemoria` VARCHAR(60),
  `emUso` DECIMAL(5,2) NULL,
  `disponivel` DECIMAL(5,2) NULL,
  `fkServidor` INT NOT NULL,
  `dataLeitura` DATE NULL,
  `horaLeitura` TIME NULL,
  PRIMARY KEY (`idMemoria`),
  INDEX `fk_memoria_servidor1_idx` (`fkServidor` ASC) VISIBLE,
  CONSTRAINT `fk_memoria_servidor1`
    FOREIGN KEY (`fkServidor`)
    REFERENCES `eye-on-server`.`servidor` (`idServidor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eye-on-server`.`chamados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eye-on-server`.`chamados` (
  `idChamados` INT NOT NULL AUTO_INCREMENT,
  `tituloChamado` VARCHAR(120) NULL,
  `descricaoChamado` TEXT NULL,
  `dataAbertura` DATETIME NULL,
  `statusChamado` VARCHAR(60) NULL,
  `fkCPU` INT NOT NULL,
  `fkDisco` INT NOT NULL,
  `fkMemoria` INT NOT NULL,
  PRIMARY KEY (`idChamados`),
  INDEX `fk_chamados_CPU1_idx` (`fkCPU` ASC) VISIBLE,
  INDEX `fk_chamados_disco1_idx` (`fkDisco` ASC) VISIBLE,
  INDEX `fk_chamados_memoria1_idx` (`fkMemoria` ASC) VISIBLE,
  CONSTRAINT `fk_chamados_CPU1`
    FOREIGN KEY (`fkCPU`)
    REFERENCES `eye-on-server`.`CPU` (`idCPU`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chamados_disco1`
    FOREIGN KEY (`fkDisco`)
    REFERENCES `eye-on-server`.`disco` (`idDisco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chamados_memoria1`
    FOREIGN KEY (`fkMemoria`)
    REFERENCES `eye-on-server`.`memoria` (`idMemoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
