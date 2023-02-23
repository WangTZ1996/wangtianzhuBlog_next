// import LocalDate from './localdata';
import randomStr from "string-random";
import Decimals from 'decimal.js';

const Web3Eth = require('web3-eth');
// const Web3Util = require('web3-utils');
const Web3Contract = require('web3-eth-contract');

// const crypto = require("crypto-js");

export interface Transaction {
    blockHash?: string,//hex value
    blockNumber?: string,//hex value
    from: string,
    to: string,
    gas?: string,//hex value
    gasPrice?: string,//hex value
    hash?: string,
    input?: string,//hex value
    data?: string,//hex value
    nonce: string,//hex value
    value?: string,//hex value
    chainId?: string,//hex value
    v?: string,
    r?: string,
    s?: string
}

export interface NonceParams {
    address: string;
    blockNumber?: any
}

export interface BalanceParams {
    address: string;
    contractAddress?: string
    blockNumber?: any
}

export interface DecimalsParams {
    contractAddress?: string
}

export interface NativeCurrency {
    decimals: number,
    name: string,
    symbol: string
}

export interface AddChainParams {
    chainId: string;//hex string
    chainName?: string
    rpcUrls?: string[]
    iconUrls?: string[]
    blockExplorerUrls?: string[]
    nativeCurrency: NativeCurrency
}

export interface WatchAssetOptions {
    address: string,
    symbol: string,
    decimals: number,
    image?: string
}

export interface WatchAssetParams {
    type: string;//hex string
    options: WatchAssetOptions
}

export interface AllowanceParams {
    address: string;
    tokenAddress: string,
    contractAddress: string//需要授权的合约
}

export interface ReceiptParams {
    hash: string;
}


class Wallet {
    private trustwallet: any;
    private metamask: any;
    private type?: string;
    private web3ETH?: any;
    private accountsChangeListeners: any
    private chainChangeListeners: any
    private connectListeners: any

    constructor() {
        // this.init()
        this.accountsChangeListeners = {};
        this.chainChangeListeners = {};
        this.connectListeners = {};
        this.trustwallet = null;
        this.metamask = null;
        // this.type = LocalDate.getItem('__wallet');
    }

    addChainChangeListener(listener: Function) {
        let listeners = Object.values(this.chainChangeListeners);
        let has = false;
        for (const listener1 of listeners) {
            if (listener === listener1) {
                has = true;
                break;
            }
        }
        if (!has) {
            let key = randomStr(6);
            this.chainChangeListeners[key] = listener;
        }

    }

    addAccountChangeListener(listener: Function) {
        let listeners = Object.values(this.accountsChangeListeners);
        let has = false;
        for (const listener1 of listeners) {
            if (listener === listener1) {
                has = true;
                break;
            }
        }
        if (!has) {
            let key = randomStr(6);
            this.accountsChangeListeners[key] = listener;
        }
    }

    addConnectListener(listener: Function) {
        let listeners = Object.values(this.connectListeners);
        let has = false;
        for (const listener1 of listeners) {
            if (listener === listener1) {
                has = true;
                break;
            }
        }
        if (!has) {
            let key = randomStr(6);
            this.connectListeners[key] = listener;
        }
    }

    removeChainChangeListener(listener: any) {
        let keys = Object.keys(this.chainChangeListeners);
        for (const key of keys) {
            let listener1 = this.chainChangeListeners[key];
            if (listener1 === listener) {
                delete this.chainChangeListeners[key]
                break;
            }
        }
    }

    removeAccountChangeListener(listener: any) {
        let keys = Object.keys(this.accountsChangeListeners);
        for (const key of keys) {
            let listener1 = this.accountsChangeListeners[key];
            if (listener1 === listener) {
                delete this.accountsChangeListeners[key]
                break;
            }
        }
    }

    removeConnectListener(listener: any) {
        let keys = Object.keys(this.connectListeners);
        for (const key of keys) {
            let listener1 = this.connectListeners[key];
            if (listener1 === listener) {
                delete this.connectListeners[key]
                break;
            }
        }
    }

    formatParams(params: any) {
        let temp: any = {};
        for (const paramsKey in params) {
            if (params[paramsKey] != null) {
                temp[paramsKey] = params[paramsKey];
            }
        }
        return temp;

    }

    initMetaMask() {
        // @ts-ignore
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            if (this.metamask != null) {
                return true;
            }
            // @ts-ignore
            window.ethereum.on('connect', (connectInfo: any) => {
                if (this.connectListeners) {
                    for (const key in this.connectListeners) {
                        if (this.connectListeners[key]) {
                            this.connectListeners[key](true);
                        }
                    }
                }
            });
            // @ts-ignore
            window.ethereum.on('disconnect', (error: any) => {
                if (this.connectListeners) {
                    for (const key in this.connectListeners) {
                        if (this.connectListeners[key]) {
                            this.connectListeners[key](false);
                        }
                    }
                }
            });

            // @ts-ignore
            window.ethereum.on('chainChanged', (chainId: string) => {
                if (this.chainChangeListeners) {
                    for (const chainChangeListenersKey in this.chainChangeListeners) {
                        if (this.chainChangeListeners[chainChangeListenersKey]) {
                            this.chainChangeListeners[chainChangeListenersKey](chainId);
                        }
                    }
                }
            });
            // @ts-ignore
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length > 0) {
                    // LocalDate.setItem('__metamask_address', accounts[0]);
                    if (this.accountsChangeListeners) {
                        for (const key in this.accountsChangeListeners) {
                            if (this.accountsChangeListeners[key]) {
                                this.accountsChangeListeners[key](accounts[0]);
                            }
                        }
                    }
                } else {
                    // LocalDate.setItem('__metamask_address', '');
                }
            });
            // @ts-ignore
            window.ethereum.on('connect', (connectInfo: any) => {
                console.log('MetaMask is connect!', connectInfo);
            });
            // @ts-ignore
            window.ethereum.on('disconnect', (error: any) => {
            });
            // @ts-ignore
            this.metamask = window.ethereum;
            return true;
        }
        return false;
    }

    initTrustWallet() {
        // @ts-ignore
        if ((typeof window.trustwallet !== 'undefined') && typeof window.trustwallet.ethereum !== 'undefined') {
            console.log('TrustWallet is installed!');
            if (this.trustwallet != null) {
                return true;
            }
            // @ts-ignore
            window.trustwallet.ethereum.on('connect', (connectInfo: any) => {
                if (this.connectListeners) {
                    for (const key in this.connectListeners) {
                        if (this.connectListeners[key]) {
                            this.connectListeners[key](true);
                        }
                    }
                }
            });
            // @ts-ignore
            window.trustwallet.ethereum.on('disconnect', (error: any) => {
                if (this.connectListeners) {
                    for (const key in this.connectListeners) {
                        if (this.connectListeners[key]) {
                            this.connectListeners[key](false);
                        }
                    }
                }
            });
            // @ts-ignore
            window.trustwallet.ethereum.on('chainChanged', (chainId: string) => {
                if (this.chainChangeListeners) {
                    for (const chainChangeListenersKey in this.chainChangeListeners) {
                        if (this.chainChangeListeners[chainChangeListenersKey]) {
                            this.chainChangeListeners[chainChangeListenersKey](chainId);
                        }
                    }

                }
            });
            // @ts-ignore
            window.trustwallet.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length > 0) {
                    // LocalDate.setItem('__trustwallet_address', accounts[0]);
                    if (this.accountsChangeListeners) {
                        for (const key in this.accountsChangeListeners) {
                            if (this.accountsChangeListeners[key]) {
                                this.accountsChangeListeners[key](accounts[0]);
                            }
                        }
                    }
                } else {
                    // LocalDate.setItem('__trustwallet_address', '');
                }
            });
            // @ts-ignore
            window.trustwallet.ethereum.on('connect', (connectInfo: any) => {
                console.log('TrustWallet is connect!', connectInfo);
            });
            // @ts-ignore
            window.trustwallet.ethereum.on('disconnect', (error: any) => {
            });
            // @ts-ignore
            this.trustwallet = window.trustwallet.ethereum;
            return true;
        }
        return false;
    }

    getConnector() {
        if (!this.type) {
            // this.type = LocalDate.getItem('__wallet');
        }
        if (this.type === 'trustwallet') {
            return this.trustwallet;
        }
        if (this.type === 'metamask') {
            return this.metamask;
        }
        return null;
    }

    connect(type: string) {
        return new Promise((resolve, reject) => {
            let result = this.check(type);
            // LocalDate.setItem(`__wallet`, type);
            if (!result) {
                // LocalDate.setItem(`__address`, '');
                // resolve('');
                reject('No Wallet Installed!')
            }
            let ethereum: any = null;
            if (type === 'trustwallet') {
                ethereum = this.trustwallet;
            } else {
                ethereum = this.metamask;
            }
            // @ts-ignore
            if (ethereum !== null) {
                // @ts-ignore
                ethereum.request({method: 'eth_requestAccounts'}).then(result => {
                    console.log(result)
                    // LocalDate.setItem(`__address`, result[0]);
                    resolve(result[0])
                }).catch((error: any) => {
                    console.log(error)
                    // LocalDate.setItem(`__address`, '');
                    resolve('');
                });
            } else {
                // LocalDate.setItem(`__address`, '');
                // resolve('')
                reject('No Wallet Installed!')
            }
        })

    }

    disConnect() {
        this.metamask = null;
        this.trustwallet = null;
    }

    check(type: string) {
        // LocalDate.setItem(`__wallet`, type);
        this.type = type;
        if (type === 'trustwallet') {
            return this.initTrustWallet();
        }
        return this.initMetaMask();
    }

    getWeb3ETH(): any {
        let connector = this.getConnector();
        if (connector) {
            return new Web3Eth(connector);
        }
        return null;
    }

    getWeb3Contract(contractAddress: string, abi?: any): any {
        if (!abi) {
            abi = require('./mtoken.json');
        }
        let connector = this.getConnector();
        if (connector) {
            let token = new Web3Contract(abi, contractAddress);
            token.setProvider(connector);
            return token;
        }
        return null;
    }

    chainId() {
        return new Promise(async (resolve, reject) => {
            let connector = this.getConnector();
            if (connector) {
                let result = await connector.request({
                    method: "eth_chainId",
                    params: []
                });
                resolve(result);
            } else {
                reject('Not Find Wallet')
            }
        })
    }

    account(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            let connector = this.getConnector();
            if (connector) {
                // @ts-ignore
                let result = await connector.request({
                    method: "eth_requestAccounts"
                });
                resolve(result[0])
            } else {
                reject('Not Find Wallet')
            }
        })

    }

    getNonce(params: NonceParams) {
        return new Promise(async (resolve, reject) => {
            let web3ETH = this.getWeb3ETH();
            if (web3ETH) {
                console.log('Wallet', 'getNonce', 1)
                try {
                    let result = await web3ETH.getTransactionCount(params.address, 'pending')
                    resolve(result);
                } catch (e: any) {
                    reject(e.toString())
                }
            } else {
                reject('Not Find Wallet')
            }
        })
    }

    getGasPrice() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.getWeb3ETH().getGasPrice();
                resolve(result);
            } catch (e: any) {
                reject(e.toString())
            }
        })
    }

    estimateGas(params: Transaction) {
        console.log('Wallet', 'estimateGas', params)
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.getWeb3ETH().estimateGas(params);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    getBalance(params: BalanceParams) {
        console.log('Wallet', 'getBalance', params)
        return new Promise(async (resolve, reject) => {
            try {
                if (params.contractAddress) {
                    let contract = this.getWeb3Contract(params.contractAddress);
                    let result = await contract.methods.balanceOf(params.address).call();
                    resolve(result);
                } else {
                    let balance = await this.getWeb3ETH().getBalance(params.address);
                    resolve(balance);
                }
            } catch (e) {
                reject(e);
            }
        })
    }

    sendTransaction(params: Transaction) {
        console.log('Wallet', 'sendTransaction', params)
        return new Promise(async (resolve, reject) => {
            try {
                let connector = this.getConnector();
                if (connector) {
                    // @ts-ignore
                    let result = await connector.request({
                        method: "eth_sendTransaction",
                        params: [params]
                    });
                    resolve(result)
                } else {
                    reject('Not Find Wallet')
                }
            } catch (e) {
                reject(e);
            }
        })
    }

    getDecimals(params: DecimalsParams) {
        console.log('Wallet', 'getDecimals', params)
        return new Promise(async (resolve, reject) => {
            try {
                if (params.contractAddress) {
                    let contract = this.getWeb3Contract(params.contractAddress);
                    let result = await contract.methods.decimals().call();
                    resolve(result);
                } else {
                    resolve(18);

                }
            } catch (e) {
                reject(e);
            }
        })
    }

    getReceipt(params: ReceiptParams) {
        console.log('Wallet', 'getReceipt', params)
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.getWeb3ETH().getTransactionReceipt(params.hash);
                /*
                返回实例
                status:true/false  成功/失败
                {
                    "blockHash": "0x0c11f4c232e9eadb1c25c6dc5b6e2a4f61899e4aeebc915699e377f6d6c1e76c",
                    "blockNumber": 24259586,
                    "contractAddress": null,
                    "cumulativeGasUsed": 8683129,
                    "effectiveGasPrice": 5000000000,
                    "from": "0x766f3377497c66c31a5692a435cf3e72dcc2d4fc",
                    "gasUsed": 27703,
                    "logs": [{
                        "address": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
                        "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x000000000000000000000000766f3377497c66c31a5692a435cf3e72dcc2d4fc", "0x000000000000000000000000766f3377497c66c31a5692a435cf3e72dcc2d4fc"],
                        "data": "0x000000000000000000000000000000000000000000000000016345785d8a0000",
                        "blockNumber": 24259586,
                        "transactionHash": "0x89fbbed771d771b82168f6fb455c31df829d75807e735bc38fad3ff1fd3e9134",
                        "transactionIndex": 78,
                        "blockHash": "0x0c11f4c232e9eadb1c25c6dc5b6e2a4f61899e4aeebc915699e377f6d6c1e76c",
                        "logIndex": 173,
                        "removed": false,
                        "id": "log_4f9c730e"
                    }],
                    "logsBloom": "0x00000000000000100000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002004000020000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                    "status": true,
                    "to": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
                    "transactionHash": "0x89fbbed771d771b82168f6fb455c31df829d75807e735bc38fad3ff1fd3e9134",
                    "transactionIndex": 78,
                    "type": "0x0"
                }
                 */
                console.log('Wallet', 'getReceipt', JSON.stringify(result))
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    addEthereumChain(params: AddChainParams) {
        console.log('Wallet', 'addEthereumChain', params)
        return new Promise(async (resolve, reject) => {
            let connector = this.getConnector();
            if (connector) {
                let listenerKey = randomStr(6);
                this.chainChangeListeners[listenerKey] = (chainId: string) => {
                    delete this.chainChangeListeners[listenerKey];
                    resolve(chainId);
                }
                try {
                    let result = await connector.request({
                        method: "wallet_addEthereumChain",
                        params: [params]
                    })
                    console.log('Wallet', 'addEthereumChain', 'result', result)
                } catch (e) {
                    console.log('Wallet', 'addEthereumChain', 'e', e)
                    reject(e)
                }
            } else {
                reject('Not Find Wallet')
            }
        });

    }

    switchEthereumChain(chainId: string) {
        console.log('Wallet', 'switchEthereumChain', chainId)
        return new Promise(async (resolve, reject) => {
            let connector = this.getConnector();
            if (connector) {
                let chainId2 = await this.chainId();
                // @ts-ignore
                if (chainId === (new Decimals(chainId2).toHex())) {
                    resolve(chainId);
                    return
                }
                let listenerKey = randomStr(6);
                this.chainChangeListeners[listenerKey] = (chainId: string) => {
                    delete this.chainChangeListeners[listenerKey];
                    resolve(chainId);
                }
                try {
                    await connector.request({
                        method: "wallet_switchEthereumChain",
                        params: [{chainId}]
                    })
                } catch (e) {
                    reject(e)
                }
            } else {
                reject('Not Find Wallet')
            }
        })

    }

    watchAsset(params: WatchAssetParams) {
        return new Promise(async (resolve, reject) => {
            let connector = this.getConnector();
            if (connector) {
                let result = await connector.request({
                    method: "wallet_watchAsset",
                    params
                })
                resolve(result)
            } else {
                reject('Not Find Wallet')
            }
        })

    }

    allowance(params: AllowanceParams) {
        return new Promise(async (resolve, reject) => {
            let contract = this.getWeb3Contract(params.tokenAddress);
            if (contract) {
                try {
                    let result = await contract.methods.allowance(params.address, params.contractAddress).call();
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            } else {
                reject('Not Find Wallet')
            }
        })
    }

}

export default new Wallet();