import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.apptest.dev',
  appName: 'app-test',
  webDir: 'dist/app-test/browser',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.40.121:4200',
    cleartext: true
  }
};

export default config;
