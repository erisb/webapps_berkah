            
            {/* // pie chart             */}
            $(function() {
                $('.js-pie-chart-enabled').easyPieChart();
            });
            {/* // for sidebar right */}
            $(document).ready( function() {
                $(window).resize(resize);
                resize();
            });
            function resize() {
                if ($(window).width() < 514) {
                    $('#page-container').removeClass('side-overlay-o');
                    $('#col').addClass('col-12');
                    $('#col2').addClass('col-12');
                    $('#status-plafon').addClass('d-none');
                    $('.content-header').addClass('content-header-small');
                    $('#detect-screen').removeClass('content-full-right');
                    $('#detect-screen').addClass('content-full-right-small');
                    $('#btn-ajukan-pendanaan').removeClass('pull-right');
                    $('.simplebar-content').addClass('simplebar-content-small');
                }
                else if ($(window).width() < 641){
                    $('#status-plafon').addClass('d-none');
                }
                else if ($(window).width() < 991) {
                    $('#page-container').removeClass('side-overlay-o');
                    $('#status-plafon').removeClass('d-none');
                    $('#detect-screen').removeClass('content-full-right-small');
                    $('#detect-screen').addClass('content-full-right');
                    $('#btn-ajukan-pendanaan').addClass('pull-right');
                    $('.simplebar-content').removeClass('simplebar-content-small');
                    $('.simplebar-content').addClass('simplebar-content');
                }
                else {
                    $('#page-container').addClass('side-overlay-o');
                    $('#status-plafon').removeClass('d-none');
                    $('#detect-screen').removeClass('content-full-right-small');
                    $('#detect-screen').addClass('content-full-right')
                    $('#btn-ajukan-pendanaan').addClass('pull-right');
                    $('.simplebar-content').removeClass('simplebar-content-small');
                    $('.simplebar-content').addClass('simplebar-content');
                }
            }

            
            $( "#change_layout_12" ).click(function(e) {
                
                    $('#col').removeClass('col-md-9');
                    $('#col').addClass('col-md-12');
                    $('#col2').removeClass('col-md-9');
                    $('#col2').addClass('col-md-12');
               
            });
            $( "#change_layout_8" ).click(function(e) {
                if( $('#col').hasClass('col-md-9') ) {
                    $('#col').removeClass('col-md-9');
                    $('#col').addClass('col-md-12');
                    $('#col2').removeClass('col-md-9');
                    $('#col2').addClass('col-md-12');
                }
                else{
                     $('#col').removeClass('col-md-12');
                    $('#col').addClass('col-md-9');
                    $('#col2').removeClass('col-md-12');
                    $('#col2').addClass('col-md-9');
                }
            });