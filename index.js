const express = require('express');
const path = require('path');
const port = 8000;

const db = require("./config/mongoose");

const Contact = require('./models/contact');

const app = express();
     
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


// feting the contact from DB
app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){

        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home', {title : "My Contacts List",
        contact_list: contacts

        });
    });

});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title : "let me play with ejs"
    });
});

//creating contact for the DB
app.post('/create_contact', function(req, res){
    Contact.create({
        name: req.body.name,
        number: req.body.number
    }, function(err, newContact){
        if(err){console.log('error in creating a contact!');
    return; }
    console.log('**********', newContact);
    return res.redirect('back');
    });
    
});


// delete function for deleting a contact
app.get('/delete-contact', function(req, res){
    console.log(req.query);
    let id = req.query.id;

    //find the contact in the DB using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in finding and deleting a contact');
            return;
        }
        return res.redirect('back');
    });

});

//port running confirmation
app.listen(port, function(err){
    if (err){
        console.log('error in running!', err);
    }

    console.log('server is running on Port:', port);
});