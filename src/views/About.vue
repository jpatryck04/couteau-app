<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Acerca de</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <ion-card>
          <ion-card-header class="profile-header">
            <div class="profile-image-container">
              <img :src="profilePhoto" alt="Foto de perfil" class="profile-image" />
            </div>
            <ion-card-title>{{ fullName }}</ion-card-title>
            <ion-card-subtitle>Desarrollador</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <div class="personal-info">
              <ion-item>
                <ion-icon :icon="schoolOutline" slot="start"></ion-icon>
                <ion-label>
                  <h3>Matrícula</h3>
                  <p>{{ studentId }}</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon :icon="personOutline" slot="start"></ion-icon>
                <ion-label>
                  <h3>Nombre Completo</h3>
                  <p>{{ fullName }}</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon :icon="mailOutline" slot="start"></ion-icon>
                <ion-label>
                  <h3>Email</h3>
                  <p>{{ email }}</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon :icon="callOutline" slot="start"></ion-icon>
                <ion-label>
                  <h3>Teléfono</h3>
                  <p>{{ phone }}</p>
                </ion-label>
              </ion-item>
            </div>

            <div class="app-info">
              <h3>Información de la Aplicación</h3>
              <p><strong>Couteau App</strong> - Una caja de herramientas digital que incluye múltiples funcionalidades útiles para el día a día.</p>
              
              <ion-list>
                <ion-item>
                  <ion-label>
                    <h3>Versión</h3>
                    <p>1.0.0</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h3>Framework</h3>
                    <p>Ionic + Vue.js</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h3>Desarrollado por</h3>
                    <p>{{ fullName }}</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </div>

            <div class="contact-actions">
              <ion-button expand="block" :href="`mailto:${email}`" fill="solid">
                <ion-icon :icon="mailOutline" slot="start"></ion-icon>
                Contactar por Email
              </ion-button>
              
              <ion-button expand="block" :href="`tel:${phone}`" fill="outline">
                <ion-icon :icon="callOutline" slot="start"></ion-icon>
                Llamar
              </ion-button>

              <ion-button expand="block" :href="githubUrl" target="_blank" fill="clear">
                <ion-icon :icon="logoGithub" slot="start"></ion-icon>
                Ver Código en GitHub
              </ion-button>
            </div>

            <div class="qr-section" v-if="apkUrl">
              <h3>Descargar APK</h3>
              <div class="qr-container">
                <img :src="generateQRCode(apkUrl)" alt="QR para descargar APK" class="qr-code" />
                <p>Escanea el código QR para descargar la aplicación</p>
                <ion-button :href="apkUrl" target="_blank" fill="outline" size="small">
                  Descargar APK Directamente
                </ion-button>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
  IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonIcon, IonLabel, 
  IonButton, IonList, IonImg, IonButtons, IonMenuButton 
} from '@ionic/vue';
import { 
  personOutline, 
  mailOutline, 
  callOutline, 
  schoolOutline,
  logoGithub 
} from 'ionicons/icons';

// IMPORTAR LA IMAGEN DESDE SRC
import profilePhoto from '@/assets/profile.png';

// Reemplaza estos datos con tu información personal
const studentId = ref('2023-1953'); // Tu matrícula
const firstName = ref('Patryck Yandell'); // Tu nombre
const lastName = ref('Jimenez Ogando'); // Tu apellido
const email = ref('patryckyandelljimenez@gmail.com'); // Tu email
const phone = ref('+1 (829) 429-1048'); // Tu teléfono
const githubUrl = ref('https://github.com/tuusuario/couteau-app'); // URL de tu repositorio
const apkUrl = ref('https://drive.google.com/file/d/1Bk2vS-nEncqNbji1Zl-j9NhnV_3_cP48/view?usp=sharing'); // URL de tu APK

const fullName = computed(() => `${firstName.value} ${lastName.value}`);

const generateQRCode = (url) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
};
</script>

<style scoped>
.container {
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
}

.profile-header {
  text-align: center;
  padding: 20px;
}

.profile-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--ion-color-primary);
  background-color: #f8f9fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Si la imagen no carga, muestra un placeholder */
.profile-image:before {
  content: "📷";
  font-size: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--ion-color-light);
  border-radius: 50%;
}

.personal-info {
  margin-bottom: 30px;
}

.app-info {
  margin-bottom: 30px;
}

.app-info h3 {
  margin-bottom: 15px;
  color: var(--ion-color-primary);
  font-size: 1.2em;
}

.contact-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.qr-section {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-top: 20px;
}

.qr-section h3 {
  margin-bottom: 15px;
  color: var(--ion-color-primary);
  font-size: 1.2em;
}

.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.qr-code {
  width: 200px;
  height: 200px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 8px;
  background: white;
}

/* Estilos responsive */
@media (max-width: 576px) {
  .container {
    padding: 12px;
  }
  
  .profile-image {
    width: 120px;
    height: 120px;
  }
  
  .qr-code {
    width: 180px;
    height: 180px;
  }
  
  .profile-header {
    padding: 15px;
  }
}

/* Asegurar que las imágenes se muestren correctamente */
img {
  display: block;
  max-width: 100%;
}

/* Estilo para cuando la imagen está cargando */
.profile-image[src=""],
.profile-image:not([src]) {
  background: var(--ion-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ion-color-medium);
  font-size: 14px;
}
</style>