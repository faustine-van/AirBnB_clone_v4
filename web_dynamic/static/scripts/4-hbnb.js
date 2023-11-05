/* If in the status is “OK”,
add the class available to the div#api_status
*/
$(document).ready(function () {
  /* ---------------------------------------- */
  const selected_amenities = {};

  $('.amenity_check').on('change', function () {
    const amenity_id = $(this).data('id');
    const amenity_name = $(this).data('name');
    const isChecked = $(this).is(':checked');

    // check id amenities checked
    if (isChecked) {
      selected_amenities[amenity_id] = amenity_name;
    } else {
      delete selected_amenities[amenity_id];
    }
    const amenityList = Object.values(selected_amenities);
    $('.amenities h4').text(amenityList);
  });
  /* Send a GET request to the API endpoint access the status */
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function () {
      // Check if the status is "OK"
      $('#api_status').addClass('available');
    }
  });
  /* send post */
  $('button').on('click', function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(selected_amenities) }),
      contentType: 'application/json',
      success: function (places) {
        // Check if the status is "OK"
        $.each(places, function (i, place) {
          $('.places').append(`
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest}</div>
                      <div class="number_rooms">${place.number_rooms}</div>
                      <div class="number_bathrooms">${place.number_bathrooms}</div>
              </div>
              <div class="user">
              </div>
              <div class="description">${place.description}</div>
            </article>
            `);
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error('Request failed: ' + errorThrown);
      }
    });
  });
});
