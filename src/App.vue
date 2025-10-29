<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Couteau App</ion-list-header>
            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup>
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { ref } from 'vue';
import { 
  hammer, 
  maleFemale, 
  calendar, 
  school, 
  cloud, 
  paw, 
  newspaper, 
  person 
} from 'ionicons/icons';

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Inicio',
    url: '/folder/Inicio',
    iosIcon: hammer,
    mdIcon: hammer
  },
  {
    title: 'Predicción de Género',
    url: '/gender',
    iosIcon: maleFemale,
    mdIcon: maleFemale
  },
  {
    title: 'Predicción de Edad',
    url: '/age',
    iosIcon: calendar,
    mdIcon: calendar
  },
  {
    title: 'Universidades',
    url: '/universities',
    iosIcon: school,
    mdIcon: school
  },
  {
    title: 'Clima RD',
    url: '/weather',
    iosIcon: cloud,
    mdIcon: cloud
  },
  {
    title: 'Pokémon',
    url: '/pokemon',
    iosIcon: paw,
    mdIcon: paw
  },
  {
    title: 'Noticias WordPress',
    url: '/wordpress-news',
    iosIcon: newspaper,
    mdIcon: newspaper
  },
  {
    title: 'Acerca de',
    url: '/about',
    iosIcon: person,
    mdIcon: person
  }
];
</script>