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
-- Table structure for table `withdrawlist`
--

DROP TABLE IF EXISTS `withdrawlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdrawlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stocklist` int DEFAULT NULL,
  `brand` int DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `withdraw` int DEFAULT NULL,
  `approve` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `withdraw_idx` (`withdraw`),
  KEY `stocklist_idx` (`stocklist`),
  KEY `approve3_idx` (`approve`),
  KEY `brandname_idx` (`brand`),
  CONSTRAINT `approve3` FOREIGN KEY (`approve`) REFERENCES `listofapprovedpeople` (`id`),
  CONSTRAINT `brandname` FOREIGN KEY (`brand`) REFERENCES `donationlist` (`id`),
  CONSTRAINT `stocklist` FOREIGN KEY (`stocklist`) REFERENCES `devicetype` (`id`),
  CONSTRAINT `withdraw` FOREIGN KEY (`withdraw`) REFERENCES `person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawlist`
--

LOCK TABLES `withdrawlist` WRITE;
/*!40000 ALTER TABLE `withdrawlist` DISABLE KEYS */;
INSERT INTO `withdrawlist` VALUES (13,2,3,'12',2,1,'2023-10-08 00:00:00'),(15,3,4,'20',3,1,'2023-10-14 00:00:00'),(23,1,557,'2',1,1,'2023-10-13 00:00:00'),(24,4,4,'10',NULL,1,'2023-10-06 00:00:00');
/*!40000 ALTER TABLE `withdrawlist` ENABLE KEYS */;
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
