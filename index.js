const currdate=document.getElementById("date");
let weathercon=document.getElementById("weathercon");
const tempStatus="Clouds";


const getCurrentDay=()=>{
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let currentTime=new Date();

    let day=weekday[currentTime.getDay()];
    return day;
};
getCurrentDay();
const getCurrentTime= ()=>{
    var months=[
        "jan",
        "feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var now=new Date();
    var month=months[now.getMonth()];
    var date=now.getDate();


    let hours=now.getHours();
    let mins=now.getMinutes();

    let periods ="AM";

    if(hours>11)
    {
        periods="PM";
        if(hours>12) hours-=12;    
    }
    if(mins<10)
    {
        mins="0"+mins;
    }
    // var year=now.getFullYear();
    console.log(month+"/"+date);
    return `${month}${date} | ${hours}:${mins}${periods} `
};

currdate.innerHTML=getCurrentTime()+"|" +getCurrentDay();