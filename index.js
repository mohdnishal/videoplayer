let playButton=document.getElementById("play-btn");
let video=document.querySelector(".video");
let videoPlayer=document.querySelector(".video-player");
let progressBar=document.querySelector(".progress-bar");
let progressRange=document.querySelector(".progress-range");
let volumeBar=document.querySelector(".volume-bar");
let volumeRange=document.querySelector(".volume-range");
let time=document.querySelector(".time");
let timeElapsed=document.querySelector(".time-elapsed");
let timeDuration=document.querySelector(".time-duration");
let volumeIcon=document.getElementById("volume-icon");
let fullScreen=document.getElementById("fullscreen");
let playerSpeed=document.querySelector(".player-speed");
let videoPlaying=false;



//video play when play button click & video pause

function videoPlay()
{
    if(videoPlaying==false){
    video.play();
    videoPlaying=true;
    playButton.classList.replace("fa-play", "fa-pause");

    }
    else{
        video.pause();
        videoPlaying=false;
        playButton.classList.replace("fa-pause", "fa-play");

    }
}
//progress bar
    function progressbar(event){
        // console.log(event.target.currentTime,event.target.duration);
        let curretTime=event.target.currentTime;
        let duration=event.target.duration;
        
        progressBar.style.cssText=`width:${(curretTime)/(duration)*100}%`
       timeElapsed.innerHTML=`00:${Math.floor(curretTime)}`;
        timeDuration.innerHTML=`-00:${Math.floor(duration)-Math.floor(curretTime)}`;

    } 
    //update progress
    function updateProgress(event)
    {
        // console.log(event.offsetX,event.target.clientWidth);
        let offset=event.offsetX;
        let clientWidth=this.clientWidth;
        let range=((offset)/(clientWidth))*video.duration;
        video.currentTime=range;
        
    }
    //volume

    function volumeUpdateRange(event){
        
         let offset=event.offsetX;
         let clientWidth=this.clientWidth;
         let range=((offset)/(clientWidth))*100;
         volumeBar.style.cssText=`width:${(range)}%`
          let vdo=  video.volume=(range/100);
            console.log( video.volume=(range/100))
        
        if(vdo==-0)
        {
            volumeIcon.classList.remove("fa-volume-up")
            volumeIcon.classList.add("fas","fa-volume-mute")
        }
        else if(vdo>0){
            volumeIcon.classList.remove("fa-volume-mute")
            volumeIcon.classList.add("fas","fa-volume-up")


        }
    }
    //volume mute
    function volumeMute(e){
        
        if(e.target.classList[1]==="fa-volume-up"){
            volumeIcon.classList.remove("fa-volume-up")
            volumeIcon.classList.add("fas","fa-volume-mute")
            volumeBar.style.cssText=`width:0`
            video.volume=0;
        }
        else if(volumeIcon.classList= "fa-volume-mute"){
            volumeIcon.classList.remove("fa-volume-mute")
            volumeIcon.classList.add("fas","fa-volume-up")
            volumeBar.style.cssText=`width:100px`
            video.volume=1;
        }
    }
    //fullScreen 
    function fullScrn(e)
    {
        // console.log(e)
        if(e.target.classList[1]==="fa-expand")
        {
            fullScreen.classList.remove("fa-expand");
            fullScreen.classList.add("fas","fa-compress");
            videoPlayer.style.cssText="max-width:75%;min-width:75%;";
            
        }
        else{
            fullScreen.classList.remove("fa-compress");
            fullScreen.classList.add("fas","fa-expand");
            videoPlayer.style.cssText="max-width:60vw;min-width:650px;";
        }
    }
    //player speed
    function playerSpd(e){
        
        if(e.target.value==="0.5")
        {
            video.playbackRate = 0.5;
        }
        else if(e.target.value==="1"){
            video.playbackRate = 1;
            
        }
        else if(e.target.value==="1.5"){
            video.playbackRate = 1.5;
        }
        else if(e.target.value==="2"){
            video.playbackRate = 2;
            
        }
    }



//addevent listeners

playerSpeed.addEventListener("change",playerSpd);
fullScreen.addEventListener("click",fullScrn);
playButton.addEventListener("click",videoPlay);
video.addEventListener("click",videoPlay);
video.addEventListener("keypress",function(event){
    if(event.key==="space"){
        playButton.click();
    }
})
video.addEventListener("timeupdate",progressbar);
video.addEventListener("click",progressbar);
progressRange.addEventListener("click",updateProgress);
progressBar.addEventListener("click",updateProgress);
volumeRange.addEventListener("click",volumeUpdateRange);
volumeIcon.addEventListener("click",volumeMute);