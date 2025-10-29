# 🛠️ Couteau - Caja de Herramientas Digital
Una aplicación móvil multifuncional desarrollada con Ionic + Vue 3 que combina diversas herramientas útiles en un solo lugar.

https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white
https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white
https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white

✨ Características
🎯 Herramientas Disponibles
🔮 Predicción de Género - Descubre el género probable de cualquier nombre

📅 Predicción de Edad - Estima la edad promedio asociada a un nombre

🎓 Buscador de Universidades - Encuentra universidades por país

🌤️ Clima en RD - Información meteorológica en tiempo real

⚡ Pokémon Info - Información detallada de Pokémon

📰 Noticias WordPress - Últimas noticias de sitios WordPress

👤 Acerca de - Información del desarrollador

🚀 Características Técnicas
Framework: Ionic 7 + Vue 3

Runtime: Capacitor

Arquitectura: Composition API

HTTP Client: Axios

Iconos: Ionicons

Compatibilidad: Android, iOS, Web PWA

🛠️ Instalación y Configuración
Prerrequisitos
Node.js 16+

npm o yarn

Java JDK 11+ (para Android)

Android Studio (para builds Android)

📥 Clonar e Instalar
bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/couteau-app.git
cd couteau-app

# Instalar dependencias
npm install

# Instalar Ionic CLI globalmente (opcional pero recomendado)
npm install -g @ionic/cli
🎮 Comandos de Desarrollo
bash
# Servidor de desarrollo
ionic serve

# Build para producción
ionic build

# Agregar plataforma Android
npx cap add android

# Sincronizar con plataforma nativa
npx cap sync

# Abrir en Android Studio
npx cap open android

# Ejecutar en dispositivo conectado
npx cap run android
📱 Generación del APK
Configuración de Iconos
Coloca tu imagen icon.png (1024x1024 px) en resources/

Generar recursos:

bash
ionic capacitor resources
npx cap sync
Build para Android
Abrir en Android Studio:

bash
npx cap open android
En Android Studio:

Build > Generate Signed Bundle / APK

Seleccionar APK

Crear nuevo keystore o usar existente

Build Type: Release

Signature Versions: V1 + V2

El APK se generará en: android/app/release/app-release.apk

🏗️ Estructura del Proyecto
text
couteau-app/
├── src/
│   ├── views/                 # Vistas de la aplicación
│   │   ├── Home.vue          # Pantalla principal
│   │   ├── GenderPredictor.vue
│   │   ├── AgePredictor.vue
│   │   ├── Universities.vue
│   │   ├── Weather.vue
│   │   ├── Pokemon.vue
│   │   ├── WordpressNews.vue
│   │   └── About.vue
│   ├── services/
│   │   └── api.js            # Servicios de API
│   ├── router/
│   │   └── index.ts          # Configuración de rutas
│   └── main.ts               # Punto de entrada
├── resources/                # Recursos de la app (iconos)
├── capacitor.config.ts       # Configuración de Capacitor
└── package.json             # Dependencias del proyecto
🔌 APIs Utilizadas
Servicio	API	Uso
Genderize	https://api.genderize.io	Predicción de género
Agify	https://api.agify.io	Predicción de edad
Universities	http://universities.hipolabs.com	Búsqueda de universidades
OpenWeather	https://api.openweathermap.org	Datos climáticos
PokéAPI	https://pokeapi.co	Información de Pokémon
WordPress	REST API	Noticias en tiempo real
🎨 Personalización
Cambiar Información del Desarrollador
Edita src/views/About.vue con tu información:

javascript
const studentId = ref('2022-1234');
const firstName = ref('Tu');
const lastName = ref('Nombre');
const email = ref('tu.email@universidad.edu');
Configurar API Keys
Edita src/services/api.js:

javascript
const WEATHER_API_KEY = 'tu_api_key_de_openweather';
🐛 Solución de Problemas Comunes
Error: "Unable to find command: capacitor resources"
bash
npm install -g @ionic/cli@latest
Error de CORS en APIs
Usar HTTPS en lugar de HTTP en las URLs de API.

Iconos no se actualizan
bash
ionic capacitor clean
rm -rf resources/
# Volver a generar recursos
Build falla en Android
Verificar que Java JDK esté instalado

Asegurar que Android Studio tenga los SDK necesarios

Limpiar proyecto: ./gradlew clean

📄 Scripts Disponibles
bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Vista previa del build
npm run cap:android  # Sincronizar con Android
🤝 Contribución
Fork el proyecto

Crear una rama feature (git checkout -b feature/AmazingFeature)

Commit cambios (git commit -m 'Add some AmazingFeature')

Push a la rama (git push origin feature/AmazingFeature)

Abrir un Pull Request

📝 Tareas Pendientes
Implementar caché para APIs

Agregar modo oscuro

Internacionalización (i18n)

Tests unitarios

Analytics

Notificaciones push

📜 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE.md para detalles.

👨‍💻 Desarrollador
Patryck

GitHub: jpatryck04

Email: patryckyandelljimenez@gmail.com

🙏 Agradecimientos
Ionic Framework

Vue.js

Capacitor

APIs públicas utilizadas en el proyecto

⭐ Si este proyecto te fue útil, por favor dale una estrella en GitHub!

<div align="center">
Hecho con ❤️ usando Ionic + Vue

</div>
