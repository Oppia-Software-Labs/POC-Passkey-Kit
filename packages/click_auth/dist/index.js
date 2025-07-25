import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CAO22WCXN7K2RXV3Y5J7OS2CE6UCUBLRSYDEAAIYI5C5KUXKLX34AZFT",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAFY2xpY2sAAAAAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAAL",
            "AAAAAAAAAAAAAAADZ2V0AAAAAAAAAAABAAAACw=="]), options);
        this.options = options;
    }
    fromJSON = {
        click: (this.txFromJSON),
        get: (this.txFromJSON)
    };
}
