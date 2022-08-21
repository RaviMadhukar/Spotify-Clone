console.log("welcome");                 

// Initialize the Variables
let songIndex =0;
let audioElement = new Audio('song/song1.mp3');
let masterPlay =document.getElementById('masterPlay'); 
let mybar =  document.getElementById('mybar');
let gif =  document.getElementById('gif');
let mastersongName =  document.getElementById('mastersongName');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let ItemsList =  document.getElementById('ItemsList');

let songs = [
     { songName: "Love Me Like U ", filePath: "song/song1.mp3", coverPath: "bg/bg1.jpg"},
     { songName: "Shiv Sama Rahe", filePath: "song/song2.mp3", coverPath: "bg/bg2.jpg"},
     { songName: "Bhola Hai Bhandari", filePath: "song/song3.mp3", coverPath: "bg/bg3.jpg"},
     { songName: "Parvati Boli Shankar Se", filePath: "song/song4.mp3", coverPath: "bg/bg4.jpg"},
     { songName: "Har Har Sambhu", filePath: "song/song5.mp3", coverPath: "bg/bg5.jpg"},
     { songName: "Teri Mitti Mein Jawa", filePath: "song/song6.mp3", coverPath: "bg/bg6.jpg"},
]

songitem.forEach((element,i) => {
     element.getElementsByTagName("img")[0].src= songs[i].coverPath;
     element.getElementsByClassName("songName")[0].innerText =songs[i].songName;
});

// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
      if(audioElement.paused || audioElement.currentTime<=0){
          audioElement.play();
          masterPlay.classList.remove('fa-play');
          masterPlay.classList.add('fa-pause');
          gif.style.opacity = 1;
          document.getElementById(`${songIndex}`).classList.remove('fa-play');
          document.getElementById(`${songIndex}`).classList.add('fa-pause');       
          
      }
      else{
          audioElement.pause();
          masterPlay.classList.remove('fa-pause');
          masterPlay.classList.add('fa-play');
          gif.style.opacity = 0;
          document.getElementById(`${songIndex}`).classList.add('fa-play');
          document.getElementById(`${songIndex}`).classList.remove('fa-pause');

      }
});

// listen to event
audioElement.addEventListener('timeupdate', ()=>{

     //update seekbar
     progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
     mybar.value = progress;
});

mybar.addEventListener('change', ()=>{
     audioElement.currentTime = (mybar.value * audioElement.duration) /100;
});

const makeallplays= ()=>{
      songItemPlay.forEach((element)=>{
          element.classList.remove('fa-pause');
          element.classList.add('fa-play');
     }); 
}

songItemPlay.forEach((element)=>{
     element.addEventListener('click', (e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
    
            makeallplays();
            songIndex =parseInt(e.target.id);
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src = `song/song${songIndex+1}.mp3`;
            mastersongName.innerText =songs[songIndex].songName;
            audioElement.currentTime=0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
     
        else{
            audioElement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity=0;
        }
     });
}); 

// Play Next Song
document.getElementById('next').addEventListener('click', ()=>{
     if(songIndex>=5){
          songIndex=0;  
          document.getElementById('5').classList.add('fa-play');
     }
     else{
          songIndex +=1;   
     }
     
     mastersongName.innerText =songs[songIndex].songName;
     audioElement.src = `song/song${songIndex+1}.mp3`;
     audioElement.currentTime=0;
     audioElement.play();
     masterPlay.classList.remove('fa-play');
     masterPlay.classList.add('fa-pause');
     document.getElementById(`${songIndex}`).classList.remove('fa-play');
     document.getElementById(`${songIndex}`).classList.add('fa-pause');  
     
     document.getElementById(`${songIndex-1}`).classList.add('fa-play');
     document.getElementById(`${songIndex-1}`).classList.remove('fa-pause'); 
});

//Play Previous song
document.getElementById('previous').addEventListener('click', ()=>{
     if(songIndex<=0){
          songIndex=5;
          document.getElementById('0').classList.add('fa-play');
     }
     else{
          songIndex -=1;

     }
     mastersongName.innerText =songs[songIndex].songName;
     audioElement.src = `song/song${songIndex+1}.mp3`;
     audioElement.currentTime=0;
     audioElement.play();
     masterPlay.classList.remove('fa-play');
     masterPlay.classList.add('fa-pause'); 
     document.getElementById(`${songIndex}`).classList.remove('fa-play');
     document.getElementById(`${songIndex}`).classList.add('fa-pause'); 

     document.getElementById(`${songIndex+1}`).classList.add('fa-play');
     document.getElementById(`${songIndex+1}`).classList.remove('fa-pause'); 
 
});

// for(let i=0 ; i<6; i++){
//      if(songIndex==i){
//         document.getElementById(`${songIndex}`).classList.remove('fa-play');
//         document.getElementById(`${songIndex}`).classList.add('fa-pause');
//         songIndex += 1;
//      }
//      else{
//           document.getElementById(`${songIndex}`).classList.add('fa-play');
//           document.getElementById(`${songIndex}`).classList.remove('fa-pause');
//      }
// }