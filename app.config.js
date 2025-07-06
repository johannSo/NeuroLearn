module.exports = {
    expo: {
      name: "NeuroLearn",
      slug: "NeuroLearn",
      version: "0.1.0",
      orientation: "portrait",
      icon: "./assets/icons/adaptive-icon.png",
      splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#000000"
      },
      updates: {
        fallbackToCacheTimeout: 0
      },
      assetBundlePatterns: [
        "**/*"
      ],
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/icons/adaptive-icon.png",
          monochromeImage: "./assets/icons/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        package: "com.satoshi.neurolearn",
        edgeToEdgeEnabled: true
      },
      ios: {
        bundleIdentifier: "com.satoshi.neurolearn"
      },
      web: {
        favicon: "./assets/icons/adaptive-icon.png"
      },
      description: "IDKy",
      primaryColor: "#6200ee",
      extra: {
        eas: {
          projectId: "341d2e79-744c-4fc5-8694-0e76072de8ab"
        }
      },
      plugins: [
        "expo-router"
      ]
    }
  };