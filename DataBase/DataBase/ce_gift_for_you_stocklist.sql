-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: ce_gift_for_you
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `stocklist`
--

DROP TABLE IF EXISTS `stocklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocklist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `devicetype` int DEFAULT NULL,
  `donationlist` int DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `person` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `remainamount` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_idx` (`person`),
  KEY `devicetype_idx` (`devicetype`),
  KEY `donationlist5_idx` (`donationlist`),
  CONSTRAINT `devicetype3` FOREIGN KEY (`devicetype`) REFERENCES `devicetype` (`id`),
  CONSTRAINT `donationlist5` FOREIGN KEY (`donationlist`) REFERENCES `donationlist` (`id`),
  CONSTRAINT `person2` FOREIGN KEY (`person`) REFERENCES `person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocklist`
--

LOCK TABLES `stocklist` WRITE;
/*!40000 ALTER TABLE `stocklist` DISABLE KEYS */;
INSERT INTO `stocklist` VALUES (43,3,3,'6',3,'2023-10-20 00:00:00','6'),(47,1,557,'150',1,'2023-11-03 00:00:00','50');
/*!40000 ALTER TABLE `stocklist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04 21:50:08
