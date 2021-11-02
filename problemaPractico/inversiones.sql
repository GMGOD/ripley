CREATE TABLE `usuarios` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`nombre` varchar(100) NULL,
`email` varchar(255) NOT NULL,
PRIMARY KEY (`id`, `email`) 
);

CREATE TABLE `cartera` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`idUsuario` int(11) NOT NULL,
`descripcion` text NULL,
`estadoActivo` bit NULL DEFAULT 0,
PRIMARY KEY (`id`) ,
INDEX `idUsuario_index` (`idUsuario` ASC)
);

CREATE TABLE `ordenInversiones` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`idCartera` int(11) NOT NULL,
`idTipoOrden` int(11) NOT NULL,
`idInstrumento` int(11) NOT NULL,
`idEstadoOrden` int(11) NOT NULL,
`fechaIntroduccion` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
`fechaEjecucion` date NULL,
`cantidad` int NULL,
`precioEjecucion` float NULL,
PRIMARY KEY (`id`) ,
INDEX `idCartera_index` (`idCartera` ASC),
INDEX `idTipoOrden_index` (`idTipoOrden` ASC),
INDEX `idInstrumento_index` (`idInstrumento` ASC),
INDEX `idEstadoOrden_index` (`idEstadoOrden` ASC)
);

CREATE TABLE `intrumentos` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`nombre` varchar(255) NULL,
`precioApertura` float NULL,
`precioCierre` float NULL,
`codigo` varchar(15) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `usuarioHistorico` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`idUsuario` int(11) NOT NULL,
`año` int NOT NULL,
`mes` int NOT NULL,
`importeInicial` float NULL,
`importeFinal` float NULL,
`beneficio` float NULL,
`porcentaje` int NULL,
PRIMARY KEY (`id`, `año`, `mes`) ,
INDEX `idUsuario_index` (`idUsuario` ASC)
);

CREATE TABLE `tipoOrden` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`descripcion` varchar(150) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `estadoOrden` (
`id` int(11) NOT NULL,
`descripcion` varchar(50) NULL,
PRIMARY KEY (`id`) 
);


ALTER TABLE `usuarios` ADD CONSTRAINT `fk_usuarios_cartera_1` FOREIGN KEY (`id`) REFERENCES `cartera` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `usuarios` ADD CONSTRAINT `fk_usuarios_usuarioHistorico_1` FOREIGN KEY (`id`) REFERENCES `usuarioHistorico` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `ordenInversiones` ADD CONSTRAINT `fk_ordenInversiones_cartera_1` FOREIGN KEY (`idCartera`) REFERENCES `cartera` (`id`);
ALTER TABLE `ordenInversiones` ADD CONSTRAINT `fk_ordenInversiones_tipoOrden_1` FOREIGN KEY (`idTipoOrden`) REFERENCES `tipoOrden` (`id`);
ALTER TABLE `ordenInversiones` ADD CONSTRAINT `fk_ordenInversiones_intrumentos_1` FOREIGN KEY (`idInstrumento`) REFERENCES `intrumentos` (`id`);
ALTER TABLE `ordenInversiones` ADD CONSTRAINT `fk_ordenInversiones_estadoOrden_1` FOREIGN KEY (`idEstadoOrden`) REFERENCES `estadoOrden` (`id`);

