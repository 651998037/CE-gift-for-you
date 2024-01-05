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
-- Table structure for table `prepare`
--

DROP TABLE IF EXISTS `prepare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prepare` (
  `id` int NOT NULL AUTO_INCREMENT,
  `donationplace` int DEFAULT NULL,
  `address` int DEFAULT NULL,
  `person` int DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `travel` int DEFAULT NULL,
  `donationday` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `travel_idx` (`travel`),
  KEY `app_idx` (`person`),
  KEY `address_idx` (`address`),
  KEY `donationplace_idx` (`donationplace`),
  KEY `phone_idx` (`phone`),
  CONSTRAINT `travel` FOREIGN KEY (`travel`) REFERENCES `travel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prepare`
--

LOCK TABLES `prepare` WRITE;
/*!40000 ALTER TABLE `prepare` DISABLE KEYS */;
INSERT INTO `prepare` VALUES (37,NULL,NULL,3,NULL,2,'2023-10-12'),(47,1,NULL,NULL,NULL,2,'2023-10-20'),(49,1,NULL,NULL,NULL,125,'2023-12-06'),(50,2,NULL,NULL,NULL,125,'2023-12-07'),(51,44,NULL,NULL,NULL,125,'2023-12-05'),(52,45,NULL,NULL,NULL,147,'2023-12-29'),(53,45,NULL,NULL,NULL,145,'2023-12-04');
/*!40000 ALTER TABLE `prepare` ENABLE KEYS */;
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
