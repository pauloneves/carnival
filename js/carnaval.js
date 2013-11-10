var SC = {}

SC.getParadesHTML = function(parades) {
    var all = [];
    for (var day=0 , length=parades.length; day<length; day++) {
        var diaHtml = '<div class="col-6 col-sm-6 col-lg-4">' +
                      '<h2>' +  parades[day][0].dia_title + '</h2><p><ul>';
        for (var i= 0, dayLength=parades[day].length; i<dayLength; i++) {
            var parade = parades[day][i];
            diaHtml += '<li>' +  parade.nome +  ', ' + parade.hora +
                        ', ' + parade.bairro + '</li>';

        }
        diaHtml += '</ul></p></div>';
        all.push(diaHtml);
    }
    return all;
}

SC.displayParades = function() {
    $.ajax('js/desfiles.json').done(
        function(json) {
            var all =  SC.getParadesHTML(json);
            $("#carnival_parades" ).html(all.join(''));
        });
}