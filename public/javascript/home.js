window.onload = function(){
    let body = document.querySelector('body')
    console.log(user == 'undefined')
    if(user == 'undefined'){
        body.style.backgroundColor='red'
    }

    console.log(req.session.login == 'undefined')
}