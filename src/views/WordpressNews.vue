<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Noticias WordPress</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Últimas Noticias WordPress</ion-card-title>
            <ion-card-subtitle>Noticias obtenidas desde la REST API</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <!-- LOGO DEL SITIO -->
            <div class="wordpress-logo">
              <img 
                :src="wordpressLogo" 
                alt="WordPress Logo"
                class="logo-image"
              />
              <h3>TechCrunch - Sitio WordPress</h3>
            </div>

            <!-- BOTÓN PARA CARGAR NOTICIAS -->
            <ion-button expand="block" @click="fetchNews" :disabled="loading">
              <ion-spinner v-if="loading" slot="start"></ion-spinner>
              Cargar Últimas Noticias
            </ion-button>

            <!-- LISTADO DE NOTICIAS -->
            <div v-if="news.length > 0" class="news-list">
              <h3>Últimas {{ news.length }} Publicaciones</h3>

              <ion-list>
                <ion-item v-for="(item, index) in news" :key="item.id" class="news-item">
                  <ion-card class="news-card">
                    <ion-card-header>
                      <ion-card-title class="news-title">
                        {{ index + 1 }}. {{ removeHTMLTags(item.title.rendered) }}
                      </ion-card-title>
                      <ion-card-subtitle>
                        {{ formatDate(item.date) }}
                      </ion-card-subtitle>
                    </ion-card-header>

                    <ion-card-content>
                      <div class="news-excerpt">
                        {{ truncateText(removeHTMLTags(item.excerpt.rendered), 150) }}
                      </div>
                      <div class="news-actions">
                        <ion-button 
                          :href="item.link" 
                          target="_blank" 
                          fill="outline" 
                          size="small"
                          class="visit-button"
                        >
                          <ion-icon :icon="openOutline" slot="start"></ion-icon>
                          Visitar Noticia
                        </ion-button>
                      </div>
                    </ion-card-content>
                  </ion-card>
                </ion-item>
              </ion-list>
            </div>

            <!-- MENSAJE DE ERROR -->
            <div v-if="error" class="error">
              <ion-text color="danger">
                <p>{{ error }}</p>
                <p>Verifica tu conexión o intenta nuevamente.</p>
              </ion-text>
            </div>

            <!-- MENSAJE DE ESPERA -->
            <div v-if="news.length === 0 && !loading && !error" class="placeholder">
              <ion-text color="medium">
                <p>Presiona el botón para cargar las últimas noticias de WordPress.</p>
              </ion-text>
            </div>

            <!-- INFORMACIÓN DEL API -->
            <div class="api-info">
              <ion-text color="medium">
                <p><small>Usando la API: https://techcrunch.com/wp-json/wp/v2/posts?per_page=3&_embed</small></p>
              </ion-text>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonSpinner, 
  IonList, IonItem, IonText, IonIcon, IonButtons, IonMenuButton 
} from '@ionic/vue';
import { openOutline } from 'ionicons/icons';
import wordpressLogo from '@/assets/wordpress-logo.png';

// Variables reactivas
const news = ref([]);
const loading = ref(false);
const error = ref('');

// URL del API de WordPress
const WORDPRESS_API_URL = 'https://techcrunch.com/wp-json/wp/v2/posts?per_page=3&_embed';

// Funciones utilitarias
const removeHTMLTags = (str) => str ? str.replace(/<[^>]*>/g, '').trim() : 'No disponible';
const truncateText = (text, maxLength) => text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('es-DO', {
  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
});

// Cargar noticias desde el API
const fetchNews = async () => {
  loading.value = true;
  error.value = '';
  news.value = [];

  try {
    const response = await fetch(WORDPRESS_API_URL);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    news.value = await response.json();
  } catch (err) {
    console.error('Error al cargar noticias:', err);
    error.value = 'Error al cargar las noticias desde WordPress.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  padding: 16px;
}

.wordpress-logo {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #0073aa 0%, #00a0d2 100%);
  border-radius: 10px;
  color: white;
}

.logo-image {
  width: 200px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.4));
  margin-bottom: 10px;
}

.wordpress-logo h3 {
  margin: 0;
  font-size: 1.2em;
}

.news-list {
  margin-top: 20px;
}

.news-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  margin-bottom: 16px;
}

.news-card {
  transition: transform 0.2s ease;
  border-left: 4px solid var(--ion-color-primary);
}

.news-card:hover {
  transform: translateY(-2px);
}

.news-title {
  font-size: 1.1em;
  color: var(--ion-color-primary);
}

.news-excerpt {
  color: var(--ion-color-medium);
  margin-bottom: 15px;
}

.news-actions {
  display: flex;
  justify-content: flex-end;
}

.visit-button {
  --border-color: var(--ion-color-primary);
  --color: var(--ion-color-primary);
}

.placeholder, .error {
  text-align: center;
  margin: 20px 0;
  padding: 20px;
  background: var(--ion-color-light);
  border-radius: 10px;
}

.api-info {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--ion-color-light-shade);
}

.error {
  background: var(--ion-color-danger-tint);
  color: var(--ion-color-danger-shade);
}

@media (max-width: 768px) {
  .logo-image {
    width: 150px;
    height: 45px;
  }
}
</style>
