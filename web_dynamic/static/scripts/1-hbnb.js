/* -------------------------------- */
$(document).ready(function () {
  const selectedAmenities = {};

  $('.amenity_check').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    const isChecked = $(this).is(':checked');

    // check id amenities checked
    if (isChecked) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    const amenityList = Object.values(selectedAmenities);
    $('.amenities h4').text(amenityList);
  });
});
