import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.patryck.couteau',
  appName: 'Couteau',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;