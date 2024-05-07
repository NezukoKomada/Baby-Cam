function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();
    objectdetector = ml5.objectDetector('cocssd', modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}
check = "";
objects = [];

function preload(){
    //soundFormats('mp3');
    alarm = loadSound("MV27TES-alarm.mp3");
}

function draw(){
    image(video, 0, 0, 600, 500);
    if(check == true){
        objectdetector.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        for(i=0; i<objects.length; i++){
            if(objects[i].label == "person"){
                alarm.stop();
                document.getElementById("status").innerHTML = "Status: Baby Found!!!";
                fill(r, g, b);
                percent = floor(objects[i].confidence*100);
                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
                noFill()
                stroke(r, g, b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
        
        for(i=0; i<objects.length; i++){
            if(objects[i].label != "person"){
                alarm.play();
                document.getElementById("status").innerHTML = "Status: Baby Not Found!!!!!"
            }
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded");
    check = true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}