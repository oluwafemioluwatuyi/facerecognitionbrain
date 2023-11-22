const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db =knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'text',
        database:'Smartbrain'
    }
});

db.select('*').from('users').then(data =>{
    console.log(data);
})


const app = express();

app.use(bodyParser.json());
app.use(cors())

const database = {
    users:[
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password:'cookies',
            entries: 0,
            joined : new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password:'bababa',
            entries: 0,
            joined : new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res)=>{
    res.send(database.users);
})

app.post('/signin', (req, res) =>{
    bcrypt.compare("apples", '$2a$10$/E.xzGygWG5C.r9jG1LON.5HdG9f5WLeb0Gh/J1kkwICgF4usMKWu', function(err, res){
        // res == true
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", '$2a$10$/E.xzGygWG5C.r9jG1LON.5HdG9f5WLeb0Gh/J1kkwICgF4usMKWu', function(err, res){
        // res == false
        console.log('second guess', res);
        
    });
     if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json('success');
        } else{
            res.status(400).json('error logging in');
        }
})

app.post('/register', (req, res)=>{
    const {email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash){
        console.log(hash);
    });
    db('users')
    .returning('*')
    .insert({
        email:email,
        name:name,
        joined:new Date(),
    }).
    then(user =>{
        res.json(user[0]);
    })
    .catch(err=>res.status(400).json(err))
  
})

app.get('/profile/:id', (req, res)=>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
           return res.json(user);
        }
    })
    if(!found){
        res.status(404).json('not found');
    }
})

app.post('/image', (req, res)=>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            user.entries++
           return res.json(user.entries);
        }
        if(!found){
            res.status(404).json('not found');
        }
    })

})


app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})



/*

/ --> res = this is working

/signin --> POST = Success/fail
/register --> POST = user
/profile/:userId --> GET = USER
/image --> PUT --> USER





*/






































