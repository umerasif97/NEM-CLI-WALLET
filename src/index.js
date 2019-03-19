"use strict";
exports.__esModule = true;
var nem_library_1 = require("nem-library");
nem_library_1.NEMLibrary.bootstrap(nem_library_1.NetworkTypes.TEST_NET);
exports.MOSAIC_NAME = 'coin';
//for making account
exports.createSimpleWallet = function (password) {
    var pass = new nem_library_1.Password(password);
    return nem_library_1.SimpleWallet.create(exports.MOSAIC_NAME + '-wallet', pass);
};
exports.getAccountBalances = function (account) {
    return new Promise(function (resolve, reject) {
        var accountHttp = new nem_library_1.AccountHttp();
        accountHttp.getAssetsOwnedByAddress(account.address).subscribe(function (assets) {
            resolve(assets);
        }, function (err) {
            reject(err);
        });
    });
};
exports.mosaicBalance = function (balances) {
    var found = balances.find(function (assets) {
        return assets.assetId.name == exports.MOSAIC_NAME;
    });
    if (!found)
        return 0;
    return found.quantity;
};
exports.xemBalance = function (balances) {
    var xemMosaic = balances.find(function (assets) {
        return assets.assetId.name == 'xem';
    });
    if (!xemMosaic)
        return 0;
    return xemMosaic.quantity;
};
// const firstWallet = createSimpleWallet('12myfirstwallet24');
// console.log(firstWallet);
// const myAccount = firstWallet.open(new Password('12myfirstwallet24'));
// console.log(myAccount);
//For viewing transactions of account
// const accountHttp = new AccountHttp();
// const address = new Address('NAFUNDEULL67VO7WCJBGBHCLCMD5KEH5EI7G5SGR');
// accountHttp.allTransactions(address)
//     .subscribe(allTransactions => {
//         console.log(allTransactions);
//     });
