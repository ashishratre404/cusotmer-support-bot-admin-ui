# Admin Document Upload UI

A React-based admin interface for document ingestion with Material UI components.

## Features

- **Login System**: Mock authentication with email and tenant ID
- **Document Upload**: PDF file upload with form validation
- **Admin Dashboard**: Clean, responsive interface for document management
- **Form Handling**: FormData submission with console logging

## Tech Stack

- React (functional components + hooks)
- Material UI v5
- JavaScript ES6+

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd admin-document-upload

# Install dependencies
npm install 

# Start development server
npm start
```

## Usage

1. **Login**: Enter admin email and tenant ID
2. **Upload**: Select PDF file and provide document title
3. **Submit**: Form data is logged to console (ready for backend integration)

## Form Fields

- `tenantId` - Auto-filled from login
- `email` - Auto-filled from login  
- `title` - Document title (default: "FAQ Upload")
- `file` - PDF file upload

## Development Status

🚧 **In Development** - Backend integration pending
