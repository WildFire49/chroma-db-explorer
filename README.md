# Chroma DB Explorer

Just a simple web interface for browsing Chroma DB collections. Nothing fancy, but it gets the job done.

🔗 **Live Demo**: [https://chroma-db-explorer.vercel.app/](https://chroma-db-explorer.vercel.app/)

## What it does

Basically lets you:
- Connect to your Chroma DB instance (host/port)
- Browse collections and see what's in them
- View documents with their metadata
- Search through your vector data (tries different methods if one doesn't work)
- Scroll through long content without breaking the UI

That's about it. Built it because I needed to peek into my Chroma collections and the existing tools weren't quite what I wanted.

## Tech Stack

- Next.js 15 (App Router)
- Material-UI for the components
- TypeScript because types are good
- Vercel for hosting

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're good to go.

## How to Use

1. **Connect**: Enter your Chroma DB host and port, hit connect
2. **Browse**: Click on collections to see what's inside
3. **Search**: Use the search bar to find specific documents
4. **Expand**: Click the arrow to see full document content

The search tries semantic search first, falls back to text matching if that doesn't work, and does client-side filtering as a last resort. Works with different Chroma DB versions.

## Screenshots

### Connection Screen
<img width="1506" height="632" alt="Connection interface" src="https://github.com/user-attachments/assets/d8293818-e51c-4ecd-ab6d-67aeb3add643" />

### Collections View
<img width="1506" height="861" alt="Collections table" src="https://github.com/user-attachments/assets/46051518-5f06-4652-9333-6053e2cc1e2d" />

### Document Browser
<img width="1506" height="861" alt="Document viewer" src="https://github.com/user-attachments/assets/2548e889-0535-4315-a05d-34672f6be0fc" />

## Notes

- Uses a Next.js API proxy to handle CORS issues
- Handles null metadata gracefully (learned this the hard way)
- Mobile responsive, though you probably won't use it on mobile
- No authentication - assumes your Chroma DB is behind proper security

## Contributing

If you find bugs or want to add features, PRs are welcome. Keep it simple though.

---

*Built by [@Vai2052](https://x.com/Vai2052) | [LinkedIn](https://www.linkedin.com/in/vaishakh-krishnan/) | [GitHub](https://github.com/WildFire49)*

