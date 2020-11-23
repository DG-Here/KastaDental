
const map_active = document.querySelector('.map_position');
map_active.addEventListener("click",function(e){
    const t = e.target;
    
    if (t.tagName === "LI") {
        var marcker = document.querySelector('.map_position_active');
        marcker && marcker.classList.remove('map_position_active');

        t.parentElement.classList.add('map_position_active');
        myMap.setCenter([ t.parentElement.dataset.lat, t.parentElement.dataset.lng ]);
    }
    
    if (t.tagName === "UL") {
        var marcker = document.querySelector('.map_position_active');
        marcker && marcker.classList.remove('map_position_active');

        t.classList.add('map_position_active');
        myMap.setCenter([ t.dataset.lat, t.dataset.lng ]);
    }

});


var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [47.211225, 38.924219], // Москва
        zoom: 14,
        controls: ['zoomControl'],
        behaviors: ['drag']
    }, {
        searchControlProvider: 'yandex#search'
    });

    var placemarck1 = new ymaps.Placemark([47.2112, 38.9243],{

    });

    var placemarck2 = new ymaps.Placemark([47.230223, 38.894078],{

    });

    myMap.geoObjects.add(placemarck1);
    myMap.geoObjects.add(placemarck2);

}

