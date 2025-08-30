#!/usr/bin/env node

/**
 * LT India ERP - Typography Migration Script
 * 
 * This script helps identify and optionally fix typography inconsistencies
 * across the Angular components in the ERP system.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TypographyMigrator {
    constructor() {
        this.srcPath = path.join(__dirname, 'src');
        this.inconsistencies = [];
        this.fixes = [];
        
        // Define mapping of old Tailwind classes to new typography classes
        this.classMap = {
            // Headers
            'text-3xl font-bold': 'page-title',
            'text-2xl font-bold': 'page-title', 
            'text-xl font-bold': 'page-title',
            'text-lg font-semibold': 'section-header',
            'text-lg font-bold': 'section-header',
            'text-base font-semibold': 'component-header',
            'text-base font-bold': 'component-header',
            
            // Content
            'text-base': 'body-text',
            'text-sm': 'body-text',
            'text-xs': 'secondary-text',
            
            // Buttons (context-sensitive)
            'text-sm font-medium': 'btn-text-primary', // Will need manual review
            'text-white px-4 py-2': 'btn-text-primary px-4 py-2',
            'text-gray-600': 'btn-text-secondary',
            
            // Tables
            'text-xs font-medium text-gray-500 uppercase': 'table-header',
            'text-sm text-gray-900': 'table-cell',
            'text-sm text-gray-500': 'table-cell text-gray-500',
            
            // Forms
            'text-sm border': 'input-text border',
            'text-sm rounded': 'input-text rounded',
        };
        
        this.patterns = [
            // Headers
            /class="[^"]*text-(3xl|2xl|xl|lg)\s+font-(bold|semibold)[^"]*"/g,
            
            // Generic text sizes without typography classes
            /class="[^"]*text-(base|sm|xs)(?!\w)[^"]*"/g,
            
            // Font weight without typography classes
            /class="[^"]*font-(bold|semibold|medium)(?!\w)[^"]*"/g,
            
            // Button patterns
            /class="[^"]*text-(white|gray-\d+)\s+px-\d+\s+py-\d+[^"]*"/g,
            
            // Table patterns
            /class="[^"]*text-xs\s+font-medium\s+text-gray-500\s+uppercase[^"]*"/g,
        ];
    }

    /**
     * Scan all TypeScript component files for typography inconsistencies
     */
    scanForInconsistencies() {
        console.log('🔍 Scanning for typography inconsistencies...\n');
        
        this.walkDirectory(this.srcPath, (filePath) => {
            if (filePath.endsWith('.component.ts')) {
                this.analyzeFile(filePath);
            }
        });

        this.generateReport();
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

    /**
     * Analyze individual file for typography issues
     */
    analyzeFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(this.srcPath, filePath);
        
        // Find all class attributes
        const classMatches = content.match(/class="[^"]*"/g);
        if (!classMatches) return;

        classMatches.forEach((classAttr, index) => {
            // Check for typography inconsistencies
            this.checkForInconsistencies(classAttr, relativePath, index);
        });
    }

    /**
     * Check for specific typography inconsistencies
     */
    checkForInconsistencies(classAttr, filePath, index) {
        const issues = [];
        
        // Check for old header patterns
        if (/text-(3xl|2xl|xl)\s+font-bold/.test(classAttr)) {
            issues.push({
                type: 'header',
                current: classAttr,
                suggested: classAttr.replace(/text-(3xl|2xl|xl)\s+font-bold/, 'page-title'),
                severity: 'high'
            });
        }
        
        if (/text-lg\s+font-(semibold|bold)/.test(classAttr)) {
            issues.push({
                type: 'section-header',
                current: classAttr,
                suggested: classAttr.replace(/text-lg\s+font-(semibold|bold)/, 'section-header'),
                severity: 'high'
            });
        }

        // Check for inconsistent text sizes
        if (/text-(base|sm)\s+(?!text-)/.test(classAttr) && !/(body-text|secondary-text|table-cell|input-text)/.test(classAttr)) {
            issues.push({
                type: 'text-size',
                current: classAttr,
                suggested: `Consider using body-text or secondary-text`,
                severity: 'medium'
            });
        }

        // Check for button patterns
        if (/text-white.*px-\d+.*py-\d+/.test(classAttr) && !/btn-text-primary/.test(classAttr)) {
            issues.push({
                type: 'button',
                current: classAttr,
                suggested: classAttr.replace(/text-white/, 'btn-text-primary'),
                severity: 'medium'
            });
        }

        // Check for table patterns
        if (/text-xs\s+font-medium\s+text-gray-500\s+uppercase/.test(classAttr) && !/table-header/.test(classAttr)) {
            issues.push({
                type: 'table-header',
                current: classAttr,
                suggested: classAttr.replace(/text-xs\s+font-medium\s+text-gray-500\s+uppercase/, 'table-header'),
                severity: 'high'
            });
        }

        if (issues.length > 0) {
            this.inconsistencies.push({
                file: filePath,
                issues: issues,
                line: index + 1
            });
        }
    }

    /**
     * Generate comprehensive report
     */
    generateReport() {
        console.log('📊 TYPOGRAPHY INCONSISTENCY REPORT');
        console.log('=====================================\n');

        if (this.inconsistencies.length === 0) {
            console.log('✅ No typography inconsistencies found! Your codebase is following the typography guidelines.');
            return;
        }

        // Group by severity
        const high = this.inconsistencies.filter(i => i.issues.some(issue => issue.severity === 'high'));
        const medium = this.inconsistencies.filter(i => i.issues.some(issue => issue.severity === 'medium'));
        const low = this.inconsistencies.filter(i => i.issues.some(issue => issue.severity === 'low'));

        console.log(`🔴 HIGH Priority: ${high.length} files`);
        console.log(`🟡 MEDIUM Priority: ${medium.length} files`);
        console.log(`🟢 LOW Priority: ${low.length} files\n`);

        // Detailed breakdown
        console.log('🔴 HIGH PRIORITY ISSUES (Should fix immediately):');
        console.log('================================================');
        high.forEach(this.printFileIssues.bind(this));

        console.log('\n🟡 MEDIUM PRIORITY ISSUES (Should fix soon):');
        console.log('=============================================');
        medium.forEach(this.printFileIssues.bind(this));

        if (low.length > 0) {
            console.log('\n🟢 LOW PRIORITY ISSUES (Can fix later):');
            console.log('=======================================');
            low.forEach(this.printFileIssues.bind(this));
        }

        this.printSummaryAndRecommendations();
    }

    /**
     * Print issues for a specific file
     */
    printFileIssues(fileIssue) {
        console.log(`\n📄 ${fileIssue.file}`);
        fileIssue.issues.forEach((issue, index) => {
            console.log(`   ${index + 1}. [${issue.type.toUpperCase()}] ${issue.severity.toUpperCase()}`);
            console.log(`      Current:   ${issue.current}`);
            console.log(`      Suggested: ${issue.suggested}`);
        });
    }

    /**
     * Print summary and recommendations
     */
    printSummaryAndRecommendations() {
        console.log('\n📋 SUMMARY & RECOMMENDATIONS');
        console.log('=============================');

        const typeCount = {};
        this.inconsistencies.forEach(fileIssue => {
            fileIssue.issues.forEach(issue => {
                typeCount[issue.type] = (typeCount[issue.type] || 0) + 1;
            });
        });

        console.log('\n📈 Issues by type:');
        Object.entries(typeCount)
            .sort(([,a], [,b]) => b - a)
            .forEach(([type, count]) => {
                console.log(`   ${type}: ${count} occurrences`);
            });

        console.log('\n💡 NEXT STEPS:');
        console.log('1. Fix HIGH priority issues first (headers, table headers)');
        console.log('2. Update button classes to use btn-text-primary/secondary');
        console.log('3. Replace text-sm/text-xs with body-text/secondary-text');
        console.log('4. Run this script again to verify fixes');
        console.log('5. Refer to TYPOGRAPHY-GUIDELINES.md for detailed examples');
        
        console.log('\n🔧 AUTO-FIX COMMAND:');
        console.log('To automatically fix many of these issues, run:');
        console.log('node typography-migration.js --fix');
    }

    /**
     * Auto-fix common typography issues
     */
    autoFix() {
        console.log('🔧 Auto-fixing typography issues...\n');
        
        let totalFiles = 0;
        let totalFixes = 0;

        this.walkDirectory(this.srcPath, (filePath) => {
            if (filePath.endsWith('.component.ts')) {
                const fixes = this.fixFile(filePath);
                if (fixes > 0) {
                    totalFiles++;
                    totalFixes += fixes;
                    console.log(`✅ Fixed ${fixes} issues in ${path.relative(this.srcPath, filePath)}`);
                }
            }
        });

        console.log(`\n🎉 Auto-fix complete!`);
        console.log(`📊 Fixed ${totalFixes} issues across ${totalFiles} files`);
        console.log(`\n⚠️  Please review the changes and test your application.`);
        console.log(`Some manual fixes may still be needed for context-sensitive cases.`);
    }

    /**
     * Fix typography issues in a single file
     */
    fixFile(filePath) {
        let content = fs.readFileSync(filePath, 'utf8');
        let fixes = 0;
        const originalContent = content;

        // Apply fixes in order of priority
        const replacements = [
            // High priority fixes
            [/class="([^"]*?)text-3xl\s+font-bold([^"]*)"/g, 'class="$1page-title$2"'],
            [/class="([^"]*?)text-2xl\s+font-bold([^"]*)"/g, 'class="$1page-title$2"'],
            [/class="([^"]*?)text-lg\s+font-semibold([^"]*)"/g, 'class="$1section-header$2"'],
            [/class="([^"]*?)text-lg\s+font-bold([^"]*)"/g, 'class="$1section-header$2"'],
            
            // Table headers
            [/class="([^"]*?)text-xs\s+font-medium\s+text-gray-500\s+uppercase\s+tracking-wider([^"]*)"/g, 'class="$1table-header uppercase tracking-wider$2"'],
            
            // Button primary (be careful with context)
            [/class="([^"]*?)text-white\s+px-4\s+py-2([^"]*)"/g, 'class="$1btn-text-primary px-4 py-2$2"'],
            
            // Form inputs
            [/class="([^"]*?)px-\d+\s+py-\d+.*?border.*?rounded.*?text-sm([^"]*)"/g, (match, before, after) => {
                if (match.includes('input') || match.includes('border')) {
                    return `class="${before}input-text ${match.match(/px-\d+\s+py-\d+.*?border.*?rounded/)[0]}${after}"`;
                }
                return match;
            }],
        ];

        replacements.forEach(([pattern, replacement]) => {
            const beforeCount = content.split(pattern).length - 1;
            content = content.replace(pattern, replacement);
            const afterCount = content.split(pattern).length - 1;
            fixes += beforeCount - afterCount;
        });

        // Only write if changes were made
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
        }

        return fixes;
    }
}

// Main execution
if (require.main === module) {
    const migrator = new TypographyMigrator();
    
    const args = process.argv.slice(2);
    
    if (args.includes('--fix')) {
        migrator.autoFix();
    } else {
        migrator.scanForInconsistencies();
    }
}

module.exports = TypographyMigrator;
