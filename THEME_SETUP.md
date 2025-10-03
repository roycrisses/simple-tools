# Theme System Documentation

## Overview
The site now automatically detects and respects the user's system theme preference (dark/light mode) while allowing manual override.

## How It Works

### 1. **System Detection**
- Automatically detects user's system preference using `prefers-color-scheme` media query
- Applies the appropriate theme on first visit without any flash
- Listens for system theme changes and updates automatically (if user hasn't manually set a preference)

### 2. **User Preference Storage**
- When user manually toggles theme, preference is saved to localStorage
- Manual preference overrides system preference
- Clearing localStorage will revert to system preference detection

### 3. **Flash Prevention**
- Inline script in HTML head runs before React loads
- Prevents flash of unstyled content (FOUC)
- Ensures correct theme is applied immediately

## Implementation Details

### Files Modified:
- `index.html` - Added theme detection script
- `src/App.jsx` - Enhanced theme logic with system detection
- `src/components/Navbar.jsx` - Added tooltips for theme toggle
- `src/index.css` - Added smooth transitions and dark mode styles

### Key Features:
- ✅ **System Preference Detection** - Respects OS/browser theme setting
- ✅ **Manual Override** - Users can still manually toggle themes
- ✅ **Persistent Storage** - Manual preferences are remembered
- ✅ **Dynamic Updates** - Responds to system theme changes in real-time
- ✅ **No Flash** - Prevents theme switching flash on page load
- ✅ **Theme-Color Meta** - Updates browser theme color dynamically
- ✅ **Smooth Transitions** - CSS transitions for theme changes

## User Experience

### First Visit:
1. Site detects system preference (dark/light)
2. Applies appropriate theme immediately
3. No flash or theme switching visible

### Manual Toggle:
1. User clicks theme toggle button
2. Theme switches with smooth animation
3. Preference saved to localStorage
4. System preference detection disabled for this user

### System Theme Change:
1. If user hasn't manually set preference
2. Site automatically updates when system theme changes
3. Smooth transition applied

### Clearing Data:
1. If localStorage is cleared
2. Site reverts to system preference detection
3. Automatic theme switching re-enabled

## Technical Implementation

### Theme Detection Logic:
```javascript
// Priority order:
1. localStorage.getItem('theme') // Manual user preference
2. window.matchMedia('(prefers-color-scheme: dark)').matches // System preference
3. false // Default to light mode
```

### Theme Application:
```javascript
// DOM updates:
document.documentElement.classList.add/remove('dark')
document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
```

### Event Listeners:
- `matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handler)`
- Only active when no manual preference is set
- Automatically disabled when user manually toggles theme

## Browser Support
- ✅ **Modern Browsers** - Full support (Chrome 76+, Firefox 67+, Safari 12.1+)
- ✅ **Older Browsers** - Graceful fallback to light mode
- ✅ **Mobile** - Full support on iOS 13+ and Android 10+

## Testing

### Test Cases:
1. **System Dark Mode** - Site should load in dark mode
2. **System Light Mode** - Site should load in light mode  
3. **Manual Toggle** - Should override system preference
4. **System Change** - Should update if no manual preference
5. **Page Refresh** - Should maintain manual preference
6. **Clear Storage** - Should revert to system detection

### Testing Steps:
1. Change system theme in OS settings
2. Visit site in new incognito window
3. Verify correct theme is applied immediately
4. Toggle theme manually and refresh
5. Verify manual preference is maintained
6. Clear localStorage and refresh
7. Verify system preference is detected again

## Customization

### Theme Colors:
- **Light Mode**: `#f97316` (Orange)
- **Dark Mode**: `#1f2937` (Dark Gray)

### Transition Duration:
- **CSS Transitions**: `0.3s ease`
- **Color Scheme**: `0.3s ease`

### Background Patterns:
- **Light Mode**: Light gray dots
- **Dark Mode**: Dark gray dots

The theme system is now fully automatic and user-friendly! 🎨
