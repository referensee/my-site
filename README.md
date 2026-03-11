# Prompt Generator

A deploy-ready Next.js app based on your uploaded `preview.tsx`, packaged for publishing with GitHub and Vercel.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy with GitHub + Vercel

1. Create a new GitHub repository.
2. Upload or push these files to the repository.
3. Import the repository into Vercel.
4. Vercel should detect the project as a Next.js app automatically.
5. Click **Deploy**.

## Optional CLI push

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```
