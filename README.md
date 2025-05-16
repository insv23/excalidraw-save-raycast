# excalidraw-save

A Raycast extension to save and manage Excalidraw Live collaboration links.

## Features

- Save Excalidraw collaboration links with descriptions
- List and search through your saved links
- Filter links by status (Default, All, Archived, Pinned)
- Pin important links to the top of the list
- Archive links you don't need regularly
- Track when links were last visited
- Open links directly in your browser

## Installation

1. Make sure you have [Raycast](https://raycast.com/) installed
2. Install the extension manually

```bash
git clone https://github.com/insv23/excalidraw-save-raycast.git
cd excalidraw-save-raycast
npm install
npm run dev
```

## Configuration

Before using the extension, you need to configure:

1. **API Host**: Your excalidraw-save host URL
   - Format: `https://your-domain.com` (*.workers.dev domains are not supported)

2. **API Token**: Your authentication token for the API

## Commands

### Save Excalidraw Link

Save a new Excalidraw Live collaboration link with a description.

### List Excalidraw Links

View and manage all your saved Excalidraw links. Features include:
- Search through your links
- Filter by status (Default, All, Archived, Pinned)
- Edit link details
- Pin important links
- Archive links you don't need regularly
- Delete links
- Open links directly in your browser

## Development

This extension is built with:
- [Raycast API](https://developers.raycast.com/)
- React
- TypeScript

To develop locally:
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## License

MIT
