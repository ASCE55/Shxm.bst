# HBD SHARMIII 💖 - Birthday Scrapbook Website

## 📖 Project Overview
A highly interactive, aesthetic, and personalized birthday scrapbook website built for a best friend, Sharmila. The site features a Pinterest-inspired Bullet Journal (Bujo) vibe filled with memories, inside jokes, interactive games, and smooth physics-based animations.

## 🎨 Design & Aesthetic
- **Theme:** Scrapbook, Bullet Journal, Vintage Polaroid, and Cute/Girly Aesthetic.
- **Typography:** A curated mix of handwritten and playful fonts (`Caveat`, `Dancing Script`, `Shadows Into Light`, `Indie Flower`) paired with a clean sans-serif (`Nunito`).
- **Motifs:** Washi tapes, paper clips, pushpins, torn paper edges, glowing butterflies, and famous cat meme stickers.
- **Vibe:** Nostalgic, cozy, funny, and deeply personal.

## ✨ Key Features & Interactivity

### 1. Immersive Welcome
- **Loading Screen:** A custom loading experience that fades out elegantly.
- **Video Background:** A subtle, looping anime-style background video layered beneath a bullet journal grid pattern.
- **Ambient Animations:** Glowing purple CSS butterflies that float continuously and shift position based on scroll.

### 2. GSAP Scroll Animations
Powered by GSAP (GreenSock) and ScrollTrigger, the site feels alive:
- Polaroids, torn paper notes, and stickers bounce, swing, and float into view as the user scrolls down the page.
- SVG Doodles dynamically draw themselves as they enter the viewport.
- Famous cat meme stickers feature a parallax effect, moving at different speeds compared to the background.

### 3. Story & Memory Cards
The content is laid out in a responsive grid simulating a scrapbook spread:
- **Intro Section:** Highlighted titles with neon arrows and personalized stats.
- **Photo & Note Cards:** Vintage framed photos coupled with lined-paper notes detailing the friendship.
- **Timeline Moments:** Specific "First Meet" (Hackathon 2025) and "Core Memory" (NEC) sections laid out on graph and pastel papers.

### 4. Interactive "Scratch-to-Reveal" Game
- Built using **HTML5 Canvas**, this feature overlays a gray scratchable pad over a secret, funny image (`MUTTAKOSSU !!.png`).
- Users must physically "scratch" away the canvas using their mouse or touchscreen to uncover the inside joke.

### 5. Dynamic Wish Submission
- A custom modal prompts the birthday girl to "Make a Wish".
- The form intercepts the submission and sends the wish directly to a **Discord Webhook**, ensuring the creator receives it instantly without needing a backend server.

### 6. Hidden Secrets & Confetti
- A "secret button" hidden in the footer triggers a heartfelt pop-up message.
- Upon clicking, a complex custom confetti system fires off (using GSAP for physics-like gravity and bounce), raining down emojis, text, and colors.
- A magical mouse trail drops sparkles and ribbons randomly as the cursor moves across the screen.

## 🛠️ Technology Stack
- **HTML5:** Semantic structure and layout.
- **CSS3:** Advanced styling including CSS variables, flexbox, keyframe animations, masking, and filters.
- **JavaScript (Vanilla):** DOM manipulation, Canvas rendering logic, and asynchronous fetch requests (webhooks).
- **GSAP 3.12.2 & ScrollTrigger:** Core engine for complex physics-based and scroll-linked animations.

## 📁 File Structure
- `index.html`: The main structural layout of the scrapbook and its sections.
- `style.css`: Contains all the aesthetic styling, bujo utilities, and pure CSS animations.
- `script.js`: Handles all the interactivity—GSAP timelines, canvas scratch-off logic, custom cursor trails, and discord webhook integration.
- `assets/`: Contains all local media including background videos, personal photos, and cut-out props.
