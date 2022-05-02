// variable for db connection
let db;
// establish connection to IndexedDB
const request = indexedDB.open('budget-tracker', 1);
// event will emit is database version changes
request.onupgradeneeded = function(event) {
    // save reference to db
    const db = event.target.result;
    // create object store (table) w/ auto incrementing primary key
    db.createObjectStore('new_transaction', {autoIncrement: true});
};

// upon successfull request
request.onsuccess = function(event) {
    db = event.target.result;
    if (navigator.onLine) {
        // uploadTransaction();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
}

// function to be executed if attempt to submit transaction with no internet connection
function saveRecord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    const transactionObjectStore = transaction.objectStore('new_transaction');
    transactionObjectStore.add(record);
}