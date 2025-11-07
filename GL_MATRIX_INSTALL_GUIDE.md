# gl-matrix Installation Guide

## Issue
The npm registry is blocking access to `gl-matrix` with a 403 error. This is typically caused by:
- Network/firewall restrictions
- Corporate proxy settings
- Security policies blocking npm registry access
- VPN or network configuration issues

## Solutions

### Option 1: Check Network/Proxy Settings
```bash
# Check npm configuration
npm config list

# If you're behind a proxy, configure it:
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Or remove proxy if not needed:
npm config delete proxy
npm config delete https-proxy
```

### Option 2: Use a Different Registry (Temporary)
```bash
# Try using a different npm registry mirror
npm install gl-matrix --registry https://registry.npmmirror.com

# Or use yarn/pnpm if available
yarn add gl-matrix
# or
pnpm add gl-matrix
```

### Option 3: Manual Installation
1. Download the package manually from npmjs.com
2. Extract it to `node_modules/gl-matrix`
3. Or use `npm pack` and install from tarball

### Option 4: Contact IT/Network Admin
If you're in a corporate environment, contact your IT department to:
- Whitelist `registry.npmjs.org` in firewall
- Configure proxy settings for npm
- Allow access to npm registry

### Option 5: Use Alternative Package
If gl-matrix cannot be installed, we can modify the InfiniteMenu component to use an alternative math library or implement the matrix operations differently.

## Current Status
- ✅ Project builds and runs successfully
- ✅ All other dependencies installed correctly
- ⚠️ InfiniteMenu requires gl-matrix (currently showing fallback)
- ✅ ProjectsFallback component displays installation instructions

## Next Steps
Once gl-matrix is installed:
1. Restore InfiniteMenu: `mv components/InfiniteMenu.tsx.backup components/InfiniteMenu.tsx`
2. Update PastProjects to use InfiniteMenuWrapper
3. Rebuild: `npm run build`

