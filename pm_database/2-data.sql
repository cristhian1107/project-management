USE project_management;

INSERT INTO companies (`id`, `ruc`, `name`, `tradename`, `address`, `create_at`, `create_by`, `update_at`, `update_by`)
VALUES
(1, '20100202396', 'AUTRISA AUTOMOTRIZ ANDINA S.A.', 'AUTRISA', 'AV. PARRA NRO. 122 URB. VALLECITO', CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(2, '20455307954', 'AUTOMOTRIZ INCAMOTORS S.A.C.', 'INCAMOTORS', 'AV. PARRA NRO. 122', CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(3, '20601818672', 'CONCESIONARIA NOVA AUTOS S.A.C.', 'NOVA AUTOS', 'VAR. UCHUMAYO 4.5 LAT. 2 LT. 695 ALTO EL CURAL SECC. E', CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL);

INSERT INTO roles (`id`, `name`, `description`, `is_active`, `create_at`, `create_by`, `update_at`, `update_by`)
VALUES
(1, 'SOLICITANTE', NULL, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(2, 'GERENCIA DE TI', NULL, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(3, 'GERENCIA GENERAL', NULL, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(4, 'AGENTE', NULL, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(5, 'JEFE DE PROYECTO', NULL, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL);
