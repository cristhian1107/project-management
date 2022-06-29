USE project_management;

INSERT INTO users (`id`, `company_id`, `role_id`, `name`, `lastname`, `email`, `user`, `password`, `gender`, `position`, `department`, `campus`, `create_at`, `create_by`, `update_at`, `update_by`)
VALUES
(1, 1, 2, 'Javier', 'Pilco', 'cristhian.cjaa@gmail.com', 'javier.pilco', 'a282eb013b00b3672d21d67180b41797', 'M', 'Jefe TI', 'Tecnogolía de Información', 'Arequipa', CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(2, 2, 1, 'Fernando', 'Pastor', 'cristhian.cjaa@gmail.com', 'fernando.pastor', 'a282eb013b00b3672d21d67180b41797', 'M', 'Gerente General', 'Gerencia General', 'Arequipa', CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL);

INSERT INTO options (`id`, `name`, `alias`, `description`, `is_active`, `create_at`, `create_by`, `update_at`, `update_by`)
VALUES
(1, 'DASHBOARD', 'DASH', NULL, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(2, 'REQUERIMIENTO', 'REQU', NULL, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(3, 'REPORTES', 'REPO', NULL, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL);

INSERT INTO roles_options (`role_id`, `option_id`, `is_active`, `create_at`, `create_by`, `update_at`, `update_by`)
VALUES
(2, 1, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(2, 2, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL),
(2, 3, 1, CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL);
