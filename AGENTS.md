# AGENTS.md

## 📌 Project Overview

StudyRoom Backend is built using:

- Node.js
- Express
- TypeScript
- Hexagonal Architecture

El proyecto se centra en la escalabilidad, el código limpio y la separación de responsabilidades.

---

# 🧠 Architecture Rules

Este proyecto sigue la Arquitectura Hexagonal.

📁 Estructura del proyecto
src/
│
├── application/        # Casos de uso (lógica de negocio)
│   ├── services/
│   ├── use-cases/
│   └── ports/
│
├── domain/             # Entidades y reglas del negocio
│   ├── entities/
│   └── value-objects/
│
├── infrastructure/     # Base de datos y servicios externos
│   ├── database/
│   ├── repositories/
│   └── external/
│
├── interfaces/         # Controladores y rutas (Express)
│   ├── controllers/
│   └── routes/
│
├── config/             # Configuración general
├── shared/             # Utilidades compartidas
└── server.ts           # Punto de entrada

## Layers

### Domain
Contiene:
- Entities
- Value Objects
- Business Rules

La capa de dominio:
- MUST NOT depend on Express
- MUST NOT depend on databases
- MUST remain pure TypeScript

---

### Application
Contiene:
- Use Cases
- Services
- Ports (interfaces)

The application layer:
- Coordinates business logic
- Uses abstractions instead of implementations

---

### Infrastructure
Contiene:
- Implementaciones de bases de datos.
- Servicios externos
- Implementaciones de repositorio

La infraestructura depende de la aplicación/dominio, nunca al revés

---

### Interfaces
Contains:
- Controllers
- Routes
- HTTP logic

Esta es la capa de entrada Express.

---

# 📂 Folder Rules

## NO coloque lógica de negocios dentro:
- controladores
- rutas

La lógica empresarial pertenece al interior:
- casos de uso
- servicios


---

# 🧪 Code Standards

## TypeScript
- Utilice una escritura estricta
- Evite el uso de "cualquiera"
- Prefiere interfaces y tipos.

---

## Naming

### Files
Use:
- camelCase for variables/functions
- PascalCase for classes/entities

Examples:
- createUser.ts
- UserEntity.ts

---

# 🚫 Prohibido

No:
- Mezclar infraestructura con dominio.
- Acceda a la base de datos directamente desde los controladores
- Poner lógica grande dentro de las rutas.
---

# ✅Prácticas Preferidas

- Pequeñas funciones reutilizables
- Inyección de dependencia
- Separación limpia de preocupaciones.
- Código mantenible

---

# 📌 Reglas de Git

Antes de empujar:
- Verificar la compilación del código.
- Evite presionar node_modules
- Escribir mensajes de confirmación significativos

# 🎯 Main Goal

Build a scalable backend for StudyRoom with clean architecture and maintainable code.

⚙️ Instalación
# Clonar repositorio
git clone https://github.com/soledadvasquez-a11y/StudyRoom-Backend.git

# Entrar al proyecto
cd StudyRoom-Backend

# Instalar dependencias
npm install