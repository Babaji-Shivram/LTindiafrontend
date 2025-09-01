# Listing Page Design Standards

This document defines the consistent design standards for all listing pages across the LT India ERP platform.

## Typography Standards

### Page Title
- **Font Size**: `text-lg` (18px)
- **Font Weight**: `font-bold` (700)
- **Color**: `text-gray-900` (#111827)
- **Line Height**: 1.75rem

### Page Subtitle
- **Font Size**: `text-sm` (14px)
- **Font Weight**: `font-normal` (400)
- **Color**: `text-gray-600` (#4B5563)

### Table Headers
- **Font Size**: `text-xs` (12px)
- **Font Weight**: `font-medium` (500)
- **Color**: `text-gray-500` (#6B7280)
- **Transform**: `uppercase`
- **Letter Spacing**: `tracking-wider`

### Table Data
- **Primary Text**: `text-sm` (14px), `font-medium` (500), `text-gray-900` (#111827)
- **Secondary Text**: `text-sm` (14px), `font-normal` (400), `text-gray-500` (#6B7280)
- **Tertiary Text**: `text-xs` (12px), `font-normal` (400), `text-gray-400` (#9CA3AF)

### Form Inputs
- **Font Size**: `text-sm` (14px)
- **Font Weight**: `font-normal` (400)

### Buttons
- **Font Size**: `text-sm` (14px)
- **Font Weight**: `font-medium` (500)

## Spacing Standards

### Container Spacing
- **Main Container**: `space-y-6` (24px vertical spacing between sections)
- **Section Padding**: `p-4` (16px all around) for filter sections
- **Table Cell Padding**: `px-6 py-4` (24px horizontal, 16px vertical)
- **Table Header Padding**: `px-6 py-3` (24px horizontal, 12px vertical)

### Element Spacing
- **Button Spacing**: `space-x-2` (8px) between action buttons
- **Filter Element Spacing**: `space-x-4` (16px) between filter elements
- **Icon and Text Spacing**: `mr-2` (8px) between icons and text in buttons

### Margins
- **Icon to Text**: `mr-2` or `ml-2` (8px)
- **Status Badge**: `ml-2` (8px) from previous element
- **Empty State Content**: `mt-2`, `mt-1`, `mt-6` as specified

## Color Standards

### Primary Brand Color
- **Background**: `#2c4170` (custom blue)
- **Hover**: Use `hover:opacity-90` for primary buttons

### Status Colors
- **Active/Success**: `bg-green-100 text-green-800`
- **Inactive/Error**: `bg-red-100 text-red-800`
- **Warning**: `bg-yellow-100 text-yellow-800`
- **Info**: `bg-blue-100 text-blue-800`
- **Purple/Special**: `bg-purple-100 text-purple-800`

### Action Button Colors
- **View**: `text-gray-600 hover:text-gray-900 hover:bg-gray-50`
- **Edit**: `text-blue-600 hover:text-blue-900 hover:bg-blue-50`
- **Delete**: `text-red-600 hover:text-red-900 hover:bg-red-50`
- **Special Action**: `text-purple-600 hover:text-purple-900 hover:bg-purple-50`

### Background Colors
- **Page Background**: Default (typically white or gray-50)
- **Card Background**: `bg-white`
- **Table Header**: `bg-gray-50`
- **Hover Row**: `hover:bg-gray-50`
- **Selected Row**: `bg-blue-50`
- **Inactive Row**: `bg-red-50`

## Icon Standards

### Standard Icons (SVG)
All icons should be:
- **Size**: `w-4 h-4` (16px) for buttons and inline icons
- **Size**: `w-5 h-5` (20px) for larger context icons
- **Size**: `w-12 h-12` (48px) for empty state icons
- **Fill**: `currentColor` to inherit text color

### Common Icons
- **Add/Plus**: Plus icon with fill-rule="evenodd"
- **Search**: Magnifying glass with path
- **Edit**: Pencil icon
- **View**: Eye icon
- **Delete**: Trash icon
- **Refresh**: Rotating arrows
- **Sort**: Triangle indicators (up/down)
- **Navigation**: Chevron arrows

### Icon Placement
- **Before Text**: `mr-2` (8px margin right)
- **After Text**: `ml-2` (8px margin left)
- **Button Icons**: Centered with proper padding

## Layout Standards

### Page Header Structure
```html
<div class="flex items-center justify-between">
  <div>
    <h1 class="text-lg font-bold text-gray-900">[Page Title]</h1>
    <p class="text-sm text-gray-600">[Page Description]</p>
  </div>
  <button style="background-color: #2c4170;" 
          class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium">
    [Add Button]
  </button>
</div>
```

### Filter Section Structure
```html
<div class="bg-white rounded-lg shadow border border-gray-200 p-4">
  <div class="flex items-center space-x-4">
    <!-- Search input with icon -->
    <!-- Filter dropdowns -->
    <!-- Action buttons -->
  </div>
</div>
```

### Table Structure
```html
<div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-gray-50">
        <!-- Header row with proper styling -->
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <!-- Data rows with hover and selection states -->
      </tbody>
    </table>
  </div>
</div>
```

### Pagination Structure
```html
<div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
  <div class="flex items-center justify-between">
    <!-- Mobile pagination -->
    <!-- Desktop pagination with page numbers -->
  </div>
</div>
```

## Interactive States

### Button States
- **Default**: Base styling
- **Hover**: `hover:opacity-90` for primary, `hover:bg-gray-50` for secondary
- **Disabled**: `disabled:bg-gray-100 disabled:text-gray-400`
- **Focus**: `focus:ring-2 focus:ring-blue-500 focus:border-transparent`

### Table Row States
- **Default**: `bg-white`
- **Hover**: `hover:bg-gray-50 transition-colors`
- **Selected**: `bg-blue-50`
- **Inactive/Deleted**: `bg-red-50`

### Form Input States
- **Default**: `border-gray-300`
- **Focus**: `focus:ring-2 focus:ring-blue-500 focus:border-transparent`
- **Error**: `border-red-300 focus:ring-red-500`

## Responsive Design

### Breakpoints
- **Mobile**: Base styles, stack elements vertically
- **Tablet**: `sm:` prefix (640px+)
- **Desktop**: `lg:` prefix (1024px+)

### Mobile Adaptations
- Hide complex pagination on mobile, show simple Previous/Next
- Stack filter elements vertically
- Adjust table column visibility
- Reduce padding and margins appropriately

## Animation Standards

### Transitions
- **Default**: `transition-colors` for color changes
- **All Properties**: `transition-all` for comprehensive changes
- **Duration**: Default browser duration (typically 150ms)

### Hover Effects
- **Opacity**: `hover:opacity-90` for buttons
- **Background**: `hover:bg-gray-50` for interactive elements
- **Transform**: `hover:scale-105` sparingly for special elements

## Accessibility Standards

### Semantic HTML
- Use proper heading hierarchy
- Use button elements for interactive actions
- Use form labels and proper input types

### ARIA Labels
- Provide `title` attributes for icon buttons
- Use `aria-label` for screen readers when needed
- Maintain focus management for keyboard navigation

### Color Contrast
- Ensure minimum 4.5:1 contrast ratio for normal text
- Ensure minimum 3:1 contrast ratio for large text
- Don't rely solely on color to convey information

## Implementation Checklist

For each new listing page, ensure:

- [ ] Typography matches the defined standards
- [ ] Spacing follows the established patterns
- [ ] Colors use the standard palette
- [ ] Icons are consistent size and style
- [ ] Layout follows the standard structure
- [ ] Interactive states are properly implemented
- [ ] Responsive design is applied
- [ ] Animations are consistent
- [ ] Accessibility requirements are met
- [ ] Empty and loading states are included
- [ ] Error handling is consistent

## Usage Examples

### Standard Filter Input
```html
<div class="relative flex-1 max-w-md">
  <input 
    type="text" 
    placeholder="Search..." 
    class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
  <svg class="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
    <!-- Search icon path -->
  </svg>
</div>
```

### Standard Action Button
```html
<button 
  class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors" 
  title="Edit">
  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <!-- Edit icon path -->
  </svg>
</button>
```

### Standard Status Badge
```html
<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
  Active
</span>
```

This standardization ensures a consistent user experience across all listing pages in the platform.
