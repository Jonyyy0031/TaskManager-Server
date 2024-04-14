# DATABASE
```
CREATE TABLE `roles` (
  `ID_Rol` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

```
CREATE TABLE `usuarios` (
  `ID_Usuario` int(11) NOT NULL,
  `ID_Rol` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Fechareg` date NOT NULL,
  `Imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

```
CREATE TABLE `listas` (
  `ID_Lista` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

```
CREATE TABLE `tareas` (
  `ID_Tarea` int(11) NOT NULL,
  `ID_Lista` int(11) NOT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  `Prioridad` enum('Alto','Normal','Bajo','') NOT NULL,
  `FechaVencimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

```
CREATE TABLE `subtareas` (
  `ID_SubTarea` int(11) NOT NULL,
  `ID_Tarea` int(11) DEFAULT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Completada` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

```
CREATE TABLE `notifications` (
  `ID_Notificacion` int(11) NOT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `FechaDeEnvio` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

# INDICES, AI, FK

```

-- Indices de la tabla `listas`

ALTER TABLE `listas`
  ADD PRIMARY KEY (`ID_Lista`),
  ADD KEY `ID_Usuario` (`ID_Usuario`);


-- Indices de la tabla `notifications`

ALTER TABLE `notifications`
  ADD PRIMARY KEY (`ID_Notificacion`),
  ADD KEY `notifications_ibfk_1` (`ID_Usuario`);


-- Indices de la tabla `roles`

ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID_Rol`),
  ADD UNIQUE KEY `Nombre` (`Nombre`);


-- Indices de la tabla `subtareas`

ALTER TABLE `subtareas`
  ADD PRIMARY KEY (`ID_SubTarea`),
  ADD KEY `subtareas_ibfk_1` (`ID_Tarea`);


-- Indices de la tabla `tareas`

ALTER TABLE `tareas`
  ADD PRIMARY KEY (`ID_Tarea`),
  ADD KEY `ID_Lista` (`ID_Lista`);


-- Indices de la tabla `usuarios`

ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID_Usuario`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD KEY `Rol` (`ID_Rol`);



-- AUTO_INCREMENT de la tabla `listas`

ALTER TABLE `listas`
  MODIFY `ID_Lista` int(11) NOT NULL AUTO_INCREMENT;


-- AUTO_INCREMENT de la tabla `notifications`

ALTER TABLE `notifications`
  MODIFY `ID_Notificacion` int(11) NOT NULL AUTO_INCREMENT;


-- AUTO_INCREMENT de la tabla `roles`

ALTER TABLE `roles`
  MODIFY `ID_Rol` int(11) NOT NULL AUTO_INCREMENT;


-- AUTO_INCREMENT de la tabla `subtareas`

ALTER TABLE `subtareas`
  MODIFY `ID_SubTarea` int(11) NOT NULL AUTO_INCREMENT;


-- AUTO_INCREMENT de la tabla `tareas`

ALTER TABLE `tareas`
  MODIFY `ID_Tarea` int(11) NOT NULL AUTO_INCREMENT;


-- AUTO_INCREMENT de la tabla `usuarios`

ALTER TABLE `usuarios`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT;



-- Filtros para la tabla `listas`

ALTER TABLE `listas`
  ADD CONSTRAINT `listas_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;


-- Filtros para la tabla `notifications`

ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;


-- Filtros para la tabla `subtareas`

ALTER TABLE `subtareas`
  ADD CONSTRAINT `subtareas_ibfk_1` FOREIGN KEY (`ID_Tarea`) REFERENCES `tareas` (`ID_Tarea`) ON DELETE CASCADE ON UPDATE CASCADE;


-- Filtros para la tabla `tareas`

ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_2` FOREIGN KEY (`ID_Lista`) REFERENCES `listas` (`ID_Lista`) ON DELETE CASCADE ON UPDATE CASCADE;


-- Filtros para la tabla `usuarios`

ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`ID_Rol`) REFERENCES `roles` (`ID_Rol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
```
