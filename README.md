[README.md](https://github.com/user-attachments/files/28028263/README.md)
# ZSMP - Minecraft Eaglercraft Server Website

A professional, modern gaming server website with real-time admin panel, suggestions system, and changelog management. Built with pure HTML, CSS, and JavaScript - no backend required!

## 📁 Project Structure

```
/
├── index.html           # Home page with hero section and stats
├── suggestions.html     # Community suggestions page
├── changelog.html       # Patch notes and updates page
├── admin.html          # Admin dashboard (password protected)
├── style.css           # Main stylesheet (red/black cyberpunk theme)
├── script.js           # Core JavaScript functionality
└── README.md           # This file
```

## 🚀 Features

### Homepage
- ✨ Animated hero section with glowing effects
- 📊 Real-time server statistics
- 💬 Live activity feed
- ⏳ Season 4 countdown timer
- 🎮 Floating Minecraft blocks animation
- 📢 Announcement banner system
- 🎯 Smooth scrolling navigation

### Suggestions Page
- 💡 Community suggestion submission form
- 🏆 Status filtering (All, Pending, Approved, Rejected)
- 👥 Author attribution and timestamps
- 📱 Responsive grid layout

### Changelog Page
- 📋 Professional timeline layout
- 🏷️ Color-coded tags (Added, Fixed, Changed, Removed)
- 📅 Version tracking and dates
- 🌟 Season 3 highlights section

### Admin Panel
- 🔐 Password protected dashboard
- 📢 Announcement creation and management
- 💡 Suggestion approval/rejection workflow
- 📝 Changelog entry creation
- ⚙️ Site settings customization
- 📊 Statistics overview

## 🎨 Design Features

- **Red/Black Cyberpunk Theme**: Modern gaming aesthetic with neon glows
- **Glassmorphism Effects**: Frosted glass cards with blur
- **Smooth Animations**: Entrance animations, hover effects, transitions
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Particle System**: Floating background elements
- **Cursor Glow**: Custom cursor effect on hover
- **Loading Screen**: Professional intro animation

## 🔧 Installation & Setup

### 1. **Local Testing**
```bash
# Clone or download the files
# Open index.html in a web browser
# No server required!
```

### 2. **GitHub Pages**
```bash
# Create a GitHub repository
# Push all files to main branch
# Go to Settings → Pages → Source: main branch
# Your site will be live at: https://yourusername.github.io/repo-name
```

### 3. **Cloudflare Pages**
```bash
# Push files to GitHub
# Login to Cloudflare
# Create new Pages project
# Select your GitHub repository
# Build command: (leave blank)
# Build output directory: / (root)
# Deploy!
```

### 4. **Other Static Hosts**
Works with any static hosting:
- Vercel
- Netlify
- Firebase Hosting
- AWS S3
- Any traditional web host

## 📝 Configuration

### Change Admin Password
Edit `admin.html` line 500:
```javascript
const ADMIN_PASSWORD = 'admin123'; // Change this to your password
```

### Update Server Settings
1. Go to Admin Panel (admin.html)
2. Click ⚙️ Settings tab
3. Update server IP, Discord URL, and site text
4. Click "Save Settings"

### Add Season 3 Changelog

The website comes pre-configured with Season 3 info in the changelog page. To view it:

1. Go to the Changelog page
2. You'll see the Season 3 - New Start section with:
   - Full world reset
   - 1.5K world border (500 blocks bigger)
   - New plugins
   - Fully refurbished server

To add more changelog entries via admin:

1. Go to Admin Panel (admin.html)
2. Enter password: `admin123`
3. Click 📋 Changelog tab
4. Fill in the form:
   - Title: "Bug Fixes and Improvements"
   - Description: "Details about what changed"
   - Category: Select one (Added, Fixed, Changed, Removed)
5. Click "Add Entry"

## 🎯 How to Use Each Page

### Homepage (index.html)
- Click "Copy Server IP" to copy the IP address
- View live server statistics
- Check the countdown to Season 4
- Click "Join Server" to scroll to stats section

### Suggestions Page (suggestions.html)
- Submit a suggestion in the form
- Filter by status (All, Pending, Approved, Rejected)
- See other players' suggestions

### Changelog Page (changelog.html)
- View all patch notes in timeline format
- See Season 3 highlights
- Click on entries for details

### Admin Panel (admin.html)
1. **First Access**: Enter password `admin123`
2. **Announcements Tab**:
   - Create new announcement
   - View all announcements
   - Delete old ones

3. **Suggestions Tab**:
   - View community suggestions
   - Approve or reject suggestions
   - Delete if needed

4. **Changelog Tab**:
   - Create patch note entries
   - Select category (Added, Fixed, etc.)
   - Delete entries

5. **Settings Tab**:
   - Update server IP
   - Update Discord URL
   - Customize hero text

## 💾 Data Storage

All data is stored in browser **localStorage**:
- Suggestions
- Changelog entries
- Announcements
- Settings

**Note**: Data persists only on the same browser/device. To migrate data:
1. Export from browser DevTools
2. Use JSON backup files
3. Or redeploy everything

## 🎮 Customization

### Change Colors
Edit `:root` variables in `style.css`:
```css
:root {
    --primary-red: #ff1744;
    --dark-red: #c41d3f;
    --light-red: #ff5252;
    /* ... more colors */
}
```

### Update Server IP
In `script.js`, change:
```javascript
const CONFIG = {
    serverIP: 'zsmp.eagler.host',
    // ...
};
```

Or use Admin Panel → Settings

### Add New Pages
1. Create new HTML file
2. Include: `<link rel="stylesheet" href="style.css">`
3. Include: `<script src="script.js"></script>`
4. Copy navbar and footer structure
5. Add link to nav-links in HTML

## 🐛 Troubleshooting

**Data not saving?**
- Check if localStorage is enabled in browser
- Use incognito/private window to test
- Clear browser cache and try again

**Animations not working?**
- Update to latest browser version
- Check CSS support (most browsers support)

**Password not working?**
- Default password is: `admin123`
- Check spelling (case-sensitive)
- Edit in `admin.html` if needed

## 📱 Mobile Optimization

The site is fully responsive:
- **Navbar**: Mobile hamburger menu
- **Cards**: Single column on mobile
- **Buttons**: Full width on small screens
- **Text**: Scales appropriately
- **Touch**: All buttons are touch-friendly

## 🔒 Security Notes

- Passwords stored in client-side code (development only)
- Use a backend service for production
- Data in localStorage is accessible via DevTools
- Consider adding authentication for sensitive features

## 📊 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🚀 Performance

- Page load: ~1.5s
- File sizes:
  - style.css: ~80KB
  - script.js: ~25KB
  - HTML files: ~15-30KB each
- No external dependencies
- Optimized animations

## 📞 Support

For issues or questions:
1. Check this README
2. Review inline code comments
3. Use browser DevTools console
4. Check admin console (Ctrl+Shift+A)

## 📄 License

Free to use and modify for your server!

---

**Made for ZSMP with ❤️**

Need help? Check the admin console by pressing Ctrl+Shift+A!
