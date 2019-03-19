import { MOSAIC_NAME, createSimpleWallet } from "../src";
import { Password, SimpleWallet, Account } from "nem-library";

//importing prompt package
const prompt = require('prompt');
const fs =  require('fs');
const os =  require('os');

const args = process.argv.slice(2);
const PATH_HOME = os.homedir()+'/'+MOSAIC_NAME+'-wallet';
const PATH_WALLET = PATH_HOME+'/'+MOSAIC_NAME+'-wallet.wlt';


const loadWallet = (): SimpleWallet => {
    const contents = fs.readFileSync(PATH_WALLET);
    return SimpleWallet.readFromWLT(contents);
};

const openWallet = (wallet: SimpleWallet): Promise<Account> => {
    return new Promise<Account>((resolve, reject) => {
        prompt.message ='wallet login';
        prompt.start();
        prompt.get({
            properties: {
                password: {
                    description: 'Password',
                    hidden: true
                }
            }
        }, (_, result) => {
            const pass = new Password(result.password);
            try{
                resolve(wallet.open(pass));
            } catch (err) {
                console.log(err);
                console.log('Please Try again');
                reject();
            }
        })
    });
};

const downloadWallet = (wallet: SimpleWallet) => {
    console.log('\nDownloading wallet for your covenience.\n' +
		'Please store someplace safe. The private key is encrypted by your password.\n' +
		'To load this wallet on a new computer you would simply import the .wlt file into this app and enter your password and you will be able to sign transactions');

    console.log(PATH_HOME);
    console.log(PATH_WALLET);

        if(!fs.existsSync(PATH_HOME)){
            fs.mkdirSync(PATH_HOME);
        }

        let fullPath = PATH_WALLET;
        if(fs.existsSync(fullPath)){
            const stamp = new Date().valueOf();
            fullPath = PATH_HOME+'/'+stamp+'-'+MOSAIC_NAME+'-wallet.wlt';
            console.log(fullPath);
        }

        fs.writeFileSync(fullPath, wallet.writeWLTFile());
        console.log('Downloaded wallet to '+fullPath);
};

const createWallet = () => {
    console.log('\nPlease enter a unique password (8 character minimum).\n' +
		'This password will be used to encrypt your private key and make working with your wallet easier\n' +
        'Store this password somewhere safe. If you lose or forget it you will never be able to transfer funds');
        prompt.message = MOSAIC_NAME+'-wallet';
        prompt.start();
        prompt.get({
            properties: {
                password: {
                    description: 'Password',
                    hidden : true
                },
                confirmPass: {
                    description: 'Re-enter Password',
                    hidden: true
                }
            }
        }, (_, result) => {
            if(result.password !== result.confirmPass){
                console.log('\nPasswords do not match\n\n');
                createWallet();
            } else {
                const wallet = createSimpleWallet(result.password);
                const pass = new Password(result.password);
                const account = wallet.open(pass);
                const address = account.address.pretty();
                console.log(MOSAIC_NAME+' wallet successfully created\n');
                console.log('You can now start sending and recieving '+MOSAIC_NAME+'\n');
                console.log('Public Address: '+address);
                downloadWallet(wallet);
                //console.log(wallet);
            }
        });
};

const main = async () => {
    if(args[0] === 'wallet'){
        if(args[1] === 'create'){
            createWallet();
        }
    }

    const wallet = loadWallet();
	const account = await openWallet(wallet);
	console.log(account);
};

main();