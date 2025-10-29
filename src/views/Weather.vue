<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Clima en República Dominicana</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Clima Actual en RD</ion-card-title>
            <ion-card-subtitle>{{ currentDate }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-button expand="block" @click="getWeather" :disabled="loading">
              <ion-spinner v-if="loading" slot="start"></ion-spinner>
              Actualizar Clima
            </ion-button>

            <div v-if="weatherData" class="weather-display">
              <div class="weather-main">
                <ion-img 
                  :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" 
                  class="weather-icon"
                ></ion-img>
                <div class="weather-temp">
                  <h2>{{ Math.round(weatherData.main.temp) }}°C</h2>
                  <p>{{ weatherData.weather[0].description }}</p>
                </div>
              </div>

              <ion-grid>
                <ion-row>
                  <ion-col size="6">
                    <ion-card>
                      <ion-card-content class="weather-detail">
                        <ion-icon :icon="thermometerOutline"></ion-icon>
                        <p>Sensación térmica</p>
                        <h3>{{ Math.round(weatherData.main.feels_like) }}°C</h3>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                  <ion-col size="6">
                    <ion-card>
                      <ion-card-content class="weather-detail">
                        <ion-icon :icon="waterOutline"></ion-icon>
                        <p>Humedad</p>
                        <h3>{{ weatherData.main.humidity }}%</h3>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="6">
                    <ion-card>
                      <ion-card-content class="weather-detail">
                        <ion-icon :icon="speedometerOutline"></ion-icon>
                        <p>Presión</p>
                        <h3>{{ weatherData.main.pressure }} hPa</h3>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                  <ion-col size="6">
                    <ion-card>
                      <ion-card-content class="weather-detail">
                        <ion-icon :icon="flagOutline"></ion-icon>
                        <p>Viento</p>
                        <h3>{{ weatherData.wind.speed }} m/s</h3>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                </ion-row>
              </ion-grid>

              <div class="location-info">
                <p><strong>Ubicación:</strong> {{ weatherData.name }}, República Dominicana</p>
                <p><strong>Actualizado:</strong> {{ formatTime(weatherData.dt) }}</p>
              </div>
            </div>

            <div v-if="error" class="error">
              <ion-text color="danger">
                <p>{{ error }}</p>
                <p>Nota: Necesitas una API key de OpenWeatherMap</p>
              </ion-text>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonSpinner, IonImg, 
  IonGrid, IonRow, IonCol, IonText, IonIcon, IonButtons, IonMenuButton 
} from '@ionic/vue';
import { 
  thermometerOutline, 
  waterOutline, 
  speedometerOutline, 
  flagOutline 
} from 'ionicons/icons';
import { apiService } from '@/services/api';

const weatherData = ref(null);
const loading = ref(false);
const error = ref('');

const currentDate = computed(() => {
  return new Date().toLocaleDateString('es-DO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('es-DO');
};

const getWeather = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    weatherData.value = await apiService.getWeather();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getWeather();
});
</script>

<style scoped>
.container {
  padding: 16px;
}

.weather-display {
  margin-top: 20px;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.weather-icon {
  width: 80px;
  height: 80px;
}

.weather-temp {
  text-align: center;
}

.weather-temp h2 {
  margin: 0;
  font-size: 2.5em;
  color: #2dd36f;
}

.weather-detail {
  text-align: center;
  padding: 10px;
}

.weather-detail ion-icon {
  font-size: 24px;
  color: #3880ff;
  margin-bottom: 8px;
}

.weather-detail h3 {
  margin: 5px 0;
  color: #2dd36f;
}

.location-info {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  text-align: center;
}

.error {
  margin-top: 20px;
  text-align: center;
}
</style>