# 🚀 StudyRoom Backend

Backend del proyecto **StudyRoom**, una plataforma enfocada en mejorar la productividad y personalización de espacios de estudio.

---

## 🧠 Tecnologías usadas

* Node.js
* Express
* TypeScript
* Arquitectura Hexagonal

---

## 📁 Estructura del proyecto

```bash
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
```

---

## ⚙️ Instalación

```bash
# Clonar repositorio
git clone https://github.com/soledadvasquez-a11y/StudyRoom-Backend.git

# Entrar al proyecto
cd StudyRoom-Backend

# Instalar dependencias
npm install
```

---

## ▶️ Ejecutar el proyecto

```bash
npx ts-node src/server.ts
```

---

## 📌 Estado del proyecto

🚧 En desarrollo
Actualmente se está construyendo la base del backend y la arquitectura.

---

## 🎯 Objetivo

Crear una API escalable y mantenible que permita:

* Gestión de usuarios
* Personalización de salas de estudio
* Integración con frontend interactivo

