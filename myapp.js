
const all_emp_data = []

const current_week = [];

const prev_dates = [];

var week_start;


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
        return "Present";
    else if (item.classList.contains("two"))
        return "Half-Worked";
    else if (item.classList.contains("three"))
        return "Absent";
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
    if (cur_load)
        cur_week_status();
    else prev_week_status();
    });

    

function Get_Class(status) {
    const map = new Map();
    map.set('Present', "one");
    map.set('Half-Worked', "two");
    map.set('Absent', "three");
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

let week = [];

function Set_Date  ()  {
    
    
    if (current_week.length == 0) {
        for (let i = 1; i <= 7; i++) {
            let curr = new Date
            let first = curr.getDate() - curr.getDay() + i;
            let day = new Date(curr.setDate(first)).toISOString().slice(8, 10)
            let wk = new Date(curr.setDate(first)).toISOString().slice(0, 10)
            week.push(day);
            current_week.push(wk);
        }
    }
    
    document.getElementById('Mon').innerHTML = week[0];
    document.getElementById('Tue').innerHTML = week[1];;
    document.getElementById('Wed').innerHTML = week[2];;
    document.getElementById('Thurs').innerHTML = week[3];;
    document.getElementById('Fri').innerHTML = week[4];;
    header.innerHTML = `<h2>Current Week Efforts (Mon,${week[0]} - Fri,${week[4]})</p>`;
    if (prev_dates.length == 0) {
        for (var i = 6; i >= 2; i--) {
            var curr = new Date
            var first = curr.getDate() - curr.getDay();
            var last = first - i;
            var day = new Date(curr.setDate(last)).toISOString().split('T')[0];
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
    start_prevpage();
    prev.classList.remove("active");
    prev.classList.add("inactive");
    next.classList.remove("inactive");
    next.classList.add("active");
});

next.addEventListener('click', (e) => {
    cur_load = 1;
    //window.location.reload();
    start_curpage();
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
    console.log(JSON.stringify(Updated_data));
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
            header.innerHTML = `<h2>Previous Week Efforts (Mon,${prev_dates[0].week_.slice(-2)} - Fri,${prev_dates[4].week_.slice(-2)})</p>`;
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




window.onload = function () {
    setTimeout('', 1500);
    start_curpage();
    
}

function exp_prevpage() {

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
        url: '/Leave_/Get_Prev_week_data',
        async: true,
        contentType: "application/json",
        data: JSON.stringify(tmp_cur_week),
        success: function (result) {
            console.log(result);
            
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




