USE project_management;

INSERT INTO users (`id`, `company_id`, `role_id`, `name`, `lastname`, `email`, `user`, `password`, `gender`, `position`, `department`, `campus`, `create_at`, `create_by`, `update_at`, `update_by`)
VALUES
(1, 1, 1, 'Cristhian', 'Apaza', 'cristhian.cjaa@gmail.com', 'cristhian.apaza', '0a9a1b4db537f73bbc7f7278d99ca60c', 'M', 'Jefe de RRHH', 'Gestión Humana', 'Arequipa', CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(2, 2, 1, 'Miguel', 'Grillo', 'miguelgrillo22@gmail.com', 'miguel.grilo', '36022ac34013395eb7291f8356fb4f40', 'M', 'Jefe de PostVenta', 'Post-Venta', 'Arequipa', CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(3, 3, 1, 'Miguel', 'Barrera', 'barreram987@gmail.com', 'miguel.barrera', '55ce88b6b153779f6cc58f298aa24573', 'M', 'Jefe de Contabilidad', 'Contabilidad y Tesoreria', 'Arequipa', CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(4, 1, 2, 'Javier', 'Pilco', 'cristhian.cjaa@outlook.com', 'javier.pilco', 'a282eb013b00b3672d21d67180b41797', 'M', 'Jefe de TI', 'Tecnología de Información', 'Arequipa', CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(5, 1, 3, 'Jorge', 'Olazabal', 'cristhian.apaza@autrisa.com', 'jorge.olazabal', '9b82b182003fb062ec3a883f6943fcae', 'M', 'Gerente Corporativo', 'Gerencia', 'Arequipa', CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL);

INSERT INTO options (`id`, `name`, `alias`, `description`, `is_active`, `create_at`, `create_by`, `update_at`, `update_by`)
VALUES
(1, 'DASHBOARD', 'DASH', NULL, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(2, 'REQUERIMIENTO', 'REQU', NULL, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(3, 'REPORTES', 'REPO', NULL, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL);

INSERT INTO roles_options (`role_id`, `option_id`, `is_active`, `create_at`, `create_by`, `update_at`, `update_by`)
VALUES
(1, 1, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(1, 2, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(1, 3, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(2, 1, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(2, 2, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(2, 3, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(3, 1, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(3, 2, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(3, 3, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL);
