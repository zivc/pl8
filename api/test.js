const fetch = require('node-fetch');
const qs = require('qs');

fetch("https://www.plates4less.co.uk/scripts/supersearch/GetSearchResults42.asp", {
   "headers": {
      "accept": "text/plain",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      "pragma": "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "_ga=GA1.3.1662382390.1602520723; _gid=GA1.3.869106256.1609970552; plates4less-_zldp=MsrBQVMKNMpvhubte2l4fD%2FKkvRHUHjQNybooFW9xgeJcs%2B%2Fd2heBrfGSy1tcAMcLIm6uYDqJjk%3D; plates4less-_zldt=6d9e24bf-ad0b-49e9-a288-28286aac0f88-0; ASPSESSIONIDCWRRCCDA=MNLDCAFCJMMCKKPCNPNENFFB; ASPSESSIONIDAUTSADDA=FEOGPLBDNPAOPJDBIODPLMGA; _gat=1"
   },
   "referrer": "https://www.plates4less.co.uk/",
   "referrerPolicy": "strict-origin-when-cross-origin",
   "body": qs.stringify({
      x: "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='V' and L3 ='V'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='V' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='V' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='V' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='s' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='x' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='o' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='s' and L2 ='s' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='V' and L3 ='V'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='V' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='V' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='V' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='s' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='x' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='o' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='s' and L2 ='s' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='V' and L3 ='V'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='V' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='V' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='V' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='s' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='x' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='o' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='s' and L2 ='s' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='V' and L3 ='V'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='V' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='V' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='V' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='s' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='x' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='o' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='s' and L2 ='s' and L3 ='s'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?'",
      filters: '10:0SQLSEP10:0SQLSEP10:0SQLSEP10:0SQLSEP10:0SQLSEP10:0SQLSEP10:0SQLSEP10:0SQLSEP10:0SQLSEP10:0SQLSEP10:0SQLSEP100:0SQLSEP100:0SQLSEP100:0SQLSEP100:0SQLSEP100:0SQLSEP100:0SQLSEP100:0SQLSEP100:0SQLSEP100:0SQLSEP100:0SQLSEP100:0SQLSEP110:0SQLSEP110:0SQLSEP110:0SQLSEP110:0SQLSEP110:0SQLSEP110:0SQLSEP110:0SQLSEP110:0SQLSEP110:0SQLSEP110:0SQLSEP110:0SQLSEP10*:0SQLSEP10*:0SQLSEP10*:0SQLSEP10*:0SQLSEP10*:0SQLSEP10*:0SQLSEP10*:0SQLSEP10*:0SQLSEP10*:0SQLSEP10*:0SQLSEP10*:0',
      Table: 'tbPre',
      SearchCode: '3PStartt01',
      SupplierOrder: 'undefined',
      IncludeAllSellersPlates: '1',
      IncludeAllDealersPlates: '1',
      pageSize: '20',
      MaxResults: '50000'
   }, {format: 'RFC1738'}),
   "method": "POST",
   "mode": "cors"
})
   .then(response => response.json())
   .then(res => console.log(res));


/*

select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='V' and L3 ='V'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='V' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='V' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='V' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='x' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='o' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='V' and L2 ='s' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='x' and L2 ='x' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='o' and L2 ='o' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10' and L1 ='s' and L2 ='s' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '10'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='V' and L3 ='V'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='V' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='V' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='V' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='x' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='o' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='V' and L2 ='s' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='x' and L2 ='x' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='o' and L2 ='o' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100' and L1 ='s' and L2 ='s' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '100'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='V' and L3 ='V'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='V' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='V' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='V' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='x' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='o' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='V' and L2 ='s' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='x' and L2 ='x' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='o' and L2 ='o' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110' and L1 ='s' and L2 ='s' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '110'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='V' and L3 ='V'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='V' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='V' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='V' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='x' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='o' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='V' and L2 ='s' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='x' and L2 ='x' and L3 ='x'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='o' and L2 ='o' and L3 ='o'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?' and L1 ='s' and L2 ='s' and L3 ='s'
SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '10?'

 */
