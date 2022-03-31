var div = document.getElementById('list-infinite-scroll');
var ul = document.querySelector('#list-infinite-scroll ul');
var currenScroll;

// default height `ul` without further adding values
var ulDefaultHeight = div.offsetHeight > ul.offsetHeight ? ul.offsetHeight : 0;

// default number of values in the list
var liDefaultValues = document.querySelectorAll('ul li');

// checking for the number of elements and the height of the div to add a certain
// number of values to the list so that there are visually a lot of them
if (div.offsetHeight > ul.offsetHeight) {
    // number of repetitions for visual filling
    var diff = Math.ceil(div.offsetHeight / ul.offsetHeight);
    for (var j = 0; j < diff; j++ ) {
        appendToDown();
        appendToUp();
    }
} else {
    appendToDown();
    appendToUp();
}

// moving to the center of the list
div.scrollTop = ul.offsetHeight / 2;

div.addEventListener("scroll", event => {
    currenScroll = document.getElementById('list-infinite-scroll').scrollTop;
    
    // to scroll down
    if (
        currenScroll > (div.offsetHeight * 3) / 4 &&
        ul.offsetHeight - div.offsetHeight < div.scrollTop
    ){
        appendToDown();

        // removing the top elements so that the code page doesn't fill up
        for (var i = 0; i < liDefaultValues.length; i++) {
            document.querySelectorAll('ul li')[0].remove();
        }
    }

    // to scroll up
    if (
        currenScroll < div.offsetHeight / 4 &&
        div.scrollTop < div.offsetHeight - ulDefaultHeight
    ) {
        appendToUp();

        // removing the bottom elements so that the code page doesn't fill up
        for (var i = 0; i < liDefaultValues.length; i++) {
            document.querySelectorAll('ul li')[document.querySelectorAll('ul li').length - 1].remove();
        }
    }
});

function appendToDown() {
    for (var i = 0; i < liDefaultValues.length; i++) {
        var node = liDefaultValues[i].cloneNode(true);
        ul.append(node);
    }
}

function appendToUp() {
    for (var i = (liDefaultValues.length - 1); i >= 0; i--) {
        var node = liDefaultValues[i].cloneNode(true);
        ul.prepend(node);
    }
}

// scroll down animation
setInterval(function () {
    document.getElementById('list-infinite-scroll').scrollTop = document.getElementById('list-infinite-scroll').scrollTop + 0.5;
}, 5);