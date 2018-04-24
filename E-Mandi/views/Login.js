
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function WholesellerPop()
{	$('#navr').collapse('hide');
	$('#modal').modal('show');
}		

// Side Bar
function del(){
	document.getElementById("mySidenav").classList.toggle("visible");
}
function closeNav(){
	document.getElementById("mySidenav").classList.toggle("visible");
}
	
  
