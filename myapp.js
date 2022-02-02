

const all_emp_data = []

const current_week = [];

const prev_dates = [];

var week_start;

const img_url = [
    //Jan - 4
    ["https://images.unsplash.com/photo-1484313544071-4d67c88b99be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
        "https://images.unsplash.com/photo-1513267257196-91be473829b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
        "https://images.unsplash.com/photo-1482331336918-c80fab6c90f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
        "https://images.unsplash.com/photo-1483737946376-7c6c89443adb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"],
    //Feb -4
    ["https://images.unsplash.com/photo-1420585269105-d908ec316eb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1514377006585-6e7975371bd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
        "https://images.unsplash.com/photo-1482003297000-b7663a1673f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1507652400761-fa6f1489004a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        
    ],
    //MArch-4
    ["https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1608463026422-8f43ab4ebac0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1559150182-a7144f7628f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
        "https://images.unsplash.com/photo-1485431142439-206ba3a9383e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=766&q=80"],
    //April -4
    ["https://images.unsplash.com/photo-1558172474-9c7c194c7d06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80",
        "https://images.unsplash.com/photo-1592356986971-68c56631013f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1543862475-eb136770ae9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
        "https://images.unsplash.com/photo-1456415333674-42b11b9f5b7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"],
    //May -4
    ["https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1497321697169-1ca9f1c8a253?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
        "https://images.unsplash.com/photo-1517260911058-0fcfd733702f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=943&q=80"],
    //June -4
    ["https://images.pexels.com/photos/1209611/pexels-photo-1209611.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/712395/pexels-photo-712395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/1834609/pexels-photo-1834609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/2388650/pexels-photo-2388650.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"],
    //July-4
    ["https://images.unsplash.com/photo-1502389571309-3ab1b64625b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1513986615308-8f59cc8a16e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "https://images.pexels.com/photos/2527563/pexels-photo-2527563.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"],
    //Aug -4
    ["https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1483737946376-7c6c89443adb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        "https://images.unsplash.com/photo-1514377006585-6e7975371bd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
        "https://images.unsplash.com/photo-1517260911058-0fcfd733702f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=943&q=80"],
    //Sep-4
    ["https://images.unsplash.com/photo-1508264165352-258db2ebd59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80",
        "https://images.unsplash.com/photo-1538580619159-6c19131e1062?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        "https://images.unsplash.com/photo-1459478309853-2c33a60058e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
"https://images.unsplash.com/photo-1609779414353-ffa4ed701701?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGF1dHVtbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"    ],
    //Oct-4
    ["https://images.unsplash.com/photo-1508454114099-35ca71420685?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80",
        "https://images.unsplash.com/photo-1508454114099-35ca71420685?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80",
        "https://images.unsplash.com/photo-1546810587-d0bea73bc463?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
        "https://images.unsplash.com/photo-1540649514368-b057281b4a0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"],
    //Nov-4
    ["https://images.unsplash.com/photo-1420585269105-d908ec316eb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/219837/pexels-photo-219837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"],
    //Dec-4
    ["https://cdn.pixabay.com/photo/2021/11/19/15/21/christmas-6809681_960_720.png", "https://images.unsplash.com/photo-1545048702-79362596cdc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1479740030693-66ad10f3a7b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1575110169156-4b67c0d8c336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=401&q=80",
"https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"    ]
]

var prev_month_st, prev_month_end;

let cur_load = 1;

const main = document.getElementById('main');

const submit = document.getElementById('btn');

const header = document.getElementById('head');

const All_Holiday_Data = {};

const exp_btn = document.getElementById('exp-btn');

const prev = document.getElementById('prev');

const next = document.getElementById('next');

const Get_status = (item) => {
    if (item.classList.contains("one"))
        return "Worked";
    else if (item.classList.contains("two"))
        return "Half-Worked";
    else if (item.classList.contains("three"))
        return "On Leave";
    else if (item.classList.contains("four"))
        return "Holiday";
    else return "N/A";
}

function cur_week_status() {
    const Updated_data = [];
    var btns = document.querySelectorAll(".upd");
    Array.from(btns).forEach(item => {
        let name = '', vid = '';
        let day = Get_Date(item.id);
        let week_date = Get_week_date(item.id);
        //console.log(item.id);
        let date = document.getElementById(day).innerHTML;
        name = item.parentElement.parentElement.querySelector('#Emp_name').innerHTML;
        vid = item.parentElement.parentElement.querySelector('#Emp_id').innerHTML;
        var pr = item.parentNode;
        item.classList.remove("upd");
        //console.log(name + " " + week_date + " "+ item.className);
        let status = (Get_status(item))
        var sendinfo = {
            Name_: name,
            Vid_: vid,
            Day_: item.id,
            Date_: week_date,
            Value_: status
        };
        Updated_data.push(sendinfo);
    });
    setTimeout('', 2000);
    //console.log(JSON.stringify(Updated_data));
    $.ajax({
        type: "Post",
        url: '/Leave_/Get_upd_Data',
        async: true,
        contentType: "application/json",
        data: JSON.stringify(Updated_data),
        success: function (actionInfo) {
            if (actionInfo.Success) {
                alert('Efforts updated successfully');
            }
        },
        failure: function () {
            alert('Efforts not updated');
        }
    });
}

submit.addEventListener('click', (e) => {
    var btns = document.querySelectorAll(".upd");
    if (btns.length == 0) {
        setTimeout(function () {

            alert("No updates recognised by system");

        }, 2000);
    }
    else {
        if (cur_load)
            cur_week_status();
        else prev_week_status();
    }
    
    });

    

function Get_Class(status) {
    const map = new Map();
    map.set('Worked', "one");
    map.set('Half-Worked', "two");
    map.set('On Leave', "three");
    map.set('Holiday', "four");
    
    return map.get(status);
}


const Get_week_date = (day) => {
    const map = new Map();
    map.set('Monday', current_week[0]);
    map.set('Tuesday', current_week[1]);
    map.set('Wednesday', current_week[2]);
    map.set('Thursday', current_week[3]);
    map.set('Friday', current_week[4]);
    map.set(current_week[0], 'Monday');
    map.set(current_week[1], 'Tuesday');
    map.set(current_week[2], 'Wednesday',);
    map.set(current_week[3], 'Thursday');
    map.set(current_week[4], 'Friday');
    return map.get(day);
}

function Update_weekstatus_from_DB() {

    $.ajax({
        type: "GET",
        url: '/Leave_/Get_week_status',
        success: function (result) {
            //console.log(result);
            var rowcount = result.length;
            for (var i = 0; i < rowcount; i++) {
                let name = result[i].name, v_id = result[i].vid, day = "#" + Get_week_date(result[i].date);
                if (result[i].value == 'N/A'||  Get_Class(result[i].value)==null) continue;
                let cls = Get_Class(result[i].value);
               // console.log( Get_Class(result[i].value));
                var emp_element = document.getElementById(v_id).querySelector(day);
                if (emp_element)
                emp_element.classList.add(cls);
                //console.log(name + " " + day + " " + cls);
            }
        },
        failure: function () {
            alert("Couldn't get data from DB");
        }
    })

    const foot = document.getElementById("foot");
    foot.innerHTML = `<p>
                    <b>Worked</b>
                    <span id="cbox-1"></span>
                </p>
                <p>
                    <b>Half-Worked</b>
                    <span id="cbox-2"></span>
                </p>
                <p>
                    <b>On Leave</b>
                    <span id="cbox-3"></span>
                </p>
                <p>
                    <b>Holiday</b>
                    <span id="cbox-4"></span>
                </p>
                <p>
                    <b>Need to be filled</b>
                    <span id="cbox-5"></span>
                </p>`;

    const note = document.getElementById("note");
    note.innerHTML = `Note: Please try clicking on the corresponding rectangular cell to alter the status of each day.`;

}

function Add_Employee_details() {
    for (var i = 0; i < all_emp_data.length; i++) {
        var emp_name = all_emp_data[i][0], emp_id = all_emp_data[i][1];
        const ch = document.createElement('div');
        ch.classList.add('div');

        ch.innerHTML = `
		 <div class = "Emp" id="${emp_id}">
            <div class="Details">
                <h3 id="Emp_name" class="Emp_name">${emp_name}</h3>
                <h3 id="Emp_id">${emp_id}</h3>
            </div>
            <div class="grid">
                <div class ="box" id="Monday"></div>
                <div class ="box" id="Tuesday"></div>
                <div class ="box" id="Wednesday"></div>
                <div class ="box" id="Thursday"></div>
                <div class ="box" id="Friday"></div>
            </div>                      
        </div>`;

        main.appendChild(ch);
    }

    setTimeout('', 1500);

    Update_weekstatus_from_DB();

    
}

function Get_Date  (day)  {
    const map = new Map();
    map.set('Monday', 'Mon');
    map.set('Tuesday', 'Tue');
    map.set('Wednesday', 'Wed');
    map.set('Thursday', 'Thurs');
    map.set('Friday', 'Fri');
    return map.get(day);
};

function Add_Days_function  ()  {
    var btns = document.querySelectorAll(".box");
    Array.from(btns).forEach(item => {
        item.addEventListener("click", () => {
            if (item.classList.contains("one")) {
                item.classList.add("two");
                item.classList.remove("one");
            }
            else if (item.classList.contains("two")) {
                item.classList.add("three");
                item.classList.remove("two");
            }
            else if (item.classList.contains("three")) {
                item.classList.add("four");
                item.classList.remove("three");
            }
            else if (item.classList.contains("four")) {
                item.className = "box";
            }
            else {
                item.className = "box one";
            }
            item.classList.add("upd");

        });
    });
}
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let week = [];
var month_st, month_end;
function Set_Date  ()  {

    
    
    if (current_week.length == 0) {
        for (let i = 1; i <= 7; i++) {
            let curr = new Date;
            let first = curr.getDate() - curr.getDay() + i;
            var full_day = new Date(curr.setDate(first));
            let day = full_day.toISOString().slice(8, 10);
            let wk = full_day.toISOString().slice(0,10);
            if (i == 1) {
                month_st = (month[full_day.getMonth()]).slice(0,3);
            }
            if (i == 5) {
                month_end = (month[full_day.getMonth()]).slice(0, 3);
            }
            week.push(day);
            current_week.push(wk);
        }
    }
    
    document.getElementById('Mon').innerHTML = week[0];
    document.getElementById('Tue').innerHTML = week[1];;
    document.getElementById('Wed').innerHTML = week[2];;
    document.getElementById('Thurs').innerHTML = week[3];;
    document.getElementById('Fri').innerHTML = week[4];;
    header.innerHTML = `<h2>Current Week Efforts (${month_st} Mon,${week[0]} - ${month_end} Fri,${week[4]})</p>`;



    if (prev_dates.length == 0) {
        for (var i = 6; i >= 0; i--) {
            var curr = new Date
            var first = curr.getDate() - curr.getDay();
            var last = first - i;
            var full_day = new Date(curr.setDate(last));

            var day = full_day.toISOString().split('T')[0];
            if (i == 6)
                prev_month_st = month[full_day.getMonth()].slice(0, 3);
            if (i == 2)
                prev_month_end = month[full_day.getMonth()].slice(0, 3);;
            var obj = {
                week_: day
            }
            prev_dates.push(obj);
        }
    }
    
    //console.log(prev_dates);
}

function start_curpage() {

   
    if (all_emp_data.length == 0) {
        $.ajax({
            type: "GET",
            url: '/Leave_/GetData1',
            success: function (result) {
                rowcount = result.length;
                for (var i = 0; i < rowcount; i++) {
                    const tmp = [result[i].name, result[i].vid];

                    all_emp_data.push(tmp);
                }

                main.innerHTML = ``;
                setTimeout('', 2000);

                Add_Employee_details();

                Add_Days_function();
            }
        })
    }
    else {
        main.innerHTML = ``;
        setTimeout('', 2000);

        Add_Employee_details();

        Add_Days_function();
    }
    Set_Date();
    
}




const Get_prev_week_date = (day) => {
    const map = new Map();
    map.set('Monday', prev_dates[0].week_);
    map.set('Tuesday', prev_dates[1].week_);
    map.set('Wednesday', prev_dates[2].week_);
    map.set('Thursday', prev_dates[3].week_);
    map.set('Friday', prev_dates[4].week_);
    map.set(prev_dates[0].week_, 'Monday');
    map.set(prev_dates[1].week_, 'Tuesday');
    map.set(prev_dates[2].week_, 'Wednesday',);
    map.set(prev_dates[3].week_, 'Thursday');
    map.set(prev_dates[4].week_, 'Friday');
    return map.get(day);
}


prev.addEventListener('click', (e) => {
    cur_load = 0;
    //window.location.reload();
    
    
    setTimeout(function () {
        start_prevpage();

        alert("Please wait while fetching previous week data");

    }, 2000);
    prev.classList.remove("active");
    prev.classList.add("inactive");
    next.classList.remove("inactive");
    next.classList.add("active");
});

next.addEventListener('click', (e) => {
    cur_load = 1;
    //window.location.reload();
   
    
    setTimeout(function () {
        start_curpage();
        alert("Please wait while fetching current week data");
        
    }, 2000);
    prev.classList.remove("inactive");
    prev.classList.add("active");
    next.classList.remove("active");
    next.classList.add("inactive");
});

function prev_week_status() {
    const Updated_data = [];
    var btns = document.querySelectorAll(".upd");
    Array.from(btns).forEach(item => {
        let name = '', vid = '';
        let day = Get_Date(item.id);
        let week_date = Get_prev_week_date(item.id);
        //console.log(item.id);
        let date = document.getElementById(day).innerHTML;
        name = item.parentElement.parentElement.querySelector('#Emp_name').innerHTML;
        vid = item.parentElement.parentElement.querySelector('#Emp_id').innerHTML;
        var pr = item.parentNode;
        item.classList.remove("upd");
        //console.log(name + " " + week_date + " "+ item.className);
        let status = (Get_status(item))
        var sendinfo = {
            Name_: name,
            Vid_: vid,
            Day_: item.id,
            Date_: week_date,
            Value_: status
        };
        Updated_data.push(sendinfo);
    });
    setTimeout('', 2000);
    //console.log(JSON.stringify(Updated_data));
    $.ajax({
        type: "Post",
        url: '/Leave_/Get_upd_Data',
        async: true,
        contentType: "application/json",
        data: JSON.stringify(Updated_data),
        success: function (actionInfo) {
            if (actionInfo.Success) {
                alert('Efforts updated successfully');
            }
        },
        failure: function () {
            alert('Efforts not updated');
        }
    });
}



function start_prevpage() {
    //console.log(prev_dates);
    $.ajax({
        type: "Post",
        url: '/Leave_/Get_Prev_week_data',
        async: true,
        contentType: "application/json",
        data: JSON.stringify(prev_dates),
        success: function (result) {
            //console.log(result);
            document.getElementById('Mon').innerHTML = prev_dates[0].week_.slice(-2);
            document.getElementById('Tue').innerHTML = prev_dates[1].week_.slice(-2);;
            document.getElementById('Wed').innerHTML = prev_dates[2].week_.slice(-2);;
            document.getElementById('Thurs').innerHTML = prev_dates[3].week_.slice(-2);;
            document.getElementById('Fri').innerHTML = prev_dates[4].week_.slice(-2);;
            header.innerHTML = `<h2>Previous Week Efforts (${prev_month_st} Mon,${prev_dates[0].week_.slice(-2)} - ${prev_month_end} Fri,${prev_dates[4].week_.slice(-2)})</p>`;
            main.innerHTML = ``;
            setTimeout('', 2000);
            for (var i = 0; i < all_emp_data.length; i++) {
                var emp_name = all_emp_data[i][0], emp_id = all_emp_data[i][1];
                const ch = document.createElement('div');
                ch.classList.add('div');

                ch.innerHTML = `
		    <div class = "Emp" id="${emp_id}">
            <div class="Details">
                <h3 id="Emp_name" class="Emp_name">${emp_name}</h3>
                <h3 id="Emp_id">${emp_id}</h3>
            </div>
            <div class="grid">
                <div class ="box" id="Monday"></div>
                <div class ="box" id="Tuesday"></div>
                <div class ="box" id="Wednesday"></div>
                <div class ="box" id="Thursday"></div>
                <div class ="box" id="Friday"></div>
            </div>                      
        </div>`;
                main.appendChild(ch);
            }

            var rowcount = result.length;
            for (var i = 0; i < rowcount; i++) {
                let name = result[i].name, v_id = result[i].vid, day = "#" + Get_prev_week_date(result[i].date);
                if (result[i].value == 'N/A' || Get_Class(result[i].value) == null) continue;
                let cls = Get_Class(result[i].value);
                //console.log(result[i].date);
                // console.log( Get_Class(result[i].value));
                var emp_element = document.getElementById(v_id).querySelector(day);
                if (emp_element)
                    emp_element.classList.add(cls);
                //console.log(name + " " + day + " " + cls);
            }
            Add_Days_function();
        },
        failure: function () {
            alert('data not received from DB');
        }
    });
}


const load_bg_img = () => {
    const d = new Date();
    let month = d.getMonth();
    var sz = img_url[month].length;
    var ind = Math.floor((Math.random() * (sz - 0)) + 0) % sz;
    console.log(ind);
    var fin_img = "url(" + img_url[month][ind] + ")";

    $("body").css("background-image", fin_img);
}

window.onload = function () {
    setTimeout('', 1500);
    start_curpage();
    load_bg_img();
}

var data_emp_order = ["v-dhnair", "v-inpalit", "v-kthamosh", "v-lakreddy", "v-ladivishnu", "v-mohsah", "v-mokund", "v-nagumm", "v-pjaswanth", "v-prpale", "v-tejaswip", "v-bashasha",
    "v-santpo", "v-krsath", "v-sogodd", "v-smohaseen", "v-venkumar", "v-vinkar"];

function exp_prevpage() {
    var tmp_prev_week = [];
    //console.log(prev_dates);
    for (var i = 0; i < prev_dates.length; i++) {
        tmp_prev_week.push(prev_dates[i].week_);
    }
    //console.log(tmp_prev_week)
    $.ajax({
        type: "Post",
        url: '/Leave_/Get_Prev_week_data',
        async: true,
        contentType: "application/json",
        data: JSON.stringify(prev_dates),
        success: function (result) {
            //console.log(result);
            var data = new Map;
            for (var i = 0; i < result.length; i++) {
                let name = result[i].name, vid = result[i].vid, date = result[i].date, value = result[i].value;
                data[vid + "_" + date] = value;
            }
            //console.log(data);
            Generate_excel(data, tmp_prev_week);
        },
        failure: function () {
            alert('data not received from DB');
        }
    });

}

function Get_exp_status(stat) {
    if (stat == "Worked" || stat == "Half-Worked")
        return "8";
    if (stat == "On Leave")
        return "0";
    if (stat == "Holiday")
        return stat;
    return null;
}


function Generate_excel(data, week) {
    //console.log(week);
    var Result = [];
    var head = ["Vid"];
    for (var i = 0; i < week.length-2; i++) {
        if (i == 0)
            head.push("Mon-" + week[i].slice(-2) );
        if (i == 1)
            head.push("Tue-" + week[i].slice(-2) );
        if (i == 2)
            head.push("Wed-" + week[i].slice(-2) );
        if (i == 3)
            head.push("Thurs-" + week[i].slice(-2));
        if (i == 4)
            head.push("Fri-" + week[i].slice(-2));
    }
    Result.push(head);
    for (var i = 0; i < data_emp_order.length; i++) {
        var tmp = [data_emp_order[i]], vid = data_emp_order[i];
        for (var j = 0; j < week.length-2; j++) {
            var tmp_val = Get_exp_status(data[vid + "_" + week[j]]);
            if (tmp_val) {
                tmp.push(tmp_val);
            }
            else tmp.push("");
        }
        Result.push(tmp);
        //console.log(tmp);
    }
   // console.log(Result);
    setTimeout(function () {
        $.ajax({
            type: "Post",
            url: '/Leave_/Export_excel',
            async: true,
            contentType: "application/json",
            data: JSON.stringify(Result),
            success: function (result) {

                //if (result.Success)
                //    console.log("file sent to export");
            },
            failure: function () {
                alert('data not send to Excel export');
            }
        });
        alert("Please wait while fetching current week data");

    }, 2000);
   




}

function exp_curpage() {
    var tmp_cur_week = [];
   
    for (var i = 0; i < current_week.length; i++) {
        var tmp = {
            week_: current_week[i]
        }
        tmp_cur_week.push(tmp);
    }

    $.ajax({
        type: "Post",
        //using prev week function for getting current week data from DB
        url: '/Leave_/Get_Prev_week_data',
        async: true,
        contentType: "application/json",
        data: JSON.stringify(tmp_cur_week),
        success: function (result) {
            //console.log(result);
            var data = new Map;
            for (var i = 0; i < result.length; i++) {
                let name = result[i].name,vid = result[i].vid, date = result[i].date, value = result[i].value;
                data[ vid + "_" + date] = value;
            }
            //console.log(data);
            Generate_excel(data, current_week);
        },
        failure: function () {
            alert('data not received from DB');
        }
    });
    
}

exp_btn.addEventListener('click', (e) => {
    if (next.classList.contains("inactive"))
        exp_curpage();
    else exp_prevpage();
});






  //console.log(week);
    //var Result = [];
    //var head = ["Vid"];
    //for (var i = 0; i < week.length-2; i++) {
    //    if (i == 0)
    //        head.push("Mon-" + week[i].slice(-2) );
    //    if (i == 1)
    //        head.push("Tue-" + week[i].slice(-2) );
    //    if (i == 2)
    //        head.push("Wed-" + week[i].slice(-2) );
    //    if (i == 3)
    //        head.push("Thurs-" + week[i].slice(-2));
    //    if (i == 4)
    //        head.push("Fri-" + week[i].slice(-2));
    //}
    //Result.push(head);
    //for (var i = 0; i < data_emp_order.length; i++) {
    //    var tmp = [data_emp_order[i]], vid = data_emp_order[i];
    //    for (var j = 0; j < week.length-2; j++) {

    //        var tmp_val = Get_exp_status(data[vid + "_" + week[j]]);
    //        if (tmp_val) {
    //            tmp.push(tmp_val);
    //        }
    //        else tmp.push("");
    //    }
    //    Result.push(tmp);
    //}

    //var csvContent = '';

    //Result.forEach(function (RowItem, RowIndex) {
    //    RowItem.forEach(function (ColItem, ColIndex) {
    //        csvContent += ColItem + ',';
    //        if (ColItem == "8")
    //            RowItem.getCell(ColIndex).font = { color: { argb: "004e47cc" } };
    //    });
    //    csvContent += "\r\n";
    //});


    //var download = function (content, fileName, mimeType) {
    //    var a = document.createElement('a');
    //    mimeType = mimeType || 'application/octet-stream';

    //    if (navigator.msSaveBlob) { 
    //        navigator.msSaveBlob(new Blob([content], {
    //            type: mimeType
    //        }), fileName);
    //    } else if (URL && 'download' in a) { 
    //        a.href = URL.createObjectURL(new Blob([content], {
    //            type: mimeType
    //        }));
    //        a.setAttribute('download', fileName);
    //        document.body.appendChild(a);
    //        a.click();
    //        document.body.removeChild(a);
    //    } else {
    //        location.href = 'data:application/octet-stream,' + encodeURIComponent(content); 
    //    }
    //}

    //download(csvContent, 'Weekly-Data.csv', 'text/csv;encoding:utf-8');
