var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mysql = require ('mysql');
var username,usertype;
var allCarts = [
{ProductName: "Null"}
];
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
var products =  [
		{userName : "salmon creek", image:"https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{userName : "lola", image: "https://www.w3schools.com/bootstrap4/sanfran.jpg"},
		{userName : "lola", image: "https://www.w3schools.com/bootstrap4/sanfran.jpg"}
	]

var connection = mysql.createConnection({

	host: 'localhost',
	user: 'root',
	password: 'Ts@9849493088',
	database: 'EMandi1'
});


var allGoods = [
	{userName : "Top"},
	{userName : "Second Top"},
	{userName : "Middle"},
	{userName : "Middle"},
	{userName : "Second Last"},
	{userName : "Last"}
];

connection.connect(function(error){
	if (error){
		console.log('error');
	}else{
		console.log("connected");
	}
});

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
	res.render ("Products", {cart: allCarts, Products: products});
});
app.get ("/Goods", function(req, res){
	res.render ("Goods",{Goods: allGoods, cart: allCarts} );
	console.log(allCarts);
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
app.post("/Home", function(req, res){
	var Name = req.body.uname;
	username = Name;	
	var Password = req.body.psw;
	var show = "select * from User where username = ? and password = ?";
	connection.query(show, [Name, Password], function(err, result, fields){
		if (err){
			console.log(error);
		}else{
			if (result.length != 0){
				console.log("success");
				usertype = result[0].Type;
				console.log("maa ke"+usertype);
				res.redirect ("Home/"+Name);
			}else{
				console.log("failed");
				res.redirect("Home");
			}
		}
	});
});
//console.log("chut "+usertype);

var usercnt, data, check, creatdb, insert, data2;
//Register only unique name
app.post ("/Register", function(req, res){
    final = req.body.utype;
    if(final == "1")
    	usertype = "farmer";
    else if(final == "2")
    	usertype = "retailer";
    else if(final == "3")
    	usertype = "wholeseller";
    else if(final == "4")
    	usertype = "civilian";
	var create = req.body.email;
	var creatn = req.body.username;
	var name = req.body.name;
	username = creatn;
	var creatp = req.body.password;
	var max = "select * from user where username = ?";
	connection.query(max,[creatn],function(err,result,fields){
			if(err){
						console.log("error5");
					}else{
							if(result.length == 0){

							data = [
								[username, name, creatp, usertype]
							];
							
							check = "select * from UserInfo where email = ?"
							creatdb = "insert into User values ?";
						    insert = "insert into UserInfo values ?";
						    data2 = [
								[creatn,req.body.phone,req.body.city,req.body.state,req.body.address,create]
						    ];

						    connection.query(check,[create], function (err, result, fields){
							if (result.length == 0 ){
								connection.query(creatdb, [data], function (err, result, fields){
									if(err){
										console.log("error1");
									}else{
										console.log("success");
										connection.query(insert,[data2],function(err,result,fields){
										if(err){
											console.log("error2");
										}else{
											console.log("success");	
											res.redirect("Home/"+creatn);
										}
									  });
										
									}
								});
							}else{
								console.log("duplicate");
								res.redirect("Register");
							}
						}); 
						}
						else {
							console.log("duplicate");
							res.redirect("Register");
						}

					}	
	});
});


//Complaint 
app.post ("/Complaint", function(req, res){
	var csubject = req.body.Csubject;
	var cbody = req.body.Cbody;
	var telldate = "select now() as date";
	connection.query(telldate,function(err,result,fields){
		if (err){
			console.log("error");
		}else{
			console.log("success");
			var data = [
			[username, csubject, cbody, result[0].date]
			];
			var creattable = "insert into Complaint (username, subject, issue, date ) values ?";
			connection.query(creattable, [data], function (err, result, fields){
				if (err){
					console.log("error");
				}else{
					console.log("success");
					res.redirect("Home/"+username);
				}
			});
		}
	});
});


var pname,weight;
//wholesalerfinder
app.post ("/Goods", function(req, res){
	    pname    = req.body.pname;
   var  wcname   = req.body.wscName,
	    wsName   = req.body.wssName;
	    weight = req.body.weight;
	    var wname = req.body.wname;
	    var s1;
	    console.log("maa ke chut"+usertype);
		if(usertype == "farmer"){
			if (wname == ""){
				
				if (wsName != "" && wcname != ""){
					s1 = "select wholeseller.userName , phone, address from wholeseller, userinfo where wholeseller.username = userinfo.username and City = ? and State = ?";
					connection.query(s1, [wcname, wsName], function (err, result, fields){
						if(err){
							console.log("error in WholeSale finder  c, s");
							res.redirect("Goods");
						}else{
							console.log("success in finding Wholesaler n, l, c, s");
							console.log(wsName+" "+wcname);
							res.render("Goods", {Goods: result});
						}
					});
				}else if (wsName != ""){
					s1 = "select wholeseller.userName , phone, address from wholeseller, userinfo where wholeseller.username = userinfo.username and State = ?";			
					connection.query(s1, [wsName], function (err, result, fields){
						if(err){
							console.log("error in WholeSale finder n, s ");
							res.redirect("Goods");
						}else{
							console.log("success in finding Wholesaler");
							res.render("Goods", {Goods: result});
						}
					});
				}else if (wcname != ""){
					s1 = "select wholeseller.userName , phone, address from wholeseller, userinfo where wholeseller.username = userinfo.username and City = ? ";
					connection.query(s1, [wcname], function (err, result, fields){
						if(err){
							console.log("error in WholeSale finder n, c ");
							res.redirect("Goods");
						}else{
							console.log("success in finding Wholesaler 2");
							console.log(result);
							res.render("Goods", {Goods: result});
						}
					});
				}
				else{
					console.log("error in WholeSale finder (no input) ");
							res.redirect("Goods");
				}
			}else{
					s1 = "select wholeseller.userName , phone, address from wholeseller, userinfo where wholeseller.username = userinfo.username and wholeseller.userName = ? ";
					connection.query(s1, [wname], function (err, result, fields){
						if(err){
							console.log("error in WholeSale finder n ");
							res.redirect("Goods");
						}else{
							console.log("success in finding Wholesaler 3");
							res.render("Goods", {Goods: result});
						}
					});
			}
		}

		else if(usertype == "retailer"){
			if (wname == ""){
				
				if (wsName != "" && wcname != ""){
					s1 = "select wholeseller.userName , phone, address,price from wholeseller, userinfo where wholeseller.username = userinfo.username and City = ? and State = ? and quantity >= ?";
					connection.query(s1, [wcname, wsName, weight], function (err, result, fields){
						if(err){
							console.log("error in WholeSale finder  c, s");
							res.redirect("Goods");
						}else{
							console.log("success in finding Wholesaler n, l, c, s");
							console.log(wsName+" "+wcname);
							res.render("Goods", {Goods: result});
						}
					});
				}else if (wsName != ""){
					s1 = "select wholeseller.userName , phone, address,price from wholeseller, userinfo where wholeseller.username = userinfo.username and State = ? and quantity >= ?";			
					connection.query(s1, [wsName, weight], function (err, result, fields){
						if(err){
							console.log("error in WholeSale finder n, s ");
							res.redirect("Goods");
						}else{
							console.log("success in finding Wholesaler");
							res.render("Goods", {Goods: result});
						}
					});
				}else if (wcname != ""){
					s1 = "select wholeseller.userName , phone, address,price from wholeseller, userinfo where wholeseller.username = userinfo.username and City = ? and quantity >= ?";
					connection.query(s1, [wcname, weight], function (err, result, fields){
						if(err){
							console.log("error in WholeSale finder n, c ");
							res.redirect("Goods");
						}else{
							console.log("success in finding Wholesaler 2");
							res.render("Goods", {Goods: result});
						}
					});
				}
				else{
					console.log("error in WholeSale finder (no input) ");
							res.redirect("Goods");
				}
			}else{
					s1 = "select wholeseller.userName , phone, address,price from wholeseller, userinfo where wholeseller.username = userinfo.username and wholeseller.userName = ? and quantity >= ?";
					connection.query(s1, [wname, weight], function (err, result, fields){
						if(err){
							console.log("error in WholeSale finder n ");
							res.redirect("Goods");
						}else{
							console.log("success in finding Wholesaler 3");
							res.render("Goods", {Goods: result});
						}
					});
			}
		}
	

});
app.post("/amp",function(req,res){
	var uname = req.body.uname;
	console.log(uname+" "+pname+" "+weight);
	if(usertype =="farmer"){
		var query = "select price from Product where productname = ?";
		connection.query(query,[pname],function(err,result,fields){
			if(err){
				console.log("error");
			}
			else{
				console.log("success");
				var query1 ="insert into cart values ?";
				connection.query(query1,[[[uname,pname,username,weight, result[0].price]]],function(err,result,fields){
					if(err){
						console.log("error");
					}
					else{
						console.log("success");
						res.redirect("Goods");
					}
				});
			}
		});

	}
	else if(usertype == "retailer"){
		var query = "select price from wholeseller where productname = ? and username = ?";
		connection.query(query,[pname,uname],function(err,result,fields){
			if(err){
				console.log("error");
			}
			else{
				console.log("success");
				var query1 ="insert into cart values ?";
				connection.query(query1,[[[username,pname,uname,weight, result[0].price]]],function(err,result,fields){
					if(err){
						console.log(err);
					}
					else{
						console.log("success");
						res.redirect("Goods");
					}
				});
			}
		});
	}
});

//Retailer Finder
app.post("/Products", function(req, res){
	    pname    = req.body.pname;
   var  wcname   = req.body.wscName,
	    wsName   = req.body.wssName;
	    weight = req.body.weight;
	    var wname = req.body.wname;
	    var s1;	

		 if(usertype == "civilian"){
			if (wname == ""){
				
				if (wsName != "" && wcname != ""){
					s1 = "select retailer.userName , phone, address,price from retailer, userinfo where retailer.username = userinfo.username and City = ? and State = ? and quantity >= ?";
					connection.query(s1, [wcname, wsName, weight], function (err, result, fields){
						if(err){
							console.log("error in retailer finder  c, s");
							res.redirect("Products");
						}else{
							console.log("success in finding retailer n, l, c, s");
							console.log(wsName+" "+wcname);
							res.render("Products", {Products: result, cart: allCarts});
						}
					});
				}else if (wsName != ""){
					s1 = "select retailer.userName , phone, address,price from retailer, userinfo where retailer.username = userinfo.username and State = ? and quantity >= ?";			
					connection.query(s1, [wsName, weight], function (err, result, fields){
						if(err){
							console.log("error in retailer finder n, s ");
							res.redirect("Products");
						}else{
							console.log("success in finding retailer");
							res.render("Products", {Products: result, cart: allCarts});
						}
					});
				}else if (wcname != ""){
					s1 = "select retailer.userName , phone, address,price from retailer, userinfo where retailer.username = userinfo.username and City = ? and quantity >= ?";
					connection.query(s1, [wcname, weight], function (err, result, fields){
						if(err){
							console.log("error in retailer finder n, c ");
							res.redirect("Products");
						}else{
							console.log("success in finding retailer 2");
							console.log(result);
							res.render("Products", {Products: result, cart: allCarts});
						}
					});
				}
				else{
					console.log("error in retailer finder (no input) ");
							res.redirect("Products");
				}
			}else{
					s1 = "select retailer.userName , phone, address,price from retailer, userinfo where retailer.username = userinfo.username and retailer.userName = ? and quantity >= ?";
					connection.query(s1, [wname, weight], function (err, result, fields){
						if(err){
							console.log("error in retailer finder n ");
							res.redirect("Products");
						}else{
							console.log("success in finding retailer 3");
							res.render("Products", {Products: result, cart: allCarts});
						}
					});
			}
		}
	

});

app.post("/pds",function(req,res){
	var uname = req.body.uname;
	
	if(usertype == "civilian"){
		var query = "select price from retailer where productname = ? and username = ?";
		connection.query(query,[pname,uname],function(err,result,fields){
			if(err){
				console.log("error");
			}
			else{
				console.log("success");
				var query1 ="insert into cart values ?";
				console.log(result[0].price);
				connection.query(query1,[[[username,pname,uname,weight, result[0].price]]],function(err,result,fields){
					if(err){
						console.log("error");
					}
					else{
						console.log("success");
						res.redirect("Products");
					}
				});
			}
		});
	}
});


var date;
// Transactions
app.post("/trans", function(req, res){
	console.log("hello mr dj");
	var telldate = "select now() as date";
	var username,retailerid,productname,quantity,price;
	connection.query(telldate,function(err,result,fields){
		if (err){
			console.log("error");
		}else{
			console.log("success");
			date = result[0].date;
			var query = "select * from cart";
			connection.query(query, function (err, result, fields){
				if(err){
					console.log("error");
				}
				else{
					console.log("success");
					var insert = "insert into transactions values ?"
					for(var i = 0; i < result.length; i++){
						console.log(result);
                        username = result[i].username;
                        retailerid = result[i].ReatailerId;
                        productname = result[i].ProductName;
                        quantity = result[i].Quantity;
                        price = result[i].price;
                        console.log(retailerid);
						connection.query(insert, [[[result[i].username, result[i].ReatailerId, result[i].ProductName,result[i].Quantity, result[i].price, date]]], function(err, result, fields){
							if(err){
								console.log("error");
							}
							else{
								var query = "select Type from user where username = ?";
								connection.query(query,[retailerid], function(err, result, fields){
									if(err)
										console.log("eror");
									else{
										console.log("success");
										if(result[0].Type == "farmer"){
											query = "update wholeseller set Quantity = Quantity + ? where ProductName = ? and username = ?";
											connection.query(query,[quantity, productname, username],function(err, result, fields){
												if(err){
													console.log("error");
												}
												else{
													console.log("success");
												}
											});
										}
										else if(result[0].Type == "wholeseller"){
											query = "update wholeseller set Quantity = Quantity - ? where ProductName = ? and username = ?";
											connection.query(query,[quantity, productname, retailerid],function(err, result, fields){
												if(err){
													console.log("error2");
												}
												else{
													console.log("success");
												}
											});
											query = "update retailer set Quantity = Quantity + ? where ProductName = ? and username = ?";
											connection.query(query,[quantity, productname, username],function(err, result, fields){
												if(err){
													console.log("error3");
												}
												else{
													console.log("success");
												}
											});
										}
										else {
											query = "update retailer set Quantity = Quantity - ? where ProductName = ? and username = ?";
											connection.query(query,[quantity, productname, retailerid],function(err, result, fields){
												if(err){
													console.log("error4");
												}
												else{
													console.log("success");
												}
											});

										}
									}
								});
								console.log("trans success");
							}
						});
					}
					var q = "delete from cart";
					connection.query(q, function(err, result, fields){
						if(err){
							console.log("err");
						}
						else{
							console.log("success");
							res.redirect("/Home");
						}
					});
				}
			});
		}
	});

});  
app.post("/BuyList", function(req, res){


		var query = "select * from cart ";
		connection.query(query ,function(err,result,fields){
			if(err){
				console.log("error");
			}
			else{
				console.log(result);
				res.render("Goods", {Goods: allGoods, cart: result});
			}
		});
	
});

app.get("/Profile", function(req, res){
	res.render("Profile", {cart: allCarts});
});

// to print data of user in profile
app.post("/Profile", function(req, res){
	var query = "select * from userinfo where username = username";
	connection.query(query,function(err, result, fields){
		if(err)
			console.log("error");
		else{
			console.log("success");
			res.render("/Profile", {cart: allCarts, userinfo : result});
		}
	});
});

// add products from profile
app.post("/addprodetails", function(req, res){
	var pname = req.body.pname,
		quantity = req.body.quantity,
		price = req.body.price;

	if(usertype == "wholeseller"){
		var query = "insert into wholeseller values ?";
		connection.query(query, [[[username, pname, quantity, price]]], function(err, result, fields){
			if(err)
				console.log("error");
			else{
				console.log("success");
				res.redirect("Profile");
			}
		});
	}
	if(usertype == "retailer"){
		var query = "insert into retailer values ?";
		connection.query(query, [[[username, pname, quantity, price]]], function(err, result, fields){
			if(err)
				console.log("error");
			else{
				console.log("success");
				res.redirect("Profile");
			}
		});
	}
});

//last 3 transactions
app.post("/showtrans", function(req, res){
	var query = "select * from transactions where BuyerId = ? order by Date desc";
	connection.query(query,[username], function(err, result, fields){
		if(err){
			console.log("error");
		}
		else{
			console.log("success");
			res.render("/Profile",{cart: allCarts, prevtrans : result});
		}
	});
});

//revenue of last few months
app.post("/revenue", function(req, res){
	var inidate = req.body.inidate;
	var findate = req.body.findate;
	var query = "select sum(price*Quantity) from transactions where SellerId = ? and Date >= ? and Date <= ?";
	connection.query(query, [username, inidate, findate], function(err, result, fields){
		if(err)
			console.log(error);
		else{
			console.log("success");
			res.render("/Profile",{cart: allCarts, revenue : result});
		}
	});
});

//host on 3000
app.listen(3000, function(){
	console.log ("Server Started!!!");
});