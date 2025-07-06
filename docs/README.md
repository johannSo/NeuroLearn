# NeuroLearn Documentation

This is the documentation site for [NeuroLearn](https://neurolearn.app), your AI-powered learning companion.

## What is NeuroLearn?

NeuroLearn is a mobile app designed to help you build better learning habits through structured study sessions, progress tracking, and intelligent insights. Our mission is to transform how people learn by combining proven learning techniques with modern technology.

## Features

- **🎯 Focused Learning Sessions**: 25-minute Pomodoro-style sessions
- **📊 Progress Analytics**: Visual insights into your learning patterns
- **🧠 Smart Insights**: AI-powered recommendations and tips
- **📱 Mobile-First Design**: Clean, distraction-free interface
- **🔄 Data Management**: Secure local storage with cloud sync options

## Documentation Structure

- **[Getting Started](/docs/intro)**: Welcome to NeuroLearn
- **[Features](/docs/features)**: Comprehensive feature overview
- **[User Guide](/docs/getting-started)**: Step-by-step instructions
- **[API Reference](/docs/api)**: Technical documentation for developers
- **[Blog](/blog)**: Learning tips, updates, and insights

## Quick Start

1. **Download the App**: Available on [iOS](https://apps.apple.com/app/neurolearn) and [Android](https://play.google.com/store/apps/details?id=com.neurolearn.app)
2. **Read the Docs**: Start with our [Getting Started Guide](/docs/getting-started)
3. **Join the Community**: Connect with other learners on [Discord](https://discord.gg/neurolearn)

## Development

This documentation site is built with [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
npm install
```

### Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<GITHUB_USERNAME> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Contributing

We welcome contributions to improve our documentation! Here's how you can help:

1. **Report Issues**: Found a problem? [Open an issue](https://github.com/neurolearn/neurolearn-mobile/issues)
2. **Suggest Improvements**: Have ideas for better docs? [Start a discussion](https://github.com/neurolearn/neurolearn-mobile/discussions)
3. **Submit Changes**: Want to contribute? [Fork and submit a PR](https://github.com/neurolearn/neurolearn-mobile/pulls)

### Documentation Guidelines

- **Clear and Concise**: Write in simple, understandable language
- **User-Focused**: Focus on what users need to know
- **Consistent**: Follow our style guide and formatting
- **Accessible**: Ensure content is accessible to all users

## Community

- **Discord**: [Join our community](https://discord.gg/neurolearn)
- **Twitter**: [Follow us](https://twitter.com/neurolearn)
- **GitHub**: [Contribute to our code](https://github.com/neurolearn/neurolearn-mobile)
- **Email**: [Contact us](mailto:support@neurolearn.app)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the NeuroLearn team
