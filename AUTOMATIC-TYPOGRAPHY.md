# 🎨 LT India ERP - Automatic Typography System

## 📋 Overview

This document explains how the **automatic typography system** works in LT India ERP, so developers don't need to manually check every page when making typography changes.

## 🎯 Central Configuration

All typography is controlled from **ONE PLACE**: `src/styles/typography.css`

### CSS Variables (Easy to Change)
```css
:root {
  --page-title-size: 1.125rem; /* 18px - Change this to affect ALL page titles */
  --section-header-size: 1rem; /* 16px */
  --subsection-header-size: 0.875rem; /* 14px */
  --component-header-size: 0.75rem; /* 12px */
  --body-text-size: 0.625rem; /* 10px */
  /* ... more variables */
}
```

## 🔄 Automatic Rules

### 1. **HTML Tags Automatically Styled**
- All `<h1>` tags → **page-title** styling (18px)
- All `<h2>` tags → **section-header** styling (16px)  
- All `<h3>` tags → **subsection-header** styling (14px)
- All `<h4>`, `<h5>`, `<h6>` tags → **component-header** styling (12px)
- All `<p>` tags → **body-text** styling (10px)

### 2. **CSS Classes Available**
```html
<!-- Use these classes for consistent styling -->
<h1 class="page-title">Page Title</h1>
<h2 class="section-header">Section Header</h2>
<p class="body-text">Body text content</p>
<span class="secondary-text">Secondary info</span>
```

### 3. **Button Text Classes**
```html
<!-- Buttons with white text -->
<button class="btn-text-primary">Primary Button</button>
<button class="btn-text-secondary">Secondary Button</button>
```

## 🔧 How to Make Global Changes

### Change All Page Titles (18px)
```css
/* In typography.css - Change this ONE line */
:root {
  --page-title-size: 1.25rem; /* Now ALL page titles are 20px */
}
```

### Change All Button Text Colors
```css
/* In typography.css - Change this ONE section */
.btn-text-primary {
  color: #ffffff; /* Change to any color */
}
```

## 💡 Best Practices for Developers

### ✅ DO THIS:
```html
<!-- Use semantic HTML tags -->
<h1>My Page Title</h1>
<h2>Section Title</h2>
<p>Body content</p>

<!-- Or use CSS classes -->
<div class="page-title">Custom Title</div>
<span class="secondary-text">Helper text</span>
```

### ❌ DON'T DO THIS:
```html
<!-- Avoid direct Tailwind classes -->
<h1 class="text-xl font-bold">Title</h1>
<h1 class="text-2xl font-semibold">Another Title</h1>
<p class="text-sm text-gray-600">Text</p>
```

## 🚀 Advanced: Auto-Typography Directive

Use the `autoTypography` directive for automatic styling:

```html
<!-- Automatically applies correct typography classes -->
<div autoTypography>
  <h1>Auto-styled page title</h1>
  <p>Auto-styled body text</p>
</div>
```

## 📊 Benefits

1. **🎯 Consistency**: All pages use the same typography automatically
2. **⚡ Easy Updates**: Change one variable, update entire application  
3. **👥 Team Efficiency**: Developers don't need to memorize classes
4. **🔧 Maintainable**: Centralized configuration
5. **📱 Responsive**: Built-in responsive behavior

## 🔍 Migration Path

### For Existing Components:
1. Replace `text-xl` → Remove (h1 automatically styled)
2. Replace `text-2xl` → Remove (h2 automatically styled)  
3. Replace `text-sm` → Use `secondary-text` class
4. Replace `font-bold` → Remove (automatic in headers)

### Example Migration:
```html
<!-- BEFORE -->
<h1 class="text-xl font-semibold text-gray-900">Page Title</h1>

<!-- AFTER -->
<h1>Page Title</h1> <!-- Automatically styled! -->
```

## 🎉 Result

Now when you want to change all page titles from 18px to 20px, just change **ONE LINE** in `typography.css` instead of checking hundreds of files!

```css
/* Change this ONE line to affect ALL page titles across the entire app */
--page-title-size: 1.25rem; /* 20px */
```

**No more manual page-by-page checking required!** 🎯
