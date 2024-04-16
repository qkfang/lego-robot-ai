
Connect-AzAccount
Set-AzContext -SubscriptionId 3b426915-fcea-4235-bbea-7ff7ffcd1e2b
@REM New-AzResourceGroup -Name rg-lego-robot -Location 'eastus'
New-AzResourceGroupDeployment -ResourceGroupName rg-lego-robot -TemplateFile .\azuredeploy.bicep -TemplateParameterFile .\azuredeploy.parameters.json -c

