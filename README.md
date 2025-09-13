# Chroma DB Explorer

Just a simple web interface for browsing Chroma DB collections. Nothing fancy, but it gets the job done.

🔗 **Live Demo**: [https://chroma-db-explorer.vercel.app/](https://chroma-db-explorer.vercel.app/)
<img width="1511" height="758" alt="image" src="https://github.com/user-attachments/assets/57abe155-4b1a-4ba9-ab81-47263d1979da" />

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

<img width="1511" height="758" alt="image" src="https://github.com/user-attachments/assets/3efd9ba2-a8e3-4db8-b086-371a254b3ae9" />


### Collections View
<img width="1511" height="758" alt="image" src="https://github.com/user-attachments/assets/4e732bde-8307-4817-a153-ca25892c2db3" />


## Notes

- Uses a Next.js API proxy to handle CORS issues
- Handles null metadata gracefully (learned this the hard way)
- Mobile responsive, though you probably won't use it on mobile
- No authentication - assumes your Chroma DB is behind proper security

## Contributing

If you find bugs or want to add features, PRs are welcome. Keep it simple though.

---

*Built by [@Vai2052](https://x.com/Vai2052) | [LinkedIn](https://www.linkedin.com/in/vaishakh-krishnan/) | [GitHub](https://github.com/WildFire49)*

