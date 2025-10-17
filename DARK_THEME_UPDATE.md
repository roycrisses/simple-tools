# Dark Theme Update - Black, Yellow, White

## Overview
Complete transformation to dark theme with black as primary background, yellow accents, and white text.

## Color Hierarchy

### 1. **Black** - Primary Background
- Body background: `#000000`
- Main sections: Black
- Navigation: Black
- Footer: Black

### 2. **Yellow** - Accent & Interactive Elements
- Primary buttons: Yellow-400 (#facc15)
- Icons: Yellow-400 background
- Hover states: Yellow-500 (#eab308)
- Links: Yellow-400
- Active navigation: Yellow-400
- Borders (accent): Yellow-400

### 3. **White** - Text & Secondary Elements
- Headings: White (#ffffff)
- Body text: Gray-300/400
- Secondary buttons: White border
- Logo text: White

## Component Updates

### **Navbar**
- Background: Black
- Border: Gray-800
- Logo text: White
- Navigation items: Gray-400 → White on hover
- Active state: Yellow-400 background, black text
- Mobile menu: Black background

### **Hero Section**
- Background: Black
- Heading: White
- Description: Gray-400
- Accent text: Yellow-400
- Feature cards: Gray-900 background, Gray-800 border
- Icons: Yellow-400 background

### **Tool Cards**
- Background: Gray-900
- Border: Gray-800
- Hover border: Yellow-400
- Heading: White
- Description: Gray-400
- "Use tool" link: Yellow-400

### **Buttons**
- **Primary**: Yellow-400 background, black text
- **Secondary**: Transparent background, white border, white text
- **Outline**: Transparent background, yellow-400 border

### **Footer**
- Background: Black
- Border: Gray-800
- Headings: White
- Links: Gray-400 → Yellow-400 on hover
- Email link: Yellow-400

### **FAQ**
- Background: Black
- Cards: Gray-900 background
- Questions: White
- Answers: Gray-400
- Hover: Gray-800 background
- Callout box: Gray-900 with yellow-400 border

### **Forms & Inputs**
- Background: Gray-900
- Border: Gray-700
- Focus border: Yellow-400
- Text: White
- Placeholder: Gray-500

## Design Principles

### Contrast Ratios
- White text on black: High contrast
- Yellow-400 on black: High contrast
- Gray-400 on black: Medium contrast (readable)

### Visual Hierarchy
1. **Yellow** - Primary actions, important elements
2. **White** - Headings, key information
3. **Gray-300/400** - Body text, descriptions
4. **Gray-500** - Subtle text, placeholders

### Interaction States
- **Default**: Gray-400 text
- **Hover**: White text or Yellow-400
- **Active**: Yellow-400 background
- **Focus**: Yellow-400 border

## Files Updated

1. **src/styles/clean.css**
   - Body background: Black
   - Text colors: White/Gray
   - Card backgrounds: Gray-900
   - Borders: Gray-800
   - All interactive elements updated

2. **src/pages/Home.jsx**
   - All sections: Black/Gray-900 backgrounds
   - Text: White/Gray-400
   - Accents: Yellow-400

3. **src/components/Navbar.jsx**
   - Background: Black
   - Navigation: Gray-400 → White
   - Active: Yellow-400

4. **src/components/Footer.jsx**
   - Background: Black
   - Links: Gray-400 → Yellow-400
   - Email: Yellow-400

5. **src/pages/Tools.jsx**
   - Background: Black
   - Cards: Gray-900
   - Text: White/Gray-400

6. **src/components/FAQ.jsx**
   - Background: Black
   - Cards: Gray-900
   - Callout: Yellow-400 border

## Benefits

### User Experience
- **Reduced eye strain** in low-light environments
- **Modern aesthetic** with dark theme
- **High contrast** for readability
- **Yellow accents** draw attention to CTAs

### Brand Identity
- **Bold and energetic** with yellow
- **Professional** with black
- **Clean and modern** overall look
- **Distinctive** color combination

### Accessibility
- High contrast ratios
- Clear visual hierarchy
- Consistent color usage
- Readable text sizes

## Technical Details

### CSS Variables Used
```css
--black: #000000
--white: #ffffff
--yellow-400: #facc15
--yellow-500: #eab308
--gray-300: #d4d4d4
--gray-400: #a3a3a3
--gray-500: #737373
--gray-700: #444444
--gray-800: #2a2a2a
--gray-900: #171717
```

### Responsive Behavior
- All dark theme styles work across all breakpoints
- Mobile navigation maintains dark theme
- Touch targets remain accessible
- Contrast maintained on all screen sizes

## Next Steps

Individual tool pages (QRGenerator, ImageResizer, etc.) should be updated to match this dark theme when requested.
