const express = require("express");
const BodyParser = require("body-parser");
const https = require("https")
const request = require("request");

const app = express();
app.use(BodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res)
{
	res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req, res)
{
	const stock = req.body.stock;
	const ApiKey = "";
	const url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + stock +  "&apikey=" + ApiKey;
	res.setHeader('Content-type','text/html');
	https.get(url, function(response)
	{
		response.on("data", function(data)
		{
			const StockData = JSON.parse(data);
			const StockName = StockData.Name;
			const PE = StockData.PERatio;
			const PEG = StockData.PEGRatio;
			const PriceToBook = StockData.PriceToBookRatio;
			const ProfitMargin = StockData.ProfitMargin;
			const ROA = StockData.ReturnOnAssetsTTM;
			const ROE = StockData.ReturnOnEquityTTM;
			const PriceToSales = StockData.PriceToSalesRatioTTM;
			const EVToEBITDA = StockData.EVToEBITDA;
			const OPM = StockData.OperatingMarginTTM;
			const sector = StockData.Sector;

			res.render("index", 
			{
				StockName: StockName,
				sector: sector,
				stock: stock,
				PE: PE,
				PEG: PEG,
				PriceToBook: PriceToBook,
				ProfitMargin: ProfitMargin,
				ROA: ROA,
				ROE: ROE,
				PriceToSales: PriceToSales,
				EVToEBITDA: EVToEBITDA,
				OPM: OPM
			});
			
			
			
		});
	});
});




app.listen(process.env.PORT, function()
{
	console.log("Server is running on port 3000");
});

