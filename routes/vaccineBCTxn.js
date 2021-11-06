module.exports.sendTransaction = function (
  functionCall,
  cb
) {
  const encodedABI = functionCall.encodeABI();
  //Transaction object creation
  web3.eth.getGasPrice()
    .then(gPrice => {
      web3.eth.getAccounts().then(accounts => {
        web3.eth.getTransactionCount(accounts[0]).then(txCount => {
          web3.eth.getBlock("latest").then(block => {
            var txData = {
              nonce: web3.utils.toHex(txCount),
              gasLimit: web3.utils.toHex(block.gasLimit),
              gasPrice: web3.utils.toHex(gPrice * 2),
              from: accounts[0],
              to: contractAddress,
              data: encodedABI
            };

            //sign transaction using account2 of wallet(unlocked)
            const signPromise = web3.eth.signTransaction(txData, txData.from);
            signPromise.then((signedTx) => {

              // raw transaction string available in .raw
              const sentTx = web3.eth.sendSignedTransaction(signedTx.raw);
              sentTx.on("transactionHash", function (hash) {
                console.log("Transaction Hash : " + hash);
              })
                .on("receipt", function (receipt) {
                  console.log("Receipt : " + receipt);
                  cb(true);
                }).on("confirmation", function (confirmationNumber, receipt) {
                  console.log("Confirmation", confirmationNumber);
                })
                .on("error", function (error) {
                  console.log("error: " + error);
                  cb(false);
                }).catch(function (error) {
                  console.log("Web3 Exception Handled: \n" + error);
                })
            })
          })
        })
      })
    })
}
