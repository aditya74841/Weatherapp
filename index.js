// require('dotenv').config();
const http = require("http");
const fs = require("fs");
var requests = require("requests");


const homeFile = fs.readFileSync("home.html", "utf-8");


const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", (orgVal.main.temp - 273.15).toPrecision(4));
  temperature = temperature.replace("{%tempmin%}", (orgVal.main.temp_min-273.15).toPrecision(4));
  temperature = temperature.replace("{%tempmax%}", (orgVal.main.temp_max-273.15).toPrecision(4));
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
       "https://api.openweathermap.org/data/2.5/weather?q=Bihar&appid=954af4098c30c8a61cd274fc7ff98b9f"
)
      .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
        // console.log(arrData[0].main.temp);
        const realTimeData = arrData
          .map((val) => replaceVal(homeFile, val))
          .join("");
        res.write(realTimeData);
        // console.log(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
  } else {
    res.end("File not found");
  }
});

server.listen(8000, "127.0.0.1");


















































// const http = require("http");
// const fs = require("fs");
// var requests = require("requests");

// const homeFile = fs.readFileSync("home.html", "utf-8");

// const replaceVal = (tempVal, orgVal) => {
//   let temperature = tempVal.replace("{%tempval%}", (orgVal.main.temp - 273.15).toPrecision(4));
//   temperature = temperature.replace("{%tempmin%}", (orgVal.main.temp_min-273.15).toPrecision(4));
//   temperature = temperature.replace("{%tempmax%}", (orgVal.main.temp_max-273.15).toPrecision(4));
//   temperature = temperature.replace("{%location%}", orgVal.name);
//   temperature = temperature.replace("{%country%}", orgVal.sys.country);
//   temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

//   return temperature;
// };

// const server = http.createServer((req, res) => {
//   if (req.url == "/") {
//     requests(
//       "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=954af4098c30c8a61cd274fc7ff98b9f"
//     )
//       .on("data", (chunk) => {
//         const objdata = JSON.parse(chunk);
//         const arrData = [objdata];
//         const realTimeData = arrData
//           .map((val) => replaceVal(homeFile, val))
//           .join("");
//         console.log(realTimeData);
   
//         // res.write(realTimeData);
//         // console.log(arrData[0].main.temp);
//       })

//       .on("end", (err) => {
//         if (err)
//           return console.log("connection closed due to error handling", err);
//         res.end();
//       });
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("sever started");
// });
