
exports.getShortDate = function(){
    var today = new Date();
    var Options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    }
    return today.toLocaleDateString("en-US", Options);
}

exports.getFullDate = function(){
    var today = new Date();
    var Options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    return today.toLocaleDateString("en-US", Options);
}

exports.getDayName = function(){
    var today = new Date();
    var Options = {
        weekday: "long"
    }
    return today.toLocaleDateString("en-US", Options);
}
console.log(module.exports);


