CREATE TABLE `vehiculos` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`idMarcaModelo` int NOT NULL,
`patente` varchar(6) NOT NULL,
`año` int(4) NULL,
`idComuna` int NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `paises` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`nombre` varchar(50) NULL DEFAULT NULL,
`nombreCorto` varchar(5) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `regiones` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`idPais` int NULL,
`nombre` varchar(70) NULL DEFAULT NULL,
`nombreCorto` varchar(5) NULL DEFAULT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `comunas` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`idRegion` int NULL,
`nombre` varchar(70) NULL DEFAULT NULL,
`nombreCorto` varchar(5) NULL DEFAULT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `tipoVehiculos` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`nombre` varchar(70) NULL DEFAULT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `marcas` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`nombre` varchar(70) NULL DEFAULT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `modelos` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`idTipoVehiculo` int NOT NULL,
`nombre` varchar(70) NULL DEFAULT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `MarcaModelo` (
`id` int NOT NULL AUTO_INCREMENT,
`idMarca` int NOT NULL,
`IdModelo` int NOT NULL,
PRIMARY KEY (`id`, `idMarca`, `IdModelo`) 
);

CREATE TABLE `choferes` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`idComuna` int NULL,
`rut` varchar(10) NOT NULL,
`email` varchar(100) NOT NULL,
`telefono` varchar(15) NOT NULL,
`nombre` varchar(20) NULL,
`apellido` varchar(20) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `arriendos` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`idChofer` int NULL,
`idVehiculo` int NOT NULL,
`contrataChofer` bit NULL DEFAULT 0,
`idFacturacion` int NOT NULL,
`garantia` float NULL DEFAULT 0,
`precio` float NULL,
`iva` float NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `facturacion` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`idTipoConvenio` int NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `tipoConvenio` (
`id` int(11) NOT NULL,
`nombre` varchar(100) NULL,
PRIMARY KEY (`id`) 
);


ALTER TABLE `regiones` ADD CONSTRAINT `fk_regiones_comunas_1` FOREIGN KEY (`id`) REFERENCES `comunas` (`idRegion`);
ALTER TABLE `paises` ADD CONSTRAINT `fk_paises_regiones_1` FOREIGN KEY (`id`) REFERENCES `regiones` (`idPais`);
ALTER TABLE `modelos` ADD CONSTRAINT `fk_modelos_tipoVehiculos_1` FOREIGN KEY (`idTipoVehiculo`) REFERENCES `tipoVehiculos` (`id`);
ALTER TABLE `modelos` ADD CONSTRAINT `fk_modelos_MarcaModelo_1` FOREIGN KEY (`id`) REFERENCES `MarcaModelo` (`IdModelo`);
ALTER TABLE `marcas` ADD CONSTRAINT `fk_marcas_MarcaModelo_1` FOREIGN KEY (`id`) REFERENCES `MarcaModelo` (`idMarca`);
ALTER TABLE `vehiculos` ADD CONSTRAINT `fk_vehiculos_MarcaModelo_1` FOREIGN KEY (`idMarcaModelo`) REFERENCES `MarcaModelo` (`id`);
ALTER TABLE `choferes` ADD CONSTRAINT `fk_choferes_arriendo_1` FOREIGN KEY (`id`) REFERENCES `arriendos` (`idChofer`);
ALTER TABLE `vehiculos` ADD CONSTRAINT `fk_vehiculos_arriendo_1` FOREIGN KEY (`id`) REFERENCES `arriendos` (`idVehiculo`);
ALTER TABLE `facturacion` ADD CONSTRAINT `fk_facturacion_tipoConvenio_1` FOREIGN KEY (`idTipoConvenio`) REFERENCES `tipoConvenio` (`id`);
ALTER TABLE `arriendos` ADD CONSTRAINT `fk_arriendos_facturacion_1` FOREIGN KEY (`idFacturacion`) REFERENCES `facturacion` (`id`);
ALTER TABLE `vehiculos` ADD CONSTRAINT `fk_vehiculos_comunas_1` FOREIGN KEY (`idComuna`) REFERENCES `comunas` (`id`);
ALTER TABLE `choferes` ADD CONSTRAINT `fk_choferes_comunas_1` FOREIGN KEY (`idComuna`) REFERENCES `comunas` (`id`);

