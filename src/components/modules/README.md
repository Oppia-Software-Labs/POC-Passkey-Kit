# Estructura Modular de Componentes

Esta carpeta contiene todos los módulos de la aplicación organizados de manera modular. Cada módulo tiene su propia estructura interna con carpetas para UI, hooks y utilidades.

## Estructura de un Módulo

```
modules/
├── auth/                    # Módulo de autenticación
│   ├── ui/                 # Componentes de UI
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── hooks/              # Hooks específicos del módulo
│   │   └── useAuth.ts
│   ├── utils/              # Utilidades del módulo
│   │   └── authUtils.ts
│   └── index.ts            # Exportaciones del módulo
├── dashboard/              # Módulo del dashboard
│   ├── ui/
│   │   └── DashboardContent.tsx
│   ├── hooks/
│   │   └── useDashboard.ts
│   ├── utils/
│   │   └── dashboardUtils.ts
│   └── index.ts
├── click-auth/             # Módulo de click auth
│   ├── ui/
│   │   └── ClickAuthContent.tsx
│   ├── hooks/
│   │   └── useClickAuth.ts
│   ├── utils/
│   │   └── clickAuthUtils.ts
│   └── index.ts
└── wallet/                 # Módulo de wallet
    ├── ui/
    │   └── Navbar.tsx
    ├── hooks/
    │   └── useWalletModule.ts
    └── index.ts
```

## Convenciones

### 1. Separación de Responsabilidades
- **UI**: Solo componentes de presentación y llamadas a hooks
- **Hooks**: Lógica de negocio y estado
- **Utils**: Funciones utilitarias y constantes
- **Pages**: Solo importan y renderizan componentes UI

### 2. Importaciones
```typescript
// ✅ Correcto - Importar desde el índice del módulo
import { LoginForm } from "@/components/modules/auth";

// ❌ Incorrecto - Importar directamente desde ui/
import { LoginForm } from "@/components/modules/auth/ui/LoginForm";
```

### 3. Nomenclatura
- **Componentes UI**: `ComponentName.tsx`
- **Hooks**: `useModuleName.ts`
- **Utils**: `moduleNameUtils.ts`
- **Índices**: `index.ts`

## Módulos Disponibles

### Auth Module
- **LoginForm**: Formulario de login con passkey
- **RegisterForm**: Formulario de registro de wallet
- **useAuth**: Hook que maneja login y registro
- **authUtils**: Constantes y utilidades de autenticación

### Dashboard Module
- **DashboardContent**: Contenido principal del dashboard
- **useDashboard**: Hook para el estado del dashboard
- **dashboardUtils**: Utilidades para formateo y estado

### Click Auth Module
- **ClickAuthContent**: Interfaz para interactuar con el contrato
- **useClickAuth**: Hook para la lógica del contrato
- **clickAuthUtils**: Configuración y utilidades del contrato

### Wallet Module
- **Navbar**: Barra de navegación con estado de wallet
- **useWalletModule**: Hook para el estado de wallet en la UI

## Uso en Páginas

```typescript
// Página simple que solo renderiza el componente UI
import { LoginForm } from "@/components/modules/auth";

export default function LoginPage() {
  return <LoginForm />;
}
```

## Beneficios de esta Estructura

1. **Modularidad**: Cada funcionalidad está encapsulada en su propio módulo
2. **Reutilización**: Los componentes pueden ser reutilizados fácilmente
3. **Mantenibilidad**: Cambios en un módulo no afectan otros
4. **Escalabilidad**: Fácil agregar nuevos módulos
5. **Separación de responsabilidades**: UI, lógica y utilidades están separadas
6. **Importaciones limpias**: Un solo punto de entrada por módulo 