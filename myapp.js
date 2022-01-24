
const all_emp_data = []

const current_week = [];

const main = document.getElementById('main');

const submit = document.getElementById('btn');

const header = document.getElementById('head');

const All_Holiday_Data = {};


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


submit.addEventListener('click', (e) => {
    const Updated_data = [];
    var btns = document.querySelectorAll(".upd");

    Array.from(btns).forEach(item => {
        let name = '',vid='';
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
        //console.log(Updated_data);

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
                if (result[i].value == 'N/A') continue;
                let cls = Get_Class(result[i].value);
                var emp_element = document.getElementById(v_id).querySelector(day);
                emp_element.classList.add(cls);
                console.log(name + " " + day + " " + cls);
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

function Set_Date  ()  {
    let curr = new Date
    let week = [];
    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i;
        let day = new Date(curr.setDate(first)).toISOString().slice(8, 10)
        let wk = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        week.push(day);
        current_week.push(wk);
    }
    document.getElementById('Mon').innerHTML = week[0];
    document.getElementById('Tue').innerHTML = week[1];;
    document.getElementById('Wed').innerHTML = week[2];;
    document.getElementById('Thurs').innerHTML = week[3];;
    document.getElementById('Fri').innerHTML = week[4];;
    header.innerHTML = `<h2>Current Week Efforts (Mon,${week[0]} - Fri,${week[4]})</p>`;


    //console.log(current_week);
}

function all_start() {

    $(document).ready(function () {
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
                //Add Employee Details
                Add_Employee_details();
                //buttons
                Add_Days_function();
            }
            //,
            //complete: function (res) {
            //    Update_weekstatus_from_DB();
            //}

        })

    })
    //console.log(all_emp_data);

    //Display Week days Dates

    Set_Date();
    //Update_weekstatus_from_DB();

    //Update details of Employees from DB
}

window.onload = function () {
    setTimeout('', 1500);
        all_start();
    
}


//function reloadP() {
//    Update_weekstatus_from_DB();

//}


//let name='';
   //       	let day = Get_Date(item.id); 
   //       	let date = document.getElementById(day).innerHTML;
   //       	name = item.parentElement.parentElement.querySelector('#Emp_name').innerHTML;
   //       	var pr = item.parentNode;
   //       if(item.className =="box")
   //       {

   //       	item.className ="box active";
			// if(name in All_Holiday_Data)
   //       	{
   //       		All_Holiday_Data[name].push(date);
   //       	}
   //       	else
   //       	{
   //       		All_Holiday_Data[name] = new Array();
   //       		All_Holiday_Data[name].push(date);
   //       	}
   //       }
   //       else
   //       {
   //       	const index = All_Holiday_Data[name].indexOf(date);
			// if (index > -1) {
  	// 			All_Holiday_Data[name].splice(index, 1);
			// 	}
			// 	if(All_Holiday_Data[name].length == 0)
			// 		delete All_Holiday_Data[name];
   //        	item.className ="box";
   //    	}
