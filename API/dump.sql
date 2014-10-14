SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP DATABASE IF EXISTS 'way';
CREATE DATABASE 'way';

CREATE SCHEMA IF NOT EXISTS `way` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `way` ;

-- -----------------------------------------------------
-- Table `way`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `way`.`users` ;

CREATE TABLE IF NOT EXISTS `way`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `facebook_id` VARCHAR(150) NOT NULL,
  `firstname` VARCHAR(75) NOT NULL,
  `lastname` VARCHAR(75) NOT NULL,
  `picture` VARCHAR(255) NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `way`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `way`.`categories` ;

CREATE TABLE IF NOT EXISTS `way`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(75) NOT NULL,
  `sex` VARCHAR(6) NOT NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `way`.`questions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `way`.`questions` ;

CREATE TABLE IF NOT EXISTS `way`.`questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TINYTEXT NOT NULL,
  `file` VARCHAR(255) NOT NULL,
  `category_id` INT NOT NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_question_category_idx` (`category_id` ASC),
  CONSTRAINT `fk_question_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `way`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `way`.`answers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `way`.`answers` ;

CREATE TABLE IF NOT EXISTS `way`.`answers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question_id` INT NOT NULL,
  `answer` TINYTEXT NOT NULL,
  `status` TINYINT(1) NOT NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_question_answer_idx` (`question_id` ASC),
  CONSTRAINT `fk_question_answer`
    FOREIGN KEY (`question_id`)
    REFERENCES `way`.`questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `way`.`badges`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `way`.`badges` ;

CREATE TABLE IF NOT EXISTS `way`.`badges` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(75) NOT NULL,
  `picture` VARCHAR(255) NULL,
  `category_id` INT NOT NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_badges_categories_idx` (`category_id` ASC),
  CONSTRAINT `fk_badges_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `way`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `way`.`user_responses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `way`.`user_responses` ;

CREATE TABLE IF NOT EXISTS `way`.`user_responses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `question_id` INT NOT NULL,
  `response_id` INT NOT NULL,
  `created` DATETIME NOT NULL,
  INDEX `fk_user_responses_user_idx` (`user_id` ASC),
  INDEX `fk_user_responses_question_idx` (`question_id` ASC),
  INDEX `fk_user_responses_answers_idx` (`response_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_responses_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `way`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_responses_question`
    FOREIGN KEY (`question_id`)
    REFERENCES `way`.`questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_responses_answers`
    FOREIGN KEY (`response_id`)
    REFERENCES `way`.`answers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
