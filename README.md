# LT India ERP System

A comprehensive Enterprise Resource Planning (ERP) system built with Angular 20 and modern web technologies.

## Features

- **Master Data Management**: Branches, Ports, Geography, Currency management
- **Identity Management**: User, Role, and Permission management
- **CRM Module**: Customer relationship management
- **Dashboard**: Business analytics and insights
- **Reports**: Comprehensive reporting system

## Tech Stack

- **Frontend**: Angular 20 with Standalone Components
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Gogulancode/LT-India-frontend.git
cd LT-India-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── modules/
│   │   ├── master/          # Master data management
│   │   ├── identity/        # User & role management
│   │   ├── crm/            # Customer management
│   │   └── ...
│   ├── pages/              # Main page components
│   ├── shared/             # Shared components & services
│   └── app.component.ts    # Root component
├── styles.css              # Global styles
└── index.html             # Entry point
```

## Development

This project uses:
- Angular 20 with standalone components
- TypeScript for type safety
- Tailwind CSS for styling
- Modern Angular patterns and best practices

## Deployment

The application is configured for Vercel deployment with automatic builds from the main branch.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software developed for LT India.
