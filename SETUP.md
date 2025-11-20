# Setup Instructions

## Required Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Add Axiforma Fonts

Place the following font files in `public/fonts/axiforma/`:
- `Axiforma-Regular.otf`
- `Axiforma-Medium.otf`
- `Axiforma-SemiBold.otf`

**Note**: If you don't have these fonts yet, the site will fall back to system fonts.

### 3. (Optional) Set GitHub Token

To fetch your pinned repositories automatically:

1. Create a GitHub Personal Access Token:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - **Required Scope**: `public_repo` (for reading your public pinned repos)
   - Or use a Fine-grained token with "Read-only" access to public repositories.

2. Set the token as an environment variable:
   ```bash
   # On Windows (PowerShell)
   $env:GITHUB_TOKEN = "your_token_here"
   
   # On Unix/Mac
   export GITHUB_TOKEN="your_token_here"
   ```

3. Run the fetch script:
   ```bash
   pnpm fetch-pinned
   ```

Without the token, the script will use the REST API or fallback data.

### 4. Run Development Server

```bash
pnpm dev
```

The site will be available at `http://localhost:5173`

## Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm install && pnpm fetch-pinned && pnpm build`
3. Set publish directory: `dist`
4. Add environment variable `GITHUB_TOKEN` (optional) in Netlify dashboard
5. Deploy!

The `netlify.toml` file is already configured with the correct settings.

## Testing

Run tests to verify everything works:

```bash
# Unit tests
pnpm test

# E2E tests (requires dev server)
pnpm test:e2e
```

## Project Status

✅ All core features implemented:
- Vite React+TypeScript setup
- Tailwind CSS with custom theme
- Scroll-based modernization
- Dual layout (creative/formal)
- GitHub integration script
- Hero component (ported from legacy)
- All components and tests
- Netlify configuration

⏳ Pending user action:
- Add Axiforma font files
- (Optional) Set GitHub token
- (Optional) Customize profile/skills in `src/content/`

