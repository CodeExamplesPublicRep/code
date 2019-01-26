
(function (){

    $('li').text( "HoverToChangeColor" );
})()
    
randCol = function getRandHexColour ( ){
    let str="";
    str +="#";
    while(str.length < 7){
           
           str +=  getRandHexBit(); 
           //console.log(str);
    }
    return str;
}

getRandHexBit =()=>{
    //(+Math.floor(Math.random()*15)).toString(16)+
   return (+Math.floor(Math.random()*15)).toString(16);
}

function changeColorOfNextElementRandomly(){
        
    //console.log("bingo");
    let color = "";
    let oldColor = $(this).next().css("background-color");

    color = randCol();
    
    console.log( color );

    $(this).next().text( color );

    
    $(this).next().css({"font-color":oldColor, "backgroundColor":color, "color":oldColor, "text-align" :"center", "font-size": "24pt", 'padding-top': '5px', 'padding-bottom': '5px' });
   
}

$("li").on("mouseenter",changeColorOfNextElementRandomly);
$("li").on("onclick",changeColorOfNextElementRandomly);
   



















