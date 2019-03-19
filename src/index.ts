
import { AccountHttp, NEMLibrary, NetworkTypes, Password, SimpleWallet, Account, Asset } from 'nem-library';

NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

export const MOSAIC_NAME = 'coin';

//for making account
export const createSimpleWallet = (password: string): SimpleWallet => {
    const pass = new Password(password);
    return SimpleWallet.create(MOSAIC_NAME+'-wallet', pass);
};

export const getAccountBalances = (account: Account) : Promise<Array<Asset>> => {
    return new Promise<Array<Asset>>((resolve, reject) => {
        const accountHttp = new AccountHttp();
        accountHttp.getAssetsOwnedByAddress(account.address).subscribe(assets => {
        resolve(assets);
    }, err => {
        reject(err);
    });
    });
};

export const mosaicBalance = (balances: Array<Asset>): number => {
    const found = balances.find((assets) => {
        return assets.assetId.name == MOSAIC_NAME;
    });
    if(!found) return 0;
    return found.quantity; 
};

export const xemBalance = (balances : Array<Asset>): number => {
    const xemMosaic = balances.find((assets) => {
        return assets.assetId.name == 'xem';
    });
    if(!xemMosaic) return 0;
    return xemMosaic.quantity;
}

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

