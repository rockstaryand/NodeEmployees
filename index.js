const  mysql = require('mysql');

const express = require('express');
const bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pedesimuc98',
    database: 'Employees',
    multipleStatements: true
});

mysqlConnection.connect((err)=> {
    if(!err)
    console.log('DB connection successful');
    
    else
    console.log('DB conn unsuccessful \n Error : '+JSON.stringify(err,undefined,2));
});

app.listen(3000,()=>console.log('Express server is runnin in port : 3000'));



//fetch employees

app.get('/Employees', (req,res)=>{
mysqlConnection.query('SELECT * From Employee',(err,rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
    })  

});

//Get an employee by id

app.get('/Employees/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee WHERE EmployeeId = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );


//Delete an employee
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE EmployeeId = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employee
app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @PersonId = ?;SET @EmployeeNum = ?;SET @EmployeesDate = ?;SET @TerminatedDate = ?; \
    CALL EmployeeAddorEdit(@PersonId,@EmployeeNum ,@EmployeesDate,@TerminatedDate);";
    mysqlConnection.query(sql, [emp.PersonId, emp.EmployeeNum, emp.EmployeesDate, emp.TerminatedDate ], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmployeeId);
            });
        else
            console.log(err);
    })
});

//Update an employee
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @PersonId = ?;SET @EmployeeNum = ?;SET @EmployeesDate = ?;SET @TerminatedDate = ?; \
    CALL EmployeeAddorEdit(@PersonId,@EmployeeNum ,@EmployeesDate,@TerminatedDate);";
    mysqlConnection.query(sql, [emp.PersonId, emp.EmployeeNum, emp.EmployeesDate, emp.TerminatedDate ], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});