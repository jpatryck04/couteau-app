import axios from 'axios';

const API_BASE_URLS = {
  genderize: 'https://api.genderize.io',
  agify: 'https://api.agify.io',
  universities: 'https://universities.hipolabs.com',
  pokemon: 'https://pokeapi.co/api/v2',
  weather: 'https://api.openweathermap.org/data/2.5'
};

const WEATHER_API_KEY = 'bced98b2c078aa6cfee014c8d45badf3';

// Crear instancia de axios con configuración global
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const apiService = {
  // Predicción de género con mejor manejo de errores
  async predictGender(name) {
    try {
      if (!name || name.trim().length < 2) {
        throw new Error('El nombre debe tener al menos 2 caracteres');
      }

      const response = await api.get(`${API_BASE_URLS.genderize}/?name=${encodeURIComponent(name.trim())}`);
      
      // Si la API devuelve gender como null
      if (response.data.gender === null) {
        throw new Error(`No se pudo determinar el género para "${name}". Intenta con otro nombre.`);
      }

      return response.data;

    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('La solicitud tardó demasiado tiempo. Verifica tu conexión.');
      }
      
      if (error.response) {
        // Error de respuesta del servidor
        throw new Error(`Error del servidor: ${error.response.status}`);
      } else if (error.request) {
        // Error de red
        throw new Error('Error de conexión. Verifica tu internet.');
      } else {
        // Otros errores
        throw new Error(error.message || 'Error al predecir el género');
      }
    }
  },

  // Predicción de edad
  async predictAge(name) {
    try {
      const response = await api.get(`${API_BASE_URLS.agify}/?name=${encodeURIComponent(name)}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al predecir la edad: ' + (error.message || 'Error de conexión'));
    }
  },

  // Obtener universidades
  async getUniversities(country) {
    try {
      const response = await api.get(`${API_BASE_URLS.universities}/search?country=${encodeURIComponent(country)}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener universidades: ' + (error.message || 'Error de conexión'));
    }
  },

  // Obtener clima de República Dominicana
  async getWeather() {
    try {
      const response = await api.get(
        `${API_BASE_URLS.weather}/weather?q=Santo Domingo,DO&appid=${WEATHER_API_KEY}&units=metric&lang=es`
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('API key de OpenWeatherMap inválida');
      }
      throw new Error('Error al obtener el clima: ' + (error.message || 'Error de conexión'));
    }
  },

  // Obtener información de Pokémon
  async getPokemon(name) {
    try {
      const response = await api.get(`${API_BASE_URLS.pokemon}/pokemon/${name.toLowerCase()}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(`Pokémon "${name}" no encontrado`);
      }
      throw new Error('Error al buscar Pokémon: ' + (error.message || 'Error de conexión'));
    }
  },

  // Obtener noticias de WordPress
  async getWordPressNews() {
    try {
      const response = await api.get('https://techcrunch.com/wp-json/wp/v2/posts?per_page=3&_embed');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener noticias: ' + (error.message || 'Error de conexión'));
    }
  }
};