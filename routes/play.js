/**
 * Express router for handling chess game related routes.
 * @module routes/play
 */

var express = require('express');
var util = require('../config/util.js');
var router = express.Router();

const Web3 = require('web3').default;
const fs = require('fs'); 

const path = require('path');
const abiPath = path.join(__dirname, '../abi/llg.abi');
const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));

var web3 = new Web3('https://bsc-dataseed.binance.org/');

// LLG contract address
var llgContractAddress = '0x4691f60c894d3f16047824004420542e4674e621';

var llgContract = new web3.eth.Contract(abi, llgContractAddress);

/**
 * GET route for the play page.
 */
router.get('/', function(req, res) {
    res.render('partials/play', {
        title: 'Chess Hub - Game',
        user: req.user,
        isPlayPage: true
    });
});

/**
 * GET route to get the balance of LLG tokens for a specific address.
 */
router.get('/llg-balance', async function(req, res) {
    try {
        var address = process.env.ACCOUNT; // Replace with the desired address in .env file

        var balance = await llgContract.methods.balanceOf(address).call();

        console.log('Balance:', balance.toString());

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
    
/**
 * GET route to get the total supply of LLG tokens.
 */
router.get('/llg-total-supply', async function(req, res) {
    try {
        var totalSupply = await llgContract.methods.totalSupply().call();

        console.log('Total Supply:', totalSupply.toString());

        res.json({ totalSupply: totalSupply.toString() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
    
/**
 * POST route to transfer LLG tokens from one address to another.
 */
router.post('/llg-transfer', async function(req, res) {
    try {
      var fromAddress = '0x1234567890123456789012345678901234567890'; // sender's address
      var privateKey = process.env.PRIVATE_KEY; // Replace with the sender's private key
      var toAddress = '0x1234567890123456789012345678901234567890'; // recipient's address
      var amount = '1000000000000000000'; // Amount of tokens to transfer (in wei)
  
      // Get the transaction count (nonce) for the sender's address
      var nonce = await web3.eth.getTransactionCount(fromAddress);
      // Prepare the transaction object
      var txObject = {
        from: fromAddress,
        to: llgContractAddress,
        gasLimit: web3.utils.toHex(100000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        nonce: web3.utils.toHex(nonce),
        data: llgContract.methods.transfer(toAddress, amount).encodeABI()
      };
  
      var signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
      var result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      res.json({ transactionHash: result.transactionHash });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
    
module.exports = router;