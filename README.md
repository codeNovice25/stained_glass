# Michelle Stained Glass Website

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
