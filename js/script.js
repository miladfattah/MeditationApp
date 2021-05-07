const app = ()=>{
    const song = document.querySelector('.song');
    const outLine = document.querySelector('.out-line path');
    const play = document.querySelector('.play');
    const video = document.querySelector('.vid-contianer video');

    //sound picker
    const sound = document.querySelectorAll('.sound-picker button');
    // timeDisplay
    const timeDisplay = document.querySelector('.time-display');
    //time select
    const timeSelect = document.querySelectorAll('.time-select button');
    // get length outline
    const outLineLength = outLine.getTotalLength();
    
    let fakeDuration = 600;

    outLine.style.strokeDasharray = outLineLength;
    outLine.style.strokeDashoffset = outLineLength;


    play.addEventListener('click' , ()=>{
        checkPlayIcon(song);
    })
    sound.forEach(option=>{
        option.addEventListener('click' , function(){
            video.src = this.getAttribute('data-video');
            song.src= this.getAttribute('data-sound')
            checkPlayIcon(song);
        })
    })
    timeSelect.forEach(option => {
        option.addEventListener('click' ,function(){
            let dataTime = this.getAttribute('data-time');
            fakeDuration = dataTime;
            let secend= Math.floor(fakeDuration % 60);
            let minuted = Math.floor(fakeDuration / 60);
            if( minuted < 10) {
                minuted =  '0'+minuted;
            }
            if( secend < 10) {
               secend = '0'+ secend;
            }
            timeDisplay.textContent = `${minuted} : ${secend}`
        })
    })
    

    const checkPlayIcon = song=>{
        if(song.paused){
            song.play();
            video.play()
            play.src= './pubilc/images/pause.svg';
        }else {
            song.pause();
            video.pause()
            play.src = './pubilc/images/play.svg';
        }
    }

    song.ontimeupdate  = ()=>{
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let secend  =  Math.floor( elapsed % 60);
        let minuted  =  Math.floor( elapsed / 60);


        //animation the cricle
        let proggress = outLineLength - ( currentTime / fakeDuration) * outLineLength;
        outLine.style.strokeDashoffset = proggress;
        if( minuted < 10) {
             minuted =  '0'+minuted;
        }
        if( secend < 10) {
            secend = '0'+ secend;
         }
        timeDisplay.textContent = `${minuted} : ${secend}`

        if(currentTime >= fakeDuration){
            song.pause();
            video.pause();
            play.src = './pubilc/images/play.svg';
            currentTime = 0;
            timeDisplay.textContent = `00:00`
        }
    };
}
app();