var EventUtil = {
/**
* 事件代理
* @param {Node} delegator 在该元素上进行代理
* @param {string} type 事件类型
* @param {string} selector 要代理的元素选择器，目前IE11-仅支持id、class和标签名，其余浏览器支持合法的CSS选择器
* @param {function} handler 事件处理函数
**/
    on: function(delegator, type, selector, handler) {

        if (delegator.addEventListener) {
            delegator.addEventListener(type, eventFunc, false);

        } else if (delegator.attachEvent){
            delegator.attachEvent('on' + type, eventFunc);

        } else {
            delegator['on' + type] = eventFunc;
        }

        function eventFunc(event) {

            var event = event || window.event;
            var target = event.target || event.srcElement;

            // 阻止默认行为
            if (!event.preventDefault) {
                event.preventDefault = function(event) {
                    event.returnValue = false;
                }
            }

            //阻止冒泡
            if (!event.stopPropagation) {
                event.stopPropagation = function(event) {
                    event.cancelBubble = true;
                }
            }

            if (typeof selector === 'function') { //绑定自身
                var _handler = selector;
                _handler.call(delegator, event);

            } else { //代理
                isTarget(target, selector) && handler && handler.call(target, event);
            }
        }

        // 判断目标元素是否是被代理的元素
        function isTarget(target, selector) {

            if (document.querySelectorAll) {
                var targets = Array.prototype.slice.call(delegator.querySelectorAll(selector));
                return targets.indexOf(target) !== -1;
            }

            if (selector[0] === '#') {
                return target.id === selector.slice(1);
            }

            if (selector[0] === '.') {
                var clcName = selector.slice(1);
                return target.className.indexOf(className) !== -1;
            }

            return target.nodeName.toLowerCase() === selector.toLowerCase();
        }
    }
};