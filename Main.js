var database= firebase.database();

$(document).ready(function() {

    return database.ref('/parts/').orderByChild('timestamp').once('value').then(function(snapshot) {

        var cnt=0;
        snapshot.forEach(function(childSnapshot) {
          
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
  
                cnt++;
                if(cnt>6)
                    return;
                $('.lease car_div').append($('<div class="item_container">\n' +
                    '                <img class="item_image" src="' + childData.picUrl + '" height="150" width="100%"/>\n' +
                    '                <p class="item_name">' + childData.name + '</p>\n' +
                    '                <p class="item_desc">' + childData.desc + '</p>\n' +
                    '                <button class="showfit" onclick="showFitsModal('+childKey+')">' + "show cars fitting"+ '</button>\n' +
                    '                <p class="item_price">Price:' + childData.price + '</p>\n' +
                    '                <button class="shop_button" onclick="showAddToCartModal('+childKey+')">add to cart</button>\n' +
                    '            </div>'));

        });
    })

});