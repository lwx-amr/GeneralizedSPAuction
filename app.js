const {readCount, readBids} = require('./modules/inputHandler');

// Available Pet with its counts
const petForBid = {name: 'Puppy', count : 0}

// Allow sorting DESC on value, if tie sort ASC on name (Tie-Breaker)
const compare = (a,b) => {
  if(a.value == b.value)
    if(a.name > b.name)
      return 1;
    else 
      return -1;
  if(a.value < b.value)
    return 1;
  return -1;
}

// Calc the paid values for every user
const GeneralizeSecondPriceMechanism = (bids, itemsCount)=>{
  bids.sort(compare);
  
  const winners = [], losers = [];
  let i = 0;
  
  // Get Winners
  for (i ; i < bids.length && itemsCount > 0; i++) {
    // the highest bidder pays the price bid by the second-highest bidder and so on
    winners.push({name: bids[i].name, 'paid': bids[i+1].value});
    itemsCount--;
  }

  // Get Losers
  while(i<bids.length){
    losers.push(bids[i++].name);
  }

  console.log('\n\n \t ****** Results ******');
  winners.forEach((el) => {
    console.log(el.name,'\t', el.paid);
  })
  losers.forEach((el) => {
    console.log(el, '\tLost the auction');
  })
}

// Run input handler and GSP algorithms
readCount()
  .then((count) => {
    if(count <=  0){
      console.log('\t********* Count is <= 0 so there is no Auction *********');
      process.exit();
    }
    petForBid.count =count;
    return readBids(); 
  })
  .then((bids) => {
    if(bids.length == 0)
      console.log('\t********* No Winners *********');
    else
      GeneralizeSecondPriceMechanism(bids, petForBid.count);
    process.exit();
  })