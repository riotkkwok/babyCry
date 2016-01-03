$(function(){
    var baby = new Baby();
    console.log('The cry is on the way...')
});

function Baby(){
    var that = this, cryTS, isStart = false, paused = false;

    var messages = {
        fail: 'Seems not for that reason!!! Cry much more loudly now!!!',
        dirtyDiaper: 'Wooooow, what a mess!',
        cleanDiaper: 'It looks like a new one.'
    };

    born();

    /* soothe method */
    this.feed = function(){
        check();
    };
    this.hold = function(){
        check();
    };
    this.checkDiaper = function(){
        if(!!(+new Date % 2)){
            showToast(messages.cleanDiaper);
        }else{
            showToast(messages.dirtyDiaper);
        }
    };
    this.changeDiaper = function(){
        check();
    };
    this.dress = function(){
        check();
    };
    this.undress = function(){
        check();
    };
    // this.feed = function(){};
    
    function born(){
        cryTS = 0;
        setInterval(start, 1000);
        function start(){
            var duration;
            if(cryTS === 0 && !isStart){
                duration = parseInt(Math.random() * 30, 10) * 1000;
                console.log(duration);
                setTimeout(cry, duration);
                isStart = true;
            }
        }

        $('.flow-btn').on('click', 'a', function(){
            var cn = $(this).attr('class');
            switch(cn.replace(/^js\-/, '')){
                case 'feed': 
                    that.feed(); break;
                case 'hold': 
                    that.hold(); break;
                case 'checkDiaper': 
                    that.checkDiaper(); break;
                case 'changeDiaper': 
                    that.changeDiaper(); break;
                case 'dress': 
                    that.dress(); break;
                case 'undress': 
                    that.undress(); break;
                case 'stop': 
                    paused = true; $('#pause').removeClass('hidden'); break;
                case 'about': 
                    $('#about').removeClass('hidden'); break;
            }
        });
        $('.mask').on('click', function(){
            $('.mask').addClass('hidden');
        });
        $('#pause').on('click', function(){
            paused = false;
        });
    }
    function cry(){
        var tmpl = '<span class="warning" style="{{{style}}}">Cry</span>';
        cryTS = setInterval(function(){
            /* test [start] */
            // if($('.warning').length > 100){
            //     return;
            // }
            /* test [end] */
            if(paused){
                return;
            }
            var h = parseInt(Math.random()*$(window).height()-50, 10), 
                w = parseInt(Math.random()*$(window).width()-50, 10),
                deg = parseInt(Math.random()*180, 10) - 90;
            $('body').append(tmpl.replace('{{{style}}}',
                'top: '+h+'px;'+ 
                'left: '+w+'px;'+ 
                'font-size: '+(parseInt(Math.max($(window).height(), $(window).width()) / 10, 10))+'px;'+ 
                'transform: rotate('+deg+'deg);'));
        }, 500);
    }
    function peace(){
        clearInterval(cryTS);
        $('.warning').fadeOut(1);
        setTimeout(function(){
            cryTS = 0;
            isStart = false;
            $('.warning').remove();
        }, 2000);
    }
    function check(){
        setTimeout(function(){
            if(Math.random() < 0.25){
                peace();
            }else{
                showToast(messages.fail);
            }
        });
    }
    function showToast(msg){
        $('#toast').text(msg).removeClass('hidden').addClass('fadeInOut');
        setTimeout(function(){
            $('#toast').text('').removeClass('fadeInOut').addClass('hidden');
        }, 4100);
    }
}