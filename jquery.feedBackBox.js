; (function ($) {
    $.fn.extend({
        feedBackBox: function (options) {

            // default options
            this.defaultOptions = {
                title: 'Feedback',
                titleMessage: 'Please feel free to leave us feedback.',
                userName: '',
                isUsernameEnabled: true,
                message: '',
                ajaxUrl: 'http://jwillmer.de',
                successMessage: 'Thank your for your feedback.',
                errorMessage: 'Something wen\'t wrong!'
            };

            var settings = $.extend(true, {}, this.defaultOptions, options);


            //function 

            return this.each(function () {
                var $this = $(this);
                var thisSettings = $.extend({}, settings);

                var isUsernameEnabled
                if (!thisSettings.isUsernameEnabled) {
                    isUsernameEnabled = 'disabled="disabled"';
                }

                $this.html('<div id="fpi_feedback"><div id="fpi_title" class="rotate"><h2>'
                    + thisSettings.title
                    + '</h2></div><div id="fpi_content"><div id="fpi_header_message">'
                    + thisSettings.titleMessage
                    + '</div><form><div id="fpi_submit_username">Name<input type="text" name="username" '
                    + isUsernameEnabled
                    + ' value="'
                    + thisSettings.userName
                    + '"></div><div id="fpi_submit_message">Message<textarea name="message"></textarea></div>'
                    + '<div id="fpi_submit_submit"><input type="submit" value="Submit"></div></form><div id="fpi_ajax_message"><h2>'
                    + '</h2></div></div></div>');

                // add submit action
                $this.find('form').submit(function () {
                    var disabled = $(this).find(':input:disabled').removeAttr('disabled');
                    var serialized = $(this).serialize();
                    disabled.attr('disabled', 'disabled');

                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: thisSettings.ajaxUrl,
                        data: serialized,
                        error: function (data) {
                            $('#fpi_content form').hide();
                            $('#fpi_content #fpi_ajax_message h2').html(thisSettings.errorMessage);
                           // $('#fpi_content #fpi_ajax_message').show();
                        },
                        sucess: function (data) {
                            $('#fpi_content form').hide();
                            $('#fpi_content #fpi_ajax_message h2').html(thisSettings.successMessage);
                           // $('#fpi_content #fpi_ajax_message').show();
                        }
                    });
                    return false;
                });

                var isOpen = false;
                $('#fpi_title').click(function () {
                    if (isOpen) {
                        $('#fpi_feedback').animate({ "width": "+=5px" }, "fast")
                        .animate({ "width": "55px" }, "slow")
                        .animate({ "width": "60px" }, "fast");
                        isOpen = !isOpen;
                    } else {
                        $('#fpi_feedback').animate({ "width": "-=5px" }, "fast")
                        .animate({ "width": "365px" }, "slow")
                        .animate({ "width": "360px" }, "fast");
                        $('#fpi_content form').show();
                        isOpen = !isOpen;
                    }

                });
            });
        }
    });
})(jQuery);
