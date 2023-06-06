const textArea = document.querySelector('.text-area');
const edit = document.querySelector('.edit');
const submit = document.querySelector('.submit');

edit.addEventListener('click', () => {
    edit.style.color = 'yellow'
    textArea.setAttribute('contenteditable', 'true');
    textArea.focus();
    if (textArea.textContent === 'Max 80 chars long')
        textArea.textContent = '';
})

submit.addEventListener('click', () => {
    textArea.blur();
    textArea.removeAttribute('contenteditable', 'true');
    if (textArea.textContent === '')
        textArea.textContent = 'Max 80 chars long';

})

document.addEventListener('click', (e) => {
    if (e.target !== edit && e.target !== textArea) {
        textArea.blur();
        textArea.removeAttribute('contenteditable', 'true');
        if (textArea.textContent === '')
            textArea.textContent = 'Max 80 chars long';
        edit.style.color = 'var(--color-1)';
    }
})
let userData;

fetchUserData();
async function fetchUserData() {
    await fetch('http://localhost:8080/graphData')
        .then(response => response.json())
        .then(data => {
            userData = data;
            google.charts.setOnLoadCallback(drawBasic);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}




google.charts.load('current', { packages: ['corechart', 'line'] });

function drawBasic() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Score');

    let dataArray = [];
    for (let i = 0; i < userData.score.length; i++) {
        dataArray.push([i + 1, parseInt(userData.score[i].wpm)]);
    }
    console.log(dataArray);

    data.addRows(dataArray);

    var options = {
        hAxis: {
            title: '',
            gridlines: { color: 'transparent' },
            baselineColor: 'transparent',
        },
        vAxis: {
            title: 'Score',
            gridlines: { color: 'transparent' },
            baselineColor: 'transparent',
            titleTextStyle: {
                fontSize: 20,
                color: "rgb(126, 87, 194)"
            }
        },
        backgroundColor: 'transparent', // Set background color to transparent
        chartArea: {
            backgroundColor: 'transparent' // Set chart area background color to transparent
        },
        colors: ['yellow'], // Set line color to yellow
        width: '100%',
        height: '100%',
        legend: 'none'
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}



google.charts.load("current", { packages: ["calendar"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
    dataTable.addRows([
        [new Date(2023, 6, 5), 1],
        [new Date(2023, 3, 14), 2],
        [new Date(2023, 3, 15), 3],
        [new Date(2023, 3, 16), 4],
        [new Date(2023, 3, 17), 5],
    ]);

    var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));

    var options = {
        calendar: {
            cellColor: {
                stroke: 'white',
                strokeOpacity: 0.5,
                strokeWidth: 1
            },
            cellSize: 18,
            dayOfWeekLabel: {
                fontName: 'Times-Roman',
                fontSize: 12,
                color: 'white',
                bold: false,
                italic: false
            },
            dayOfWeekRightSpace: 7,
            underMonthSpace: 12 ,
            numMonths: 6
        }
    };

    chart.draw(dataTable, options);
}