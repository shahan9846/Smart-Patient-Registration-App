const db = require('../database/db')

db.run(
    `CREATE TABLE IF NOT EXISTS patients(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT,

    age INTEGER,

    gender TEXT,

    mobile TEXT,

    address TEXT,

    department TEXT,

    token TEXT,

    created_at TEXT 
    
    )`,
    (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Patients Table Created...")
        }
    }
)