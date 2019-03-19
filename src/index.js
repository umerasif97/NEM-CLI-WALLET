"use strict";
exports.__esModule = true;
var nem_library_1 = require("nem-library");
nem_library_1.NEMLibrary.bootstrap(nem_library_1.NetworkTypes.MAIN_NET);
exports.MOSAIC_NAME = 'coin';
//for making account
exports.createSimpleWallet = function (password) {
    var pass = new nem_library_1.Password(password);
    return nem_library_1.SimpleWallet.create(exports.MOSAIC_NAME + '-wallet', pass);
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
