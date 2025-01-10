const loadConfig = async () => {
    try {
        // const response = await fetch(`${process.env.PUBLIC_URL}/appsettings.json`);
        const response = await fetch('../appsettings.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch configuration: ${response.statusText}`);
        }
        const appsettings = await response.json();
        return appsettings;
    } catch (error) {
        console.error('Error loading configuration:', error);
        return {};
    }
};

export default loadConfig;