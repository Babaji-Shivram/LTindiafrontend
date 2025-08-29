# LT India ERP - Typography Guidelines & Standards

## 📋 Overview

This document outlines the universal typography system implemented across the LT India ERP platform to ensure consistency and maintainability.

## 🎯 Typography System Structure

### **Core Typography Files**
- `src/styles/typography.css` - Universal typography classes
- `src/styles.css` - Main stylesheet with typography imports
- Inter Font Family (300-700 weights) loaded from Google Fonts

## 📐 Typography Classes & Usage

### **1. Page Structure Classes**

#### **Page Titles** - `page-title`
- **Size**: 28px (1.75rem)
- **Weight**: 700 (Bold)
- **Usage**: Main page headers (Dashboard, Users, Masters, etc.)
- **Example**: `<h1 class="page-title">Dashboard</h1>`

#### **Section Headers** - `section-header`
- **Size**: 20px (1.25rem)
- **Weight**: 600 (Semi-bold)
- **Usage**: Major section dividers, widget titles
- **Example**: `<h2 class="section-header">Recent Activity</h2>`

#### **Subsection Headers** - `subsection-header`
- **Size**: 18px (1.125rem)
- **Weight**: 600 (Semi-bold)
- **Usage**: Sub-sections within major sections
- **Example**: `<h3 class="subsection-header">User Statistics</h3>`

#### **Component Headers** - `component-header`
- **Size**: 16px (1rem)
- **Weight**: 600 (Semi-bold)
- **Usage**: Small component titles, card headers
- **Example**: `<h4 class="component-header">Quick Stats</h4>`

### **2. Content Classes**

#### **Body Text** - `body-text`
- **Size**: 14px (0.875rem)
- **Weight**: 400 (Regular)
- **Usage**: Primary content, descriptions, paragraphs
- **Example**: `<p class="body-text">Main content goes here</p>`

#### **Secondary Text** - `secondary-text`
- **Size**: 12px (0.75rem)
- **Weight**: 400 (Regular)
- **Color**: Gray-500
- **Usage**: Supporting information, subtitles, help text
- **Example**: `<p class="secondary-text">Additional information</p>`

#### **Caption Text** - `caption-text`
- **Size**: 11px (0.6875rem)
- **Weight**: 400 (Regular)
- **Usage**: Very small supporting text, timestamps
- **Example**: `<span class="caption-text">Last updated: 2 hours ago</span>`

### **3. Interactive Element Classes**

#### **Button Text Primary** - `btn-text-primary`
- **Size**: 14px (0.875rem)
- **Weight**: 600 (Semi-bold)
- **Color**: White
- **Background**: #2c4170
- **Usage**: Primary action buttons
- **Example**: `<button class="btn-text-primary">Save Changes</button>`

#### **Button Text Secondary** - `btn-text-secondary`
- **Size**: 14px (0.875rem)
- **Weight**: 500 (Medium)
- **Color**: Gray-600
- **Usage**: Secondary buttons, cancel actions
- **Example**: `<button class="btn-text-secondary">Cancel</button>`

#### **Link Text** - `link-text`
- **Size**: 14px (0.875rem)
- **Weight**: 500 (Medium)
- **Color**: Blue-600
- **Usage**: Clickable links, navigation items
- **Example**: `<a class="link-text" href="/users">View All Users</a>`

### **4. Form Element Classes**

#### **Label Text** - `label-text`
- **Size**: 14px (0.875rem)
- **Weight**: 600 (Semi-bold)
- **Usage**: Form field labels
- **Example**: `<label class="label-text">Email Address</label>`

#### **Input Text** - `input-text`
- **Size**: 14px (0.875rem)
- **Weight**: 400 (Regular)
- **Usage**: Input fields, text areas
- **Example**: `<input class="input-text" type="text" placeholder="Enter email">`

#### **Form Select** - `form-select`
- **Size**: 14px (0.875rem)
- **Weight**: 400 (Regular)
- **Usage**: Dropdown selects, comboboxes
- **Example**: `<select class="form-select"><option>Choose option</option></select>`

#### **Help Text** - `help-text`
- **Size**: 12px (0.75rem)
- **Weight**: 400 (Regular)
- **Color**: Gray-500
- **Usage**: Field descriptions, validation messages
- **Example**: `<span class="help-text">Password must be 8+ characters</span>`

### **5. Data Display Classes**

#### **Table Headers** - `table-header`
- **Size**: 12px (0.75rem)
- **Weight**: 600 (Semi-bold)
- **Color**: Gray-500
- **Text**: Uppercase
- **Usage**: Data table column headers
- **Example**: `<th class="table-header">User Name</th>`

#### **Table Cells** - `table-cell`
- **Size**: 14px (0.875rem)
- **Weight**: 400 (Regular)
- **Usage**: Data table content cells
- **Example**: `<td class="table-cell">John Smith</td>`

#### **Table Caption** - `table-caption`
- **Size**: 12px (0.75rem)
- **Weight**: 500 (Medium)
- **Usage**: Table descriptions, row counts
- **Example**: `<caption class="table-caption">Showing 1-10 of 45 users</caption>`

### **6. Navigation Classes**

#### **Nav Primary** - `nav-primary`
- **Size**: 14px (0.875rem)
- **Weight**: 500 (Medium)
- **Usage**: Main navigation menu items
- **Example**: `<a class="nav-primary">Dashboard</a>`

#### **Nav Secondary** - `nav-secondary`
- **Size**: 13px (0.8125rem)
- **Weight**: 400 (Regular)
- **Usage**: Sub-navigation, breadcrumbs
- **Example**: `<a class="nav-secondary">Users</a>`

### **7. Dashboard & Metrics Classes**

#### **Metric Value** - `metric-value`
- **Size**: 24px (1.5rem)
- **Weight**: 700 (Bold)
- **Usage**: Dashboard metric numbers
- **Example**: `<span class="metric-value">1,248</span>`

#### **Metric Label** - `metric-label`
- **Size**: 12px (0.75rem)
- **Weight**: 500 (Medium)
- **Color**: Gray-600
- **Usage**: Dashboard metric descriptions
- **Example**: `<span class="metric-label">Total Users</span>`

## 🔄 Migration from Tailwind Classes

### **Replace These Tailwind Classes:**

| Old Tailwind Class | New Typography Class | Usage |
|-------------------|---------------------|--------|
| `text-3xl font-bold` | `page-title` | Page headers |
| `text-2xl font-bold` | `page-title` | Page headers |
| `text-lg font-semibold` | `section-header` | Section titles |
| `text-base font-medium` | `component-header` | Component titles |
| `text-sm` | `body-text` | Body content |
| `text-xs` | `secondary-text` | Supporting text |
| `text-sm font-medium` (buttons) | `btn-text-primary` or `btn-text-secondary` | Button text |
| `text-sm` (inputs) | `input-text` | Form inputs |
| `text-xs font-medium uppercase` (tables) | `table-header` | Table headers |
| `text-sm` (table cells) | `table-cell` | Table content |

## 🎨 Responsive Design

### **Mobile Adjustments (max-width: 768px)**
- Page titles: Reduced to 24px
- Section headers: Reduced to 18px
- Improved touch targets for mobile interfaces

### **Tablet Adjustments (max-width: 1024px)**
- Optimized spacing and line heights
- Responsive grid layouts for better readability

## ✅ Implementation Checklist

### **For New Components:**
- [ ] Use `page-title` for main page headers
- [ ] Use `section-header` for major sections
- [ ] Use `body-text` for main content
- [ ] Use `secondary-text` for supporting information
- [ ] Use `btn-text-primary`/`btn-text-secondary` for buttons
- [ ] Use `table-header`/`table-cell` for data tables
- [ ] Use `input-text`/`form-select`/`label-text` for forms

### **For Existing Components:**
- [ ] Replace `text-3xl font-bold` with `page-title`
- [ ] Replace `text-2xl font-bold` with `page-title`
- [ ] Replace `text-lg font-semibold` with `section-header`
- [ ] Replace `text-sm` with `body-text`
- [ ] Replace `text-xs` with `secondary-text`
- [ ] Update button classes to use `btn-text-*`
- [ ] Update table classes to use `table-*`
- [ ] Update form classes to use form-specific typography

## 🚀 Benefits

1. **Consistency**: Uniform typography across all pages
2. **Maintainability**: Single source of truth for font styles
3. **Scalability**: Easy to update fonts globally
4. **Performance**: Optimized font loading and rendering
5. **Accessibility**: Consistent contrast ratios and readable sizes
6. **Developer Experience**: Clear, semantic class names

## 📝 Examples

### **Complete Page Header**
```html
<div class="flex items-center justify-between">
  <div>
    <h1 class="page-title">Users</h1>
    <p class="secondary-text">Manage user accounts and permissions</p>
  </div>
  <button class="btn-text-primary px-4 py-2 rounded-lg">
    Add User
  </button>
</div>
```

### **Data Table Example**
```html
<table class="w-full">
  <thead>
    <tr>
      <th class="table-header px-6 py-3">Name</th>
      <th class="table-header px-6 py-3">Email</th>
      <th class="table-header px-6 py-3">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="table-cell px-6 py-4">John Smith</td>
      <td class="table-cell px-6 py-4">john@example.com</td>
      <td class="table-cell px-6 py-4">Admin</td>
    </tr>
  </tbody>
</table>
```

### **Form Example**
```html
<div class="space-y-4">
  <div>
    <label class="label-text">Email Address</label>
    <input class="input-text w-full px-3 py-2 border rounded" 
           type="email" 
           placeholder="Enter email">
    <span class="help-text">We'll never share your email</span>
  </div>
  <div class="flex space-x-3">
    <button class="btn-text-primary px-4 py-2 rounded">Save</button>
    <button class="btn-text-secondary px-4 py-2 rounded">Cancel</button>
  </div>
</div>
```

---

## 🔧 Technical Implementation

The typography system is implemented through:

1. **CSS Custom Properties**: Consistent values across the system
2. **Modular CSS**: Separate typography.css file for maintainability  
3. **Inheritance**: Base styles that components can extend
4. **Responsive Design**: Mobile-first approach with breakpoint adjustments

This system ensures that all current and future components maintain consistent typography while being easy to maintain and update.
