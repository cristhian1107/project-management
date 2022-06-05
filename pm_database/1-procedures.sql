USE project_management;

DROP PROCEDURE IF EXISTS users_login;
-- =========================================================
-- Autor - Fecha Crea  : Cristhian Apaza - 2022-06-05
-- Descripcion         : select a record from the table
-- Autor - Fecha Modif :
-- Descripcion         :
-- =========================================================
DELIMITER $$
CREATE PROCEDURE users_login
( IN pvchuserr varchar(50)
, IN pvchpassword varchar(50) )
BEGIN

    SELECT id , company_id , role_id , name
        , lastname , email , user , password
        , gender , position , department , campus
        , create_at , create_by , update_at , update_by
     FROM users
    WHERE
        name = pvchuserr
    AND password = pvchpassword;

END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS users_all;
-- =========================================================
-- Autor - Fecha Crea  : Cristhian Apaza - 2022-06-05
-- Descripcion         : Select all table
-- Autor - Fecha Modif :
-- Descripcion         :
-- =========================================================
DELIMITER $$
CREATE PROCEDURE users_all()
BEGIN

    SELECT
          id , company_id , role_id , name
        , lastname , email , user , password
        , gender , position , department , campus
        , create_at , create_by , update_at , update_by
    FROM users;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS users_one;
-- =========================================================
-- Autor - Fecha Crea  : Cristhian Apaza - 2022-06-05
-- Descripcion         : select a record from the table
-- Autor - Fecha Modif :
-- Descripcion         :
-- =========================================================
DELIMITER $$
CREATE PROCEDURE users_one
( IN pbigid bigint )
BEGIN

    SELECT id , company_id , role_id , name
        , lastname , email , user , password
        , gender , position , department , campus
        , create_at , create_by , update_at , update_by
     FROM users
    WHERE id = pbigid;

END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS users_insert;
-- =========================================================
-- Autor - Fecha Crea  : Cristhian Apaza - 2022-06-05
-- Descripcion         : Insert new record from the table
-- Autor - Fecha Modif :
-- Descripcion         :
-- =========================================================
DELIMITER $$
CREATE PROCEDURE users_insert
( INOUT pbigid bigint
, IN pbigcompany_id bigint
, IN pbigrole_id bigint
, IN pvchname varchar(50)
, IN pvchlastname varchar(50)
, IN pvchemail varchar(50)
, IN pvchuserr varchar(50)
, IN pvchpassword varchar(50)
, IN pchrgender char(1)
, IN pvchposition varchar(50)
, IN pvchdepartment varchar(50)
, IN pvchcampus varchar(50)
, IN pdtmcreate_at datetime
, IN pvchcreate_by varchar(50)
, IN pdtmupdate_at datetime
, IN pvchupdate_by varchar(50) )
BEGIN

    INSERT INTO users
        ( id , company_id , role_id , name
        , lastname , email , userr , password
        , gender , position , department , campus
        , create_at , create_by , update_at , update_by)
    VALUES
        ( pbigid , pbigcompany_id , pbigrole_id , pvchname
        , pvchlastname , pvchemail , pvchuserr , pvchpassword
        , pchrgender , pvchposition , pvchdepartment , pvchcampus
        , pdtmcreate_at , pvchcreate_by , pdtmupdate_at , pvchupdate_by);
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS users_update;
-- =========================================================
-- Autor - Fecha Crea  : Cristhian Apaza - 2022-06-05
-- Descripcion         : Update record from the table
-- Autor - Fecha Modif :
-- Descripcion         :
-- =========================================================
DELIMITER $$
CREATE PROCEDURE users_update
( IN pbigid bigint
, IN pbigcompany_id bigint
, IN pbigrole_id bigint
, IN pvchname varchar(50)
, IN pvchlastname varchar(50)
, IN pvchemail varchar(50)
, IN pvchuserr varchar(50)
, IN pvchpassword varchar(50)
, IN pchrgender char(1)
, IN pvchposition varchar(50)
, IN pvchdepartment varchar(50)
, IN pvchcampus varchar(50)
, IN pdtmcreate_at datetime
, IN pvchcreate_by varchar(50)
, IN pdtmupdate_at datetime
, IN pvchupdate_by varchar(50) )
BEGIN

    UPDATE users
      SET company_id = pbigcompany_id
        , role_id = pbigrole_id
        , name = pvchname
        , lastname = pvchlastname
        , email = pvchemail
        , userr = pvchuserr
        , password = pvchpassword
        , gender = pchrgender
        , position = pvchposition
        , department = pvchdepartment
        , campus = pvchcampus
        , update_at = pdtmupdate_at
        , update_by = pvchupdate_by
    WHERE id = pbigid;
END $$
DELIMITER ;
