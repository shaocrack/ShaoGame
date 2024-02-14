(function(exports){

    // Singleton
    var Key = {};
    exports.Key = Key;

    // Keycodes to words mapping
    var KEY_CODES = {
        37:"left", 38:"up", 39:"right", 40:"down",
        65:"left", 87:"up", 68:"right", 83:"down",
        16:"slow",
        32:"action", 13:"action",
        27:"pause", 80:"pause"
    };

    // Event Handling for Keyboard
    var onKeyDown = function(event){
        var code = KEY_CODES[event.keyCode];
        Key[code] = true;
        if(window.STAGE==4) return;
        event.stopPropagation();
        event.preventDefault();
    }
    var onKeyUp = function(event){
        var code = KEY_CODES[event.keyCode];
        Key[code] = false;
        if(window.STAGE==4) return;
        event.stopPropagation();
        event.preventDefault();
    }

    // Event Handling for Touch
    var onTouchStart = function(event) {
        var touchX = event.touches[0].clientX;
        var touchY = event.touches[0].clientY;
        // Determine direction based on touch coordinates
        var direction = calculateDirection(touchX, touchY);
        Key[direction] = true;
        event.preventDefault();
    }

    var onTouchEnd = function(event) {
        // Clear all keys when touch ends
        Key["left"] = false;
        Key["up"] = false;
        Key["right"] = false;
        Key["down"] = false;
        Key["slow"] = false;
        Key["action"] = false;
        Key["pause"] = false;
        event.preventDefault();
    }

    // Add touch events listeners
    window.addEventListener("touchstart", onTouchStart, false);
    window.addEventListener("touchend", onTouchEnd, false);

    // Add keyboard events listeners
    window.addEventListener("keydown",onKeyDown,false);
    window.addEventListener("keyup",onKeyUp,false);

    // Function to calculate direction based on touch coordinates
    function calculateDirection(touchX, touchY) {
        // Implement logic to determine direction based on touch coordinates
        // Example: you might divide the screen into regions and assign each region a direction
        // For simplicity, let's assume the entire left half of the screen is "left" and so on
        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;
        if (touchX < screenWidth / 2) {
            if (touchY < screenHeight / 2) {
                return "up";
            } else {
                return "down";
            }
        } else {
            if (touchY < screenHeight / 2) {
                return "left";
            } else {
                return "right";
            }
        }
    }

})(window);
