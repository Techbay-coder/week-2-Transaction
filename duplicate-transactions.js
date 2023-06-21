
unction findDuplicateTransactions(inputTrans) {
    // create a conditional statement to check for invalid transactions using the if statement
    if(typeof inputTrans === 'object') {
        let transaction0 =[...inputTrans];
        const getTimeStamp = (time) => Date.parse(new Date(time));
        transaction0.sort((transA, transB) => getTimeStamp(transA.time) - getTimeStamp(transB.time));

        let groups = [];
        while(transaction0.length > 0){
            const duplicates = [];
            let indexOfDuplicates = 0;
            while(indexOfDuplicates !== -1){
                duplicates.push(...transaction0.splice(indexOfDuplicates, 1));
                indexOfDuplicates = transaction0.findIndex(transaction => isDuplicate(duplicates.at(-1), transaction));
            }
            groups.push(duplicates);
        }
        return groups.filter(group => group.length > 1);

        function isDuplicate(transA, transB){
            if(transA.sourceAccount !== transB.sourceAccount)
                return false;
            if(transA.targetAccount !== transB.targetAccount)
                return false;
            if(transA.amount !== transB.amount)
                return false;
            if(transA.category !== transB.category)
                return false;
            if(getTimeStamp(transB.time) - getTimeStamp(transA.time) >= 60000)
                return false;
            return true;
        }

    }else{
        throw new Error("Invalid input");
    }

}

let bayo = [
    {
        id: 3,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:34:30.000Z',
      },
      {
        id: 1,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:00.000Z',
      },
      {
        id: 6,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:05.000Z',
      },
      {
        id: 4,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:36:00.000Z',
      },
      {
        id: 2,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:50.000Z',
      },
      {
        id: 5,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:00.000Z',
      }
]

findDuplicateTransactions(bayo)

export default findDuplicateTransactions;