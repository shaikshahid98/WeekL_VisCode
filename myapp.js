

const all_emp_data = []



const main = document.getElementById('main');

const submit = document.getElementById('btn');

const header = document.getElementById('head');

const All_Holiday_Data = {};

submit.addEventListener('click', (e) => {

    console.log(All_Holiday_Data);
});

const Add_Employee_details = () => {
    for (var i = 0; i < all_emp_data.length; i++) {
        var emp_name = all_emp_data[i][0], emp_id = all_emp_data[i][1];
        const ch = document.createElement('div');
        ch.classList.add('div');

        ch.innerHTML = `
		 <div class = "Emp">
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
}

const Get_Date = (day) => {
    const map = new Map();
    map.set('Monday', 'Mon');
    map.set('Tuesday', 'Tue');
    map.set('Wednesday', 'Wed');
    map.set('Thursday', 'Thurs');
    map.set('Friday', 'Fri');
    return map.get(day);
};

const Add_Days_function = () => {
    var btns = document.querySelectorAll(".box");
    Array.from(btns).forEach(item => {
        item.addEventListener("click", () => {
            if (item.className == "box") {
                item.className = "box one";
            }
            else if (item.className == "box one") {
                item.className = "box two";
            }

            else if (item.className == "box two") {
                item.className = "box three";
            }
            else if (item.className == "box three") {
                item.className = "box four";
            }
            else {
                item.className = "box";
            }

        });
    });
}

const Set_Date = () => {
    let curr = new Date
    let week = [];
    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i;
        let day = new Date(curr.setDate(first)).toISOString().slice(8, 10)
        week.push(day);
    }
    document.getElementById('Mon').innerHTML = week[0];
    document.getElementById('Tue').innerHTML = week[1];;
    document.getElementById('Wed').innerHTML = week[2];;
    document.getElementById('Thurs').innerHTML = week[3];;
    document.getElementById('Fri').innerHTML = week[4];;
    header.innerHTML = `<h2>Current Week Leaves (Mon,${week[0]} - Fri,${week[4]})</p>`;
}

window.onload = function () {
   
        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: '/home/GetData1',
                success: function (result) {
                    rowcount = result.length;
                    for (var i = 0; i < rowcount; i++) {
                        const tmp = [result[i].name, result[i].vid];
                        //tmp.push(result[i].name);
                        //tmp.push(result[i].vid);
                        all_emp_data.push(tmp);
                    }

                    main.innerHTML = ``;
                    //Add Employee Details
                    Add_Employee_details();
                    //buttons
                    Add_Days_function();
                    //Display Week days Dates
                    Set_Date();
                }
            })
        })
    console.log(all_emp_data);
    
    
}



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
