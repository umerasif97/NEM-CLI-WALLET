"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var src_1 = require("../src");
var nem_library_1 = require("nem-library");
//importing prompt package
var prompt = require('prompt');
var fs = require('fs');
var os = require('os');
var args = process.argv.slice(2);
var PATH_HOME = os.homedir() + '/' + src_1.MOSAIC_NAME + '-wallet';
var PATH_WALLET = PATH_HOME + '/' + src_1.MOSAIC_NAME + '-wallet.wlt';
var loadWallet = function () {
    var contents = fs.readFileSync(PATH_WALLET);
    return nem_library_1.SimpleWallet.readFromWLT(contents);
};
var openWallet = function (wallet) {
    return new Promise(function (resolve, reject) {
        prompt.message = 'wallet login';
        prompt.start();
        prompt.get({
            properties: {
                password: {
                    description: 'Password',
                    hidden: true
                }
            }
        }, function (_, result) {
            var pass = new nem_library_1.Password(result.password);
            try {
                resolve(wallet.open(pass));
            }
            catch (err) {
                console.log(err);
                console.log('Please Try again');
                reject();
            }
        });
    });
};
var downloadWallet = function (wallet) {
    console.log('\nDownloading wallet for your covenience.\n' +
        'Please store someplace safe. The private key is encrypted by your password.\n' +
        'To load this wallet on a new computer you would simply import the .wlt file into this app and enter your password and you will be able to sign transactions');
    console.log(PATH_HOME);
    console.log(PATH_WALLET);
    if (!fs.existsSync(PATH_HOME)) {
        fs.mkdirSync(PATH_HOME);
    }
    var fullPath = PATH_WALLET;
    if (fs.existsSync(fullPath)) {
        var stamp = new Date().valueOf();
        fullPath = PATH_HOME + '/' + stamp + '-' + src_1.MOSAIC_NAME + '-wallet.wlt';
        console.log(fullPath);
    }
    fs.writeFileSync(fullPath, wallet.writeWLTFile());
    console.log('Downloaded wallet to ' + fullPath);
};
var createWallet = function () {
    console.log('\nPlease enter a unique password (8 character minimum).\n' +
        'This password will be used to encrypt your private key and make working with your wallet easier\n' +
        'Store this password somewhere safe. If you lose or forget it you will never be able to transfer funds');
    prompt.message = src_1.MOSAIC_NAME + '-wallet';
    prompt.start();
    prompt.get({
        properties: {
            password: {
                description: 'Password',
                hidden: true
            },
            confirmPass: {
                description: 'Re-enter Password',
                hidden: true
            }
        }
    }, function (_, result) {
        if (result.password !== result.confirmPass) {
            console.log('\nPasswords do not match\n\n');
            createWallet();
        }
        else {
            var wallet = src_1.createSimpleWallet(result.password);
            var pass = new nem_library_1.Password(result.password);
            var account = wallet.open(pass);
            var address = account.address.pretty();
            console.log(src_1.MOSAIC_NAME + ' wallet successfully created\n');
            console.log('You can now start sending and recieving ' + src_1.MOSAIC_NAME + '\n');
            console.log('Public Address: ' + address);
            downloadWallet(wallet);
            //console.log(wallet);
        }
    });
};
var printBalance = function (account) { return __awaiter(_this, void 0, void 0, function () {
    var balances, mosaic, xem, bal, xemBal;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, src_1.getAccountBalances(account)];
            case 1:
                balances = _a.sent();
                mosaic = src_1.mosaicBalance(balances);
                xem = src_1.xemBalance(balances);
                bal = (mosaic / 1e6).toString();
                xemBal = (xem / 1e6).toString();
                console.log('Coin: ' + bal);
                console.log('Xem: ' + xemBal);
                return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(_this, void 0, void 0, function () {
    var wallet, account, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(args[0] === 'wallet')) return [3 /*break*/, 1];
                if (args[1] === 'create') {
                    createWallet();
                }
                return [3 /*break*/, 6];
            case 1:
                if (!(args[0] === 'balance')) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                wallet = loadWallet();
                return [4 /*yield*/, openWallet(wallet)];
            case 3:
                account = _a.sent();
                return [4 /*yield*/, printBalance(account)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
main();
