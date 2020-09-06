var database = firebase.database();
var fitCars=null;
function addFitCar(){
    $('#fitCarsBody').append($('<tr>\n' +
        '<td>'+$('#car_year_selector').val()+'</td>\n' +
        '<td>'+$('#car_make_selector').val()+'</td>\n' +
        '<td>'+$('#car_model_selector').val()+'</td>\n' +'</tr>'));
    if(fitCars==null){
        fitCars = '{"cars":[{"year":"'+$('#car_year_selector').val()+'","make":"'+$('#car_make_selector').val()+'","model":"'+$('#car_model_selector').val()+'"}]}';
    }else{
        var arr=JSON.parse(fitCars);
        fitCars='{"cars":[';
        for(var i=0;i<arr.cars.length;i++){

                fitCars=fitCars+'{"year":"'+arr.cars[i].year+'","make":"'+arr.cars[i].make+'","model":"'+arr.cars[i].model+'"},';
        }
        fitCars=fitCars+ '{"year":"'+$('#car_year_selector').val()+'","make":"'+$('#car_make_selector').val()+'","model":"'+$('#car_model_selector').val()+'"}]}';
    }

}
function deletePart(part_id) {
    firebase.database().ref('parts/' + part_id).remove();
    $('#'+part_id).hide();
}
function addPart(){
    var randid=Math.floor(Math.random() * 99999999) + 9999;
    var d = new Date();
    randid=randid+d.getTime();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var nowDate = mm + '/' + dd + '/' + yyyy;
    firebase.database().ref('parts/' + randid).set({
        category:$('#cat').val(),
        desc: $('#desc').val(),
        fit:fitCars,
        name:$('#partname').val(),
        picUrl:$('#picurl').val(),
        price:$('#price').val(),
        date:nowDate,
        timestamp:d.getTime()*-1

    });
    
    $('#partsTableBody').append($(
        '<tr id="' + randid + '">\n' +
        '        <td> <img class="item_image" src="' + $('#picurl').val() + '" height="140" width="50%"/> </td> \n' +
        '        <td>' + $('#partname').val() + '</td> \n ' +
        '        <td>' + $('#cat').val() + ' </td>\n' +
        '        <td>' + $('#desc').val() + '</td>\n ' +
        '        <td>' + $('#price').val() + '</td>\n' +
        '        <td> <button class="shop_button" onclick=\"deletePart(' + randid + ')\">Delete</button> </td>\n '
        + '</tr>'
    ));

}




$(document).ready(function () {
    var carquery = new CarQuery();
    carquery.init();
    carquery.initYearMakeModelTrim('car_year_selector', 'car_make_selector', 'car_model_selector', 'car_model_trims_selector')

    return database.ref('/parts/').orderByChild('timestamp').once('value').then(function (snapshot) {

       
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            
            $('#partsTableBody').append($(
                '<tr id="' + childKey+'">\n'+
                '        <td> <img class="item_image" src="' + childData.picUrl + '" height="140" width="50%"/> </td> \n'+
                '        <td>  ' + childData.name + '  </td> \n ' +
                '        <td>' + childData.category + ' </td> \n' +
                '        <td>' + childData.desc+'</td>\n ' +
                '        <td>   ' + childData.price + '</td>\n' +          
                '        <td> <button class="shop_button" onclick=\"deletePart(' + childKey + ')\">Delete</button> </td>\n '
                +'</tr>'
            ));
        });
    })

});