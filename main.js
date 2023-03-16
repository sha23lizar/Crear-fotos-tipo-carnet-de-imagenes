const img = document.querySelector('img');
const caja = document.querySelector(".caja");
const contentImg = document.querySelector("#contentImg");
const boton = document.querySelector('button');

function startVideo(){
  navigator.getUserMedia = (navigator.getUserMedia ||
     navigator.wekitGetUserMedia ||
     navigator.mozGetUserMedia ||
     navigator.msGetUsermMedia );
     navigator.getUserMedia(
       {video:{}},
       stream => video.srcObject = stream, err => console.log(err)
     )
    }

boton.addEventListener("click",crearImg)

function crearImg(){
    console.log("cargando....")
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
        faceapi.nets.faceExpressionNet.loadFromUri("./models"),
        faceapi.nets.ageGenderNet.loadFromUri("./models")
    ]).then( async()=>{
        console.log("ya casi .....")
        const displaySize = {width:img.width , height:img.height}
        const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        const resizedDetections = faceapi.resizeResults(detections, displaySize) 
        var box = resizedDetections[0]._box; 
        console.log(box)       
        //caja.style.top = box._y+"px";
        //caja.style.left = box._x+"px";
        //caja.style.width = box._width+"px";
        //caja.style.height = box._height+"px";
        
        caja.style.width = box._width*1.65+"px";
        contentImg.style.left = (box._x-(box._width*0.3))*-1+"px";
        contentImg.style.top = (box._y-(box._height*0.6))*-1+"px";
        caja.style.overflow = "hidden";
        caja.style.height = box._height*1.8+"px";
        console.log("Listoooo")
        console.log(box)
        html2canvas(caja, {
            onrendered: function(canvas) {
                // document.body.appendChild(canvas);
                return Canvas2Image.saveAsPNG(canvas);
            }
        });
    })
}


async function crearCaja(){
    const displaySize = {width:img.width , height:img.height}
    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        const resizedDetections = faceapi.resizeResults(detections, displaySize) 
        var box = resizedDetections[0]._box;
        console.log(box)    
        //caja.style.top = box._y+"px";
        //caja.style.left = box._x+"px";
        //caja.style.width = box._width+"px";
        //caja.style.height = box._height+"px";

        caja.style.width = box._width*1.65+"px";
        caja.style.left = (box._x-(box._width*0.35))+"px";
        caja.style.top = (box._y-(box._height*0.65))+"px";
        caja.style.height = box._height*1.8+"px";


        console.log({displaySize,detections,resizedDetections,resizedDetections,canvas})
}