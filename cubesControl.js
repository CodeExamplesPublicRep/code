

let addCubesButton = document.createElement('button');
let setCubesSide = document.createElement('button');
let numCubesInput = document.createElement('input');
let widthOfSideInput = document.createElement('input');

$(numCubesInput).attr('placeholder','number fo cubes to add');
$(widthOfSideInput).attr('placeholder','width of cube');
$(addCubesButton).text("add number of cubes");
$(setCubesSide).text("set cubes side");

let cubesDescription = document.createElement('p');
$(cubesDescription).css({"height":"30px",'text-align':'center',"font-size":"15pt" });
$(cubesDescription).text("Here you can add cubes to fill space. And also set custom cubes size setting width of cube side");



$(cubesParent).before(addCubesButton);
$(addCubesButton).after(numCubesInput);
$(cubesParent).before(setCubesSide);
$(setCubesSide).after(widthOfSideInput);

$(addCubesButton).before( cubesDescription );
$(addCubesButton).before( "<br>" );

$('#cubesParent').css({"position":"relative",'width':'100%','height':'auto'});


let defaultCubesWidth = 20;

function addCubes( nmbCbs, wdth = 20, clr = randCol() ){

    for(let i=0;i<nmbCbs;++i){

        newCube = document.createElement('div');
        
        $(newCube).css({"display":"inline-block","width":wdth,'height':wdth,"background-color":clr,"margin":'4px'});
        
        $('#cubesParent').append(newCube);
    }

}

$(addCubesButton).on('click', function (){

    let widthCubes = Number.parseInt( $(widthOfSideInput).val() );
    let numberCubes = Number.parseInt( $(numCubesInput).val() );
    console.log(widthCubes+'  '+numberCubes);
    
    if( ! Number.isNaN( numberCubes ) ){

        if( ! Number.isNaN( widthCubes ) ) 
            addCubes(numberCubes,widthCubes);
        else 
            addCubes( numberCubes );

        $(numCubesInput).val('') ;

    }

});













