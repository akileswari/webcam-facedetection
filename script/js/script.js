var video ;

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo(){
    video = document.getElementById("inputVideo");
    navigator.getUserMedia(
        {video:{}},
        stream => video.srcObject = stream,
        err=> console.log(err)
    )
}

function facedection(){
    const canvas =faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const dispalySize = {width:video.width, height:video.height}
    faceapi.matchDimensions(canvas,dispalySize);
    setInterval(async () => {
        const detections= await faceapi.detectAllFaces(video,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizeddetections = faceapi.resizeResults(detections,dispalySize);
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
        faceapi.draw.drawDetections(canvas,resizeddetections);
    }, 100)
}

