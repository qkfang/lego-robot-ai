#!/bin/sh


echo ""
echo "Restoring frontend npm packages"
echo ""

npm install
if [ $? -ne 0 ]; then
    echo "Failed to restore frontend npm packages"
    exit $?
fi

echo ""
echo "Set environment variable"
echo ""

# export APPSETTING_API_ENDPOINT="https://localhost:4242"
export APPSETTING_API_ENDPOINT="https://legorobot-api.orangecliff-0ad42f82.eastus.azurecontainerapps.io"

echo ""
echo "Building frontend"
echo ""

npm run build
if [ $? -ne 0 ]; then
    echo "Failed to build frontend"
    exit $?
fi

