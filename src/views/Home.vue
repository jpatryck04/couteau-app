<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Couteau - Caja de Herramientas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Couteau</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <!-- Hero Section - IMAGEN ARRIBA, TEXTO DEBAJO -->
        <div class="hero-section">
          <div class="image-container">
            <img 
              :src="toolboxImage" 
              alt="Couteau - Caja de Herramientas" 
              class="hero-image"
            />
          </div>
          
          <div class="text-container">
            <h1 class="hero-title">Bienvenido a Couteau</h1>
            <p class="hero-subtitle">Tu caja de herramientas digital todo en uno</p>
            <p class="hero-description">
              Couteau es una aplicación multifuncional que combina diversas herramientas útiles 
              en un solo lugar. Desde predicciones basadas en nombres hasta información en tiempo 
              real, todo diseñado para hacer tu vida más fácil.
            </p>
          </div>
        </div>

        <!-- Estadísticas Rápidas -->
        <div class="stats-section">
          <ion-grid>
            <ion-row>
              <ion-col size="6" size-md="3" v-for="stat in stats" :key="stat.label">
                <div class="stat-card">
                  <ion-icon :icon="stat.icon" class="stat-icon"></ion-icon>
                  <h3 class="stat-number">{{ stat.number }}</h3>
                  <p class="stat-label">{{ stat.label }}</p>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>

        <!-- Herramientas Disponibles -->
        <div class="tools-section">
          <h2 class="section-title">Herramientas Disponibles</h2>
          <p class="section-subtitle">Explora todas las funcionalidades que ofrece Couteau</p>
          
          <div class="tools-grid">
            <ion-card class="tool-card" v-for="tool in tools" :key="tool.title">
              <ion-card-header>
                <div class="tool-header">
                  <ion-icon :icon="tool.icon" class="tool-icon"></ion-icon>
                  <ion-card-title class="tool-title">{{ tool.title }}</ion-card-title>
                </div>
              </ion-card-header>
              <ion-card-content>
                <p class="tool-description">{{ tool.description }}</p>
                <div class="tool-features">
                  <ion-chip v-for="feature in tool.features" :key="feature" size="small" color="primary">
                    {{ feature }}
                  </ion-chip>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>

        <!-- Características Principales -->
        <div class="features-section">
          <h2 class="section-title">¿Por qué elegir Couteau?</h2>
          <div class="features-list">
            <div v-for="feature in features" :key="feature.title" class="feature-item">
              <ion-icon :icon="feature.icon" class="feature-icon"></ion-icon>
              <div class="feature-content">
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Llamado a la acción -->
        <div class="cta-section">
          <ion-card color="primary" class="cta-card">
            <ion-card-header>
              <ion-card-title>¿Listo para comenzar?</ion-card-title>
              <ion-card-subtitle>Explora todas las herramientas disponibles</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p>Usa el menú lateral para navegar entre las diferentes funcionalidades.</p>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
  IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonButtons, IonMenuButton,
  IonGrid, IonRow, IonCol, IonIcon, IonChip
} from '@ionic/vue';
import { 
  appsOutline, 
  speedometerOutline, 
  shieldCheckmarkOutline, 
  rocketOutline,
  maleFemaleOutline,
  calendarOutline,
  schoolOutline,
  cloudOutline,
  pawOutline,
  newspaperOutline,
  flashOutline,
  globeOutline,
  timeOutline
} from 'ionicons/icons';

// IMPORTAR LA IMAGEN DESDE SRC
import toolboxImage from '@/assets/toolbox.jpg';

// Estadísticas
const stats = [
  { icon: appsOutline, number: '7+', label: 'Herramientas' },
  { icon: speedometerOutline, number: 'Rápido', label: 'Rendimiento' },
  { icon: shieldCheckmarkOutline, number: '100%', label: 'Gratuito' },
  { icon: rocketOutline, number: 'Online', label: 'Tiempo Real' }
];

// Herramientas disponibles
const tools = [
  {
    title: 'Predicción de Género',
    description: 'Descubre el género probable de cualquier nombre usando inteligencia artificial y datos estadísticos.',
    icon: maleFemaleOutline,
    features: ['API Externa', 'Probabilidad', 'Base de datos']
  },
  {
    title: 'Predicción de Edad',
    description: 'Estima la edad promedio asociada a un nombre con categorización automática.',
    icon: calendarOutline,
    features: ['Estimación', 'Categorías', 'Estadísticas']
  },
  {
    title: 'Universidades',
    description: 'Encuentra universidades de cualquier país con información detallada y enlaces directos.',
    icon: schoolOutline,
    features: ['Búsqueda global', 'Detalles completos', 'Enlaces directos']
  },
  {
    title: 'Clima RD',
    description: 'Información meteorológica en tiempo real para República Dominicana.',
    icon: cloudOutline,
    features: ['Tiempo real', 'Múltiples datos', 'Actualizable']
  },
  {
    title: 'Pokémon',
    description: 'Explora la vasta información de Pokémon incluyendo habilidades, estadísticas y más.',
    icon: pawOutline,
    features: ['Base completa', 'Habilidades', 'Multimedia']
  },
  {
    title: 'Noticias WordPress',
    description: 'Accede a las últimas noticias de sitios WordPress mediante REST API.',
    icon: newspaperOutline,
    features: ['API WordPress', 'Noticias recientes', 'Enlaces directos']
  }
];

// Características principales
const features = [
  {
    icon: flashOutline,
    title: 'Rápido y Eficiente',
    description: 'Todas las herramientas cargan instantáneamente con optimización máxima.'
  },
  {
    icon: globeOutline,
    title: 'Conectado a Internet',
    description: 'Accede a datos en tiempo real y APIs externas para información actualizada.'
  },
  {
    icon: shieldCheckmarkOutline,
    title: 'Completamente Gratuito',
    description: 'Todas las funcionalidades disponibles sin costo alguno.'
  },
  {
    icon: timeOutline,
    title: 'Siempre Disponible',
    description: 'Accede a tus herramientas favoritas en cualquier momento y lugar.'
  }
];
</script>

<style scoped>
.container {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero Section - IMAGEN ARRIBA, TEXTO DEBAJO */
.hero-section {
  margin-bottom: 40px;
  text-align: center;
}

.image-container {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.hero-image {
  max-height: 250px;
  max-width: 100%;
  width: auto;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  object-fit: contain;
}

.text-container {
  max-width: 700px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 12px;
  color: var(--ion-color-dark);
}

.hero-subtitle {
  font-size: 1.3em;
  color: var(--ion-color-primary);
  margin-bottom: 20px;
  font-weight: 500;
}

.hero-description {
  font-size: 1.1em;
  line-height: 1.7;
  color: var(--ion-color-medium);
  text-align: center;
}

/* Stats Section */
.stats-section {
  margin-bottom: 40px;
}

.stat-card {
  text-align: center;
  padding: 20px;
  background: var(--ion-color-light);
  border-radius: 16px;
  margin: 8px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5em;
  margin-bottom: 12px;
  color: var(--ion-color-primary);
}

.stat-number {
  font-size: 1.8em;
  font-weight: bold;
  margin: 12px 0;
  color: var(--ion-color-dark);
}

.stat-label {
  font-size: 0.95em;
  color: var(--ion-color-medium);
  margin: 0;
  font-weight: 500;
}

/* Tools Section */
.tools-section {
  margin-bottom: 40px;
}

.section-title {
  text-align: center;
  font-size: 1.8em;
  margin-bottom: 12px;
  color: var(--ion-color-dark);
  font-weight: 700;
}

.section-subtitle {
  text-align: center;
  color: var(--ion-color-medium);
  margin-bottom: 40px;
  font-size: 1.1em;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.tool-card {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 16px;
}

.tool-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.15);
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.tool-icon {
  font-size: 2em;
  color: var(--ion-color-primary);
}

.tool-title {
  font-size: 1.2em;
  margin: 0;
  font-weight: 600;
}

.tool-description {
  color: var(--ion-color-medium);
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95em;
}

.tool-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Features Section */
.features-section {
  margin-bottom: 40px;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: var(--ion-color-light);
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateX(5px);
}

.feature-icon {
  font-size: 2.2em;
  color: var(--ion-color-primary);
  flex-shrink: 0;
  margin-top: 4px;
}

.feature-content h3 {
  margin: 0 0 12px 0;
  color: var(--ion-color-dark);
  font-size: 1.2em;
  font-weight: 600;
}

.feature-content p {
  margin: 0;
  color: var(--ion-color-medium);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  margin-bottom: 40px;
}

.cta-card {
  text-align: center;
  border-radius: 20px;
  padding: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .features-list {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 1.6em;
  }
  
  .hero-subtitle {
    font-size: 1.1em;
  }
  
  .hero-image {
    max-height: 200px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 12px;
  }
  
  .hero-title {
    font-size: 1.4em;
  }
  
  .stat-card {
    padding: 16px;
  }
  
  .feature-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  
  .hero-image {
    max-height: 180px;
  }
}
</style>