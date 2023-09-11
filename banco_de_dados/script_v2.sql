CREATE SCHEMA IF NOT EXISTS `eye-on-server` DEFAULT CHARACTER SET utf8mb3 ;
USE `eye-on-server` ;

drop database `eye-on-server`;

CREATE TABLE IF NOT EXISTS `eye-on-server`.`empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `nomeFantasia` VARCHAR(120) NULL DEFAULT NULL,
  `cnpj` CHAR(14) NULL DEFAULT NULL,
  `email` VARCHAR(120) NULL DEFAULT NULL,
  PRIMARY KEY (`idEmpresa`)
);


CREATE TABLE IF NOT EXISTS `eye-on-server`.`servidor` (
  `idServidor` INT NOT NULL AUTO_INCREMENT,
  `fkEmpresa` INT NULL DEFAULT NULL,
  `nomeServidor` VARCHAR(120) NULL DEFAULT NULL,
  `tipoServidor` VARCHAR(120) NULL DEFAULT NULL,
  `descricaoServidor` VARCHAR(120) NULL DEFAULT NULL,
  `localServidor` VARCHAR(120) NULL DEFAULT NULL,
  PRIMARY KEY (`idServidor`),
  FOREIGN KEY (`fkEmpresa`)
  REFERENCES `eye-on-server`.`empresa` (`idEmpresa`)
);


CREATE TABLE IF NOT EXISTS `eye-on-server`.`componente` (
  `idComponente` INT NOT NULL AUTO_INCREMENT,
  `fkServidor` INT NOT NULL,
  `nomeComponente` VARCHAR(120) NULL DEFAULT NULL,
  `modeloComponete` VARCHAR(120) NULL DEFAULT NULL,
  `valor` DECIMAL(6,3) NULL DEFAULT NULL,
  `dataHora` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idComponente`),
  FOREIGN KEY (`fkServidor`)
  REFERENCES `eye-on-server`.`servidor` (`idServidor`)
);


CREATE TABLE IF NOT EXISTS `eye-on-server`.`chamados` (
  `idChamados` INT NOT NULL AUTO_INCREMENT,
  `fkComponente` INT NOT NULL,
  `tituloChamado` VARCHAR(120) NULL DEFAULT NULL,
  `descricaoChamado` TEXT NULL DEFAULT NULL,
  `dataHoraAbertura` DATETIME NULL DEFAULT NULL,
  `statusChamado` VARCHAR(60) NULL DEFAULT NULL,
  `fkEmpresa` INT NOT NULL,
  PRIMARY KEY (`idChamados`),
  FOREIGN KEY (`fkComponente`)
  REFERENCES `eye-on-server`.`componente` (`idComponente`),
  FOREIGN KEY (`fkEmpresa`)
  REFERENCES `eye-on-server`.`empresa` (`idEmpresa`)
);


CREATE TABLE IF NOT EXISTS `eye-on-server`.`medida` (
  `idMedida` INT NOT NULL AUTO_INCREMENT,
  `tipoMedida` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`idMedida`)
);


CREATE TABLE IF NOT EXISTS `eye-on-server`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `fkEmpresa` INT NULL DEFAULT NULL,
  `nome` VARCHAR(120) NULL DEFAULT NULL,
  `root` INT NULL DEFAULT NULL,
  `senha` VARCHAR(120) NULL DEFAULT NULL,
  `email` VARCHAR(120) NULL DEFAULT NULL,
  PRIMARY KEY (`idusuario`),
  FOREIGN KEY (`fkEmpresa`)
  REFERENCES `eye-on-server`.`empresa` (`idEmpresa`)
);

CREATE TABLE IF NOT EXISTS `eye-on-server`.`registro` (
  `idRegistro` INT NOT NULL,
  `valor` INT NOT NULL,
  `horario` DATETIME NULL,
  `medida_idMedida` INT NOT NULL,
  `componente_idComponente` INT NOT NULL,
  PRIMARY KEY (`idRegistro`),
  FOREIGN KEY (`medida_idMedida`)
  REFERENCES `eye-on-server`.`medida` (`idMedida`),
  FOREIGN KEY (`componente_idComponente`)
  REFERENCES `eye-on-server`.`componente` (`idComponente`)
);

INSERT INTO `eye-on-server`.`empresa` (`nomeFantasia`, `cnpj`, `email`)
VALUES ('Itaú Unibanco', '60701190000104', 'contato@itau.com')
    , ('Will Bank', '36272465000149', 'comunicacao@willbank.com')
    , ('Banco Santander Brasil', '90400888000142', 'contact@santander.com.br')
    , ('Neon Fintech', '11285104000106', 'oi@neon.com.br')
    , ('Banco central - SEDE', '00038166000105', 'relacoes@bcb.gov.br')
    , ('Banco Inter', '00416968000101', 'contatoTI@inter.co');

INSERT INTO `eye-on-server`.`usuario` (fkEmpresa, nome, `root`, senha, email) 
VALUES (1, 'Maria Silva', 2, '123456', 'maria@itau.com')
    , (1, 'João Santos', 1, '123456', 'joao@itau.com')
    , (1, 'José Pereira', 1, '123456', 'jose@itau.com')
    , (2, 'Ana Paula', 2, '123456', 'ana@willbank.com')
    , (2, 'Pedro Souza', 1, '123456', 'pedro@willbank.com')
    , (2, 'Carlos Machado', 1, '123456', 'carlos@willbank.com')
    , (3, 'Juliana Oliveira', 2, '123456', 'juliana@santander.com.br')
    , (3, 'Marcos Ferreira', 1, '123456', 'marcos@santander.com.br')
    , (3, 'Daniel Lima', 1, '123456', 'daniel@santander.com.br')
    , (4, 'Letícia Cardoso', 2, '123456', 'leticia@neon.com.br')
    , (4, 'Rafael Gomes', 1, '123456', 'rafael@neon.com.br')
    , (4, 'Guilherme Souza', 1, '123456', 'guilherme@neon.com.br')
    , (5, 'Isabela Silva', 2, '123456', 'isabela@bcb.gov.br')
    , (5, 'Lucas Santos', 1, '123456', 'lucas@bcb.gov.br')
    , (5, 'Pedro Pereira', 1, '123456', 'pedro@bcb.gov.br')
    , (6, 'Clara Machado', 2, '123456', 'clara@willbank.com')
    , (6, 'André Souza', 1, '123456', 'andre@willbank.com')
    , (6, 'Carlos Lima', 1, '123456', 'carlos@willbank.com');



INSERT INTO `eye-on-server`.`empresa` (`nomeFantasia`)
VALUES ('EYES ON SERVER');

INSERT INTO `eye-on-server`.`servidor` (fkEmpresa, nomeServidor, tipoServidor, descricaoServidor, localServidor) 
VALUES (1, 'Servidor PIX 1', 'Servidor de aplicação', 'Servidor responsável por processar transações PIX', 'Pátio Servidores 01')
    , (1, 'Servidor PIX 2', 'Servidor de banco de dados', 'Servidor responsável por armazenar dados de transações PIX', 'Pátio Servidores 02')
    , (2, 'Servidor PIX 3', 'Servidor de processamento', 'Servidor responsável por processar transações PIX', 'Pátio Servidores 03')
    , (3, 'Servidor PIX 4', 'Servidor de backup', 'Servidor responsável por fazer backup de dados de transações PIX', 'Pátio Servidores 04')
    , (4, 'Servidor PIX 5', 'Servidor de monitoramento', 'Servidor responsável por monitorar transações PIX', 'Pátio Servidores 05')
    , (5, 'Servidor PIX 6', 'Servidor de autenticação', 'Servidor responsável por autenticar transações PIX', 'Pátio Servidores 06')
    , (6, 'Servidor PIX 7', 'Servidor de rede', 'Servidor responsável por fornecer conectividade para transações PIX', 'Pátio Servidores 07');


INSERT INTO `componente` (`fkServidor`, `nomeComponente`, `modeloComponete`, `valor`, `dataHora`) VALUES (1, 'Memória RAM', 'DDR4-3200', 160.00, '2023-09-11 12:22:26');

INSERT INTO `medida` (`tipoMedida`) VALUES ('%');

INSERT INTO `registro` (`valor`,`horario`,`medida_idMedida`, `componente_idComponente`) VALUES 
         ( 65,'2023-09-11 12:27:33',1,1),
		 (72,'2023-09-11 12:27:34',1,2),
         (71,'2023-09-11 12:27:35',1,2);
