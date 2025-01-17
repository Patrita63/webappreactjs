// You can centralize the environment variables in a configuration file for better management.

const config = {
    environment: process.env.REACT_APP_ENVIRONMENT,
    apiUrl: process.env.REACT_APP_API_URL,
    apiUrlTypicode: process.env.REACT_APP_TYPICODE_API_URL,
    runtimeSettings: {}  // Dynamically loaded from appsettings.json
};

export default config;