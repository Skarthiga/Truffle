const Future1exchange = artifacts.require('Future1exchange')
const token = artifacts.require('token')

var EthUtil = require('ethereumjs-util'); //This module used for sign or use web3.sign

contract('Future1exchange', (accounts) => {
  const msg_sender = accounts[0]
  const fee_addr = accounts[1]

  let privateKey = "3882a4b768652d864d9a73a918936be59eb2898fa3f227203d6e54a62012903a"; 

  before(async () => {
    F1Einstance = await Future1exchange.deployed();
    constructor = await Future1exchange.new(fee_addr);
    tokeninstance = await token.deployed();
    constructor = await token.new();
  });

    describe('Set_function', function () {
        it('SetOwner_success', async () => {
        const Setowner = await F1Einstance.setOwner(accounts[2], { from: msg_sender });
        })
    })

      describe('Testfunction', function () {
        it("Signfunction", async () => {

          const messageToSign = "createescrow1";
          var msgHash = EthUtil.hashPersonalMessage(new Buffer(messageToSign));
          // console.log("mhash",msgHash.toString('hex'));
          var signature = EthUtil.ecsign(msgHash, new Buffer(privateKey, 'hex'));
          // console.log("signature",signature);
          var signatureRPC = EthUtil.toRpcSig(signature.v, signature.r, signature.s)

          var _tradeId = 100
          var _user = [accounts[4], accounts[5], "0x0000000000000000000000000000000000000000"]  //[seller,buyer,token_contract]
          var _amount = "600000000000000000" //ether amount in wei
          var _sellerFee = "100000000000000000"
          var _buyerFee = "100000000000000000"
          var _type = 1
          var _sellerCancelInSeconds = 120
          var _Ref = ["0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000"]
          var _Tokens = ["0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000"]
          var _Type = [0, 0];
          var _mrs = ["0x" + msgHash.toString('hex'), "0x" + signature.r.toString('hex'), "0x" + signature.s.toString('hex')]
          var _v = signature.v

          const createescrow = await F1Einstance.createEscrow(_tradeId, _user, _amount, _sellerFee, _buyerFee, _type, _sellerCancelInSeconds, _Ref, _Tokens, _Type, _mrs, _v, { from: accounts[4], value: "700000000000000000" });
          // console.log("createescrow", createescrow.logs);   
          const escrowmap = await F1Einstance.escrow_map(createescrow.logs[0].args["_tradeHash"]); //(tradehash)
          console.log("Escrow_Map", escrowmap[0], escrowmap[1].toString(), escrowmap[2].toString(), escrowmap[3].toString(), escrowmap[4].toString(), escrowmap[5], escrowmap[6])

        })
    })
})
