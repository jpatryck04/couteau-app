<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Predicción de Género</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="container" :class="genderClass">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Predicción de Género por Nombre</ion-card-title>
            <ion-card-subtitle>Ingresa un nombre para predecir su género</ion-card-subtitle>
          </ion-card-header>
          
          <ion-card-content>
            <!-- Formulario de entrada -->
            <ion-item>
              <ion-label position="stacked">Nombre:</ion-label>
              <ion-input 
                v-model="name" 
                placeholder="Ej: María, Carlos, Irma"
                :clear-input="true"
                @keyup.enter="predictGender"
              ></ion-input>
            </ion-item>
            
            <ion-button 
              expand="block" 
              @click="predictGender" 
              :disabled="!name || loading"
              class="predict-button"
            >
              <ion-spinner v-if="loading" name="crescent"></ion-spinner>
              {{ loading ? 'Prediciendo...' : 'Predecir Género' }}
            </ion-button>

            <!-- Resultados -->
            <div v-if="result && !error" class="result-section">
              <ion-card :class="result.gender === 'male' ? 'male-card' : 'female-card'">
                <ion-card-header>
                  <ion-card-title class="result-title">
                    <ion-icon 
                      :icon="result.gender === 'male' ? maleOutline : femaleOutline" 
                      class="gender-icon"
                    ></ion-icon>
                    Resultado para {{ result.name }}
                  </ion-card-title>
                </ion-card-header>
                
                <ion-card-content>
                  <div class="result-grid">
                    <div class="result-item">
                      <strong>Género predicho:</strong>
                      <ion-badge :class="result.gender === 'male' ? 'male-badge' : 'female-badge'">
                        {{ result.gender === 'male' ? '👨 Masculino' : '👩 Femenino' }}
                      </ion-badge>
                    </div>
                    
                    <div class="result-item">
                      <strong>Probabilidad:</strong>
                      <span class="probability">
                        {{ (result.probability * 100).toFixed(1) }}%
                      </span>
                    </div>
                    
                    <div class="result-item" v-if="result.count > 0">
                      <strong>Muestras en la base de datos:</strong>
                      <span class="count">{{ result.count }}</span>
                    </div>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>

            <!-- Estado de error -->
            <div v-if="error" class="error-section">
              <ion-card color="danger">
                <ion-card-header>
                  <ion-card-title>
                    <ion-icon :icon="warningOutline"></ion-icon>
                    Error
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <p>{{ error }}</p>
                  <ion-button 
                    fill="outline" 
                    color="light" 
                    @click="clearError"
                    class="retry-button"
                  >
                    Intentar de nuevo
                  </ion-button>
                </ion-card-content>
              </ion-card>
            </div>

            <!-- Ejemplos -->
            <div class="examples-section">
              <ion-text color="medium">
                <p class="examples-title">Prueba con estos nombres:</p>
              </ion-text>
              <div class="examples-grid">
                <ion-chip 
                  v-for="example in examples" 
                  :key="example.name"
                  @click="loadExample(example.name)"
                  :class="example.gender === 'male' ? 'male-chip' : 'female-chip'"
                >
                  {{ example.name }}
                </ion-chip>
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
  IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, 
  IonButton, IonSpinner, IonText, IonChip, IonBadge, IonIcon, IonButtons, 
  IonMenuButton 
} from '@ionic/vue';
import { 
  maleOutline, 
  femaleOutline, 
  warningOutline 
} from 'ionicons/icons';
import { apiService } from '@/services/api';

// Estados reactivos
const name = ref('');
const result = ref(null);
const loading = ref(false);
const error = ref('');

// Ejemplos para probar
const examples = ref([ 
  { name: 'María', gender: 'female' },
  { name: 'Carlos', gender: 'male' },
  { name: 'Ana', gender: 'female' }, 
  { name: 'José', gender: 'male' }, 
  { name: 'Irma', gender: 'female' }, 
  { name: 'Roberto', gender: 'male' }, 
  { name: 'Patryck', gender: 'male' }, 
  { name: 'Yandell', gender: 'male' }, 
  { name: 'Yasnahia', gender: 'female' }, 
  { name: 'Wendy', gender: 'female' }, 
  { name: 'Wilson', gender: 'male' }
]);

// Computed para la clase CSS basada en el género
const genderClass = computed(() => {
  if (!result.value || error.value) return '';
  return result.value.gender === 'male' ? 'male-background' : 'female-background';
});

// Función para predecir el género
const predictGender = async () => {
  if (!name.value.trim()) {
    error.value = 'Por favor ingresa un nombre';
    return;
  }

  loading.value = true;
  error.value = '';
  result.value = null;
  
  try {
    const data = await apiService.predictGender(name.value.trim());
    
    // Validar respuesta de la API
    if (!data.gender) {
      throw new Error(`No se pudo determinar el género para "${name.value}"`);
    }
    
    result.value = data;
    
  } catch (err) {
    console.error('Error predicting gender:', err);
    error.value = err.message || 'Error al conectar con el servicio de predicción';
  } finally {
    loading.value = false;
  }
};

// Función para cargar ejemplos
const loadExample = (exampleName) => {
  name.value = exampleName;
  predictGender();
};

// Función para limpiar error
const clearError = () => {
  error.value = '';
  name.value = '';
  result.value = null;
};
</script>

<style scoped>
.container {
  padding: 16px;
  min-height: 100%;
  transition: all 0.5s ease-in-out;
}

/* Fondo azul para masculino */
.male-background {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}

/* Fondo rosa para femenino - CORREGIDO */
.female-background {
  background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%);
}

.predict-button {
  margin: 20px 0;
}

.result-section {
  margin-top: 20px;
  animation: fadeIn 0.5s ease-in;
}

.result-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.gender-icon {
  font-size: 24px;
}

.result-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--ion-color-light-shade);
}

.result-item:last-child {
  border-bottom: none;
}

.probability {
  font-weight: bold;
  font-size: 1.1em;
  color: var(--ion-color-success);
}

.count {
  font-weight: 600;
  color: var(--ion-color-medium);
}

/* Tarjeta azul para masculino */
.male-card {
  --background: #e3f2fd;
  --color: #1565c0;
}

/* Tarjeta rosa para femenino - CORREGIDO */
.female-card {
  --background: #fce4ec;
  --color: #c2185b;
}

/* Badge azul para masculino */
.male-badge {
  --background: #2196f3;
  --color: white;
}

/* Badge rosa para femenino - CORREGIDO */
.female-badge {
  --background: #e91e63;
  --color: white;
}

/* Chips azules para ejemplos masculinos */
.male-chip {
  --background: #50e464;
  --color: white;
}

/* Chips rosas para ejemplos femeninos - CORREGIDO */
.female-chip {
  --background: #50e464;
  --color: white;
}

.error-section {
  margin-top: 20px;
  animation: shake 0.5s ease-in;
}

.retry-button {
  margin-top: 10px;
}

.examples-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--ion-color-light-shade);
}

.examples-title {
  text-align: center;
  margin-bottom: 15px;
  font-size: 0.9em;
}

.examples-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .result-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}

ion-chip {
  cursor: pointer;
  transition: transform 0.2s ease;
}

ion-chip:hover {
  transform: scale(1.05);
}

/* Asegurar que los colores se apliquen correctamente */
:deep(.male-card) {
  background: #e3f2fd !important;
  color: #1565c0 !important;
}

:deep(.female-card) {
  background: #fce4ec !important;
  color: #c2185b !important;
}

:deep(.male-badge) {
  background: #2196f3 !important;
  color: white !important;
}

:deep(.female-badge) {
  background: #e91e63 !important;
  color: white !important;
}
</style>