# Instrucciones de Configuración para WebAuthn

## 🔧 Problema Identificado

El error "WebAuthn is not supported in this browser" puede deberse a varios factores:

1. **Contexto no seguro**: WebAuthn requiere HTTPS o localhost
2. **Navegador no compatible**: Algunos navegadores no soportan WebAuthn
3. **Variables de entorno faltantes**: Configuración incompleta

## 📋 Pasos para Solucionar

### 1. Crear archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```bash
# Stellar RPC URL
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org

# Network passphrase for testnet
NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

# Wallet WASM hash (placeholder for testing)
NEXT_PUBLIC_WALLET_WASM_HASH=test-wasm-hash

# Launchtube configuration (placeholder for testing)
NEXT_PUBLIC_LAUNCHTUBE_URL=https://launchtube.stellar.org
NEXT_PUBLIC_LAUNCHTUBE_JWT=test-jwt

# Mercury configuration (placeholder for testing)
NEXT_PUBLIC_MERCURY_PROJECT_NAME=test-project
NEXT_PUBLIC_MERCURY_URL=https://mercury.stellar.org
NEXT_PUBLIC_MERCURY_JWT=test-jwt

# Native contract ID (placeholder for testing)
NEXT_PUBLIC_NATIVE_CONTRACT_ID=test-contract-id
```

### 2. Verificar el Contexto de Seguridad

Asegúrate de que estés ejecutando la aplicación en:
- **localhost** (http://localhost:3000)
- **HTTPS** (https://tu-dominio.com)

### 3. Verificar Compatibilidad del Navegador

Usa un navegador moderno que soporte WebAuthn:
- ✅ Chrome 67+
- ✅ Firefox 60+
- ✅ Safari 13+
- ✅ Edge 18+

### 4. Verificar Configuración del Sistema

En macOS:
- Asegúrate de que Touch ID esté configurado
- O usa un dispositivo externo (YubiKey, etc.)

En Windows:
- Asegúrate de que Windows Hello esté configurado
- O usa un dispositivo externo

En Linux:
- Usa un dispositivo externo o configuración de autenticación

## 🔍 Componente de Diagnóstico

El proyecto ahora incluye un componente `WebAuthnStatus` que verifica automáticamente:

- ✅ Soporte de WebAuthn en el navegador
- ✅ Contexto seguro (HTTPS/localhost)
- ✅ Disponibilidad del autenticador de plataforma
- ✅ Configuración del sistema

## 🚀 Comandos para Probar

```bash
# Instalar dependencias
npm install

# Crear archivo .env.local (ver arriba)

# Ejecutar en modo desarrollo
npm run dev

# Abrir en http://localhost:3000
```

## 🐛 Solución de Problemas

### Error: "WebAuthn is not supported in this browser"

**Causas posibles:**
1. Navegador no compatible
2. No estás en localhost o HTTPS
3. Configuración del sistema faltante

**Soluciones:**
1. Usa Chrome/Firefox/Safari/Edge moderno
2. Asegúrate de estar en `http://localhost:3000`
3. Configura Touch ID/Windows Hello/dispositivo externo

### Error: "Platform authenticator not available"

**Causas posibles:**
1. Touch ID/Windows Hello no configurado
2. Sistema no soporta autenticación biométrica

**Soluciones:**
1. Configura Touch ID en macOS
2. Configura Windows Hello en Windows
3. Usa un dispositivo externo (YubiKey)

### Error: "Cannot read properties of undefined (reading 'digest')"

**Causa:** Problema con crypto.subtle en el lado del cliente

**Solución:** Ya corregido en la implementación actual

## 📊 Verificación

1. Abre la aplicación en `http://localhost:3000`
2. Ve a `/login` o `/register`
3. El componente `WebAuthnStatus` mostrará el estado
4. Si todo está bien, podrás hacer login/register

## 🎯 Estado Esperado

Cuando todo esté configurado correctamente, deberías ver:

```
✅ WebAuthn is fully supported
```

Y poder hacer login/register sin problemas. 