/*
** @Domain: Validate
** @Require: jQuery
*/
try{
    mui.Animate = (function(mui){
    var setter = function(opt){
        if(typeof opt.scene === "undefined")          opt.scene = 0;
        if(typeof opt.extra === "undefined")          opt.extra = 0;
        
        var pos = -1 * ((opt.width * opt.scene) + opt.extra);
        var isInfinite = opt.isInfinite || null;
        
        opt.dom.css('background-position', pos + 'px 0px');
        opt.scene++;
        
        if(opt.scene === opt.cnt){
            pos = -1 * (opt.scene * opt.width);
            opt.scene = 0;
            
            if(typeof callback === "function"){
                callback();
                return true;
            }   
        }        
        
    }

    var run = function(opt){
        return setInterval(function(){
            setter(opt);
        }, opt.interval);             
    }

    return {
        run : run
    }

    })(mui)
} catch(e){
    console.log(e);
} finally{

}