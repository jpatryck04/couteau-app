<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Información de Pokémon</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Buscar Pokémon</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Nombre del Pokémon:</ion-label>
              <ion-input v-model="pokemonName" placeholder="Ej: pikachu, charizard, bulbasaur"></ion-input>
            </ion-item>
            
            <ion-button expand="block" @click="searchPokemon" :disabled="!pokemonName || loading">
              <ion-spinner v-if="loading" slot="start"></ion-spinner>
              Buscar Pokémon
            </ion-button>

            <div v-if="pokemonData" class="pokemon-display">
              <ion-card>
                <ion-card-header class="pokemon-header">
                  <ion-card-title class="pokemon-name">
                    {{ capitalizeFirst(pokemonData.name) }} 
                    <span class="pokemon-id">#{{ String(pokemonData.id).padStart(3, '0') }}</span>
                  </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                  <div class="pokemon-image-section">
                    <ion-img 
                      :src="pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default" 
                      :alt="pokemonData.name"
                      class="pokemon-image"
                    ></ion-img>
                    
                    <ion-button @click="playCry" fill="outline" size="small">
                      <ion-icon :icon="volumeHighOutline" slot="start"></ion-icon>
                      Reproducir Sonido
                    </ion-button>
                  </div>

                  <div class="pokemon-types">
                    <ion-chip v-for="type in pokemonData.types" :key="type.slot" :color="getTypeColor(type.type.name)">
                      {{ capitalizeFirst(type.type.name) }}
                    </ion-chip>
                  </div>

                  <ion-grid>
                    <ion-row>
                      <ion-col size="6">
                        <ion-card>
                          <ion-card-header>
                            <ion-card-title>Experiencia Base</ion-card-title>
                          </ion-card-header>
                          <ion-card-content>
                            <h2>{{ pokemonData.base_experience }}</h2>
                          </ion-card-content>
                        </ion-card>
                      </ion-col>
                      <ion-col size="6">
                        <ion-card>
                          <ion-card-header>
                            <ion-card-title>Altura / Peso</ion-card-title>
                          </ion-card-header>
                          <ion-card-content>
                            <p><strong>Altura:</strong> {{ (pokemonData.height / 10).toFixed(1) }} m</p>
                            <p><strong>Peso:</strong> {{ (pokemonData.weight / 10).toFixed(1) }} kg</p>
                          </ion-card-content>
                        </ion-card>
                      </ion-col>
                    </ion-row>
                  </ion-grid>

                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Habilidades</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-list>
                        <ion-item v-for="ability in pokemonData.abilities" :key="ability.slot">
                          <ion-label>
                            <h3>{{ capitalizeFirst(ability.ability.name) }}</h3>
                            <p v-if="ability.is_hidden">Habilidad Oculta</p>
                          </ion-label>
                        </ion-item>
                      </ion-list>
                    </ion-card-content>
                  </ion-card>

                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Estadísticas Base</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-list>
                        <ion-item v-for="stat in pokemonData.stats" :key="stat.stat.name">
                          <ion-label>
                            <h3>{{ getStatName(stat.stat.name) }}</h3>
                          </ion-label>
                          <ion-badge color="primary">{{ stat.base_stat }}</ion-badge>
                        </ion-item>
                      </ion-list>
                    </ion-card-content>
                  </ion-card>
                </ion-card-content>
              </ion-card>
            </div>

            <div v-if="error" class="error">
              <ion-text color="danger">
                <p>{{ error }}</p>
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
  IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonSpinner, 
  IonImg, IonGrid, IonRow, IonCol, IonText, IonList, IonChip, IonBadge, IonIcon, 
  IonButtons, IonMenuButton 
} from '@ionic/vue';
import { volumeHighOutline } from 'ionicons/icons';
import { apiService } from '@/services/api';

const pokemonName = ref('');
const pokemonData = ref(null);
const loading = ref(false);
const error = ref('');

const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getTypeColor = (type) => {
  const typeColors = {
    normal: 'medium',
    fire: 'danger',
    water: 'primary',
    electric: 'warning',
    grass: 'success',
    ice: 'secondary',
    fighting: 'danger',
    poison: 'tertiary',
    ground: 'medium',
    flying: 'secondary',
    psychic: 'tertiary',
    bug: 'success',
    rock: 'medium',
    ghost: 'dark',
    dragon: 'primary',
    dark: 'dark',
    steel: 'medium',
    fairy: 'tertiary'
  };
  return typeColors[type] || 'medium';
};

const getStatName = (stat) => {
  const statNames = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'Ataque Especial',
    'special-defense': 'Defensa Especial',
    speed: 'Velocidad'
  };
  return statNames[stat] || capitalizeFirst(stat);
};

const playCry = () => {
  if (pokemonData.value?.cries?.latest) {
    const audio = new Audio(pokemonData.value.cries.latest);
    audio.play().catch(err => {
      console.log('Error reproduciendo sonido:', err);
    });
  }
};

const searchPokemon = async () => {
  loading.value = true;
  error.value = '';
  pokemonData.value = null;
  
  try {
    pokemonData.value = await apiService.getPokemon(pokemonName.value);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  padding: 16px;
}

.pokemon-display {
  margin-top: 20px;
}

.pokemon-header {
  text-align: center;
}

.pokemon-name {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.pokemon-id {
  font-size: 0.8em;
  color: #666;
  font-weight: normal;
}

.pokemon-image-section {
  text-align: center;
  margin-bottom: 20px;
}

.pokemon-image {
  width: 200px;
  height: 200px;
  margin: 0 auto 15px;
}

.pokemon-types {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.error {
  margin-top: 20px;
  text-align: center;
}
</style>