<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Universidades</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Buscar Universidades por País</ion-card-title>
            <ion-card-subtitle>Usa el nombre en inglés (ej: Dominican Republic, Spain, Mexico)</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">País (en inglés):</ion-label>
              <ion-input 
                v-model="country" 
                placeholder="Ej: Dominican Republic"
                @keyup.enter="searchUniversities"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Países disponibles:</ion-label>
              <ion-select v-model="country" placeholder="Seleccionar país">
                <ion-select-option value="Dominican Republic">República Dominicana</ion-select-option>
                <ion-select-option value="Spain">España</ion-select-option>
                <ion-select-option value="Mexico">México</ion-select-option>
                <ion-select-option value="United States">Estados Unidos</ion-select-option>
                <ion-select-option value="Colombia">Colombia</ion-select-option>
                <ion-select-option value="Argentina">Argentina</ion-select-option>
              </ion-select>
            </ion-item>
            
            <ion-button expand="block" @click="searchUniversities" :disabled="!country">
              <ion-icon :icon="search" slot="start"></ion-icon>
              Buscar Universidades
            </ion-button>

            <div v-if="loading" class="loading">
              <ion-spinner name="crescent"></ion-spinner>
              <p>Buscando universidades en {{ country }}...</p>
            </div>

            <div v-if="universities.length > 0" class="results">
              <ion-text color="primary">
                <h3>Universidades encontradas en {{ country }}: {{ universities.length }}</h3>
              </ion-text>
              
              <ion-list>
                <ion-item 
                  v-for="(university, index) in universities" 
                  :key="index"
                  class="university-item"
                >
                  <ion-label>
                    <h2>{{ university.name }}</h2>
                    <p>
                      <ion-icon :icon="globe" color="primary"></ion-icon>
                      <strong>Dominio:</strong> {{ university.domains?.[0] || 'No disponible' }}
                    </p>
                    <p>
                      <ion-icon :icon="link" color="secondary"></ion-icon>
                      <strong>Sitio web:</strong> 
                      <span v-if="university.web_pages?.[0]">{{ university.web_pages[0] }}</span>
                      <span v-else>No disponible</span>
                    </p>
                  </ion-label>
                  <ion-button 
                    v-if="university.web_pages?.[0]" 
                    :href="university.web_pages[0]" 
                    target="_blank"
                    slot="end"
                    color="primary"
                    fill="outline"
                    size="small"
                  >
                    <ion-icon :icon="open" slot="start"></ion-icon>
                    Visitar
                  </ion-button>
                </ion-item>
              </ion-list>
            </div>

            <div v-if="searched && universities.length === 0" class="no-results">
              <ion-card color="warning">
                <ion-card-content>
                  <ion-text color="warning">
                    <h4>No se encontraron universidades</h4>
                    <p>Intenta con otro país o verifica la ortografía.</p>
                    <p><strong>Países sugeridos:</strong> Dominican Republic, Spain, Mexico, United States</p>
                  </ion-text>
                </ion-card-content>
              </ion-card>
            </div>

            <div v-if="error" class="error">
              <ion-card color="danger">
                <ion-card-content>
                  <ion-text color="danger">
                    <h4>Error</h4>
                    <p>{{ error }}</p>
                  </ion-text>
                </ion-card-content>
              </ion-card>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Información de países disponibles -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Países Disponibles</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-chip v-for="availableCountry in availableCountries" :key="availableCountry"
              @click="country = availableCountry; searchUniversities()"
              color="primary"
              outline
            >
              <ion-label>{{ availableCountry }}</ion-label>
            </ion-chip>
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
  IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, 
  IonButton, IonList, IonSpinner, IonText, IonButtons, IonMenuButton, IonSelect,
  IonSelectOption, IonChip, IonIcon
} from '@ionic/vue';
import { search, globe, link, open } from 'ionicons/icons';
import { apiService } from '@/services/api';

const country = ref('Dominican Republic');
const universities = ref([]);
const loading = ref(false);
const error = ref('');
const searched = ref(false);

const availableCountries = [
  'Dominican Republic',
  'Spain', 
  'Mexico',
  'United States',
  'Colombia',
  'Argentina',
  'Brazil',
  'Chile',
  'Peru'
];

const searchUniversities = async () => {
  if (!country.value) return;
  
  loading.value = true;
  error.value = '';
  searched.value = true;
  
  try {
    universities.value = await apiService.getUniversities(country.value);
  } catch (err) {
    error.value = err.message;
    universities.value = [];
  } finally {
    loading.value = false;
  }
};

// Buscar automáticamente al cargar la página
searchUniversities();
</script>

<style scoped>
.container {
  padding: 16px;
}

.loading {
  text-align: center;
  margin: 20px 0;
}

.loading ion-spinner {
  margin-bottom: 10px;
}

.results {
  margin-top: 20px;
}

.error, .no-results {
  margin-top: 20px;
}

.university-item {
  margin-bottom: 10px;
  --padding-start: 0;
  --inner-padding-end: 0;
}

.university-item ion-label p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
}

ion-chip {
  cursor: pointer;
  margin: 4px;
}
</style>