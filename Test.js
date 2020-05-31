const Token = artifacts.require('Token')

contract('Token', (accounts) => {

    before(async () => {
        tokeninstance = await Token.deployed()
        constructor = await Token.new()
        console.log("Token contract", tokeninstance.contract.options.address)
    })

    //Token_Details
    describe('Token_Function', function(){
        it('Token_name', async()=>{
            const name = await tokeninstance.name()
            assert.equal(name,'EOF',true)
        })
    })

    //balanceOf
    describe('balanceOf_Function', function(){
        it('balanceOf', async()=>{
            const balanceOf = await tokeninstance.balanceOf(accounts[0])
            console.log("balanceOf", balanceOf.toString())
        })
    })

    //transfer
    describe('transfer_Function', function(){        
        it('transfer', async()=>{
            const balanceOf_before = await tokeninstance.balanceOf(accounts[0])
            console.log("balanceOf_before", balanceOf_before.toString())
            const balacc1_before = await tokeninstance.balanceOf(accounts[1])
            console.log("balacc1_before", balacc1_before.toString())
            const transfer = await tokeninstance.transfer(accounts[1],"10000000")
            // console.log("transfer", transfer)
            const balanceOf_after = await tokeninstance.balanceOf(accounts[0])
            console.log("balanceOf_after", balanceOf_after.toString())
            const balacc1_after = await tokeninstance.balanceOf(accounts[1])
            console.log("balacc1_after", balacc1_after.toString())
        })
    })

    //approve
    describe('approve_Function', function(){
        it('approve', async()=>{
            const approve = await tokeninstance.approve(accounts[2],"1000",{from:accounts[1]})
            console.log("approve", approve.receipt.status)
        })
    })

    //allowance
    describe('allowance_Function', function(){
        it('allowance', async()=>{
            const allowance = await tokeninstance.allowance(accounts[1],accounts[2])
            console.log("allowance", allowance.toString())
        })
    })

    //transferFrom
    describe('transferFrom_Function', function(){
        it('transferFrom', async()=>{
            const balacc1_before = await tokeninstance.balanceOf(accounts[1])
            console.log("balacc1_before", balacc1_before.toString())
            
            const balacc3_before = await tokeninstance.balanceOf(accounts[2])
            console.log("balacc3_before", balacc3_before.toString())
            
            const transferFrom = await tokeninstance.transferFrom(accounts[1],accounts[3],"500",{from:accounts[2]})
            // console.log("transferFrom", transferFrom)
            
            const balacc1_after = await tokeninstance.balanceOf(accounts[1])
            console.log("balacc1_after", balacc1_after.toString())
            
            const balacc3_after = await tokeninstance.balanceOf(accounts[3])
            console.log("balacc3_after", balacc3_after.toString())
        })
    })

    //fallback function
    it('If user enters for the first time, should pay commission fee along with level1 fee?', async()=>{
        const userregister1 = await TrustWayinstance.sendTransaction({from:user1,value:"120000000000000000",data:ownerWallet})
        console.log("userregister1_log0", userregister1.logs[0].args["_user"],userregister1.logs[0].args["_referral"],userregister1.logs[0].args["_level"].toString(),userregister1.logs[0].args["_time"].toString());
        console.log("userregister1_log0", userregister1.logs[1].args["_user"],userregister1.logs[1].args["_referrer"],userregister1.logs[1].args["_time"].toString());
    })
})
