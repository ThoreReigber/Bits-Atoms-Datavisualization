console.log('Loading data...');

let table;
const canvasWidth = window.innerWidth;
const canvasHeight = 6000; // ⚠️ size limit if too long
const xPosAxis1 = 250; // px
const xPosAxis2 = 400; // px

// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0,0,0);
  stroke(1);
  stroke(0,0,0);

  const barMargin = 10;
  const barHeight = 30;

  // count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('current_city'));

  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    const meanTemp = table.get(i, 'Annual_Mean_Temperature');
    const futureMeanTemp = table.get(i, 'future_Annual_Mean_Temperature');

    position = i*100 +100;
    durchmesser = convertDegreesToDurchmesser(meanTemp);
    durchmesser2 = convertDegreesToDurchmesser(futureMeanTemp);

    futurePosition = i*100 +50;

     //convertDegreesToPosition(futureMeanTemp);
    drawTempFuture(futurePosition);
    drawLabelFuture(futurePosition, city, futureMeanTemp);
   

    drawConnectingLine(position, futurePosition);

  drawTempToday(position);
   drawLabelToday(position, city, meanTemp);
  }

  // drawAxes();
  // drawAxesLabels();
}

function convertDegreesToDurchmesser(temp) {
  // we need to map the temperatures to a new scale
  // 0° = 600px, 25° = 300px, 20° = 30px
  // https://p5js.org/reference/#/p5/map
  const durchmesser = map(temp, 0, 30, 10, 160);
  return durchmesser;
}


function convertDegreesToDurchmesser2(temp) {
  // we need to map the temperatures to a new scale
  // 0° = 600px, 25° = 300px, 20° = 30px
  // https://p5js.org/reference/#/p5/map
  const durchmesser2 = map(temp, 0, 30, 0, 160);
  return durchmesser2;
}

// the two temp drawing functions could also be combined into a single function
// adding the x-position as a new parameter. For simplicity we have two functions


function drawTempToday(pos) {
  fill('white');
  stroke('black');
  circle(xPosAxis1, pos, durchmesser);
}

function drawTempFuture(pos) {
  fill('yellow');
  stroke('white')
  circle(xPosAxis2, pos, durchmesser2);
  
}

function drawLabelToday(pos, city, temp) {
  fill('white');
  stroke('black')
  const label = `${city}: ${temp}°C`;
  text(label, xPosAxis1 + -190, pos + 5);
}

function drawLabelFuture(pos, city, temp) {
stroke(0);
fill('white');
  const label = `${city}: ${temp}°C`;
 
  text(label, xPosAxis2 + 70, pos + 5);
}

function drawConnectingLine(y1, y2) {
  stroke('yellow');
  
  line(xPosAxis1, y1, xPosAxis2, y2);
}


