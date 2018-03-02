(function(){
  function onTabClick(event){
    var actives = document.querySelectorAll('.active');

    for (var i=0; i < actives.length; i++){
      actives[i].className = actives[i].className.replace('active', '');
    }

    event.target.parentElement.className += ' active';
    document.getElementById(event.target.href.split('#')[1]).className += ' active';
  }

  var el = document.getElementById('tabs');

  el.addEventListener('click', onTabClick, false);
})();

function parsetURL(url) {
  var obj = document.createElement('a');
    obj.href = url;

   var arr = [obj.protocol, obj.hostname, obj.port, obj.pathname, obj.search, obj.hash, obj.host];

    return(arr);
}

var parset = parsetURL('http://ffwagency.com/do/any.php?a=1#foo');

console.log(parset);
