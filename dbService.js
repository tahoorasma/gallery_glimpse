const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM shop;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
    
            const dataArray = [];
    
            response.forEach(result => {
                dataArray.push(result);
            });
    
            console.log(dataArray);
            return dataArray;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllEventsData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM events;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
    
            const dataArray = [];
    
            response.forEach(result => {
                dataArray.push(result);
            });
    
            console.log(dataArray);
            return dataArray;
        } catch (error) {
            console.log(error);
        }
    }
    
    async validateLogin(username, password) {
        try {
            const result = await new Promise((resolve, reject) => {
                //console.log(username);
                //console.log(password);
                const query = "SELECT * FROM admin WHERE username = ? AND password = ?";
                connection.query(query, [username, password], (err, rows) => {
                    if (err) reject(new Error(err.message));
                    if (rows.length > 0) {
                        resolve(rows[0].username);
                    } else {
                        resolve(null);
                    }
                })
            });
            console.log("db "+result);
            return result;
        } catch (error) {
            console.log(error);
        }          
    }

    async insertNewName(name,pw) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (username, password) VALUES (?,?);";

                connection.query(query, [name, pw] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return {
                id : insertId,
                username : name,
                password : pw
            };
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewCustomer(name,phone, email, address) {
        try {
            console.log("namedb"+ name);
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO customers (name, phone, email, address) VALUES (?,?,?,?);";

                connection.query(query, [name, phone, email, address] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return {
                id : insertId,
                name : name,
                phone : phone,
                email: email,
                address: address
            };
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewPainting(image_link, name, artists, price){
        try {
            console.log("namedb"+ name);
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO shop (image_link, name, artists, price) VALUES (?,?,?,?);";

                connection.query(query, [image_link, name, artists, price] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return {
                id : insertId,
                image_link: image_link, 
                name : name,
                artists : artists, 
                price : price
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM shop WHERE name = ?";    
                connection.query(query, [name] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateQuantityById(name, quantity) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE events SET quantity = ? WHERE name = ?";
    
                connection.query(query, [quantity, name] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT quantity FROM events WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    if (results.length > 0) {
                        resolve(results[0].quantity);
                    } else {
                        resolve(null);
                    }
                })
            });
            console.log("db "+response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;