# Hero Section Update Plan

## Overview
Replace the hero title text with an image logo and add a background image layered with existing gradient effects.

## Changes Required

### 1. index.html - Replace Hero Title with Logo Image

**Current Code (lines 40-41):**
```html
<h1 class="hero-title">GHOST LEGACY</h1>
<p class="hero-subtitle">Gaming Adventures | Music & Vibes | Stream & Share</p>
```

**Updated Code:**
```html
<img src="images/logo.png" alt="Ghost Legacy Logo" class="hero-logo">
<p class="hero-subtitle">Gaming Adventures | Music & Vibes | Stream & Share</p>
```

### 2. styles.css - Add Background Image to Hero Section

**Current Code (lines 180-194):**
```css
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%),
    radial-gradient(ellipse at 50% 50%, rgba(255, 71, 87, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(124, 58, 237, 0.15) 0%, transparent 40%),
    radial-gradient(ellipse at 20% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 35%),
    radial-gradient(ellipse at 30% 30%, rgba(255, 71, 87, 0.1) 0%, transparent 30%);
  overflow: hidden;
  padding: var(--spacing-3xl);
}
```

**Updated Code:**
```css
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    url('images/hero background.jpg'),
    linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%),
    radial-gradient(ellipse at 50% 50%, rgba(255, 71, 87, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(124, 58, 237, 0.15) 0%, transparent 40%),
    radial-gradient(ellipse at 20% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 35%),
    radial-gradient(ellipse at 30% 30%, rgba(255, 71, 87, 0.1) 0%, transparent 30%);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;
  padding: var(--spacing-3xl);
}
```

### 3. Add Logo Styling (New CSS)

**Add after `.hero-title` class (around line 222):**
```css
.hero-logo {
  max-width: 400px;
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto var(--spacing-md);
  animation: fadeInUp 0.8s ease-out;
}

.hero-subtitle {
  font-size: clamp(1rem, 4vw, 4vw, 1.5rem);
  font-weight: 300;
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
```

## Implementation Steps

1. **Switch to Code mode** for file modifications
2. **Update index.html** - Replace the hero title `<h1>` with an `<img>` element
3. **Update styles.css** - Add background-image property to `.hero-section` and add `.hero-logo` styling
4. **Test the changes** by viewing the updated hero section

## Expected Result

The hero section will display:
- A background image (`hero background.jpg`) layered with the existing gradient effects
- The logo image centered where the "GHOST LEGACY" text was previously displayed
- The subtitle text below the logo, maintaining the same animation and styling
