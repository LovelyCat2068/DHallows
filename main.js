song = "";
rightwrX = 0;
rightwrY = 0;
leftwrX = 0;
leftwrY = 0;
slw =0;
srw =0;
function preload(){
    song = loadSound("Harry Potter.mp3");
}

function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    Co = ml5.poseNet(video, modelL0aded);
    Co.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.lenght > 0){
        console.log(results);
        rightwrX = results[0].pose.rightWrist.x;
        rightwrY = results[0].pose.rightWrist.y;
        leftwrX = results[0].pose.leftWrist.x;
        leftwrY = results[0].pose.leftWrist.y;
        slw = results[0].pose.keypoints[9].score;
        srw = results[0].pose.keypoints[10].score;
    }
}

function modelL0aded(){
    console.log("Posenet is initialised");
}

function draw(){
    image(video, 0, 0, 300, 300);
    fill('#2d4161');
    stroke('#2d4161');
    if(slw > 0.2){
        circle(leftwrX, leftwrY, 20);
        nolw = Number(leftwrY);
        resy = floor(nolw);
        newvolume = resy/500;
        document.getElementById('volume').innerHTML ='Volume is '+ newvolume;
        song.setVolume(newvolume);
    }
    if(srw >0.2){
        circle(rightwrX, rightwrY, 20);
        if(rightwrY>0 && rightwrY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } 
        else if(rightwrY>100 && rightwrY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } 
        else if(rightwrY>200 && rightwrY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } 
        else if(rightwrY>300 && rightwrY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        } 
        else if(rightwrY>400){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        } 
    }
}

function pumpkinPasties(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}