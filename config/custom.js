
module.exports = {
    isEmpty: function(object) {
        let isEmpty = true;
        for (keys in object) {
           isEmpty = false;
           break; 
        }
        return isEmpty;
    }

}