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
CONSTRAINT `fk_users_companies` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
KEY `role_id` (`role_id`),
CONSTRAINT `fk_users_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
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
CONSTRAINT `fk_roles_options` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
KEY `option_id` (`option_id`),
CONSTRAINT `fk_options_roles` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`)
);


-- ************ `tables` **********************
-- Create at: 2022-06-11 (Cristhian Apaza)
-- Update at:
-- ***************************************************
CREATE TABLE IF NOT EXISTS `tables`
(
 `table`       int NOT NULL ,
 `code`        int NOT NULL ,
 `name`        varchar(50) NOT NULL ,
 `alias`       char(3) NOT NULL ,
 `description` varchar(150) NULL ,
 `is_active`   bit NOT NULL ,
 `create_at`   datetime NOT NULL ,
 `create_by`   varchar(50) NOT NULL ,
 `update_at`   datetime NULL ,
 `update_by`   varchar(50) NULL ,

PRIMARY KEY (`table`, `code`)
);


-- ************ `requests` **********************
-- Create at: 2022-06-11 (Cristhian Apaza)
-- Update at:
-- ***************************************************
CREATE TABLE IF NOT EXISTS `requests`
(
 `id`             bigint NOT NULL ,
 `table_typ`      int NOT NULL ,
 `code_typ`       int NOT NULL ,
 `code`           varchar(50) NOT NULL ,
 `company_id`     bigint NOT NULL ,
 `user_id`        bigint NOT NULL ,
 `subject`        varchar(50) NOT NULL ,
 `reason`         varchar(250) NOT NULL ,
 `name`           varchar(50) NULL ,
 `description`    varchar(250) NULL ,
 `department`     varchar(50) NOT NULL ,
 `campus`         varchar(50) NOT NULL ,
 `date_issue`     datetime NOT NULL ,
 `date_tentative` datetime NULL ,
 `table_sta`      int NOT NULL ,
 `code_sta`       int NOT NULL ,
 `table_pri`      int NOT NULL ,
 `code_pri`       int NOT NULL ,
 `percentage`     decimal(5,2) NOT NULL ,
 `create_at`      datetime NOT NULL ,
 `create_by`      varchar(50) NOT NULL ,
 `update_at`      datetime NULL ,
 `update_by`      varchar(50) NULL ,

PRIMARY KEY (`id`),
KEY `user_id` (`user_id`),
CONSTRAINT `fk_requests_users` FOREIGN KEY `user_id` (`user_id`) REFERENCES `users` (`id`),
KEY `company_id` (`company_id`),
CONSTRAINT `fk_requests_companies` FOREIGN KEY `company_id` (`company_id`) REFERENCES `companies` (`id`),
KEY `table_code_sta` (`table_sta`, `code_sta`),
CONSTRAINT `fk_requests_tables_sta` FOREIGN KEY `table_code_sta` (`table_sta`, `code_sta`) REFERENCES `tables` (`table`, `code`),
KEY `table_code_pri` (`table_pri`, `code_pri`),
CONSTRAINT `fk_requests_tables_pri` FOREIGN KEY `table_code_pri` (`table_pri`, `code_pri`) REFERENCES `tables` (`table`, `code`),
KEY `table_code_typ` (`table_typ`, `code_typ`),
CONSTRAINT `fk_requests_tables_typ` FOREIGN KEY `table_code_typ` (`table_typ`, `code_typ`) REFERENCES `tables` (`table`, `code`)
);


-- ************ `requests_events` **********************
-- Create at: 2022-06-11 (Cristhian Apaza)
-- Update at:
-- ***************************************************
CREATE TABLE IF NOT EXISTS `requests_events`
(
 `project_id` bigint NOT NULL ,
 `item`       int NOT NULL ,
 `table_sta`  int NOT NULL ,
 `code_sta`   int NOT NULL ,
 `date_issue` datetime NOT NULL ,
 `user_id`    bigint NOT NULL ,
 `create_at`  datetime NOT NULL ,
 `create_by`  varchar(50) NOT NULL ,
 `update_at`  datetime NULL ,
 `update_by`  varchar(50) NULL ,

PRIMARY KEY (`project_id`, `item`),
KEY `project_id` (`project_id`),
CONSTRAINT `fk_requests_events` FOREIGN KEY `project_id` (`project_id`) REFERENCES `requests` (`id`),
KEY `table_code_sta` (`table_sta`, `code_sta`),
CONSTRAINT `fk_requests_events_tables_sta` FOREIGN KEY `table_code_sta` (`table_sta`, `code_sta`) REFERENCES `tables` (`table`, `code`),
KEY `user_id` (`user_id`),
CONSTRAINT `fk_requests_events_users` FOREIGN KEY `user_id` (`user_id`) REFERENCES `users` (`id`)
);
