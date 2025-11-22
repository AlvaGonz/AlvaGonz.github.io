# Setup Instructions

## Required Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Axiforma Fonts

Axiforma is a proprietary font that cannot be committed to the repository. You have two options:

#### Option A: Local Development (Fonts in `public/fonts/axiforma/`)

Place the following font files in `public/fonts/axiforma/`:
- `Axiforma-Regular.otf`
- `Axiforma-Medium.otf`
- `Axiforma-SemiBold.otf`

**Note**: These fonts are gitignored and will not be deployed. For production, use Option B.

#### Option B: CDN Configuration (Recommended for Production)

The fonts are loaded dynamically from a CDN via the `VITE_FONT_CDN_URL` environment variable.

1. Upload the Axiforma font files to your CDN (e.g., Cloudflare R2, AWS S3, or any static hosting):
   - `Axiforma-Regular.otf`
   - `Axiforma-Medium.otf`
   - `Axiforma-SemiBold.otf`

2. Set the CDN base URL as an environment variable:
   ```bash
   # On Windows (PowerShell)
   $env:VITE_FONT_CDN_URL = "https://your-cdn-url.com/fonts/axiforma"
   
   # On Unix/Mac
   export VITE_FONT_CDN_URL="https://your-cdn-url.com/fonts/axiforma"
   ```

3. For production deployment (GitHub Pages, Netlify, etc.), add `VITE_FONT_CDN_URL` as an environment variable in your deployment settings.

**Note**: If no CDN URL is set and fonts are not in `public/fonts/axiforma/`, the site will fall back to system fonts.

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
4. Add environment variables in Netlify dashboard:
   - `GITHUB_TOKEN` (optional) - For fetching pinned repositories
   - `VITE_FONT_CDN_URL` (required for fonts) - CDN base URL for Axiforma fonts
5. Deploy!

The `netlify.toml` file is already configured with the correct settings.

## GitHub Pages Deployment

1. Ensure fonts are accessible via CDN (fonts are gitignored and not deployed)
2. Set `VITE_FONT_CDN_URL` in your GitHub Actions workflow or GitHub Pages environment
3. The build will automatically use the CDN URL for font loading

**Important**: Since fonts are proprietary and gitignored, you must configure `VITE_FONT_CDN_URL` for production deployment.

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

