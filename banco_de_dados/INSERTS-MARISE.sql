-- Active: 1684077642942@@127.0.0.1@3306@eye-on-server

-- -----------------------------------------------------
-- INSERTS do arquivo MARISE-script-Eyes-on-Server
-- Ultima modificação: 08/09/23
-- -----------------------------------------------------


INSERT INTO `eye-on-server`.`empresa` (`nomeFantasia`, `cnpj`, `email`)
VALUES ('Itaú Unibanco', '60701190000104', 'contato@itau.com')
    , ('Will Bank', '36272465000149', 'comunicacao@willbank.com')
    , ('Banco Santander Brasil', '90400888000142', 'contact@santander.com.br')
    , ('Neon Fintech', '11285104000106', 'oi@neon.com.br')
    , ('Banco central - SEDE', '00038166000105', 'relacoes@bcb.gov.br')
    , ('Banco Inter', '00416968000101', 'contatoTI@inter.co');

INSERT INTO `eye-on-server`.`empresa` (`nomeFantasia`)
VALUES ('EYES ON SERVER');


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


INSERT INTO `eye-on-server`.`usuario` (fkEmpresa, nome, `root`, senha, email) 
VALUES (7, 'Felipe Santos', 3, '12356', 'felipe@eyesonserver.com')
    , (7, 'Euardo Seba', 3, '123456', 'eduardo@eyesonserver.com')
    , (7, 'Gabriel Bifon', 3, '123456', 'gabriel@eyesonserver.com')
    , (7, 'Giovanna Vilas Boas', 3, '123456', 'giovanna@eyesonserver.com')
    , (7, 'Vitor Hideki', 3, '123456', 'vitor@eyesonserver.com')
    , (7, 'Rafael Scheneider', 3, '123456', 'rafael@eyesonserver.com');


INSERT INTO `eye-on-server`.`servidor` (fkEmpresa, nomeServidor, tipoServidor, descricaoServidor, localServidor) 
VALUES (1, 'Servidor PIX 1', 'Servidor de aplicação', 'Servidor responsável por processar transações PIX', 'Pátio Servidores 01')
    , (1, 'Servidor PIX 2', 'Servidor de banco de dados', 'Servidor responsável por armazenar dados de transações PIX', 'Pátio Servidores 02')
    , (2, 'Servidor PIX 3', 'Servidor de processamento', 'Servidor responsável por processar transações PIX', 'Pátio Servidores 03')
    , (3, 'Servidor PIX 4', 'Servidor de backup', 'Servidor responsável por fazer backup de dados de transações PIX', 'Pátio Servidores 04')
    , (4, 'Servidor PIX 5', 'Servidor de monitoramento', 'Servidor responsável por monitorar transações PIX', 'Pátio Servidores 05')
    , (5, 'Servidor PIX 6', 'Servidor de autenticação', 'Servidor responsável por autenticar transações PIX', 'Pátio Servidores 06')
    , (6, 'Servidor PIX 7', 'Servidor de rede', 'Servidor responsável por fornecer conectividade para transações PIX', 'Pátio Servidores 07');

-- INSERTS A BAIXO GERADOS PELO BARD: https://bard.google.com/

INSERT INTO `eye-on-server`.`CPU` (`nomeCPU`, `frequenciaCPU`, `porcentagemUso`, `fkServidor`, `dataLeitura`, `horaLeitura`) VALUES
('Intel Core i7-12700K', 5.0, 50, 1, '2023-03-08', '12:00:00'),
('Intel Core i7-12700K', 5.0, 70, 1, '2023-03-09', '13:00:00'),
('Intel Core i7-12700K', 5.0, 30, 1, '2023-03-10', '14:00:00');

INSERT INTO `eye-on-server`.`disco` (`nomeDisco`, `velocidadeLeitura`, `velociodadeGravacao`, `fkServidor`, `dataLeitura`, `horaLeitura`) VALUES
('Samsung 980 Pro NVMe PCIe Gen4', 700.00, 5000, 1, '2023-03-08', '12:00:00'),
('Samsung 980 Pro NVMe PCIe Gen4', 700.00, 5000, 1, '2023-03-09', '13:00:00'),
('Samsung 980 Pro NVMe PCIe Gen4', 700.00, 5000, 1, '2023-03-10', '14:00:00');

INSERT INTO `eye-on-server`.`memoria` (`nomeMemoria`, `emUso`, `disponivel`, `fkServidor`, `dataLeitura`, `horaLeitura`) VALUES
('Kingston HyperX Fury RGB 32GB (2x16GB)', 20, 12, 1, '2023-03-08', '12:00:00'),
('Kingston HyperX Fury RGB 32GB (2x16GB)', 40, 8, 1, '2023-03-09', '13:00:00'),
('Kingston HyperX Fury RGB 32GB (2x16GB)', 60, 4, 1, '2023-03-10', '14:00:00');