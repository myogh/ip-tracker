// The jQuery XMLHttpRequest (jqXHR) object returned by $.ajax()

$(document).ready(function () {
    let mymap
    let marker
    let isp
    $.getJSON("https://geo.ipify.org/api/v1?apiKey=at_lBAirkQljWY3y5opF9of4Sje1Pmh3",
        function (data, textStatus, jqXHR) {
            $('.ip-address p').text(`${data.ip}`);
            $('.location p').text(`${data.location.region}, ${data.location.country}`);
            $('.timezone p').text(`UTC${data.location.timezone}`);
            if (data.isp.length > 20){
                isp = data.isp.slice(0,20).concat("...")
            }else{
                isp = data.isp.slice(0)
            }
            $('.isp p').text(`${isp}`);

            mymap = L.map('map').setView([data.location.lat, data.location.lng], 13);
            marker = L.marker([data.location.lat, data.location.lng]).addTo(mymap);
    
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,    
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoic3RlcGhlbmdhbmFuIiwiYSI6ImNrZXpnbjB0ODA2M3oyeXF3ODAwdDJudTQifQ.mr1XIr0s-sg6liZ-zTjWNA'
            }).addTo(mymap);

            marker.bindPopup(`<b>Hey there!</b><br>You are in ${data.location.region}.`).openPopup();
        }
    );

    $('.input-box button').click(function(){
        mymap.remove()
        let a = $('.input-box input').val()
        let ipPattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/
        let domainPattern = /^(www)\.\w+\.[a-z]+/
        let url = ''

        if (ipPattern.test(a)){
            url = `https://geo.ipify.org/api/v1?apiKey=at_lBAirkQljWY3y5opF9of4Sje1Pmh3&ipAddress=${a}` 
        }else if(domainPattern.test(a)){
            url = `https://geo.ipify.org/api/v1?apiKey=at_lBAirkQljWY3y5opF9of4Sje1Pmh3&domain=${a}` 
        }else{
            url = ''
            alert('Please enter a valid IP or domain')
        }

        $.getJSON(url,
            function (data, textStatus, jqXHR) {
                $('.ip-address p').text(`${data.ip}`);
                $('.location p').text(`${data.location.region}, ${data.location.country}`);
                $('.timezone p').text(`UTC${data.location.timezone}`);
                if (data.isp.length > 20){
                    isp = data.isp.slice(0,20).concat("...")
                }else{
                    isp = data.isp.slice(0)
                }
                $('.isp p').text(`${isp}`);

                mymap = L.map('map').setView([data.location.lat, data.location.lng], 13);
                marker = L.marker([data.location.lat, data.location.lng]).addTo(mymap);

                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,    
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1Ijoic3RlcGhlbmdhbmFuIiwiYSI6ImNrZXpnbjB0ODA2M3oyeXF3ODAwdDJudTQifQ.mr1XIr0s-sg6liZ-zTjWNA'
                }).addTo(mymap);

                marker.bindPopup(`<b>Hey there!</b><br>You are in ${data.location.region}.`).openPopup();
            }
        );
    })
    
    $('.input-box input').click(function(){
        $(this).addClass('shadow');
        $('.input-box').css('transform', 'scale(1.05)')
    })
});

