const request = require('request').defaults({
  gzip: true
});
const fs = require('fs');
const names = require('./names');
const log = require('./util/log');

// How many entries you want
const ENTRIES = 1;
// YYYY-MM-DD
const dateOfBirth = '1984-08-08';
// What number you want the emails to start on
const startingIndex = 9999;
// Change email on line 47

function formatProxy(proxy) {
  if (proxy && ['localhost', ''].indexOf(proxy) < 0) {
    proxy = proxy.replace(' ', '_');
    const proxySplit = proxy.split(':');
    if (proxySplit.length > 3)
      return "http://" + proxySplit[2] + ":" + proxySplit[3] + "@" + proxySplit[0] + ":" + proxySplit[1];
    else
      return "http://" + proxySplit[0] + ":" + proxySplit[1];
  } else
    return undefined;
}

function main() {

  const proxyInput = fs.readFileSync('proxies.txt').toString().split('\n');
  const proxyList = [];
  for (let p = 0; p < proxyInput.length; p++) {
    proxyInput[p] = proxyInput[p].replace('\r', '').replace('\n', '');
    if (proxyInput[p] != '')
      proxyList.push(proxyInput[p]);
  }

  log('Found ' + proxyList.length + ' proxies.', 'success', 'Proxies');

  for (let i = startingIndex; i < startingIndex + ENTRIES; i++) {
    /*
    For the email, leave ${i} where you want the number to appear

    If you want to use the gmail + method you can do something like this  ->  ultraboost+${i}@gmail.com
    If you have a catchall domain, you don't need a + , like this         ->  ultraboost${i}@customdomain.com
    */
    const email = `futureCraft+${i}@gmail.com`

    request({
      method: 'POST',
      url: 'http://www.adidas.com/com/apps/carbonss17/application/crm.php',
      json: true,
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.8',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Host': 'www.adidas.com',
        'Origin': 'https://www.adidas.com',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19'
      },
      formData: {
        firstName: names[Math.floor((Math.random() * 2000) + 1)],
        lastName: names[Math.floor((Math.random() * 2000) + 1)],
        dateOfBirth: dateOfBirth,
        email: email,
        market: 'US'
      }
    }, (err, resp, body) => {
      if (err) {
        log('Error when entering: ' + err, 'error', 'Creator');
      } else if (resp.statusCode != 200) {
        log('Got bad response code ' + resp.statusCode, 'warning', 'Creator');
      } else {
        try {
          if (body.conditionCodeParameter.parameter[0].name == 'Consumer successfully registered and subscribed for the given newsletter type id Email Sent') {
            log("Successfully Registed Account (" + email + ")", 'success', 'Creator');
          } else {
            log("Failed to Create Account", 'error', 'Creator');
          }
        } catch (err) {
          log('Invalid JSON response (Probably Banned/Blocked)');
        };
      };
    });
  }
}

main();
