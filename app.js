const app = () => {
   const song = document.querySelector('.song');
   const play = document.querySelector('.play');
   const outline = document.querySelector('.moving-outline circle');
   const video = document.querySelector('.vid-container video');
   //sounds  sesler
  const sounds = document.querySelector('.sound-picker button');
  // Time display saat
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');
  // outline
  const outlineLength = outline.getTotalLength();
  // Duration saatler dakika vb.
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

// pick diffrent sound
Array.from(sounds).forEach(sound =>{
  sound.addEventListener('click',function(){
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
  });
});

  //play sound  sesleri oynatma
  play.addEventListener('click',() => {
    checkPlaying(song);
  });

//Select sound
timeSelect.forEach(option =>{
   option.addEventListener('click',function(){
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent=`${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
   });
});


  // stop and play sound fonksiyonu
  const checkPlaying = song => {
    if(song.paused){
      song.play();
      video.play();
      play.src='./svg/pause.svg';
    }else {
      song.pause();
      video.pause();
      play.src='./svg/play.svg';
    }
  }

// animated yuvarlak doldurma
song.ontimeupdate = () => {
   let currentTime = song.currentTime;
   let elapsed = fakeDuration - currentTime;
   let seconds = Math.floor(elapsed % 60);
   let minutes = Math.floor (elapsed / 60);
 //animate  the bar  : bar animasyonu
 let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
 outline.style.strokeDashoffset = progress;
 // animate text
 timeDisplay.textContent = `${minutes}:${seconds}`;

 if(currentTime>= fakeDuration){
   song.pause();
   song.currentTime=0;
   play.src = './svg/play.svg';
   video.pause();
 }


 };

};

app();
