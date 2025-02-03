/*
  apply.js – Additional JavaScript logic for the Apply form submission.

  This file intercepts the #apply_online form submit event, collects all the form fields,
  packages them into a JSON payload, and sends them to the logic app endpoint.
*/

jQuery(document).ready(function(){

    $('#apply_online').on('submit', function(e){
        e.preventDefault();

        var action = $(this).attr('action');

        // Show loader (using same technique as in validate.js)
        $("#message-apply").slideUp(750, function() {
            $('#message-apply').hide();
            $('#submit-apply')
                .after('<i class="icon-spin4 animate-spin loader"></i>')
                .attr('disabled','disabled');

            // Create the JSON payload collecting values from the form fields
            var formData = {
                personalDetails: {
                    firstName: $('#name_apply').val(),
                    lastName: $('#lastname_apply').val(),
                    email: $('#email_apply').val(),
                    phone: $('#phone_apply').val(),
                    dateOfBirth: $('#birth_apply').val(),
                    gender: $('input[name="gender_apply"]:checked').val()
                },
                address: {
                    addressLine: $('#address_apply').val(),
                    city: $('#town_apply').val(),
                    country: $('#country_apply').val(),
                    postalCode: $('#postal_code_apply').val()
                },
                coursePreferences: {
                    degreeLevel: $('input[name="degree_level"]:checked').val(),
                    degreeProgram: $('#degree_program').val(),
                    startTerm: $('#start_term').val()
                },
                additionalInfo: {
                    personalStatement: $('#personal_statement').val(),
                    referralSource: $('#referral_source').val()
                }
            };

            // Post the JSON payload to your logic app trigger
            $.ajax({
                url: action,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(responseData) {
                    $('#message-apply').html(responseData);
                    $('#message-apply').slideDown('slow');
                    $('#apply_online .loader').fadeOut('slow', function(){
                        $(this).remove();
                    });
                    $('#submit-apply').removeAttr('disabled');
                    if(responseData.match('success') != null) {
                        $('#apply_online').slideUp('slow');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $('#message-apply').html('An error occurred: ' + textStatus);
                    $('#message-apply').slideDown('slow');
                    $('#apply_online .loader').fadeOut('slow', function(){
                        $(this).remove();
                    });
                    $('#submit-apply').removeAttr('disabled');
                }
            });
        });
    });

    // (Optional additional logic: dynamically update the Degree Program options based on Degree Level)
    $('input[name="degree_level"]').on('change', function(){
        var level = $(this).val();
        var $program = $('#degree_program');

        // Clear existing options and add a default prompt option.
        $program.empty().append('<option value="">Select a program</option>');

        // You can further customize these options based on the selected degree level.
        var options = [];
        if(level === 'Bachelor'){
            options = ['Computer Science','Hospitality & Tourism','Human Resources','Education','Business Management'];
        } else if(level === 'Master'){
            options = ['Computer Science','Hospitality & Tourism','Human Resources','Education','Business Management'];
        } else if(level === 'Doctorate'){
            options = ['Computer Science','Hospitality & Tourism','Human Resources','Education','Business Management'];
        }
        // Append the options to the select element
        $.each(options, function(index, value){
            $program.append('<option value="'+ value +'">'+ value +'</option>');
        });
    });

});