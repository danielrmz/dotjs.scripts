
if(window.jQuery) {
    $ = jQuery;
    var _history = [];
    var _limit   = 5;
    var current = 0;
    
    
    var scripts = $("script");
    var conv = scripts[scripts.length - 1].innerHTML;
    var user = conv.split("\n")[3].split(" = ")[1].replace(/'/g,"").replace(";","");
    
    var last = $("span.username").filter(function(arr,i){ return $(i)[0].innerText == user;});
    var len = last.length - 1;
    for(var i = len; i >= len - _limit + 1; i--) {
        try {
            var message = $(last[i]).parent().parent().find(".message-body").html();
            if(message == "") { continue; }
            var pos = Math.abs(_limit - i) - 1;
            _history[pos] = message;
            current = _limit - current;
        } catch(err) {}
    }  
    console.dir(_history);
    
    $("#id-message").keydown(function(){
        var UP = 38;
        var DOWN = 40;
        var ENTER = 13;
        var MIN = 0;
        var MAX = _history.length - 1;
        
        var msg = $(this);
        
        switch(event.which) {
            case UP: 
                if(current == MIN) { 
                    msg.val(_history[0]?_history[0]:""); 
                    return; 
                } 
                
                msg.val(_history[--current]); 
                break;
            case DOWN:  
                if(current == _limit || current == MAX + 1) { 
                    msg.val(""); 
                    return; 
                } 
                msg.val(_history[++current]); 
                break;

            case ENTER: 
                if(_history.length == _limit) {
                    _history = _history.slice(1, _history.length);
                }
                _history.push(msg.val());
                current = _history.length;
                console.log(current);
            break;
        }
    });

}
