# Drop In Café & Bistro — source transfer

Source revision: 91614556d84e229334bcde24e4c2f5c8f7ab4807
Destination: https://github.com/haridasskumar-hash/dropin

This package contains the complete tracked website source, 47 menu photos, 16 café photos, workshop artwork, menu defaults, bilingual journal articles, page content, and admin editors.

## Upload from your computer
Extract the archive, open the dropin folder in VS Code, and use Git to commit and push to your repository. The GitHub connector could read the destination but rejected file creation with HTTP 403 (Resource not accessible by integration). No repository files were changed by this attempt.

## Hosting requirements
This is a React/Vinext application with server routes. GitHub stores the source; GitHub Pages alone does not support its database, uploads, booking requests or administrator authentication.

The existing live website remains on OpenAI Sites. It uses Cloudflare D1 (DB), R2 (BUCKET), Sites authentication and an ADMIN_EMAIL runtime setting. For a separate hosting deployment, configure the database/storage bindings, apply the supplied migrations, and adapt authentication and environment configuration for the chosen host. Do not publish administrator pages without server-side authorization.

Use the package.json scripts and pinned package manager for installation/build. Some bundled build scripts are designed for the Sites environment and may need adjustment for an independent host. This archive has not been validated for a standalone hosting provider.

## Content and data
Included JSON files provide the menu, pages, images and journal articles built in this conversation. Live database records (such as workshop requests or later administrator edits), uploaded R2 objects, secrets and private credentials are NOT exported. These require a separate authorized migration if you move hosting.

Do not put credentials or customer booking data in this public repository. Preserve .gitignore. The .openai/hosting.json file identifies the existing Sites project; retaining it does not give GitHub access to the live website.
