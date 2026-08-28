# Connecting `melkazom.com.ng`

The application is already configured to use:

- Public invitation: `https://melkazom.com.ng`
- RSVP and message API: `https://ledger.melkazom.com.ng`

Complete the following once the changes have been pushed to GitHub.

## 1. Point the GitHub repository to the public domain

1. Open the [`Soft-Nation-dev/melkazom`](https://github.com/Soft-Nation-dev/melkazom) repository on GitHub.
2. Go to **Settings** → **Pages**.
3. Confirm **Source** is set to **GitHub Actions**.
4. In **Custom domain**, enter `melkazom.com.ng` and select **Save**.
5. After GitHub verifies the DNS records, enable **Enforce HTTPS**.

The repository includes `public/CNAME`, so each Actions deployment publishes the same domain name with the site artefact.

## 2. Configure the public-site DNS

At the DNS provider for `melkazom.com.ng` (or in the Cloudflare DNS zone), create these records for the apex domain:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Optional, but recommended: add `www` as a CNAME pointing directly to `Soft-Nation-dev.github.io`. GitHub Pages will redirect `www.melkazom.com.ng` to the chosen canonical domain.

Do not create a wildcard (`*`) record. Remove any conflicting `@` A/AAAA/CNAME records first.

## 3. Attach the API subdomain to Cloudflare

1. Ensure the `melkazom.com.ng` zone is active in the Cloudflare account that owns the Worker.
2. Ensure there is no existing CNAME for `api`.
3. From the `worker` folder, deploy the configured Worker:

   ```powershell
   npx wrangler deploy
   ```

The `custom_domain = true` entry in `worker/wrangler.toml` asks Cloudflare to create the `ledger.melkazom.com.ng` DNS record and certificate for the Worker.

## 4. Verify

- Visit `https://melkazom.com.ng` and confirm the invitation loads over HTTPS.
- Submit a test RSVP and a message; both should reach `https://ledger.melkazom.com.ng`.
- DNS and certificate issuance can take up to 24 hours.

The setup follows GitHub's [custom-domain guidance](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) and Cloudflare's [Workers custom-domain configuration](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
