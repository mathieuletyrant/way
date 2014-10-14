-- MySQL dump 10.13  Distrib 5.5.34, for osx10.6 (i386)
--
-- Host: localhost    Database: way
-- ------------------------------------------------------
-- Server version	5.5.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `answer` tinytext NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_question_answer_idx` (`question_id`),
  CONSTRAINT `fk_question_answer` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `badges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_badges_categories_idx` (`category_id`),
  CONSTRAINT `fk_badges_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `sex` varchar(6) NOT NULL COMMENT 'HOMME/FEMME',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (73,'Geek','all','2014-10-14 22:45:23'),(74,'DragQueen','male','2014-10-14 22:45:23'),(75,'Hippie','all','2014-10-14 22:45:23'),(76,'Bad Boy','male','2014-10-14 22:45:23'),(77,'Keke','male','2014-10-14 22:45:23'),(78,'Barbie','female','2014-10-14 22:45:23'),(79,'Bad Girl','female','2014-10-14 22:45:23'),(80,'Candide','female','2014-10-14 22:45:23');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `file` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_question_category_idx` (`category_id`),
  CONSTRAINT `fk_question_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (183,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. De hominibus dici non necesse est. Dici enim nihil potest verius. An eiusdem modi? Confecta res esset. Erat enim Polemonis. \n\n','',80,'2014-10-14 22:45:24'),(184,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quonam, inquit, modo? Praeteritis, inquit, gaudeo. Utilitatis causa amicitia est quaesita. Haec dicuntur inconstantissime. Duo Reges: constructio interrete. Primum in nostrane potestate est, quid meminerimus? \n\n','',78,'2014-10-14 22:45:24'),(185,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tamen intellego quid velit. Scaevolam M. Scisse enim te quis coarguere possit? Minime vero, inquit ille, consentit. Duo Reges: constructio interrete. Quae duo sunt, unum facit. \n\n','',75,'2014-10-14 22:45:24'),(186,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praeclare hoc quidem. Utilitatis causa amicitia est quaesita. Avaritiamne minuis? Duo Reges: constructio interrete. Quare conare, quaeso. \n\n','',77,'2014-10-14 22:45:24'),(187,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Certe non potest. Id Sextilius factum negabat. \n\n','',74,'2014-10-14 22:45:24'),(188,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Idemne, quod iucunde? At eum nihili facit; Rationis enim perfectio est virtus; Rationis enim perfectio est virtus; \n\n','',76,'2014-10-14 22:45:24'),(189,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Occultum facinus esse potuerit, gaudebit; Nunc de hominis summo bono quaeritur; Immo videri fortasse. Zenonis est, inquam, hoc Stoici. Erat enim Polemonis. Duo Reges: constructio interrete. \n\n','',77,'2014-10-14 22:45:24'),(190,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recte dicis; Sedulo, inquam, faciam. Idemne, quod iucunde? Eaedem res maneant alio modo. \n\n','',74,'2014-10-14 22:45:24'),(191,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facete M. Id Sextilius factum negabat. Duo Reges: constructio interrete. Tenent mordicus. Quod cum dixissent, ille contra. Honesta oratio, Socratica, Platonis etiam. Utilitatis causa amicitia est quaesita. An eiusdem modi? \n\n','',77,'2014-10-14 22:45:24'),(192,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Primum divisit ineleganter; Ita nemo beato beatior. \n\n','',77,'2014-10-14 22:45:24'),(193,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non semper, inquam; Quare attende, quaeso. Primum divisit ineleganter; Qualem igitur hominem natura inchoavit? Duo Reges: constructio interrete. Idemne, quod iucunde? \n\n','',76,'2014-10-14 22:45:24'),(194,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eam tum adesse, cum dolor omnis absit; Duo Reges: constructio interrete. Istam voluptatem perpetuam quis potest praestare sapienti? Non semper, inquam; \n\n','',75,'2014-10-14 22:45:24'),(195,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quot homines, tot sententiae; Quid de Pythagora? Invidiosum nomen est, infame, suspectum. Quo tandem modo? Haeret in salebra. Duo Reges: constructio interrete. \n\n','',79,'2014-10-14 22:45:24'),(196,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim res aperta. An tu me de L. Equidem e Cn. Duo Reges: constructio interrete. Quid censes in Latino fore? Quid censes in Latino fore? \n\n','',80,'2014-10-14 22:45:24'),(197,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cur deinde Metrodori liberos commendas? Nescio quo modo praetervolavit oratio. Et nemo nimium beatus est; Duo Reges: constructio interrete. Bonum integritas corporis: misera debilitas. \n\n','',80,'2014-10-14 22:45:24'),(198,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si quae forte-possumus. Tubulo putas dicere? Hoc loco tenere se Triarius non potuit. Venit ad extremum; \n\n','',80,'2014-10-14 22:45:25'),(199,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sic consequentibus vestris sublatis prima tolluntur. Eademne, quae restincta siti? Nunc haec primum fortasse audientis servire debemus. Poterat autem inpune; Quid censes in Latino fore? \n\n','',79,'2014-10-14 22:45:25'),(200,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hic ambiguo ludimur. Praeclare hoc quidem. Quonam, inquit, modo? Quid de Pythagora? Nunc agendum est subtilius. Duo Reges: constructio interrete. \n\n','',74,'2014-10-14 22:45:25'),(201,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo igitur esse beatus potest. Sed virtutem ipsam inchoavit, nihil amplius. A mene tu? Si quae forte-possumus. Tum Torquatus: Prorsus, inquit, assentior; \n\n','',75,'2014-10-14 22:45:25'),(202,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quare attende, quaeso. Equidem e Cn. Quid sequatur, quid repugnet, vident. Sed haec in pueris; An tu me de L. Duo Reges: constructio interrete. \n\n','',75,'2014-10-14 22:45:25');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_responses`
--

DROP TABLE IF EXISTS `user_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_responses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `response_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_responses_user_idx` (`user_id`),
  KEY `fk_user_responses_question_idx` (`question_id`),
  KEY `fk_user_responses_answers_idx` (`response_id`),
  CONSTRAINT `fk_user_responses_answers` FOREIGN KEY (`response_id`) REFERENCES `answers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_responses_question` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_responses_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_responses`
--

LOCK TABLES `user_responses` WRITE;
/*!40000 ALTER TABLE `user_responses` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `facebook_id` varchar(150) NOT NULL,
  `firstname` varchar(75) NOT NULL,
  `lastname` varchar(75) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `sex` varchar(6) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ID243237823','Paul','Boiseau',NULL,'','2014-10-01 00:00:00'),(2,'ID232323','Anastasia','Launey',NULL,'','2014-10-09 00:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-10-14 22:51:17
