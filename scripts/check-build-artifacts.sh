#!/bin/bash

# Check for build artifacts in src/ folders (should never happen)
echo "🔍 Checking for misplaced build artifacts in src/ folders..."

FOUND_ARTIFACTS=$(find packages/*/src apps/*/src -name "*.js" -o -name "*.d.ts" -o -name "*.js.map" -o -name "*.d.ts.map" 2>/dev/null)

if [ -z "$FOUND_ARTIFACTS" ]; then
    echo "✅ No build artifacts found in src/ folders - all good!"
    exit 0
else
    echo "❌ Found build artifacts in src/ folders:"
    echo "$FOUND_ARTIFACTS"
    echo ""
    echo "💡 These files should be in dist/ folders instead."
    echo "Run 'pnpm run clean' and then 'pnpm run build' to fix this."
    exit 1
fi
