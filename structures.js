Array.matrix = function(numRow, numCol, initial){
    var arr = [];
    for(var i = 0; i < numRow; i++){
	var col = [];
	for (var j= 0; j < numCol; j++){
	    col[j] = initial;
	}
	arr[i] = col;
    }

    return arr;
}

Array.augment = function(matrix, augment_size, val) {

    var new_boundery  = matrix.length;

    for(var j = 1 ; j <= augment_size; j++){

	  matrix[new_boundery] = [];

	  for(var h = 0; h < matrix.length; h++){
		if( h != new_boundery){
		    matrix[h][new_boundery] = val;
		}

		matrix[new_boundery][h] = val;		
	  }
    }
}
