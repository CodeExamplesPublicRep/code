
let newButton = document.createElement('button');
$('#flex-container').append(newButton);
$(newButton).attr('class' ,"inline");
$(newButton).text( 'call request ');
$(newButton).on('click', jsRequestforWeather );

let newDiv = document.createElement('table');

$(newDiv).css("border","solid 2px black");
$(newDiv).attr("id","best");
$('li').first().before(newDiv);

let tableSlideToggleButton = document.createElement('button');
$('#flex-container').append(tableSlideToggleButton);
$(tableSlideToggleButton).attr('class' ,"inline");
$(tableSlideToggleButton).text( 'Show/Hide films Table');

$(tableSlideToggleButton).on( 'click', function (){
    $(newDiv).slideToggle('slow');
});

let filterButton = document.createElement('button');
$(filterButton).attr('class' ,"inline");
$(filterButton).text('filter by year');
$('#flex-container').append(filterButton);

let filmsDescription = document.createTextNode("(call request) - will request from server list of films\n ");

$('#flex-container').before(filmsDescription);
$('#flex-container').append(filterButton);


let filterYearInput = document.createElement( 'input' );
filterYearInput.placeholder = "type year search to";
$(filterYearInput).attr('class' ,"inline");
$('#flex-container').append(filterYearInput);



function jsRequestforWeather(){

    var request = new XMLHttpRequest();

    request.open('GET', 'https://ghibliapi.herokuapp.com/films' , true);
    request.onload = function () {

    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      
        let createHTMLTable;
        $(newDiv).text( String.toString(data));

        //CREATE TABLE ROW FROM EACH FILM OBJECT
        data.forEach(item => {
            
            let newTableRaw = `<tr> <td style= "color:white;font-size:18pt;" >${item.title}</td> <td>${item.director}</td> <td>${item.producer}</td> <td>${ item.release_date}</td> </tr>`;
            createHTMLTable += newTableRaw; 

        });

        $(newDiv).html( createHTMLTable );

    } else {
        console.log('error'); // response.errors
    }
    }

    request.send();
}


//filter films by year

$(filterButton).on('click', function (){
if( $(newDiv).display !=  'none'  ){
    let filterYearInputContent = $(filterYearInput).val();
    if( filterYearInputContent != '' ){
        filterYearInputContent = Number.parseInt(filterYearInputContent);
        
        $('#best tr').each(function(){
            console.log( Number.parseInt( $(this).find('td:last').text() ) +"  "+ filterYearInputContent );
            if( Number.parseInt( $(this).find('td:last').text() ) < filterYearInputContent ) $(this).find('td:last').parent().hide();
            else $(this).find('td:last').parent().show();
        });

    }

}


} );


