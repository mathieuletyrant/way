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
) ENGINE=InnoDB AUTO_INCREMENT=243 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (183,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. De hominibus dici non necesse est. Dici enim nihil potest verius. An eiusdem modi? Confecta res esset. Erat enim Polemonis. \n\n','',80,'2014-10-14 22:45:24'),(184,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quonam, inquit, modo? Praeteritis, inquit, gaudeo. Utilitatis causa amicitia est quaesita. Haec dicuntur inconstantissime. Duo Reges: constructio interrete. Primum in nostrane potestate est, quid meminerimus? \n\n','',78,'2014-10-14 22:45:24'),(185,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tamen intellego quid velit. Scaevolam M. Scisse enim te quis coarguere possit? Minime vero, inquit ille, consentit. Duo Reges: constructio interrete. Quae duo sunt, unum facit. \n\n','',75,'2014-10-14 22:45:24'),(186,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praeclare hoc quidem. Utilitatis causa amicitia est quaesita. Avaritiamne minuis? Duo Reges: constructio interrete. Quare conare, quaeso. \n\n','',77,'2014-10-14 22:45:24'),(187,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Certe non potest. Id Sextilius factum negabat. \n\n','',74,'2014-10-14 22:45:24'),(188,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Idemne, quod iucunde? At eum nihili facit; Rationis enim perfectio est virtus; Rationis enim perfectio est virtus; \n\n','',76,'2014-10-14 22:45:24'),(189,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Occultum facinus esse potuerit, gaudebit; Nunc de hominis summo bono quaeritur; Immo videri fortasse. Zenonis est, inquam, hoc Stoici. Erat enim Polemonis. Duo Reges: constructio interrete. \n\n','',77,'2014-10-14 22:45:24'),(190,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Recte dicis; Sedulo, inquam, faciam. Idemne, quod iucunde? Eaedem res maneant alio modo. \n\n','',74,'2014-10-14 22:45:24'),(191,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facete M. Id Sextilius factum negabat. Duo Reges: constructio interrete. Tenent mordicus. Quod cum dixissent, ille contra. Honesta oratio, Socratica, Platonis etiam. Utilitatis causa amicitia est quaesita. An eiusdem modi? \n\n','',77,'2014-10-14 22:45:24'),(192,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Primum divisit ineleganter; Ita nemo beato beatior. \n\n','',77,'2014-10-14 22:45:24'),(193,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non semper, inquam; Quare attende, quaeso. Primum divisit ineleganter; Qualem igitur hominem natura inchoavit? Duo Reges: constructio interrete. Idemne, quod iucunde? \n\n','',76,'2014-10-14 22:45:24'),(194,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eam tum adesse, cum dolor omnis absit; Duo Reges: constructio interrete. Istam voluptatem perpetuam quis potest praestare sapienti? Non semper, inquam; \n\n','',75,'2014-10-14 22:45:24'),(195,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quot homines, tot sententiae; Quid de Pythagora? Invidiosum nomen est, infame, suspectum. Quo tandem modo? Haeret in salebra. Duo Reges: constructio interrete. \n\n','',79,'2014-10-14 22:45:24'),(196,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat enim res aperta. An tu me de L. Equidem e Cn. Duo Reges: constructio interrete. Quid censes in Latino fore? Quid censes in Latino fore? \n\n','',80,'2014-10-14 22:45:24'),(197,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cur deinde Metrodori liberos commendas? Nescio quo modo praetervolavit oratio. Et nemo nimium beatus est; Duo Reges: constructio interrete. Bonum integritas corporis: misera debilitas. \n\n','',80,'2014-10-14 22:45:24'),(198,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si quae forte-possumus. Tubulo putas dicere? Hoc loco tenere se Triarius non potuit. Venit ad extremum; \n\n','',80,'2014-10-14 22:45:25'),(199,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sic consequentibus vestris sublatis prima tolluntur. Eademne, quae restincta siti? Nunc haec primum fortasse audientis servire debemus. Poterat autem inpune; Quid censes in Latino fore? \n\n','',79,'2014-10-14 22:45:25'),(200,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hic ambiguo ludimur. Praeclare hoc quidem. Quonam, inquit, modo? Quid de Pythagora? Nunc agendum est subtilius. Duo Reges: constructio interrete. \n\n','',74,'2014-10-14 22:45:25'),(201,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo igitur esse beatus potest. Sed virtutem ipsam inchoavit, nihil amplius. A mene tu? Si quae forte-possumus. Tum Torquatus: Prorsus, inquit, assentior; \n\n','',75,'2014-10-14 22:45:25'),(202,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quare attende, quaeso. Equidem e Cn. Quid sequatur, quid repugnet, vident. Sed haec in pueris; An tu me de L. Duo Reges: constructio interrete. \n\n','',75,'2014-10-14 22:45:25'),(203,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Disserendi artem nullam habuit. Vide, quantum, inquam, fallare, Torquate. Ostendit pedes et pectus. Eademne, quae restincta siti? \n\n','',75,'2014-10-14 22:55:41'),(204,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo hoc loco intellegit honestum? Erat enim res aperta. \n\n','',73,'2014-10-14 22:55:41'),(205,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eadem nunc mea adversum te oratio est. Praeteritis, inquit, gaudeo. Idem adhuc; Quae contraria sunt his, malane? Quid dubitas igitur mutare principia naturae? Nunc de hominis summo bono quaeritur; \n\n','',74,'2014-10-14 22:55:41'),(206,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sint ista Graecorum; Quid adiuvas? Duo Reges: constructio interrete. Nihil ad rem! Ne sit sane; Satis est ad hoc responsum. Sed videbimus. Tria genera bonorum; Hoc Hieronymus summum bonum esse dixit. \n\n','',80,'2014-10-14 22:55:41'),(207,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Murenam te accusante defenderem. Quaerimus enim finem bonorum. Tu quidem reddes; Duo Reges: constructio interrete. Tum Torquatus: Prorsus, inquit, assentior; Duarum enim vitarum nobis erunt instituta capienda. \n\n','',78,'2014-10-14 22:55:41'),(208,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cur iustitia laudatur? Nihil sane. Quo modo autem philosophus loquitur? Primum divisit ineleganter; \n\n','',79,'2014-10-14 22:55:41'),(209,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nihil sane. Verum hoc idem saepe faciamus. Duo Reges: constructio interrete. Respondent extrema primis, media utrisque, omnia omnibus. \n\n','',75,'2014-10-14 22:55:42'),(210,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Confecta res esset. Quod cum dixissent, ille contra. Tu quidem reddes; Duo Reges: constructio interrete. Ne discipulum abducam, times. \n\n','',80,'2014-10-14 22:55:42'),(211,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si quicquam extra virtutem habeatur in bonis. At iam decimum annum in spelunca iacet. Si longus, levis; Quare attende, quaeso. Nam ista vestra: Si gravis, brevis; Duo Reges: constructio interrete. Peccata paria. Haec dicuntur inconstantissime. \n\n','',77,'2014-10-14 22:55:42'),(212,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid est enim aliud esse versutum? At multis malis affectus. Duo Reges: constructio interrete. \n\n','',73,'2014-10-14 22:55:42'),(213,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quo tandem modo? Cur, nisi quod turpis oratio est? Nos commodius agimus. \n\n','',73,'2014-10-14 22:55:42'),(214,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Refert tamen, quo modo. Maximus dolor, inquit, brevis est. Vide, quantum, inquam, fallare, Torquate. Quid de Platone aut de Democrito loquar? \n\n','',76,'2014-10-14 22:55:42'),(215,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed virtutem ipsam inchoavit, nihil amplius. Iam in altera philosophiae parte. Duo Reges: constructio interrete. Quid me istud rogas? \n\n','',76,'2014-10-14 22:55:42'),(216,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed residamus, inquit, si placet. Sed ille, ut dixi, vitiose. Nihil ad rem! Ne sit sane; Si longus, levis. Simus igitur contenti his. Est, ut dicis, inquit; \n\n','',75,'2014-10-14 22:55:42'),(217,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sequitur disserendi ratio cognitioque naturae; Si longus, levis; Audeo dicere, inquit. Efficiens dici potest. \n\n','',78,'2014-10-14 22:55:42'),(218,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tibi hoc incredibile, quod beatissimum. Duo Reges: constructio interrete. Laboro autem non sine causa; Vide, quantum, inquam, fallare, Torquate. Si enim ad populum me vocas, eum. \n\n','',73,'2014-10-14 22:55:42'),(219,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla erit controversia. Nulla erit controversia. Tum Triarius: Posthac quidem, inquit, audacius. Duo Reges: constructio interrete. Gloriosa ostentatio in constituendo summo bono. \n\n','',77,'2014-10-14 22:55:42'),(220,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si longus, levis. Cur post Tarentum ad Archytam? Res enim concurrent contrariae. Duo Reges: constructio interrete. \n\n','',77,'2014-10-14 22:55:42'),(221,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Graece donan, Latine voluptatem vocant. At ille pellit, qui permulcet sensum voluptate. \n\n','',73,'2014-10-14 22:55:43'),(222,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Polycratem Samium felicem appellabant. Quare attende, quaeso. Sit sane ista voluptas. Non potes, nisi retexueris illa. Duo Reges: constructio interrete. Nam quid possumus facere melius? \n\n','',75,'2014-10-14 22:55:43'),(223,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explanetur igitur. Quis Aristidem non mortuum diligit? Frater et T. An eiusdem modi? Sed residamus, inquit, si placet. Quid dubitas igitur mutare principia naturae? Duo Reges: constructio interrete. Quare conare, quaeso. \n\n','',76,'2014-10-14 22:55:44'),(224,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Summus dolor plures dies manere non potest? Minime vero, inquit ille, consentit. Eademne, quae restincta siti? Quorum altera prosunt, nocent altera. Duo Reges: constructio interrete. \n\n','',78,'2014-10-14 22:55:44'),(225,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Beatus sibi videtur esse moriens. Pauca mutat vel plura sane; Duo Reges: constructio interrete. Tibi hoc incredibile, quod beatissimum. Sint modo partes vitae beatae. Recte, inquit, intellegis. Moriatur, inquit. \n\n','',73,'2014-10-14 22:55:44'),(226,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis enim redargueret? Sit enim idem caecus, debilis. Sed hoc sane concedamus. Sed ad rem redeamus; Numquam facies. \n\n','',73,'2014-10-14 22:55:44'),(227,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Avaritiamne minuis? Egone quaeris, inquit, quid sentiam? Expectoque quid ad id, quod quaerebam, respondeas. Quae diligentissime contra Aristonem dicuntur a Chryippo. Duo Reges: constructio interrete. Quae duo sunt, unum facit. \n\n','',78,'2014-10-14 22:55:44'),(228,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliter homines, aliter philosophos loqui putas oportere? Nunc vides, quid faciat. \n\n','',78,'2014-10-14 22:55:44'),(229,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis est tam dissimile homini. Si quicquam extra virtutem habeatur in bonis. Igitur ne dolorem quidem. Duo Reges: constructio interrete. Iam enim adesse poterit. Si longus, levis. \n\n','',78,'2014-10-14 22:55:44'),(230,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Respondeat totidem verbis. Idem iste, inquam, de voluptate quid sentit? Haeret in salebra. Tecum optime, deinde etiam cum mediocri amico. Proclivi currit oratio. Sint ista Graecorum; \n\n','',80,'2014-10-14 22:55:44'),(231,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod equidem non reprehendo; Sed quot homines, tot sententiae; Tubulo putas dicere? Duo Reges: constructio interrete. Scaevolam M. Qui ita affectus, beatum esse numquam probabis; \n\n','',76,'2014-10-14 22:55:44'),(232,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod equidem non reprehendo; Quodcumque in mentem incideret, et quodcumque tamquam occurreret. \n\n','',73,'2014-10-14 22:55:45'),(233,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid iudicant sensus? Quamquam te quidem video minime esse deterritum. Equidem, sed audistine modo de Carneade? Sed ad illum redeo. Si id dicis, vicimus. Collige omnia, quae soletis: Praesidium amicorum. \n\n','',77,'2014-10-14 22:55:45'),(234,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ita prorsus, inquam; Nemo igitur esse beatus potest. Duo Reges: constructio interrete. \n\n','',79,'2014-10-14 22:55:45'),(235,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quo tandem modo? Itaque fecimus. Cur id non ita fit? Cupiditates non Epicuri divisione finiebat, sed sua satietate. Quod ea non occurrentia fingunt, vincunt Aristonem; Duo Reges: constructio interrete. Id est enim, de quo quaerimus. Erit enim mecum, si tecum erit. Poterat autem inpune; \n\n','',76,'2014-10-14 22:55:45'),(236,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis negat? At coluit ipse amicitias. Ut pulsi recurrant? Satis est ad hoc responsum. Facillimum id quidem est, inquam. Duo Reges: constructio interrete. Eaedem res maneant alio modo. \n\n','',80,'2014-10-14 22:55:45'),(237,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quonam, inquit, modo? Quid ad utilitatem tantae pecuniae? Poterat autem inpune; Qui est in parvis malis. \n\n','',79,'2014-10-14 22:55:45'),(238,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliter enim explicari, quod quaeritur, non potest. Murenam te accusante defenderem. Summum a vobis bonum voluptas dicitur. Duo Reges: constructio interrete. Res enim concurrent contrariae. \n\n','',78,'2014-10-14 22:55:45'),(239,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non est igitur voluptas bonum. ALIO MODO. Dat enim intervalla et relaxat. Moriatur, inquit. \n\n','',78,'2014-10-14 22:55:45'),(240,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sullae consulatum? Memini me adesse P. Efficiens dici potest. Venit ad extremum; Duo Reges: constructio interrete. Hoc loco tenere se Triarius non potuit. \n\n','',77,'2014-10-14 22:55:45'),(241,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae cum essent dicta, discessimus. Ut aliquid scire se gaudeant? Honesta oratio, Socratica, Platonis etiam. \n\n','',74,'2014-10-14 22:55:45'),(242,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod cum dixissent, ille contra. Quibusnam praeteritis? Quae duo sunt, unum facit. Duo Reges: constructio interrete. Cur haec eadem Democritus? Quare attende, quaeso. \n\n','',79,'2014-10-14 22:55:45');
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

-- Dump completed on 2014-10-15 11:08:16
