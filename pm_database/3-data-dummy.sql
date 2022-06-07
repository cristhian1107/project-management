USE project_management;

INSERT INTO users (`id`, `company_id`, `role_id`, `name`, `lastname`, `email`, `user`, `password`, `gender`, `position`, `department`, `campus`, `create_at`, `create_by`, `update_at`, `update_by`)
VALUES
(1, 1, 2, 'Javier', 'Pilco', 'javier.pilco@autrisa.com', 'javier.pilco', 'ja-pi', 'M', 'Jefe TI', 'Tecnogolía de Información', 'Arequipa', CURRENT_TIMESTAMP(), 'preloaded.data', NULL, NULL);
