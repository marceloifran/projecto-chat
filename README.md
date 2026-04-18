# ⚙️ NestJS Chat Backend

El motor seguro para interacciones de IA en tiempo real. Este servidor maneja la validación de autenticación, la orquestación de OpenAI y la persistencia segura de datos.

## 🚀 Características Principales

- **Verificación de Identidad**: Utiliza el `Firebase Admin SDK` para validar ID Tokens en cada solicitud sensible.
- **Pasarela de IA**: Se comunica con `OpenAI` (y soporta `OpenRouter`) a través de una capa de servicio robusta.
- **Dashboard Dinámico**: Un panel HTML personalizado en la raíz (`/`) que proporciona telemetría del servicio en vivo.
- **Observabilidad**: Interceptor HTTP global para un registro detallado de solicitudes y respuestas en la consola.

## 📁 Arquitectura Técnica

### 🛡️ Guard de Autenticación
El `FirebaseAuthGuard` extrae el token Bearer de los headers y utiliza `admin.auth().verifyIdToken(token)` para inyectar al usuario validado en el objeto de la solicitud.

### 🤖 Servicio de Chat
Maneja la lógica de:
1. Recibir un mensaje del usuario.
2. Solicitar una completación de IA (con mecanismos de respaldo para límites de cuota).
3. Escribir la respuesta de la IA de vuelta en Firestore con el rol y userId correctos.

## 🛠️ Configuración

Crea un archivo `.env` en este directorio:
```env
PORT=3001
OPENAI_API_KEY=sk-...
```

**Nota sobre Firebase Admin**: Coloca tu archivo `firebase-service-account.json` en este directorio. La aplicación lo detectará automáticamente e inicializará el SDK de Administración.

## 🏁 Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar en modo observación (watch mode)
npm run start:dev
```

---
*Backend construido con NestJS para máxima escalabilidad y seguridad de tipos.*
