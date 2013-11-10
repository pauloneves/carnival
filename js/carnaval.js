var SC = {};

SC.getParadesHTML = function(parades) {
    var all = [];
    for (var day=0 , length=parades.length; day<length; day++) {
        var diaHtml = '<div class="col-6 col-sm-6 col-lg-4 dia_desfile">' +
                      '<h3>' +  parades[day][0].dia_title + '</h3><p><ul>';
        var atLeastOne = 0;
        for (var i= 0, dayLength=parades[day].length; i<dayLength; i++) {
            var parade = parades[day][i];
            if (parade.bairro === 'Centro' || parade.bairro === 'Lapa') {
                diaHtml += '<li>' +  parade.nome +  ', ' + parade.hora.substring(0,2)
                           + 'h <span class="glyphicon glyphicon-heart-empty favorite" id="' + parade.nome_url
                           + '"></span></li>';
                atLeastOne++;
            }

        }
        diaHtml += '</ul></p></div>';
        if (atLeastOne  >  2) {
            all.push(diaHtml);
        }
    }
    return all;
};

SC.displayParades = function() {
    $.ajax('js/desfiles.json').done(
        function(json) {
            var all =  SC.getParadesHTML(json);
            $("#carnival_parades" ).html(all.join(''));
        });
};

SC.changeFavorite = function() {
    $(this).toggleClass('glyphicon-heart-empty');
    $(this).toggleClass('glyphicon-heart');
};

SC.copyFavorites = function () {
    var favs = $('#parades .dia_desfile').has('.glyphicon-heart').clone();
    var favList = $('#favorite_parades');
    favList.children().remove();
    if (favs.length) {
        favs.find('li').has('.glyphicon-heart-empty').remove();
        $('#itinerary-message').hide();
        favList.append(favs);
        $('#itinerary-share-message').show();
    } else {
        $('#itinerary-message').show();
        $('#itinerary-share-message').hide();
    }
};

