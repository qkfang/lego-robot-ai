node --env-file=.env app.js port=4242

docker build --pull --rm -f "DOCKERFILE" -t legoroboapi:latest "."
docker run -d -p 4242:80 --name devguide-backend-api legoroboapi:latest


docker build --pull --rm -f "DOCKERFILE" -t legoroboapi:latest "."
docker tag legoroboapi:latest legorobotregistry.azurecr.io/legoroboapi:v6
docker login legorobotregistry.azurecr.io -u legorobotregistry -p D1yVD7qLi+/PL2sHdgZ6vevvwNvn1LFR2Dz27Pmeb/+ACRCnbYw3
docker push legorobotregistry.azurecr.io/legoroboapi:v6


az login
az account set --subscription 3b426915-fcea-4235-bbea-7ff7ffcd1e2b
az extension add --name containerapp --upgrade
az containerapp up --name legorobot-api --image legorobotregistry.azurecr.io/legoroboapi:v6 --resource-group rg-lego-robot --environment legorobot-containerappenv --ingress external



docker tag legoroboapi:latest legorobotregistry.azurecr.io/legoroboapi:v6
docker login legorobotregistry.azurecr.io -u legorobotregistry -p D1yVD7qLi+/PL2sHdgZ6vevvwNvn1LFR2Dz27Pmeb/+ACRCnbYw3
docker push legorobotregistry.azurecr.io/legoroboapi:v6
az containerapp up --name legorobot-api --image legorobotregistry.azurecr.io/legoroboapi:v6 --resource-group rg-lego-robot --environment legorobot-containerappenv --ingress external

az containerapp update --name legorobot-api --image legorobotregistry.azurecr.io/legoroboapi:v6 --resource-group rg-lego-robot 

