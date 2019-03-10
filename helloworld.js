var express = require('express');
// var url =require('url');
var app = express();
app.use(express.json());
detected = false;

var customer = [
    {cId:"123", cName:"Monkey",cMail:"monkey@gmail.com"},
    {cId:"234", cName:"Dragon",cMail:"dragon@gmail.com"},
    {cId:"345", cName:"Garp",cMail:"garp@gmail.com"}
    ];

app.get('/', function(req, res){
    res.send("Hello world!");
    console.log('paramenters of query -',req.query.cId);
});

app.get('/list', function(req, res){
    // res.send("Users list below");
    res.setHeader("Content-Type","text/html");
    res.write('<table>\n' +
        '  <tr>\n' +
        '    <th>Company</th>\n' +
        '    <th>Contact</th>\n' +
        '    <th>Country</th>\n' +
        '  </tr>\n') ;
    for(var i=0; i<customer.length;i++) {
        cId = customer[i].cId;
        cName = customer[i].cName;
        cMail = customer[i].cMail;
        res.write('  <tr>\n' +
            '    <td> '+  cId + '</td>\n' +
            '    <td>'+cName+'</td>\n' +
            '    <td>'+cMail +'</td>\n' +
            '  </tr>\n');
    }
    res.write('</table>');
    res.end();
    console.log('paramenters of query -',req.query.cId);
});

app.post('/add', function(req, res){
    customer.push({cId:req.body.cId,cName:req.body.cName,cMail:req.body.cMail});
    console.log(customer);
    res.send("registered the user");
});

app.post('/delete', function(req, res){
    console.log(customer);
    res.setHeader("Content-type","text/html");
    console.log(req.body);
    arrLen = customer.length ;
    for(var i=0;i<arrLen ;i++){
        if(req.body.cId === customer[i].cId || req.body.cName === customer[i].cName || req.body.cMail === customer[i].cMail){
            console.log('popped the user - ', customer[i]);
            if(i == (arrLen-1)){
                customer.pop();
            }else{
                console.log('customer [i] - ', customer[i] );
                temp = customer[i] ;
                console.log('temp -',temp);
                console.log('type of temp',typeof temp);
                customer[i]=customer[arrLen-1];
                customer[arrLen-1]= temp;
                console.log(customer[arrLen-1]);
                customer.pop();
                detected = true;
                res.write("deleted the user \n");
            }
        }
    }
    console.log('customer afer delete' ,customer);
    if(detected){
        res.write('no such user with - '+ req.body.cId +'or' + req.body.cName+ 'or'+ req.body.cMail);
    }
    detected=false;
    res.end();
});

app.post('/update', function(req, res){
    res.setHeader("Content-type","text/html");
    console.log(req.body);
    arrLen = customer.length;
    for(var i=0;i<arrLen ;i++){
        if(req.body.cId === customer[i].cId ){
            if(req.body.cName == undefined){
                console.log('no name');
            }else if(req.body.cName.length>1){
                customer[i].cName=req.body.cName;
                res.write("updated the user  name \n");
            }
            if(req.body.cMail == undefined){
                console.log('no mail');
            }else if(req.body.cMail.length>1){
                customer[i].cMail=req.body.cMail;
                res.write("updated user mail the user \n");
            }
            res.write("deleted the user \n");
        }else{
            res.write('no such users');
        }
    }
    console.log('customer afer delete' ,customer);
    if(detected){
        res.write('no such user with - '+ req.body.cId +'or' + req.body.cName+ 'or'+ req.body.cMail);
    }
    res.end();
});


app.listen(3000);
