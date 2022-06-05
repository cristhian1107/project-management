-- ************************************************ --
-- ******************* DATABASE ******************* --
-- ************************************************ --

-- ************ `project_management` *****************
-- Create at: 2022-06-04 (Cristhian Apaza)
-- Update at:
-- ***************************************************
CREATE DATABASE IF NOT EXISTS project_management;

CREATE USER IF NOT EXISTS 'development'@'localhost';
SET PASSWORD FOR 'development'@'localhost' = 'dev_pwd(001)';
GRANT ALL ON project_management.* TO 'development'@'localhost';
GRANT SELECT ON performance_schema.* TO 'development'@'localhost';
FLUSH PRIVILEGES;

USE project_management;

-- ************************************************ --
-- ********************* TABLES ******************* --
-- ************************************************ --

-- ************ `companies` **************************
-- Create at: 2022-06-04 (Cristhian Apaza)
-- Update at:
-- ***************************************************
CREATE TABLE IF NOT EXISTS `companies`
(
 `id`        bigint NOT NULL ,
 `ruc`       varchar(25) NOT NULL ,
 `name`      varchar(50) NOT NULL ,
 `tradename` varchar(50) NULL ,
 `address`   varchar(100) NULL ,
 `create_at` datetime NOT NULL ,
 `create_by` varchar(50) NOT NULL ,
 `update_at` datetime NULL ,
 `update_by` varchar(100) NULL ,

PRIMARY KEY (`id`)
);

-- ************ `roles` ******************************
-- Create at: 2022-06-04 (Cristhian Apaza)
-- Update at:
-- ***************************************************
CREATE TABLE IF NOT EXISTS `roles`
(
 `id`          bigint NOT NULL ,
 `name`        varchar(50) NOT NULL ,
 `description` varchar(150) NULL ,
 `is_active`   bit NOT NULL ,
 `create_at`   datetime NOT NULL ,
 `create_by`   varchar(50) NOT NULL ,
 `update_at`   datetime NULL ,
 `update_by`   varchar(100) NULL ,

PRIMARY KEY (`id`)
);

-- ************ `options` ****************************
-- Create at: 2022-06-04 (Cristhian Apaza)
-- Update at:
-- ***************************************************
CREATE TABLE IF NOT EXISTS `options`
(
 `id`          bigint NOT NULL ,
 `name`        varchar(50) NOT NULL ,
 `alias`       varchar(25) NOT NULL ,
 `description` varchar(150) NULL ,
 `is_active`   bit NOT NULL ,
 `create_at`   datetime NOT NULL ,
 `create_by`   varchar(50) NOT NULL ,
 `update_at`   datetime NULL ,
 `update_by`   varchar(100) NULL ,

PRIMARY KEY (`id`)
);

-- ************ `users` ******************************
-- Create at: 2022-06-04 (Cristhian Apaza)
-- Update at:
-- ***************************************************
CREATE TABLE IF NOT EXISTS `users`
(
 `id`         bigint NOT NULL ,
 `company_id` bigint NOT NULL ,
 `role_id`    bigint NOT NULL ,
 `name`       varchar(50) NOT NULL ,
 `lastname`   varchar(50) NOT NULL ,
 `email`      varchar(50) NOT NULL ,
 `user`       varchar(50) NOT NULL ,
 `password`   varchar(50) NOT NULL ,
 `gender`     char(1) NOT NULL ,
 `position`   varchar(50) NULL ,
 `department` varchar(50) NULL ,
 `campus`     varchar(50) NOT NULL ,
 `create_at`  datetime NOT NULL ,
 `create_by`  varchar(50) NOT NULL ,
 `update_at`  datetime NULL ,
 `update_by`  varchar(50) NULL ,


PRIMARY KEY (`id`),
UNIQUE KEY `username` (`user`),
KEY `company_id` (`company_id`),
CONSTRAINT `fk_companies_users` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
KEY `role_id` (`role_id`),
CONSTRAINT `fk_roles_users` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
);


-- ************ `roles_options` **********************
-- Create at: 2022-06-04 (Cristhian Apaza)
-- Update at:
-- ***************************************************
CREATE TABLE IF NOT EXISTS `roles_options`
(
 `role_id`   bigint NOT NULL ,
 `option_id` bigint NOT NULL ,
 `is_active` bit NOT NULL ,
 `create_at` datetime NOT NULL ,
 `create_by` varchar(50) NOT NULL ,
 `update_at` datetime NULL ,
 `update_by` varchar(50) NULL ,

PRIMARY KEY (`role_id`, `option_id`),
KEY `role_id` (`role_id`),
CONSTRAINT `FK_128` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
KEY `option_id` (`option_id`),
CONSTRAINT `FK_131` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`)
);
