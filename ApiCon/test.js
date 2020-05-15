let a = 0;
for(a = 0; a < 50; a++){
	//http://localhost:3000/
	// Esto hace un get
	fetch('/').then( (response) => {
		console.log(response);
		console.log("Terminado "+a);
	});
}
