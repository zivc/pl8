const API_PATH = 'https://www.plates4less.co.uk/scripts/supersearch/GetSearchResults42.asp';

const API_HEADERS = {
   "accept": "text/plain",
   "accept-language": "en-US,en;q=0.9",
   "cache-control": "no-cache",
   "content-type": "application/x-www-form-urlencoded",
   "pragma": "no-cache",
   "sec-fetch-dest": "empty",
   "sec-fetch-mode": "cors",
   "sec-fetch-site": "same-origin",
   "x-requested-with": "XMLHttpRequest",
   "cookie": "_ga=GA1.3.1662382390.1602520723; _gid=GA1.3.85870595.1609354320; ASPSESSIONIDAWSSBBDB=ACDHIEFCMIIOBOKLLIIJOEPD; _gat=1"
};

const API_OPTS = {
   "headers": API_HEADERS,
   "referrer": "https://www.plates4less.co.uk/",
   "referrerPolicy": "strict-origin-when-cross-origin",
   "body": '',
   "method": "POST",
   "mode": "cors"
};

module.exports = {
   API_PATH,
   API_HEADERS,
   API_OPTS
}
