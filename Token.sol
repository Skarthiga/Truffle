pragma solidity ^0.5.14;

contract ERC20{
    function allowance(address spender, address owner) public view returns(uint256);
    function approve(address spender, uint256 value) public returns(bool);
    function balanceOf(address who)public view returns(uint256);
    function transfer(address to, uint256 value) public returns(bool);
    function transferFrom(address from, address to, uint256 value) public returns(bool);
    event Transfer(address from, address to, uint256 value);
    event Approval(address owner, address spender, uint256 value);
}

library SafeMath{
    function add(uint256 a, uint256 b) internal pure returns(uint256) {
        uint256 c= a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
    
    function sub(uint256 a, uint256 b) internal pure returns(uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c= a - b;
        return c;
    }
    
    function multiply(uint256 a, uint256 b) internal pure returns(uint256) {
        if(a == 0){
            return 0;
        }
        uint256 c = a * b;
        require((c / a) == b, "SafeMath: multiplication overflow");
        return c;
    }
    
    function division(uint256 a, uint256 b) internal pure returns(uint256) {
        require(b > 0, "SafeMath: Division by zero");
        uint256 c = a / b;
        return c;
    }
}

contract erc20 is ERC20 {
    using SafeMath for uint256;
    
    uint256 constant TOTALSUPPLY = 100000000;
    string public _name;
    string public _symbol;
    uint256 public _decimals;
    uint256 public _totalSupply = TOTALSUPPLY*10**uint256(_decimals);
    address _admin;
    
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;
    
    constructor() public {
        _name = "Test";
        _symbol = "TEST";
        _decimals = 18;
        _totalSupply = TOTALSUPPLY*10**(_decimals);
        _admin = msg.sender;
        balances[msg.sender] = _totalSupply;
    }
    
    modifier onlyOwner() {
        require(msg.sender == _admin, "Only owner");
        _;
    }
    
    function balanceOf(address who) public view returns(uint256) {
        return balances[who];
    }
    
    function approve(address spender, uint256 value) public returns(bool) {
        require(spender != address(0), "Null address");
        require(value > 0, "Invalid value");
        
        allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function allowance(address owner, address spender) public view returns(uint256) {
        return allowed[owner][spender];
    }
    
    function transfer(address to, uint256 value) public returns(bool) {
        require(to != address(0), "Null address");
        require(value > 0, "Invalid value");
        
       _transfer(msg.sender, to, value);
        emit Transfer(msg.sender, to, value);
    }
    
    function transferFrom(address from, address to, uint256 value) public returns(bool) {
        require(from != address(0), "Null from address");
        require(to != address(0), "Null to address");
        require(value > 0, "Invalid value");
        require(value <= balances[from], "Insufficient balance");
        require(value <= allowed[from][msg.sender], "Insufficient allowance");
        
        allowed[from][msg.sender] = (allowed[from][msg.sender]).sub(value);
       _transfer(from, to, value);
        emit Transfer(from, to, value);
    }
    
    function _transfer(address from, address to, uint256 value) internal {
        balances[from] = balances[from].sub(value);
        balances[to] = balances[to].add(value);
        emit Transfer(from, to, value);
    }
    
    function mint(uint256 value) public onlyOwner returns(bool) {
        require(value > 0, "Invalid value");
        _totalSupply = _totalSupply.add(value);
        balances[_admin] = balances[_admin].add(value);
        return true;
    }
    
    function burn(uint256 value) public onlyOwner returns(bool) {
        require(value > 0, "Invalid value");
        _totalSupply = _totalSupply.sub(value);
        balances[_admin] = balances[_admin].sub(value);
        return true;
    }
    
    function increaseAllowance(address spender, uint256 value) public returns(bool) {
        require(spender != address(0), "Null address");
        require(value > 0, "Invalid value");
        allowed[msg.sender][spender] = allowed[msg.sender][spender].add(value);
        return true;
        
    }
    
    function decreaseAllowance(address spender, uint256 value) public returns(bool) {
        require(spender != address(0), "Null address");
        require(value > 0, "Invalid value");
        allowed[msg.sender][spender] = allowed[msg.sender][spender].sub(value);
        return true;
    }
}
