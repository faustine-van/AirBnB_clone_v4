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
    success: function (data) {
      // Check if the status is "OK"
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });
});
