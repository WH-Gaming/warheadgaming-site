# warheadgaming.net

The WarHead Gaming website. Plain HTML and CSS, no build step. Every file in this
folder goes online as-is.

## What's here

| File | Web address once it's live |
| --- | --- |
| `index.html` | https://warheadgaming.net/ |
| `bastion-budget.html` | https://warheadgaming.net/bastion-budget.html |
| `bastion-budget-privacy.html` | https://warheadgaming.net/bastion-budget-privacy.html |
| `privacy.html` | https://warheadgaming.net/privacy.html |
| `404.html` | shown for any address that doesn't exist |
| `bastion-budget/`, `bastion-budget-privacy/`, `privacy/` | tiny pages that forward the short addresses (like `/bastion-budget-privacy`) to the real pages, so either form works |
| `assets/` | styles, script, fonts and images |

For the Microsoft Store listing:

- **Privacy policy URL:** `https://warheadgaming.net/bastion-budget-privacy.html`
  (the short form `https://warheadgaming.net/bastion-budget-privacy` also works)
- **Website:** `https://warheadgaming.net/bastion-budget.html`
- **Support contact:** `support@warheadgaming.net`

## Put it online with DigitalOcean App Platform

App Platform hosts up to three static sites for free. It deploys from a GitHub
repository, so the site goes to GitHub first. After that, every change you push
to GitHub updates the website by itself.

### 1. Put the files on GitHub

1. Sign in to https://github.com (make a free account if you don't have one).
2. Click **+** (top right) → **New repository**. Name it `warheadgaming-site`.
   Public or Private both work. Click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Unzip `warheadgaming-site.zip`, open the `warheadgaming-site` folder, select
   **everything inside it** (the `assets` folder, the three small folders and all
   the `.html` files) and drag it onto the GitHub page.
   Drag the *contents*, not the folder itself, so `index.html` ends up at the top level.
5. Click **Commit changes**.

### 2. Create the app on DigitalOcean

1. Sign in to https://cloud.digitalocean.com → **Create** (top right) → **App Platform**.
2. Choose **GitHub** as the source. The first time, DigitalOcean asks to connect
   to your GitHub account. Allow it access to the `warheadgaming-site` repository.
3. Pick the repository, branch `main`, and leave **Autodeploy** turned on.
4. DigitalOcean should detect it as a **Static Site**. If it shows a "Web Service"
   instead, edit the component and change its type to **Static Site**.
   - **Output directory:** leave blank (or `/`). There's no build command.
   - **Custom error page** (under the static site's settings): `404.html`
5. Choose the free **Starter** plan for static sites, pick a region near you,
   and click **Create resources**.
6. In a minute or two you get a test address ending in `ondigitalocean.app`.
   Open it and click around before connecting your domain.

### 3. Connect warheadgaming.net

In the app, open **Settings** (or **Networking**) → **Domains** → **Add domain**.
Add `warheadgaming.net`, then add `www.warheadgaming.net` the same way.

What you do next depends on where warheadgaming.net's DNS lives.

**If the DNS is at Namecheap** (the usual case for a domain bought there):

1. Choose **You manage your domain** and copy the address DigitalOcean shows
   (it ends in `ondigitalocean.app`).
2. In Namecheap: **Domain List** → **Manage** next to warheadgaming.net → **Advanced DNS**.
3. **Delete** any parking records: a `URL Redirect Record` for `@`, or a `CNAME`
   for `www` pointing to `parkingpage.namecheap.com`.
4. **Add** an `ALIAS Record`: Host `@`, Value = the `ondigitalocean.app` address.
5. **Add** a `CNAME Record`: Host `www`, Value = the same `ondigitalocean.app` address.
6. **Don't touch** the `MX` records or the `TXT` records (Google Workspace, SPF,
   DKIM, google-site-verification). Those keep your email working.

**If the DNS is already on DigitalOcean** (Networking → Domains in DigitalOcean lists warheadgaming.net):

- Choose **We manage your domain**. DigitalOcean adds the records itself.
  Check afterwards that the Google Workspace `MX` and `TXT` records are still there.

DNS changes can take from a few minutes to a few hours. DigitalOcean turns on
HTTPS by itself once the domain points at the app.

### Updating the site later

Open the repository on GitHub, click the file you want to change, click the
pencil icon, edit and **Commit changes**. Or use **Add file → Upload files** to
replace images. DigitalOcean redeploys automatically within a couple of minutes.

## Add a new game or app

1. Put its art in `assets/img/`. 16:9 images work best; WebP keeps them small.
   An app with only a square icon can use the `card-art icon-art` style, like Bastion Budget.
2. In `index.html`, find the comment that starts `ADD A NEW GAME OR APP`.
3. Copy one whole `<article class="card" ...>` … `</article>` block and paste it
   just above the "Next drop" card.
4. Change the name, text, image, link, `data-type` (`game` or `app`),
   `data-status` (`out`, `review`, `soon`, `dev` or `later`), the badge text and the `--accent` color.

The filter buttons update themselves. For example, the "Out now" button appears
as soon as one card has `data-status="out"`.

When a game launches, give it a privacy policy page too (copy
`bastion-budget-privacy.html` as a starting point, but rewrite it: a game with accounts,
chat or purchases collects things Bastion doesn't) and link it from `privacy.html`.

## Bastion Budget screenshots

The Bastion page and card are set up to show app screenshots, but the screenshot
files aren't in this copy. To turn them back on, add these to `assets/img/`
(1600 × 1000, WebP):

- `bastion-overview.webp` (dashboard)
- `bastion-bills.webp` (Bills & recurring)
- `bastion-reports.webp` (a report)

Then in `bastion-budget.html`, remove the `<!--` and `-->` lines around the two
blocks marked `SCREENSHOT` and `SCREENSHOTS`.

## Before you submit to the Store

- Open `https://warheadgaming.net/bastion-budget-privacy.html` on your phone and check that it loads over `https://`.
- Once your PO Box is set up, add the mailing address to the Contact
  sections of both privacy pages.
- If the trial length or price changes, update the "Get Bastion" section of
  `bastion-budget.html` and the Bastion card in `index.html`.
