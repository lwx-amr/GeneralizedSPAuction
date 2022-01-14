const {readCount, readBids} = require('./modules/inputHandler');

// Available Pet with its counts
const petForBid = {name: 'Puppy', count : 0}


// Calc the paid values for every user
const GeneralizeSecondPriceMechanism = (bids)=>{
  console.table(bids);
}

// Run input handler
readCount()
  .then((count) => {
    petForBid.count =count;
    return readBids(); 
  })
  .then((bids) => {
    GeneralizeSecondPriceMechanism(bids);
  })
