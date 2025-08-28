# 🚀 Frontend Deployment Automation

This directory contains automation scripts for deploying tested features from the development repository to the production repository.

## 📁 Repository Structure

- **Development Repo**: `Gogulancode/LT-India-frontend` (this repo)
- **Production Repo**: `Babaji-Shivram/LiveTracking_India_Version_2.0/frontend`

## 🛠️ Available Scripts

### 1. `deploy.bat` - Quick Deployment (Recommended)

**Simple one-command deployment:**

```batch
deploy.bat "Your commit message here"
```

**Examples:**
```batch
deploy.bat "Add role detail master system"
deploy.bat "Fix dashboard console errors"
deploy.bat "Implement user management features"
```

### 2. `deploy-to-production.ps1` - Advanced PowerShell Script

**Full deployment with options:**

```powershell
# Basic deployment
.\deploy-to-production.ps1 -CommitMessage "Your commit message"

# Skip local commit (if already committed)
.\deploy-to-production.ps1 -CommitMessage "Update frontend" -SkipLocalCommit

# Test mode (shows what would happen without actually pushing)
.\deploy-to-production.ps1 -CommitMessage "Test deployment" -TestMode
```

## 🔄 Deployment Process

The script automatically:

1. **✅ Commits to Development Repo**
   - Adds all changes
   - Commits with your message
   - Pushes to `Gogulancode/LT-India-frontend`

2. **📁 Copies Files**
   - Copies all source files to production frontend folder
   - Excludes `.git`, `node_modules`, `dist`, `.angular`
   - Maintains clean directory structure

3. **🚀 Commits to Production Repo**
   - Adds frontend changes
   - Commits with descriptive message
   - Pushes to `Babaji-Shivram/LiveTracking_India_Version_2.0`

## ⚡ Quick Usage

For most deployments, just use:

```batch
deploy.bat "Description of what you completed and tested"
```

## 🛡️ Safety Features

- ✅ **Validates paths** before starting
- ✅ **Preserves backend files** (only touches frontend folder)
- ✅ **Removes build artifacts** automatically
- ✅ **Test mode available** for dry runs
- ✅ **Clear error messages** if something goes wrong

## 🎯 Best Practices

1. **Test locally first**: Always test your features before deployment
2. **Meaningful commit messages**: Describe what was completed and tested
3. **Small, focused deployments**: Deploy one feature at a time
4. **Check both repos**: Verify changes appear in both repositories

## 🔍 Troubleshooting

If you encounter issues:

1. **Check paths**: Ensure both repo directories exist at expected locations
2. **Git status**: Make sure you have commit permissions to both repos
3. **Test mode**: Run with `-TestMode` to see what would happen
4. **Manual fallback**: You can always copy files manually if needed

## 📞 Support

If you need to modify paths or add features to the deployment script, the PowerShell script is well-commented and easy to customize.

---

**Happy coding! 🚀**
