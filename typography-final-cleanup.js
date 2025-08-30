#!/usr/bin/env node

/**
 * Typography Final Cleanup Script
 * Handles the remaining context-sensitive typography fixes
 */

const fs = require('fs');
const path = require('path');

class TypographyFinalCleanup {
    constructor() {
        this.srcPath = path.join(__dirname, 'src');
        this.fixes = [];
    }

    /**
     * Apply specific targeted fixes for remaining issues
     */
    applyFinalFixes() {
        console.log('🔧 Applying final typography fixes...\n');
        
        // Define specific replacements for common patterns
        const specificFixes = [
            // Form labels
            {
                pattern: /class="block text-sm font-medium text-gray-700 mb-1"/g,
                replacement: 'class="label-text text-gray-700 mb-1"',
                description: 'Form labels'
            },
            {
                pattern: /class="block text-sm font-medium text-gray-700 mb-2"/g,
                replacement: 'class="label-text text-gray-700 mb-2"',
                description: 'Form labels with mb-2'
            },
            {
                pattern: /class="block text-sm font-medium text-gray-500 mb-1"/g,
                replacement: 'class="label-text text-gray-500 mb-1"',
                description: 'Secondary form labels'
            },
            {
                pattern: /class="block text-sm font-medium text-gray-500 mb-2"/g,
                replacement: 'class="label-text text-gray-500 mb-2"',
                description: 'Secondary form labels with mb-2'
            },
            
            // Error messages
            {
                pattern: /class="text-red-600 text-sm mt-1"/g,
                replacement: 'class="error-text mt-1"',
                description: 'Error messages'
            },
            
            // Table cells and headers
            {
                pattern: /class="text-sm font-medium text-gray-900"/g,
                replacement: 'class="table-cell font-medium text-gray-900"',
                description: 'Table cells'
            },
            {
                pattern: /class="px-6 py-4 whitespace-nowrap text-sm font-medium"/g,
                replacement: 'class="px-6 py-4 whitespace-nowrap table-cell font-medium"',
                description: 'Table cell with padding'
            },
            {
                pattern: /class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"/g,
                replacement: 'class="px-6 py-4 whitespace-nowrap text-right table-cell font-medium"',
                description: 'Right-aligned table cells'
            },
            
            // Button improvements (already have btn-text-primary but need text-sm removed)
            {
                pattern: /class="btn-text-primary ([^"]*?)text-sm font-medium([^"]*)"/g,
                replacement: 'class="btn-text-primary $1$2"',
                description: 'Button text cleanup'
            },
            
            // Status badges
            {
                pattern: /class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"/g,
                replacement: 'class="inline-flex items-center px-3 py-1 rounded-full badge-text bg-orange-100 text-orange-800"',
                description: 'Status badges'
            },
            
            // Card titles and section headers
            {
                pattern: /class="text-base font-medium text-gray-900"/g,
                replacement: 'class="component-header text-gray-900"',
                description: 'Component headers'
            },
            {
                pattern: /class="text-base font-medium text-\[#2c4170\]"/g,
                replacement: 'class="component-header text-[#2c4170]"',
                description: 'Branded component headers'
            },
            
            // Form section headers
            {
                pattern: /class="text-sm font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2"/g,
                replacement: 'class="form-section-header text-gray-900 mb-4 border-b border-gray-200 pb-2"',
                description: 'Form section headers'
            },
            {
                pattern: /class="text-sm font-medium text-\[#2c4170\] mb-4 border-b border-gray-200 pb-2"/g,
                replacement: 'class="form-section-header text-[#2c4170] mb-4 border-b border-gray-200 pb-2"',
                description: 'Branded form section headers'
            },
            
            // User detail labels (specific to user detail component)
            {
                pattern: /class="text-sm font-medium text-gray-500"/g,
                replacement: 'class="detail-label text-gray-500"',
                description: 'Detail labels'
            },
            
            // Navigation and menu items
            {
                pattern: /class="text-sm font-medium text-gray-500"/g,
                replacement: 'class="nav-text text-gray-500"',
                description: 'Navigation text'
            },
            
            // Input fields with common patterns
            {
                pattern: /class="([^"]*?)border border-gray-300 rounded-lg px-3 py-2 text-sm([^"]*)"/g,
                replacement: 'class="$1input-text border border-gray-300 rounded-lg px-3 py-2$2"',
                description: 'Input fields'
            },
            
            // Button variations that still have text-white but need btn-text-primary
            {
                pattern: /class="text-white px-3 py-1\.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium"/g,
                replacement: 'class="btn-text-primary px-3 py-1.5 rounded-lg hover:opacity-90 transition-all"',
                description: 'Small buttons'
            },
            {
                pattern: /class="text-white px-3 py-1 rounded text-xs font-medium hover:opacity-90 transition-all"/g,
                replacement: 'class="btn-text-primary px-3 py-1 rounded hover:opacity-90 transition-all"',
                description: 'Very small buttons'
            },
            
            // Special login text
            {
                pattern: /class="text-base lg:text-lg text-blue-100 mb-6 leading-relaxed break-words"/g,
                replacement: 'class="hero-text lg:hero-text text-blue-100 mb-6 leading-relaxed break-words"',
                description: 'Hero text on login'
            },
            
            // Dashboard metric text
            {
                pattern: /class="text-sm font-medium"/g,
                replacement: 'class="metric-label"',
                description: 'Dashboard metrics'
            },
            {
                pattern: /class="text-sm font-medium text-blue-600"/g,
                replacement: 'class="metric-label text-blue-600"',
                description: 'Blue dashboard metrics'
            },
            {
                pattern: /class="text-sm font-medium hover:opacity-90"/g,
                replacement: 'class="metric-label hover:opacity-90"',
                description: 'Interactive dashboard metrics'
            }
        ];

        let totalFiles = 0;
        let totalFixes = 0;

        this.walkDirectory(this.srcPath, (filePath) => {
            if (filePath.endsWith('.component.ts')) {
                const fixes = this.applyFixesToFile(filePath, specificFixes);
                if (fixes > 0) {
                    totalFiles++;
                    totalFixes += fixes;
                    console.log(`✅ Fixed ${fixes} issues in ${path.relative(this.srcPath, filePath)}`);
                }
            }
        });

        console.log(`\n🎉 Final cleanup complete!`);
        console.log(`📊 Applied ${totalFixes} targeted fixes across ${totalFiles} files`);
    }

    /**
     * Apply specific fixes to a file
     */
    applyFixesToFile(filePath, fixes) {
        let content = fs.readFileSync(filePath, 'utf8');
        let fixCount = 0;
        const originalContent = content;

        fixes.forEach(fix => {
            const matches = content.match(fix.pattern);
            if (matches) {
                content = content.replace(fix.pattern, fix.replacement);
                fixCount += matches.length;
            }
        });

        // Only write if changes were made
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
        }

        return fixCount;
    }

    /**
     * Recursively walk through directory
     */
    walkDirectory(dir, callback) {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                this.walkDirectory(fullPath, callback);
            } else {
                callback(fullPath);
            }
        });
    }
}

// Main execution
if (require.main === module) {
    const cleanup = new TypographyFinalCleanup();
    cleanup.applyFinalFixes();
}

module.exports = TypographyFinalCleanup;
