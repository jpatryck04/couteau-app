<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Predicción de Edad</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Predicción de Edad por Nombre</ion-card-title>
            <ion-card-subtitle>Descubre la edad estimada basada en un nombre</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Ingresa un nombre:</ion-label>
              <ion-input 
                v-model="name" 
                placeholder="Ej: Carlos, María, Roberto"
                :clear-input="true"
                @keyup.enter="predictAge"
              ></ion-input>
            </ion-item>
            
            <ion-button 
              expand="block" 
              @click="predictAge" 
              :disabled="!name || loading"
              class="predict-button"
            >
              <ion-spinner v-if="loading" name="crescent"></ion-spinner>
              {{ loading ? 'Prediciendo...' : 'Predecir Edad' }}
            </ion-button>

            <div v-if="result && !error" class="result">
              <ion-card :class="ageCardClass">
                <ion-card-header>
                  <ion-card-title class="result-title">
                    <ion-icon :icon="ageIcon" class="age-icon"></ion-icon>
                    Resultado para {{ result.name }}
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <div class="age-display">
                    <div class="age-image-container">
                      <img 
                        :src="ageImage" 
                        :alt="`Imagen de ${ageCategory}`"
                        class="age-image"
                      />
                    </div>
                    <div class="age-info">
                      <div class="info-item">
                        <strong>Nombre:</strong>
                        <span class="info-value">{{ result.name }}</span>
                      </div>
                      <div class="info-item">
                        <strong>Edad estimada:</strong>
                        <span class="age-number">{{ result.age }} años</span>
                      </div>
                      <div class="info-item">
                        <strong>Categoría:</strong>
                        <ion-badge :color="ageBadgeColor" class="category-badge">
                          {{ ageCategory }}
                        </ion-badge>
                      </div>
                      <div class="info-item" v-if="result.count > 0">
                        <strong>Muestras analizadas:</strong>
                        <span class="info-value">{{ result.count }}</span>
                      </div>
                    </div>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>

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
                  :key="example"
                  @click="loadExample(example)"
                >
                  {{ example }}
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
  IonButton, IonButtons, IonMenuButton, IonSpinner, IonText, IonChip, 
  IonBadge, IonIcon 
} from '@ionic/vue';
import { 
  personOutline, 
  schoolOutline, 
  accessibilityOutline, 
  warningOutline,
  happyOutline 
} from 'ionicons/icons';
import { apiService } from '@/services/api';

// Importar las imágenes - AHORA CON 4 CATEGORÍAS
import ninoImage from '@/assets/nino.jpg';       // <-- Nueva imagen para niño
import jovenImage from '@/assets/joven.jpg';
import adultoImage from '@/assets/adulto.jpg';
import ancianoImage from '@/assets/anciano.jpg';

const name = ref('');
const result = ref(null);
const loading = ref(false);
const error = ref('');

// Ejemplos para probar (agregué nombres de niños)
const examples = ref([
  'Luis', 'Ana', 'Carlos', 'Sofia', 'Miguel', 'Patryck', 
  'Yandell', 'Wendy', 'Wilson', 'Juan', 'Maria', 'Pedro'  // Nombres que suelen dar edades bajas
]);

const ageCategory = computed(() => {
  if (!result.value) return '';
  const age = result.value.age;
  if (age < 18) return 'Niño';
  if (age < 30) return 'Joven';
  if (age < 60) return 'Adulto';
  return 'Anciano';
});

const ageImage = computed(() => {
  if (!result.value) return '';
  
  const category = ageCategory.value.toLowerCase();
  
  // Asignar la imagen importada basada en la categoría
  if (category === 'niño') return ninoImage;
  if (category === 'joven') return jovenImage;
  if (category === 'adulto') return adultoImage;
  if (category === 'anciano') return ancianoImage;
  
  return jovenImage; // imagen por defecto
});

const ageIcon = computed(() => {
  const age = result.value?.age;
  if (!age) return personOutline;
  if (age < 18) return happyOutline;     // 👶 Icono de carita feliz para niño
  if (age < 30) return personOutline;    // 👦 Joven
  if (age < 60) return schoolOutline;    // 👨 Adulto
  return accessibilityOutline;           // 👴 Anciano
});

const ageBadgeColor = computed(() => {
  const age = result.value?.age;
  if (!age) return 'medium';
  if (age < 18) return 'secondary';      // Color diferente para niño
  if (age < 30) return 'success';
  if (age < 60) return 'primary';
  return 'tertiary';
});

const ageCardClass = computed(() => {
  const age = result.value?.age;
  if (!age) return '';
  if (age < 18) return 'child-card';     // Nueva clase para niño
  if (age < 30) return 'young-card';
  if (age < 60) return 'adult-card';
  return 'senior-card';
});

const predictAge = async () => {
  if (!name.value.trim()) {
    error.value = 'Por favor ingresa un nombre';
    return;
  }

  loading.value = true;
  error.value = '';
  result.value = null;
  
  try {
    const data = await apiService.predictAge(name.value.trim());
    
    if (!data.age && data.age !== 0) {
      throw new Error(`No se pudo determinar la edad para "${name.value}"`);
    }
    
    result.value = data;
    
  } catch (err) {
    console.error('Error predicting age:', err);
    error.value = err.message || 'Error al conectar con el servicio de predicción';
  } finally {
    loading.value = false;
  }
};

const loadExample = (exampleName) => {
  name.value = exampleName;
  predictAge();
};

const clearError = () => {
  error.value = '';
  name.value = '';
  result.value = null;
};
</script>

<style scoped>
.container {
  padding: 16px;
}

.predict-button {
  margin: 20px 0;
}

.age-display {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
}

.age-image-container {
  flex-shrink: 0;
}

.age-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--ion-color-primary);
}

.age-info {
  flex: 1;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--ion-color-light-shade);
}

.info-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.age-number {
  font-weight: bold;
  font-size: 1.2em;
  color: var(--ion-color-primary);
}

.category-badge {
  font-size: 0.9em;
}

.result-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.age-icon {
  font-size: 24px;
}

/* Estilos para diferentes categorías de edad */
.child-card {
  border-left: 6px solid var(--ion-color-secondary);
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
}

.young-card {
  border-left: 6px solid var(--ion-color-success);
}

.adult-card {
  border-left: 6px solid var(--ion-color-primary);
}

.senior-card {
  border-left: 6px solid var(--ion-color-tertiary);
}

.error-section {
  margin-top: 20px;
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

.result {
  margin-top: 20px;
  animation: fadeIn 0.5s ease-in;
}

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

/* Responsive */
@media (max-width: 768px) {
  .age-display {
    flex-direction: column;
    text-align: center;
  }
  
  .age-image {
    width: 100px;
    height: 100px;
  }
  
  .info-item {
    flex-direction: column;
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

/* Estilos específicos para la categoría niño */
.child-card .age-image {
  border-color: var(--ion-color-secondary);
}

.child-card .age-number {
  color: var(--ion-color-secondary);
}
</style>