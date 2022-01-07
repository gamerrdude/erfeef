Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@gamerrdude 
gamerrdude
/
erfeef
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
erfeef/main.js /
@gamerrdude
gamerrdude Update main.js
Latest commit d1783fa 17 seconds ago
 History
 1 contributor
108 lines (86 sloc)  2.7 KB
   
song = "";

function preload()
{
    song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas =  createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
	console.log('PoseNet Is Initialized');
  }
  
  function gotPoses(results)
  {
	if(results.length > 0)
	{
	  scoreRightWrist =  results[0].pose.keypoints[10].score;
	  scoreLeftWrist =  results[0].pose.keypoints[9].score;
	  console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	  
	  rightWristX = results[0].pose.rightWrist.x;
	  rightWristY = results[0].pose.rightWrist.y;
	  console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
  
	  leftWristX = results[0].pose.leftWrist.x;
	  leftWristY = results[0].pose.leftWrist.y;
	  console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		  
	}
  }
  

  function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0001");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    { 
        circle(lefttWristX,leftWristY,20);

        if(leftWristY >0 && leftWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";  
     
            song.rate(0.1);
        }
        else if(lefttWristY >100 && lefttWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";      
            song.rate(1);
        }
        else if(lefttWristY >200 && leftWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";        
       
			song.rate(1.5);
        }
        else if(lefttWristY >300 && leftWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";      
            song.rate(2);
        }
        else if(leftWristY >400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";        
            song.rate(2.9);
        }
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        InNumberrightWristY = Number(righttWristY);
        new_rightWristY = floor(InNumberrightWristY *2);
        rightWristY_divide_1000 = new_rightWristY/1000;
        document.getElementById("volume").innerHTML = "Volume = " + righttWristY_divide_1000;     
        song.setVolume(righttWristY_divide_1000); 
    }

}

function play()
{
    song.play();
    song.setVolume(9999);
    song.rate(1);
}
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete
