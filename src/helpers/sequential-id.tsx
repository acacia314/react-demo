let startId = 1000;

function next () {
    return (++startId).toString() 
}
function current () {
    return startId.toString()
}

export default {
    next,
    current
}