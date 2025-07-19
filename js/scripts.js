 
var ourFilms=["In+A+Lonely+Place","Lazzaro+Felice","Dersu+Uzala","Bringing+Up+Baby","Twelve+Angry+Men","The+Seventh+Seal","The+Apartment","Harold+And+Maud", "Otto+e+mezzo","Il+Bidone",
"Modern+Times","Sweet+Smell+Of+Success","Roma","Sunset+Boulevard","Toni+Erdmann","The+Big+Sleep", "This+Gun+For+Hire","Roman+Holiday","Dog+Day+Afternoon","Pickup+On+South+Street","Onibaba","Murder,+My+Sweet","Ascenseur+Pour+léchafaud","Kind+Hearts+And+Coronets","La+Règle+Du+Jeu","Ikiru","Amarcord",
,"Ugetsu","Wild+Strawberries","La+Strada","I+Vitelloni","Pickpocket","Stagecoach","Midnight+Cowboy","Sherlock+Jr","The+Big+Heat","His+Girl+Friday","Cairo+Station","Pigs+And+Battleships","The+Roaring+Twenties","Long+Days+Journey+Into+Night" ]
 
var exceptionIds = [25364,833,24192,804,5801,927547,1092,18929,14886,396,49964,57389,3764,499,44018,453270,31542,5156, 247, 20530, 12493,  346,11645,307,31589,18148,17295,14537,17409,28528,439,19426,29264,1040,25905,776527,16672,46918,24382,42229,36871,17962,26893,36872,505192,99329,265226,24167,95597,20271,41050,96454,60243,28272,13898,288,11878,822,391039];
var exceptionTitles = ['391039 life and a day','25364 ace in the hole','833 UmbrtoD','24192 gosp of st mat','804 Roman Holiday','5801 Pather panchali','822 The music room', '927547 All we imagine as light','1092  The Third Man','18929 The entertainer','28978 the circus','14886 The last Detail','396 Whos+Afraid+Of+Virginia+Woolf?','288 High Noon','49964 where is my friends house','57389-le-quattro-volte','3764-hadaka-no-shima','499-cleo-de-5-a-7','44018-sans-toit-ni-loi','453270-a-ciambra','Tree of wooden clogs 31542','bicycle theives', 'The Killing', 'Late Spring', 'High and Low', 'Seven Samurai', 'Ran','Oedipus rex','rome open city','the bad sleep well','Tokyo Story','The Battle of Algiers','Harakiri','The Gunfighter','the harder they fall','dolce vita',"le-notti-di-cabiria","-el-ngel-exterminador","il-gattopardo","25905-obchod-na-korze","776527-summer-of-soul-or-when-the-revolution-could-not-be-televised","16672-suna-no-onna","floating weeds","24382-i-soliti-ignoti","42229-una-giornata-particolare","36871-bangiku","17962-after life","26893-donzoko","36872-onna-ga-kaidan-wo-agaru-toki","505192-shoplifters","99329-mandabi","265226-le-meraviglie","24167-la-ciociara","95597-la-noire-","20271-divorzio-all-italiana","41050-la-notte","96454-la-visita","60243 a separation","28272 equinox flower","the circle 13898","Yojimbo 11878"];
//console.log(ourFilms.length+exceptionIds.length)
var BASE_URL = "http://image.tmdb.org/t/p/w185/";
var API_KEY = "0930f20caa92e0dae95dba06f26b55e4";
var QUERY = "https://api.themoviedb.org/3/search/movie?api_key=fa77b5a712636b454eab3f3147d80d09&query="
var QUERY_ID = "https://api.themoviedb.org/3/movie/"
var QUERY_ID_END = "?api_key=fa77b5a712636b454eab3f3147d80d09"

// var MOVIE_POP = "http://api.themoviedb.org/3/movie/popular?api_key=fa77b5a712636b454eab3f3147d80d09";
var MOVIE_TOP = "http://api.themoviedb.org/3/movie/top_rated?api_key=fa77b5a712636b454eab3f3147d80d09";
var TEST_PIC = BASE_URL + "/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg";
var MOVIE_TRAILERa = "http://api.themoviedb.org/3/movie/";
var MOVIE_TRAILERb = "/videos?api_key=fa77b5a712636b454eab3f3147d80d09";
var MOVIE_TRAILERr = "/reviews?api_key=fa77b5a712636b454eab3f3147d80d09";
var YOU_TUBE = "https://www.youtube.com/watch?v=";
var MOVIE_POPa = "https://api.themoviedb.org/3/discover/movie?api_key=fa77b5a712636b454eab3f3147d80d09"
var YEARa = "&sort_by=revenue.desc&primary_release_date.gte="
var YEARb = "-01-01&primary_release_date.lte="
var YEARc = "-12-31";
var year = "2019";
// URL: /discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc
res = [];


replies = [];
//http://image.tmdb.org/t/p/w185/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg

$(document).ready(function () {
    //console.log("readY")

    ourFilms.forEach(function (film) {
        replies.length = 0;
        $.getJSON(QUERY + film)
            .done(update)
            .fail(handleErr)
             

    })
   exceptionIds.forEach(function (Id) {
        replies.length = 0;
       
        $.getJSON(QUERY_ID + Id + QUERY_ID_END)
            .done(updateX)
            .fail(handleErr);

    })
});

function update(response) {

    res = response.results;
    //console.log(res)
    
    var picIds = [];

    if(!res[0].poster_path){
       
        res[0].poster_path=res[1].poster_path;
        if(!res[0].poster_path){res[0].poster_path=res[2].poster_path;
        }
    
    }
    replies.push([res[0].id, res[0].overview, res[0].backdrop_path, res[0].poster_path, res[0].title]);

    //replies.push([res.id,res.overview,res.backdrop_path,res.poster_path,res.title]);

    var r = new Array(); var mods = new Array(), j = -1;
    for (var key = 0, size = replies.length; key < size; key++) {
        
        r[++j] = '<div data-toggle="modal" data-target="#myModal' + key + '"><img src=';
        r[++j] = BASE_URL + replies[key][3];
        r[++j] = " class=\"posters\" id="
        r[++j] = '\"' + replies[key][2] + '\">';
        r[++j] = '</div>';
        mods.push('<div id="myModal' + key + '" class="modal fade" role="dialog""><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 fontstyle="bold"  class="modal-title"><p>' + replies[key][4] + '</p></h4><img src='+BASE_URL + replies[key][2]+' id=' + replies[key][2] + ' /></div><div class="modal-body"><p>' + replies[key][1] + '</p></div><div class="modal-footer"><button type="button" class="btn btn-warning" id=' + replies[key][0] + '>Trailer</button></div></div></div></div>')

    }
    $('#theList').html(r.join(''));
    $('#theModals').html(mods.join(''));
    $('#theList').addClass("animated fadeIn");
    for (var key = 0, size = replies.length; key < size; key++) {
        picIds.push(document.getElementById(replies[key][0]));
        $(picIds[key]).click(function () {
            $.getJSON(MOVIE_TRAILERa + event.target.id + MOVIE_TRAILERb)
                .done(updateTrailer)
                .fail(handleErr);
        });




        ;
    }

}
function updateX(response) {

    res = response;
   
     
    var picIds = [];

    
    replies.push([res.id, res.overview, res.backdrop_path, res.poster_path, res.title]);

    

    var r = new Array(); var mods = new Array(), j = -1;
    for (var key = 0, size = replies.length; key < size; key++) {

        r[++j] = '<div data-toggle="modal" data-target="#myModal' + key + '"><img src=';
        r[++j] = BASE_URL + replies[key][3];
        r[++j] = " class=\"posters\" id="
        r[++j] = '\"' + replies[key][2] + '\">';
        r[++j] = '</div>';
        mods.push('<div id="myModal' + key + '" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title"><p>' + replies[key][4] + '</p></h4></div><div class="modal-body"><p>' + replies[key][1] + '</p></div><div class="modal-footer"><button type="button" class="btn btn-default" id=' + replies[key][0] + '>Trailer</button></div></div></div></div>')

    }
    $('#theList').html(r.join(''));
    $('#theModals').html(mods.join(''));
    $('#theList').addClass("animated fadeIn");
    for (var key = 0, size = replies.length; key < size; key++) {
        picIds.push(document.getElementById(replies[key][0]));
        $(picIds[key]).click(function () {
            $.getJSON(MOVIE_TRAILERa + event.target.id + MOVIE_TRAILERb)
                .done(updateTrailer)
                .fail(handleErr);
               
        });




        ;
    }

}


function handleErr(jqxhr, textStatus, err) {
   
    
}



function displayResult(poster_path) {

    $("#topFilm").attr("src", poster_path);
} function displayResultCell(path) {
    var firstRow = document.getElementById("theList").rows[0];
    var x = firstRow.insertCell(-1);
    x.innerHTML = "New cell";

    var img = document.createElement('img');
    img.src = path;
    x.appendChild(img);
}

function setYear() {
    $('#theList').removeClass("animated fadeIn");

    var year = document.getElementById("filmYear").value;

    $.getJSON(MOVIE_POPa + YEARa + year + YEARb + year + YEARc)
        .done(update)
        .fail(handleErr);
    return false;

}
function updateTrailer(response) {
    resTrailer = response.results;

    location.href = YOU_TUBE + resTrailer[0].key;

}

function popUp(response) {

    alert(response)


}

function stripPlus(film) {
    spaced = ""
    for (var i = 0; i < film.length; i++) {
        if (film.charAt(i) == "+") {
            spaced += " ";
        }
        else spaced += film.charAt(i)
    }
    returnspaced
}