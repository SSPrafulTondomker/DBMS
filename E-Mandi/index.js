var express = require("express");
var app = express();
var bodyparser = require("body-parser");
//var mysql = require ('mysql');
var HomeImg = [
		{name : "salmon creek", image:"https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{name : "lola", image: "https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{name : "lola", image: "https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{name : "salmon creek", image:"https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{name : "lola", image: "https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{name : "lola", image: "https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{name : "salmon creek", image:"https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{name : "lola", image: "https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{name : "lola", image: "https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{name : "salmon creek", image:"https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{name : "lola", image: "https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{name : "lola", image: "https://www.w3schools.com/bootstrap4/sanfran.jpg"}
	]


/*var connection = mysql.createConnection({

	host: 'localhost',
	user: 'root',
	password: 'xxxx',
	database: 'EMandi'
});
*/

var allGoods = [
	{userName : "Top"},
	{userName : "Second Top"},
	{userName : "Middle"},
	{userName : "Middle"},
	{userName : "Second Last"},
	{userName : "Last"}
];

/*connection.connect(function(error){
	if (error){
		console.log('error');
	}else{
		console.log("connected");
	}
});
*/
app.use (bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/views'));
app.set ("view engine", "ejs");




app.get ("/", function(req, res){
	res.render ("Home", {HomeSe: HomeImg});
});

app.get ("/Home", function(req, res){
	res.render ("Home", {HomeSe: HomeImg});
});

app.get ("/Register", function(req, res){
	res.render ("Register");
});

app.get ("/Products", function(req, res){
	res.render ("Products");
});
app.get ("/Goods", function(req, res){
	res.render ("Goods", {Goods: allGoods});
	console.log(allGoods);
});

app.get ("/aps", function(req, res){
	res.render ("aps");
});


app.get ("/Home/:Id", function(req, res){
	res.render ("Home" , {HomeSe: HomeImg});
});

app.get ("/Contact", function(req, res){
	res.render ("Contact");
});





//Login 
/*app.post("/Home", function(req, res){
	var Name = req.body.uname;
	var Password = req.body.psw;
	var show = "select * from LoginTable where name = ? and password = ?";
	connection.query(show, [Name, Password], function(err, result, fields){
		if (err){
			console.log(error);
		}else{
			if (result.length != 0){
				console.log("success");
				res.redirect ("Home/"+Name);
			}else{
				console.log("failed");
				res.redirect("Home");
			}
		}
	});
});



//Register only unique name
app.post ("/Register", function(req, res){

	var creatn = req.body.name;
	var creatp = req.body.password;
	console.log(creatn);
	console.log(creatp);
	var data = [
		[creatn, creatp]
	];
	var check = "select * from LoginTable where name = ?"
	var creatdb = "insert into LoginTable (name, password) values ?";

	connection.query(check,[creatn], function (err, result, fields){
		if (result.length == 0 ){
			connection.query(creatdb, [data], function (err, result, fields){
				if(err){
					console.log("error");
				}else{
					console.log("success");
					res.redirect("Home/"+creatn);
				}
			});
		}else{
			console.log("duplicate");
			res.redirect("Register");
		}
	}); 
});


//Complaint 
app.post ("/Complaint", function(req, res){
	var cname = req.body.Cname;
	var csubject = req.body.Csubject;
	var cbody = req.body.Cbody;
	var data = [
		[cname, csubject, cbody]
	];
	var creattable = "insert into Complaint (cname, csubject, cbody) values ?";
	connection.query(creattable, [data], function (err, result, fields){
		if (err){
			console.log("error");
		}else{
			console.log("success");
			res.redirect("Home");
		}
	});
});



//wholesalerfinder
app.post ("/Goods", function(req, res){
	var wname    = req.body.wsName,
	    wlname   = req.body.wslName,
	    wcname   = req.body.wscName,
	    wsName   = req.body.wssName;
	var s1;

		if (wname+" "+wlname != " "){
			
			if (wsName != "" && wcname != ""){
				s1 = "select userName from WholeSalerTable where  FirstName = ? and Lastname = ? and City = ? and State = ?";
				connection.query(s1, [wname, wlname, wcname, wsName], function (err, result, fields){
					if(err){
						console.log("error in WholeSale finder n, l, c, s");
						res.redirect("Goods");
					}else{
						console.log("success in finding Wholesaler n, l, c, s");
						console.log(wsName+" "+wcname+" "+wname+" "+wlname);
						res.render("Goods", {Goods: result});
					}
				});
			}else if (wsName != ""){
				s1 = "select userName from WholeSalerTable where  FirstName = ? and Lastname = ? and State = ?";			
				connection.query(s1, [wname, wlname, wsName], function (err, result, fields){
					if(err){
						console.log("error in WholeSale finder n, l, s ");
						res.redirect("Goods");
					}else{
						console.log("success in finding Wholesaler");
						res.render("Goods", {Goods: result});
					}
				});
			}else if (wcname != ""){
				s1 = "select userName from WholeSalerTable where  FirstName = ? and Lastname = ? and City = ? ";
				connection.query(s1, [wname, wlname, wcname], function (err, result, fields){
					if(err){
						console.log("error in WholeSale finder n, l, c ");
						res.redirect("Goods");
					}else{
						console.log("success in finding Wholesaler 2");
						res.render("Goods", {Goods: result});
					}
				});
			}else{
				s1 = "select userName from WholeSalerTable where  FirstName = ? and Lastname = ? ";
				connection.query(s1, [wname, wlname], function (err, result, fields){
					if(err){
						console.log("error in WholeSale finder n, l, c ");
						res.redirect("Goods");
					}else{
						console.log("success in finding Wholesaler 3");
						res.render("Goods", {Goods: result});
					}
				});
			}
		}else{
			if (wsName != "" && wcname != ""){
				s1 = "select userName from WholeSalerTable where   City = ? and State = ?";
				connection.query(s1, [wcname, wsName], function (err, result, fields){
					if(err){
						console.log("error in WholeSale finder n, l, c, s");
						res.redirect("Goods");
					}else{
						console.log("success in finding Wholesaler n, l, c, s 0");
						console.log(result);
						res.render("Goods", {Goods: result});
					}
				});
			}else if (wsName != ""){
				s1 = "select userName from WholeSalerTable where   State = ?";			
				connection.query(s1, [ wsName], function (err, result, fields){
					if(err){
						console.log("error in WholeSale finder n, l, s ");
						res.redirect("Goods");
					}else{
						console.log("success in finding Wholesaler 1");
						res.render("Goods", {Goods: result});
					}
				});
			}else if (wcname != ""){
				s1 = "select userName from WholeSalerTable where   City = ? ";
				connection.query(s1, [ wcname], function (err, result, fields){
					if(err){
						console.log("error in WholeSale finder n, l, c ");
						res.redirect("Goods");
					}else{
						console.log("success in finding Wholesaler 2");
						console.log(result);
						res.render("Goods", {Goods: result});
					}
				});
			}
		}
	

});

app.post("/dump", function (req, res) {
	var wname    = req.body.wsName,
	    wlname   = req.body.wslName,
	    wcname   = req.body.wscName,
	    wsName   = req.body.wssName,
	    wuname	 = req.body.wuName,
	    wpname	 = req.body.wpName,
	    wpweight = req.body.wpWeight,
	    wfname = "harry Potter";

		s1 = "insert into FarmerWholesaler (Product_Name, Product_Quantity, Wholesaler_Name, Farmer_Name)values ? ";
		var data = [
			[wpname, wpweight, wuname, wfname]
		];
		connection.query(s1, [data], function (err, result, fields){
			if(err){
				console.log("error insert ");
				res.redirect("Goods");
			}else{
				console.log("success insert ");

				res.redirect("Goods");
			}
		});
	
});
*/
//host on 3000
app.listen(3000, function(){
	console.log ("Server Started!!!");
});
