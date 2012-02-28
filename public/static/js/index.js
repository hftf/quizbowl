var baseURL = "http://ec2-50-19-22-175.compute-1.amazonaws.com:80/api";


var searchData;
var searchInMiddle = true;

$(document).ready( function() {
  /*
  bridge = new Bridge({host: '50.19.22.175', port: 8091, apiKey: "abcdefgh"});
  bridge.ready(function(){
    console.log("bridge ready");
    bridge.getService('dao',function(obj){
      console.log("In sevice");
      dao = obj;
    });
  });*/

  
  $("#home-search-input").keypress( function(event) {
    if (event.which == 13) {
      homeSearch();
    }
  });
  
  $("#home-search-button").click( homeSearch);

  loadAdvancedSearch();


});

var homeSearch = function() {
  $("#home-search-loading").css("visibility", "visible");
  jQuery.getJSON(baseURL + "/tossup.search?callback=?", {answer: $("#home-search-input").val()}, function(response) {
    $("#home-search-loading").css("visibility", "hidden");
    console.log(response);     
    if( searchInMiddle) {
      homeMoveSearchToTop();
      $("#home-result-refine").css("visibility", "visible");
      $("#home-results-wrapper").css("visibility", "visible");
      $("#home-form").append('<div id="home-advance-search"><a>Advanced Search</a></div>');
      $("#home-advance-search").click(openAdvanceSearch);

      
    }
    homeLoadResults(response);
  });

}


var homeMoveSearchToTop = function() {
  $("#home-title").css('margin', '26px 40px')
    .css('font-size', '34px')
    .css('float', 'left')
    .css('text-shadow', '2px 2px 4px rgba(0, 0, 0, .25), 0px -3px 4px white');
  $("#home-form").css('float', 'left')
    .css('margin', '17px 0')
    $("#home-search-field").css('float', 'left')
    .css('padding-top', '4px')
    .css('margin', '0 5px 0 10px');
  $("#home-search-button").css('float', 'left')
    .css('margin', '3px 0');
  $("#home-form").css('width', '850px');
  searchInMiddle = false;
};

var homeLoadResults = function(results) {
  var resultContainer = $("#home-results");
  resultContainer.html("");
  var resultDiv, curResult, info, source;
  if( results.length == 0) {
    resultContainer.html("There were no results for your query.");
  } else {
    resultContainer.append('<div id="home-result-quantity">Displaying '+results.length+' results</div>');
  }
  for(var i = 0; i < results.length; i++) {
    var curResult = results[i];
    resultContainer.append('<div id="home-result' + i + '" class="home-result"></div>');
    resultDiv = $("#home-result" + i);
    resultDiv.append('<div class="home-result-source"></div>');
    resultDiv.append('<div class="home-result-info"></div>');
    source = $('#home-result'+i+" .home-result-source");
    source.append('<span class="home-result-year">'+curResult.year+" </span>");
    source.append('<span class="home-result-tournament">'+curResult.tournament+": </span>");
    source.append('<span class="home-result-round">'+curResult.round+",  </span>");
    source.append('<span class="home-result-question-num">Question #'+curResult.question_num+"</span>");
    
    var rating = curResult.rating == null ? 0 : curResult.rating;

    
    info = $("#home-result" + i + " .home-result-info");
    info.append('<span class="home-result-category">'+curResult.category + ' </span>');
    info.append('<span class="home-result-difficulty"><a href="google.com">'+curResult.difficulty+' </a></span>');
    resultDiv.append('<div class="home-result-question">'+curResult.question+'</div>');
    resultDiv.append('<div class="home-result-answer">Answer: '+curResult.answer+'</div>');
  }
};


var openAdvanceSearch = function() {
  $("#home-advance").css("visibility", "visible");
  $("#home-advance").css("opacity", 0);
  $("#home-advance").animate({"height": "130px", "opacity": 1});
};

var loadAdvancedSearch = function() {
  jQuery.getJSON(baseURL+"/data?callback=?", function(e) {
    searchData = e.data;
    for( var x = 0; x < searchData.categories.length; x++) {
      $("#home-advance-category").append("<option>"+searchData.categories[x]+"</option>");
    }

    for(var x = 0; x < searchData.difficulties.length; x++) {
      $("#home-advance-difficulty").append("<option>"+searchData.difficulties[x]+"</option>");
    }

    for(var x = 0; x < searchData.years.length; x++) {
      $("#home-advance-year").append("<option>"+searchData.years[x]+"</option>");
    }
    
    for(var x = 0; x < searchData.tournaments.length; x++) {
      $("#home-advance-tournament").append("<option>"+searchData.tournaments[x]+"</option>");
    }
  });
  
};