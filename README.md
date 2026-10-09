# Multilingual Love Heart & Romantic Website ❤️

A personalized romantic project dedicated to **Riddhima**, with love from **pranit**, celebrating our love story beginning **October 3, 2026**.

This repository contains both:
1. **The Web Experience:** A modern, accessible, responsive romantic website featuring a welcome screen, the generative typographic heart, live day counter, memories gallery with lightbox, interactive love letter, and reasons why you mean the world to me.
2. **The Original Python Experiment:** The original desktop generative typographic heart (`love.py`) built with Python's standard library.

---

## 🌹 Live Web Experience Features

- **Welcome Screen:** Personal greeting *"For Riddhima, with love — pranit ❤️"* with an elegant transition to the main sanctuary.
- **Parametric Typographic Heart:** HTML5 `<canvas>` rendering the multilingual heart algorithm from `love.py` with custom names, glowing color grading, and ambient shimmer.
- **Relationship Day Counter:** Dynamic live counter calculated from **October 3, 2026** (elapsed days or milestone countdown).
- **Memories Photo Gallery:** Responsive grid of photo cards with fallback cards for missing images and an interactive accessible lightbox modal.
- **Interactive Love Letter:** Beautiful sealed envelope and unfolding parchment letter from pranit to Riddhima.
- **Reasons I Love You:** 12 sincere, editable reasons with a progressive reveal interaction.
- **Smooth Navigation:** Sticky navigation bar to jump seamlessly across sections without refreshing.
- **Accessibility & Design:** Respects reduced-motion preferences (`prefers-reduced-motion`), mobile/tablet/desktop responsive, and zero audio autoplay.

---

## 🚀 How to Run Locally

### 1. Run the Romantic Website (Browser)

You can view the website in any browser with zero installation:

#### Method A: Python Local Server (Recommended)
```bash
python -m http.server 8000
```
Then open your browser to:
👉 **[http://localhost:8000](http://localhost:8000)**

#### Method B: Direct File Open
Simply double-click `index.html` or open it directly in Chrome, Edge, Safari, or Firefox.

---

### 2. Run the Original Python Desktop App

The original Python script is 100% preserved. To run it:

```bash
python love.py
```
*(Requires Python 3 with Tkinter, included by default on standard Windows/macOS Python installations).*

---

## 🎨 How to Personalize

All personal configuration is stored in **one single, easy-to-edit file**:
📁 `js/config.js`

### 1. Change Names or Milestone Date
Open `js/config.js`:
```javascript
partnerName: "Riddhima",
senderName: "pranit",
startDate: "2026-10-03", // YYYY-MM-DD
```

### 2. Add Your Own Photos
Drop your photos into the `images/` directory:
- `images/memory-1.jpg`
- `images/memory-2.jpg`
- `images/memory-3.jpg`
- `images/memory-4.jpg`
- `images/memory-5.jpg`
- `images/memory-6.jpg`

You can edit captions and filenames inside `js/config.js` under `memories`. If an image is not added yet, an elegant placeholder card is automatically shown so the layout never breaks.

### 3. Edit the Love Letter
In `js/config.js`, customize the paragraphs under `letter.paragraphs`.

### 4. Edit or Add Reasons
In `js/config.js`, customize the list under `reasons`.

---

## 🌐 Free Deployment to GitHub Pages

To share the live link with Riddhima:
1. Push your branch to GitHub (`git push -u mygithub riddhima-romantic-site` or merge to `main`).
2. Go to your repository settings on GitHub: **Settings > Pages**.
3. Under **Build and deployment > Source**, choose **Deploy from a branch**.
4. Select your branch (`main` or `riddhima-romantic-site`) and folder `/ (root)`.
5. Click **Save**. Within a minute, your website will be live at:
   `https://pranit5812.github.io/love/`

---

## 📂 Project Structure

```text
loveYou/
├── index.html            # Main romantic web application
├── css/
│   └── style.css         # Romantic luxury styling (rose red, blush, cream)
├── js/
│   ├── config.js         # Single configuration file for all personalization
│   ├── heartCanvas.js    # Parametric typographic heart & shimmer engine
│   └── app.js            # Welcome screen, day counter, lightbox, letter, reasons
├── images/
│   └── README.md         # Photo guide and directory for memories gallery
├── love.py               # [PRESERVED] Original Python desktop experiment
├── README.md             # Project documentation
├── .gitignore            # Ignores pycache and temporary files
└── .gitattributes
```
