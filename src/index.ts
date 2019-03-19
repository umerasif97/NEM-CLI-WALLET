import { NEMLibrary, NetworkTypes, Password, SimpleWallet, AccountHttp, Address } from 'nem-library';

NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);

export const MOSAIC_NAME = 'coin';

//for making account
export const createSimpleWallet = (password: string): SimpleWallet => {
    const pass = new Password(password);
    return SimpleWallet.create(MOSAIC_NAME+'-wallet', pass);
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

