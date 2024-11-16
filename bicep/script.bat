
Connect-AzAccount
Set-AzContext -SubscriptionId 13ed8a1c-5393-411b-9928-8a8cbe4c6ff2
New-AzResourceGroup -Name rg-legoaichat -Location 'australiaeast'
New-AzResourceGroupDeployment -ResourceGroupName rg-legoaichat -TemplateFile .\azuredeploy.bicep -TemplateParameterFile .\azuredeploy.parameters.json -c

