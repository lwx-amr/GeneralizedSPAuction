const rl = require('readline');

// Declaring readline object
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
})


const checkValidBid = (parts) => {
  if(parts.length != 3)
    return false;
  if(!isNaN(parts[0]) || !isNaN(parts[1]))
    return false;  
  if(isNaN(parts[2]))
    return false;
  return true;
}

const extractBid = (line) => {
  const parts = line.split(" ");
  const validInputs = checkValidBid(parts);
  if(!validInputs) return null;
  return {name: parts[0] + ' ' + parts[1], value: Number(parts[2])};  
}

// Read items count from user
const readCount = ()=>{
  return new Promise((resolve)=>{
      readline.question('Please enter pet counts: ', (answer) => {
      resolve(answer);
      });
  })
}

// Read bids from user
const readBids = ()=>{
  return new Promise((resolve)=>{
      const bids = [];
      console.log('Please enter users bids in this formula: "FirstName LastName BidValue", or enter exit to get the winner');
      readline.on('line', (line) => {
      if(line == 'exit'){
          readline.close();
          return resolve(bids);
      }
      const bid = extractBid(line);
      if(bid)
          bids.push(bid);
      else
          console.log('>> Bad Inputs!!');
      });
  })
}

module.exports={readCount, readBids}