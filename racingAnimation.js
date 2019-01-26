

let racingDiv = document.createElement('div');
$(racingDiv).css({"height":"300px","width":"100%","border":"solid 1px black","margin-bottom":'30px'});
$(racingDiv).attr("id","racingDiv");
$(cubesDescription).before(racingDiv);

let startButton =document.createElement('button');
$( startButton).css({"margin-left":"40%","height":"40px","width":"100px",
"background-image":"url('imgs/raceFlag.png')","background-size":"100px",
"background-repeat":"no-repeat","color":"#238cef","font-size":"20pt",
"font-weight":"bold"});
$(startButton).attr("id","startButton");
//$(startButton).text("START");
$(racingDiv).before(startButton);

let centerObject = document.createElement('img');
centerObject.src='imgs/treewithplants.png';
$(centerObject).css({"width":"50%","height":"80%"});
$(racingDiv).append(centerObject);

let centerCopy = $(centerObject).clone();
$(centerCopy).css("transform","scale(-1, 1)"); //transform: scale(-1, 1);
$(centerObject).after(centerCopy);


let carImg = document.createElement('img');
let planeImg = document.createElement('img');
let busImg = document.createElement('img');

carImg.src = 'imgs/sedan.png';
planeImg.src = 'imgs/planeyellow.png';
busImg.src = 'imgs/bogdan.png';


$(racingDiv).ready(function (){

    $(racingDiv).append(carImg);
    $(racingDiv).append(planeImg);
    $(racingDiv).append(busImg);
    console.log($(racingDiv).height()/2 +"     "+ $(racingDiv).offset().top);
   });

   
window.onload = () => {
    setTimeout( function( ){
        console.log($(racingDiv).height()/2 +"  doc   "+ $(racingDiv).offset().top);
        $(carImg).css({"position":"absolute","left":"0","top": $(racingDiv).height()/2 + $(racingDiv).offset().top ,"z-index":"2","width":"220px","transform":"scale(-1, 1)","opacity":"0.95"});
        $(planeImg).css({"position":"absolute","left":"0","top": $(racingDiv).height()/2 + 50+ $(racingDiv).offset().top,"z-index":"4","width":"260px","transform":"scale(-1, 1)","opacity":"0.95"});
        $(busImg).css({"position":"absolute","left":"0","top": $(racingDiv).height()/2 +40 + $(racingDiv).offset().top ,"z-index":"3","width":"245px","transform":"scale(-1, 1)","opacity":"0.95"});
    }.bind(this), 10 );
}

let numOfCircles = 10;

$(startButton).click(  function (){
    let r1 =  1+Math.random()*40;
    let r2 =  1+Math.random()*40;
    let r3 = 1+Math.random()*40;

    let speed = [r1,r2,r3];
    let vehicles = [carImg,planeImg,busImg];

        console.log("rightBord "+ $(racingDiv).width() + $(racingDiv).offset().left +" lef " );       
      
        console.log( $(carImg).offset().left + $(carImg).width()/2 );
        let zInd = [3,6,4];
        for(var i = 0;i<numOfCircles;++i){
            for(let j =0; j<3;++j){
                rightBorderRaceTrack =  $(racingDiv).width() + $(racingDiv).offset().left -260;
                leftBorderRaceTrack =  $(racingDiv).offset().left ;
                $(vehicles[j]).animate({left: rightBorderRaceTrack }, 
                    3000 - speed[j]*10 , 
                    function(){
                        $(vehicles[j]).css({"transform":"scale(1, 1)","z-index":-5*zInd[j]+"","top":$(racingDiv).offset().top + $(racingDiv).height()/2 - 40 - 20*(j+1) });  
                    });
                
                $(vehicles[j]).animate({left: leftBorderRaceTrack }, 
                    3000 - speed[j]*10, 
                    function(){ 
                        $(vehicles[j]).css({"transform":"scale(-1, 1)","z-index":3*zInd[j]+"","top":$(racingDiv).offset().top + $(racingDiv).height()/2 +20 *(j+1) });
                    });
        
            }
        }
        // if i==10 finish actions
        
        
    } );
