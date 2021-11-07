/*
Navicat MySQL Data Transfer

Source Server         : pos sportlife localhost
Source Server Version : 100501
Source Host           : localhost:3306
Source Database       : inversiones

Target Server Type    : MYSQL
Target Server Version : 100501
File Encoding         : 65001

Date: 2021-11-07 18:52:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cartera
-- ----------------------------
DROP TABLE IF EXISTS `cartera`;
CREATE TABLE `cartera` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estadoActivo` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `idUsuario_index` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cartera
-- ----------------------------
INSERT INTO `cartera` VALUES ('1', '3', 'Careta Risopatron', '');
INSERT INTO `cartera` VALUES ('2', '3', 'test', '');
INSERT INTO `cartera` VALUES ('3', '3', 'test', '');
INSERT INTO `cartera` VALUES ('4', '3', 'test', '');

-- ----------------------------
-- Table structure for estadoorden
-- ----------------------------
DROP TABLE IF EXISTS `estadoorden`;
CREATE TABLE `estadoorden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of estadoorden
-- ----------------------------
INSERT INTO `estadoorden` VALUES ('1', 'iniciada');
INSERT INTO `estadoorden` VALUES ('2', 'espera');
INSERT INTO `estadoorden` VALUES ('3', 'terminada');

-- ----------------------------
-- Table structure for instrumentos
-- ----------------------------
DROP TABLE IF EXISTS `instrumentos`;
CREATE TABLE `instrumentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `precioApertura` float DEFAULT NULL,
  `precioCierre` float DEFAULT NULL,
  `codigo` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of instrumentos
-- ----------------------------
INSERT INTO `instrumentos` VALUES ('1', 'ENELGXCH', '180', '178', 'CLP3710M1090');
INSERT INTO `instrumentos` VALUES ('2', 'ENTEL', '2996', '3098', 'CLP371151059');
INSERT INTO `instrumentos` VALUES ('3', 'GOLF', '16500000', '16500000', 'CLP4852V1053');
INSERT INTO `instrumentos` VALUES ('4', 'ENJOY', '2.751', '2.746', 'CL0000006586');
INSERT INTO `instrumentos` VALUES ('5', 'MANQUEHUE', '49.73', '51.75', 'CL0002416189');
INSERT INTO `instrumentos` VALUES ('6', 'SALFACORP', '297.02', '310', 'CL0000000449');
INSERT INTO `instrumentos` VALUES ('7', 'FALABELLA', '2425', '2580.1', 'CLP3880F1085');
INSERT INTO `instrumentos` VALUES ('8', 'MARINSA', '43.74', '43.74', 'CLP6444R1042');
INSERT INTO `instrumentos` VALUES ('9', 'SONDA', '300.55', '312.93', 'CL0000001934');
INSERT INTO `instrumentos` VALUES ('10', 'PROVIDA', '685.98', '690', 'CLP7919K1035');

-- ----------------------------
-- Table structure for ordeninversiones
-- ----------------------------
DROP TABLE IF EXISTS `ordeninversiones`;
CREATE TABLE `ordeninversiones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCartera` int(11) NOT NULL,
  `idTipoOrden` int(11) NOT NULL,
  `idInstrumento` int(11) NOT NULL,
  `idEstadoOrden` int(11) NOT NULL,
  `fechaIntroduccion` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `fechaEjecucion` date DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precioEjecucion` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idCartera_index` (`idCartera`),
  KEY `idTipoOrden_index` (`idTipoOrden`),
  KEY `idInstrumento_index` (`idInstrumento`),
  KEY `idEstadoOrden_index` (`idEstadoOrden`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of ordeninversiones
-- ----------------------------
INSERT INTO `ordeninversiones` VALUES ('1', '1', '1', '4', '3', '2021-11-02 22:25:51', '2021-11-02', '1', '214.9');
INSERT INTO `ordeninversiones` VALUES ('2', '1', '1', '1', '3', '2021-11-03 00:58:56', '2021-11-03', '500', '5');
INSERT INTO `ordeninversiones` VALUES ('3', '1', '1', '1', '3', '2021-11-03 00:58:33', '2021-11-03', '10', '10');
INSERT INTO `ordeninversiones` VALUES ('4', '1', '1', '1', '3', '2021-11-03 00:59:00', '2021-11-03', '10', '10');

-- ----------------------------
-- Table structure for tipoorden
-- ----------------------------
DROP TABLE IF EXISTS `tipoorden`;
CREATE TABLE `tipoorden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tipoorden
-- ----------------------------
INSERT INTO `tipoorden` VALUES ('1', 'acciones');

-- ----------------------------
-- Table structure for usuariohistorico
-- ----------------------------
DROP TABLE IF EXISTS `usuariohistorico`;
CREATE TABLE `usuariohistorico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `año` int(11) NOT NULL,
  `mes` int(11) NOT NULL,
  `importeInicial` float DEFAULT NULL,
  `importeFinal` float DEFAULT NULL,
  `beneficio` float DEFAULT NULL,
  `porcentaje` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`año`,`mes`),
  KEY `idUsuario_index` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of usuariohistorico
-- ----------------------------

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES ('1', 'Yeral', 'gerardo.manuel1@gmail.com');
INSERT INTO `usuarios` VALUES ('2', 'Gerardo', 'gerardo.manuel@gmail.com');
INSERT INTO `usuarios` VALUES ('3', 'Gerardo', 'gerardo.manuel3@gmail.com');
INSERT INTO `usuarios` VALUES ('4', '', '1');
INSERT INTO `usuarios` VALUES ('5', '123123', '123123');
INSERT INTO `usuarios` VALUES ('6', '', '333333');
INSERT INTO `usuarios` VALUES ('7', '', '5555');
INSERT INTO `usuarios` VALUES ('8', '', '7868678');
