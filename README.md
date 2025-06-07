# MODMASTER - Premium APK & Course Platform

A modern, cyberpunk-themed website for downloading mod APKs and courses with a comprehensive admin panel for content management.

## 🚀 Features

### Website Features
- **Modern Cyberpunk Design**: Futuristic light theme with neon accents and smooth animations
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **SEO Optimized**: Structured data, meta tags, and semantic HTML for 85+ SEO score
- **Fast Performance**: Optimized images, lazy loading, and efficient code
- **Content Filtering**: Dynamic filtering for APKs and courses by category
- **Contact Forms**: Integration with formsubmit.co for user requests
- **Social Sharing**: Built-in sharing functionality for content

### Admin Panel Features
- **JSON-Based CMS**: No database required, all data stored in JSON format
- **Content Management**: Add, edit, and delete APKs and courses
- **Navigation Management**: Create and modify menu items dynamically
- **Settings Control**: Update site information and statistics
- **Data Export/Import**: Backup and restore functionality
- **Google Drive Integration**: Direct links to Google Drive for file hosting
- **Real-time Preview**: Preview changes before publishing

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Data Storage**: JSON files (no database required)
- **Forms**: formsubmit.co integration
- **Images**: Pexels stock photos
- **Hosting**: GitHub Pages compatible

## 📁 Project Structure

```
modmaster/
├── index.html              # Main website
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       └── script.js       # Main JavaScript
├── admin/
│   ├── index.html          # Admin panel
│   ├── admin.css           # Admin panel styles
│   └── admin.js            # Admin panel functionality
├── data/
│   └── data.json           # Content data
└── README.md
```

## 🚀 Getting Started

### 1. Clone or Download
Download the project files to your local machine.

### 2. Local Development
Open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have live-server installed)
npx live-server

# Using PHP
php -S localhost:8000
```

### 3. Admin Panel Access
Navigate to `/admin/index.html` and login with:
- **Username**: admin
- **Password**: modmaster123

### 4. Content Management
1. Use the admin panel to add APKs, courses, and modify settings
2. Export the updated `data.json` file
3. Replace the existing `data.json` in the `/data/` folder
4. Refresh the main website to see changes

## 📝 Content Management

### Adding APKs
1. Go to Admin Panel → APKs
2. Click "Add New APK"
3. Fill in the form with:
   - Title and description
   - Category (games, productivity, social, media)
   - Version and size information
   - Pexels image URL
   - Google Drive download link
   - Requirements and rating

### Adding Courses
1. Go to Admin Panel → Courses
2. Click "Add New Course"
3. Fill in the form with:
   - Title and description
   - Category (programming, design, marketing, business)
   - Duration and difficulty level
   - Instructor information
   - Pexels image URL
   - Google Drive download link

### Updating Navigation
1. Go to Admin Panel → Navigation
2. Add, edit, or remove menu items
3. Each item needs a name, href (link), and optional emoji icon

### Site Settings
1. Go to Admin Panel → Settings
2. Update site information, contact details, and statistics
3. Changes reflect across the entire website

## 🌐 Deployment

### GitHub Pages
1. Create a new GitHub repository
2. Upload all project files
3. Go to repository Settings → Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://username.github.io/repository-name`

### Custom Domain (Optional)
1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## 🔧 Customization

### Colors and Theme
Edit CSS custom properties in `assets/css/style.css`:

```css
:root {
    --primary-color: #00ffff;      /* Cyan */
    --secondary-color: #9d4edd;    /* Purple */
    --accent-color: #ff6b35;       /* Orange */
    /* Add your custom colors */
}
```

### Adding New Categories
1. Update the filter buttons in both `index.html` and admin panel
2. Add new category options in the admin forms
3. Update the filtering JavaScript logic

### Custom Animations
Add new animations in the CSS file:

```css
@keyframes yourAnimation {
    from { /* start state */ }
    to { /* end state */ }
}

.your-element {
    animation: yourAnimation 1s ease-out;
}
```

## 📧 Contact Form Setup

The contact form uses formsubmit.co. To use your own email:

1. Replace `ishant150407@gmail.com` in the form action
2. Update the `_next` parameter to your website URL
3. Test the form to ensure it works correctly

## 🔒 Security Notes

- The admin panel uses basic authentication (demo purposes)
- For production, implement proper authentication
- Validate all user inputs
- Use HTTPS for secure data transmission
- Regularly backup your data.json file

## 📱 Mobile Optimization

The website is fully responsive with:
- Mobile-first design approach
- Touch-friendly interface elements
- Optimized images for different screen sizes
- Fast loading on mobile networks

## 🎨 Design Credits

- **Created by**: Ishant Webworks
- **Website**: [ishant.shop](https://ishant.shop)
- **Blog**: [blogs.ishant.shop](https://blogs.ishant.shop)
- **Email**: ishant150407@gmail.com
- **Images**: Pexels.com stock photos

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- Email: ishant150407@gmail.com
- Website: [ishant.shop](https://ishant.shop)
- Blog: [blogs.ishant.shop](https://blogs.ishant.shop)

---

**MODMASTER** - Bringing the future of APK and course distribution to your fingertips! 🚀