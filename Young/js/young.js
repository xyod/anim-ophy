//All distances in mm
var Nx,Ny,Nx1D
var canva = document.getElementById('canva')
var ctx = canva.getContext('2d')

var slits = {distance:0.5, width:0.05}
//var Source2 = {x:0, y:-10}
var wavelength = 0.0006 //µm
var imgData,intOnScreen
//var Phase = []

var screenDistance = 200
var screenHeight = 5

var sourcePts = [{theta: 0, phaseShift: 0}]
var NbSourcesMax = 200

var currentRGB = nmToRGBNorm(633)

//for (var o = 0; o < 100; o++) Phase.push(o/100)

function setSingleSourcePt(theta){
	if (!theta) sourcePts = [{theta: 0, phaseShift: 0}]
	else sourcePts = [{theta: 0, phaseShift: thetaToPhase(theta)}]
}

function setExtendedSource(theta0,deltaTheta){
	sourcePts = []
	offset = theta0-deltaTheta/2
	fact = deltaTheta/NbSourcesMax
	for (var i=0; i<NbSourcesMax; i++){
		theta = offset+i*fact
		sourcePts.push({theta: theta, phaseShift: thetaToPhase(theta)})
	}
}

function setDoubleExtendedSource(theta0,deltaTheta,deltaThetaDistance){
	sourcePts = []
	offset = theta0-deltaTheta/2-deltaThetaDistance/2
	fact = deltaTheta/NbSourcesMax/2
	for (var i=0; i<NbSourcesMax/2; i++){
		theta = offset+i*fact
		sourcePts.push({theta: theta, phaseShift: thetaToPhase(theta)})
	}
	offset = theta0-deltaTheta/2+deltaThetaDistance/2
	for (var i=0; i<NbSourcesMax/2; i++){
		theta = offset+i*fact
		sourcePts.push({theta: theta, phaseShift: thetaToPhase(theta)})
	}
}

function thetaToPhase(theta){

	return 2*Math.PI*slits.distance*Math.tan(theta)/wavelength

}

function yToMm(y){
	return (0.5-y/Ny)*screenHeight
}

function setWavelength(newWavelength){
	wavelength = newWavelength/1000/1000
	currentRGB = nmToRGBNorm(newWavelength)
}

function setSlitsDistance(distance){
	slits.distance = distance
}

function setSlitsWidth(width){
	slits.width = width
}

function setCanvaSize(width,height){
	Nx = width
	Ny = height
	Nx1D = Math.round(0.5*Nx)
	canva.setAttribute('height',height)
	canva.setAttribute('width',width+Nx1D)
	putCanvaInImgData()
}



function updateParams(params){
		
	setSlitsDistance(params.distance/1000)
	setSlitsWidth(params.width/1000)
	if (!params.extended) setSingleSourcePt(params.x0/1000/100)
	else setExtendedSource(params.x0/1000/100,params.deltax/1000/100)
	setWavelength(params.lambda)
	//paramChanged()
	updateDrawing()
	//updateSVG()

}

function updateDrawing(){
	ctx.clearRect(0,0,Nx+Nx1D,Ny)
	intOnScreen = []
	for (var j = 0; j < Ny; j++){
		localIntensity = getIntensity(j)
		for (var i = 0; i < Nx; i++){
			for (var k = 0; k<3; k++) imgData.data[(j*Nx+i)*4+k] = Math.round(localIntensity*currentRGB[k])
			imgData.data[(j*Nx+i)*4+3] = 255
			if (i == Nx-1) intOnScreen.push(localIntensity)
		}
	}
	ctx.putImageData(imgData, 0, 0)
	updatePlot()
}

function updatePlot(){
	ctx.beginPath()
	ctx.moveTo(intToCoord(intOnScreen[0]),0)
	for (var i = 0; i<intOnScreen.length; i++){
		ctx.lineTo(intToCoord(intOnScreen[i]),i)
	}
	ctx.strokeStyle = "#000000"
	ctx.stroke()
}

function getIntensity(y){
	myInt = 0
	nbSources = sourcePts.length
	var position = yToMm(y)
	for(var i = 0; i<nbSources;i++){
		delta = position*slits.distance/screenDistance
		myPhase = Math.PI*2*delta/wavelength+sourcePts[i].phaseShift
		myInt += (1+Math.cos(myPhase))*Math.pow(sincFunc(Math.PI*position*slits.width/wavelength/screenDistance),2)
	}
	return Math.round(127*myInt/nbSources)
}

function putCanvaInImgData(){
  imgData= ctx.getImageData(0,0,Nx,Ny)
}

function intToCoord(val){
  return Nx+val/255*Nx1D
}

function sincFunc(xx){

	if (xx!=0) return Math.sin(xx)/xx
	else return 1
	
}
  