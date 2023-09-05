import express, { json } from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
// for quereies
const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'password',
    database:'employeeSchema'
});

app.post('/api/create' , (req,res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        'INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)', 
        [name, age, country, position, wage],
        (err, resulut) => {
            if(err) {
                console.log(err);
            } else {
                res.send('Post request successfull...');
            }
        });
});

app.get('/api/employees', (req, res) => {
    db.query('SELECT * from employees', (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
