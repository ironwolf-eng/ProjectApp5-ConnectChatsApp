# 📱 ConnectChatsApp

**ConnectChatsApp** es una aplicación de mensajería construida con **React Native**, **Expo Router**, y **XMPP**.  
Permite a los usuarios conectarse, chatear, actualizar su perfil y gestionar ajustes, todo con un diseño moderno y adaptable.

---

## 📂 Estructura del proyecto

/app
|_ layout.tsx → Navegador principal (Stack/Tabs)
| index.tsx → Pantalla de bienvenida
|_ login.tsx → Pantalla de login
|_ register.tsx → Registro de usuario
|_ chat-list.tsx → Lista de chats
|_ contacts.tsx → Lista de contactos
|_ profile.tsx → Perfil de usuario
|_ settings.tsx → Ajustes de app
/src
|_ context/ → Contextos (AuthContext, ChatContext, SettingsContext)
|_ hooks/ → Custom hooks (useXMPP, etc.)
|_ components/ → Componentes reutilizables (WhatsAppLayout, etc.)
/assets → Imágenes, fondos, animaciones Lottie


---

## 🛠 Instalación

1️⃣ Clona el proyecto:
```bash
git clone https://github.com/tu-usuario/ConnectChatsApp.git
cd ConnectChatsApp
2️⃣ Instala dependencias: npm install
3️⃣ Inicia en Expo: npx expo start

⚙ Tecnologías usadas

    React Native 0.79

    Expo SDK 53

    expo-router

    react-native-paper

    @xmpp/client

    lottie-react-native
🚀 Funcionalidades

✅ Login y registro
✅ Lista de chats y contactos
✅ Perfil editable con foto
✅ Ajustes de notificaciones, idioma, tema claro/oscuro
✅ Animaciones Lottie
✅ Conexión a servidor XMPP (chat en tiempo real)

🧪 Pendientes / Mejoras

    Guardar mensajes localmente (AsyncStorage)

    Implementar notificaciones locales/push

    Validación de credenciales reales (password)

    Mejorar diseño visual y colores

    Añadir pruebas unitarias y de integración

🔗 GitHub
✉ ironwolf-proto@proton.me

---

👉 Si quieres, puedo generarte este README como un archivo listo para descargar (formato `.md`).  
Responde: **“Sí, mándame el archivo listo”** y lo preparo para ti. 📦
