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

    DECLARE v_user_id, v_role_id bigint;
    SELECT id, role_id INTO v_user_id, v_role_id
    FROM users
    WHERE
        user = pvchuserr AND
        password = pvchpassword;

    -- Info user.
    SELECT id , company_id , role_id , name
        , lastname , email , user , password
        , gender , position , department , campus
    FROM users
    WHERE
        id = v_user_id;

    -- Info role.
    SELECT id , name , description , is_active
    FROM roles
    WHERE id = v_role_id;

    -- Info options.
    SELECT opt.id , opt.name , opt.alias , opt.description, rop.is_active
    FROM options opt
    INNER JOIN roles_options rop ON opt.id = rop.option_id
    WHERE
        rop.role_id = v_role_id AND
        rop.is_active = 1;

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


DROP PROCEDURE IF EXISTS requests_insert;
-- =========================================================
-- Autor - Fecha Crea  : Cristhian Apaza - 2022-06-11
-- Descripcion         : Update record from the table
-- Autor - Fecha Modif :
-- Descripcion         :
-- =========================================================
DELIMITER $$
CREATE PROCEDURE requests_insert
( INOUT pbigid bigint
, IN pinttable_typ int
, IN pintcode_typ int
, IN pvchcode varchar(50)
, IN pbigcompany_id bigint
, IN pbiguser_id bigint
, IN pvchsubject varchar(50)
, IN pvchreason varchar(250)
, IN pvchname varchar(50)
, IN pvchdescription varchar(250)
, IN pvchdepartment varchar(50)
, IN pvchcampus varchar(50)
, IN pdtmdate_issue datetime
, IN pdtmdate_tentative datetime
, IN pinttable_sta int
, IN pintcode_sta int
, IN pinttable_pri int
, IN pintcode_pri int
, IN pdecpercentage decimal(5, 2)
, IN pdtmcreate_at datetime
, IN pvchcreate_by varchar(50)
, IN pdtmupdate_at datetime
, IN pvchupdate_by varchar(50) )
BEGIN

    SELECT IF(ISNULL(MAX(id)), 1, MAX(id) + 1)  INTO pbigid
    FROM requests;

    SELECT company_id, department, campus, user INTO pbigcompany_id, pvchdepartment, pvchcampus, pvchcreate_by
    FROM users
    WHERE
        id = pbiguser_id;

    INSERT INTO requests
        ( id , table_typ , code_typ , code
        , company_id , user_id , subject , reason
        , name , description , department , campus
        , date_issue , date_tentative , table_sta , code_sta
        , table_pri , code_pri , percentage , create_at
        , create_by , update_at , update_by)
    VALUES
        ( pbigid , pinttable_typ , pintcode_typ , pvchcode
        , pbigcompany_id , pbiguser_id , pvchsubject , pvchreason
        , pvchname , pvchdescription , pvchdepartment , pvchcampus
        , pdtmdate_issue , pdtmdate_tentative , pinttable_sta , pintcode_sta
        , pinttable_pri , pintcode_pri , pdecpercentage , pdtmcreate_at
        , CURRENT_TIMESTAMP() , NULL , NULL);

END $$
DELIMITER ;
