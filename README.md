# Michelle Stained Glass Website

# Custom Domain Setup (Simple Guide)

This website is hosted for free using **GitHub Pages**.\
You can connect a custom domain (about **\$10/year**) using the steps
below.

------------------------------------------------------------------------

## 1. Buy a domain

Recommended providers:

-   **Namecheap** --- https://namecheap.com\
-   **Porkbun** --- https://porkbun.com

Example domain:

    stainedglassbymichelle.com

------------------------------------------------------------------------

## 2. Add the domain to GitHub

Open the repository and go to:

    Settings → Pages

Under **Custom Domain**, enter your domain:

    stainedglassbymichelle.com

Click **Save**.

GitHub will automatically create a `CNAME` file.

------------------------------------------------------------------------

## 3. Configure DNS (at your domain provider)

Add these **A records**:

    Type: A
    Host: @
    Value: 185.199.108.153

    Type: A
    Host: @
    Value: 185.199.109.153

    Type: A
    Host: @
    Value: 185.199.110.153

    Type: A
    Host: @
    Value: 185.199.111.153

Optional (for **www**):

    Type: CNAME
    Host: www
    Value: USERNAME.github.io

Replace `USERNAME` with your GitHub username.

------------------------------------------------------------------------

## 4. Wait for DNS to update

DNS usually activates within:

    10 minutes – 1 hour

Your site will then work at:

    https://stainedglassbymichelle.com

------------------------------------------------------------------------

## Optional improvement

After the domain works, turn on **HTTPS** in:

    Settings → Pages → Enforce HTTPS

This gives you secure **HTTPS encryption for free**.

------------------------------------------------------------------------

## Suggested improvement before launch

Add a **small Instagram icon in the floating navigation** so visitors
can easily see Michelle's latest work. Handmade art sites benefit a lot
from linking to social media galleries.

You could also slightly adjust the **gallery layout to feel more like an
art portfolio**, which helps the work stand out even more.

## How to change the featured favorites (no code)

Open:
`data/pieces.json`

Find the pieces you want to feature and set:

- `"featured": true`
- `"featuredOrder": 1` (2, 3, ...)

Example:

```json
{
  "id": "harbour-town",
  "title": "Harbour Town",
  "featured": true,
  "featuredOrder": 1
}
```

The home page automatically shows the **first 3** pieces sorted by `featuredOrder`.

## How to preview locally

From the folder with `index.html`:

```bash
python3 -m http.server 8000
```

Then open:
http://localhost:8000/
