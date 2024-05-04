
https://www.bricklink.com/catalogList.asp?pg=6&catString=36&catType=P



var list = $('.catalog-list__body-main tr');
var jsonList = [];
for(var i=0;i<list.length;i++)
{
	var row = list[i];
	var json = {}
	json.image = $(row).find('img').attr('src');
	json.itemno = $(row).find('td')[1].innerText.trim();
	json.category = $($(row).find('td')[2]).find('strong')[0]?.innerText;
	json.name = $($(row).find('td')[2]).find('font')[0]?.innerText?.replace('\n','');
	jsonList.push(json);	
}

jsonList ; 

JSON.stringify(jsonList);


