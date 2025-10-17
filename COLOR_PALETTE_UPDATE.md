# Yellow, White, Black Color Palette Update

## Color Scheme

### Primary Colors
- **Yellow**: `#facc15` (yellow-400) - Primary accent, buttons, icons
- **Black**: `#000000` - Text, borders, secondary elements
- **White**: `#ffffff` - Backgrounds, cards

### Yellow Scale
```css
--yellow-50: #fefce8   /* Light backgrounds */
--yellow-100: #fef9c3  /* Badges, subtle highlights */
--yellow-200: #fef08a  /* Hover states */
--yellow-300: #fde047  /* Borders */
--yellow-400: #facc15  /* Primary buttons, icons */
--yellow-500: #eab308  /* Hover states for buttons */
--yellow-600: #ca8a04  /* Dark accents */
--yellow-700: #a16207  /* Text on light backgrounds */
--yellow-800: #854d0e  /* Deep accents */
--yellow-900: #713f12  /* Darkest yellow */
```

## Usage Guide

### Buttons
- **Primary**: Yellow-400 background, black text
- **Secondary**: White background, black border, black text
- **Outline**: Transparent background, black border

### Icons
- **Default**: Yellow-400 background, black icon
- **Hover**: Yellow-500 background

### Navigation
- **Active**: Yellow-400 background, black text
- **Hover**: Yellow-50 background, black text
- **Default**: Gray text

### Badges
- **Background**: Yellow-100
- **Border**: Yellow-300 or Yellow-400
- **Text**: Black

### Status Indicators
- **Popular**: Yellow-400 background, black text
- **New**: Black background, white text
- **Fun**: Yellow-200 background, black text

### Backgrounds
- **Primary**: White
- **Secondary**: Gray-50
- **Accent**: Yellow-50
- **Highlight**: Yellow-100

### Borders
- **Default**: Gray-200 (1px)
- **Strong**: Black (2px)
- **Accent**: Yellow-400 (2px)

## Component Examples

### Hero Section
- Badge: Yellow-100 bg, Yellow-400 border
- Feature cards: White bg, Black border, Yellow-400 icons

### Tool Cards
- Background: White
- Border: Gray-200, hover to Black
- Icon: Yellow-400 background
- Status badge: Yellow-400 for popular

### FAQ
- Cards: White with gray border
- Highlight box: Yellow-50 bg, Yellow-400 border

### Footer
- Background: White
- Border: Gray-200 (2px top)

## Design Principles

1. **High Contrast**: Yellow and black provide strong visual contrast
2. **Professional**: Sharp corners, clean lines
3. **Accessible**: Good color contrast ratios
4. **Consistent**: Yellow used sparingly for emphasis
5. **Modern**: Geometric shapes, minimal design

## Files Updated
- `src/styles/clean.css` - Core design system
- `tailwind.config.js` - Yellow color definitions
- `src/pages/Home.jsx` - Yellow accents throughout
- `src/components/Navbar.jsx` - Yellow active states
- `src/pages/Tools.jsx` - Yellow badges and icons
- `src/components/FAQ.jsx` - Yellow highlight boxes

## Benefits
- **Distinctive**: Yellow makes the site stand out
- **Professional**: Clean, corporate appearance
- **Energetic**: Yellow conveys speed and efficiency
- **Memorable**: Strong brand identity
- **Accessible**: High contrast for readability
