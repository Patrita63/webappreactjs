// You can centralize the environment variables in a configuration file for better management.
// import loadConfig from './configLoader'; // Fetch appsettings.json

const config = {
    apiUrl: process.env.REACT_APP_API_URL,
    environment: process.env.REACT_APP_ENVIRONMENT,
    // apiUrl: process.env.development.REACT_APP_API_URL,   NO
    apiUrlTypicode: process.env.REACT_APP_TYPICODE_API_URL,
    runtimeSettings: {}  // Dynamically loaded from appsettings.json
};

// Load runtime configuration
/* export const initializeConfig = async () => {
    const runtimeSettings = await loadConfig(); // Fetch appsettings.json
    config.runtimeSettings = runtimeSettings;
}; */

export default config;
