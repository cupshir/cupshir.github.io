$(document).ready(function() {
    $('#txtZipCode').on('change keypress keyup', function() {
        if (this.value) {
            $('#btnLookUp').prop('disabled', false);
        } else {
            $('#btnLookUp').prop('disabled', true);
        }
    });

    $('#btnLookUp').on('click', function() {
        let zipCode = $('#txtZipCode').val();

        $.get('https://api.zippopotam.us/us/' + zipCode, function(data) {
            // reset / hide errors
            $('#error').hide();
            $('#txtZipCode').removeClass('has-error');

            // update raw results
            $('#rawResults').html(JSON.stringify(data, null, ' '));

            // render pretty results
            $('.zip-code').text(data["post code"]);
            $('.city').text(data["places"][0]["place name"]);
            $('.state').text(data["places"][0]["state"]);
            $('.latitude').text(data["places"][0]["latitude"]);
            $('.longitude').text(data["places"][0]["longitude"]);

            $('.results').show();
        })
        .fail(function() {
            $('#txtZipCode').addClass('has-error');
            $('#error').html('Invalid zip code provided');
            $('#error').show();
            $('.results').hide();
        });
    });

    $('.results-type h2').on('click', function() {
        // remove current selected and hide results
        $('.results-type h2').removeClass('selected');
        $('.result').hide();

        // select item clicked and unhide respective result
        $(this).addClass('selected');
        $('#' + $(this).text().toLowerCase() + 'Results').show();
    });
});

