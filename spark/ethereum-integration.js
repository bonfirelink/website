let bfAddress = "0x67ED0100E6Bf5E8E63Cc1F917a339563dEd204f4";

try {
    params = new URLSearchParams(window.location.search);
    amountInCHF = params.get('amount');
    amountInWei = (amountInCHF * 5470412646087).toString();
    console.log("send in chf" + amountInCHF);
    console.log("send in wei" + amountInWei);

} catch (error) {
}

if (document.getElementById('commit-form')) {
    document.getElementById('commit-form').addEventListener('submit', function (event) {

        //Push transaction to rinkeby testnet
        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            gasLimit: '0x2710',  // customizable by user during MetaMask confirmation.
            to: bfAddress, // Required except during contract publications.
            from: "0x2c2aa7c47AB3f0Cb74DcFa1cFDDa673c0653b447", // must match user's active address.
            value: '0x10000000000', // Only required to send ether to the recipient from the initiating external account.
            data: '', // Optional, but used for defining smart contract creation and interaction.
            chainId: 3 // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };
        try {
            ethereum.enable();
            ethereum.sendAsync({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
                from: ethereum.selectedAddress,
            }, function () {
                window.location.href = "state";
            });
            event.preventDefault();
        } catch (error) {
            console.error(error);
        }

    });
};

//GET bonfire mainnet multisig balance
const rpcURL = 'https://rinkeby.infura.io/v3/a95f31b64bf04504ac6279d19651c2be\n';// Your RPC URL goes here
const web3 = new Web3(rpcURL)

//const address = '0x1f7DAF77668306702128c95D0F0F6aeD8161564E';// Your account address goes here
getBFBalance();
function getBFBalance() {
    web3.eth.getBalance(bfAddress, (err, wei) => {
        balance = web3.utils.fromWei(wei, 'ether');
        console.log(balance);
    });
}

