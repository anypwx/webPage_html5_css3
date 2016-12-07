var onPage;
var pageTotal;
$(document).ready(function () {
     onPage = 0;  //当前标记页
     pageTotal = pageTotalFuc(); //总页数
    (function(window, undefined) {
        var _eventCompat = function(event) {
            var type = event.type;
            if (type == 'DOMMouseScroll' || type == 'mousewheel') {
                event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
            }
            //alert(event.delta);
            if (event.srcElement && !event.target) {
                event.target = event.srcElement;
            }
            if (!event.preventDefault && event.returnValue !== undefined) {
                event.preventDefault = function() {
                    event.returnValue = false;
                };
            }
            /*
             ......其他一些兼容性处理 */
            return event;
        };
        if (window.addEventListener) {
            return function(el, type, fn, capture) {
                if (type === "mousewheel" && document.mozHidden !== undefined) {
                    type = "DOMMouseScroll";
                }
                el.addEventListener(type, function(event) {
                    fn.call(this, _eventCompat(event));
                }, capture || false);
            }
        } else if (window.attachEvent) {
            return function(el, type, fn, capture) {
                el.attachEvent("on" + type, function(event) {
                    event = event || window.event;
                    fn.call(el, _eventCompat(event));
                });
            }
        }
        return function() {};
    })(window)(document, "mousewheel", function (event) {
        console.log("delta"+event.delta);
        if( event.delta > 0 ){ //向上
            backPage(onPage--);
        }else {  //向下
            nextPage(onPage++);
        }
    });

});

function nextPage(index) {
    if(0 < index && index < pageTotal){
        console.log("向下"+index+",,,,"+pageTotal);
        $($(".m_container").children('div')[index-1]).css("top","0%").animate({top:"-100%"},1500);
        $($(".m_container").children('div')[index]).css("top","100%").animate({top:"0%"},1500);
    }else if(pageTotal <= index){
        onPage = pageTotal;
    }
}

function backPage(index) {
    if(0 < index && index < pageTotal){
        console.log("向上"+index+",,,,"+pageTotal);
        $($(".m_container").children('div')[index-1]).css("top","-100%").animate({top:"0%"},1500);
        $($(".m_container").children('div')[index]).css("top","0%").animate({top:"100%"},1500);
    }else if(0 >= index){
        onPage = 0;
    }
}

function pageTotalFuc() {
  var aa = $(".m_container").children('div').length;
  return aa;
}
