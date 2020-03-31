// id%7 == 0 For 1st column
// id%7 == 1 For 2st column
// id%7 == 2 For 3st column
// id%7 == 3 For 4st column
// .........

// console.log(player1)
// console.log(player2)

// var cells = document.querySelectorAll('td')
// or
$('h3').text('Player ' + player1 + ' : it is your turn, please pick a column to drop your blue chip.')
var player1Color = "rgb(255, 0, 0)"
var player2Color = "rgb(0, 0, 255)"
var cells = $('td')
var cols = $('tr')
var columnNumber = cols.length + 1
var backgroundColor = "rgb(187, 187, 187)"

function fourConsecutive(colorArr){
	// Given colorArr it returns the color which repeats
	// itself at least four times

	var prevColor = colorArr[0]
	var j = 1
	for (var i = 1; i<colorArr.length; i++){
		if(j<4){
			if(colorArr[i] == prevColor){
				// console.log(prevColor)
				j+=1
			}else{
				prevColor = colorArr[i]
				j = 1
			}
		}
	}
	if (j >= 4){
		return prevColor
	}
}

// To find the winner at any given instant or after 
// any move

// column wise check
function oneCol(colNumber){
	// Given the number of the column, it returns the 
	// an array which contains the colors 

	var colorArr = [];
	for (var i = 0; i<cells.length; i++){
		if ((i % columnNumber) == colNumber){
			colorArr.push(cells.eq(i).css('background-color'))
			// console.log(i)
		}
	}
	return colorArr
}

function oneRow(rowNumber){
	// Given the number of the row, it returns the 
	// an array which contains the colors 
	var rowNumGrid = rowNumber * 7
	var rowArr = [];
	for (var i=rowNumGrid; i<rowNumGrid+7; i++){
		rowArr.push(cells.eq(i).css('background-color'))
		// console.log(i)
	}
	return rowArr
}

// for(var i = 0; i < cells.length; i++){
// 	if (i%7 == 0){
// 		cells.eq(i).css('background', 'red')
// 	}
// }

function ordinateToNumber(row, col){
	return (7 * row) + col
}

function targetCellNumber(row, col){
	var arr = oneCol(col)
	var row_num = 0
	for(var i = 0;i<arr.length;i++){
		if (arr[i] == "rgb(187, 187, 187)"){
			row_num+=1
		}
	}
	return ordinateToNumber(row_num - 1, col)
}


function coOrdinatePlayerA(event){
	// svar cells = $('td')
	var column_num = parseInt( $(this).index());
	var row_num = parseInt( $(this).parent().index());
	// console.log('This is row: ' + row_num)
	// console.log('This is col: ' + column_num)
	// var number = ordinateToNumber(row_num, column_num)
	// $(this).css('background-color','red')
	var number = targetCellNumber(row_num, column_num)
	//console.log(number)
	cells.eq(number).css('background', 'red')
	var winnerColor = null
	for( var i = 0; i < 6; i++){
		if(fourConsecutive(oneRow(i)) != backgroundColor){
			winnerColor = fourConsecutive(oneRow(i))
			//alert('Winner is: ' + winnerColor)
		}
	}
	// if(winnerColor == "rgb(255, 0, 0)"){
	// 	console.log('Player A has won')
	// }
	console.log(event)
}

function coOrdinatePlayerB(event){
	// svar cells = $('td')
	var column_num = parseInt( $(this).index());
	var row_num = parseInt( $(this).parent().index());
	// console.log('This is row: ' + row_num)
	// console.log('This is col: ' + column_num)
	// var number = ordinateToNumber(row_num, column_num)
	// $(this).css('background-color','red')
	var number = targetCellNumber(row_num, column_num)
	console.log(number)
	cells.eq(number).css('background', 'blue')
	var winnerColor = null
	for( var i = 0; i < 6; i++){
		if(fourConsecutive(oneRow(i)) != backgroundColor){
			winnerColor = fourConsecutive(oneRow(i))
			//alert('Winner is: ' + winnerColor)
		}
	}
	if(winnerColor == "rgb(0, 0, 255)"){
		console.log('Player B has won')
	}
	console.log(event)
}

// $("#myTable td").click(coOrdinate)

//Get the co-ordinate the clicked cell 
// $("#myTable td").click(function() {     
//     var column_num = parseInt( $(this).index() ) ;
//     var row_num = parseInt( $(this).parent().index() );    

//     console.log(column_num)
//     console.log(row_num)  
// });


// Change the color of the individual cells on-click
// $("#myTable td").click(function() {     
//     $(this).toggleClass('turnRed')
// });
var clickCount = 0
winnerColorRowB = null
winnerColorColB = null

winnerColorRowA = null
winnerColorColA = null

// Driver Code

$('#myTable td').on('click', function(){
	var state = $(this).data('state')
	if(clickCount%2 == 0){
	// svar cells = $('td')
		$('h3').text('Player ' + player2 + ' : it is your turn, please pick a column to drop your red chip.')
		var column_num = parseInt( $(this).index());
		var row_num = parseInt( $(this).parent().index());
		// console.log('This is row: ' + row_num)
		// console.log('This is col: ' + column_num)
		// var number = ordinateToNumber(row_num, column_num)
		// $(this).css('background-color','red')
		var number = targetCellNumber(row_num, column_num)
		// console.log(number)
		cells.eq(number).css('background', 'blue')

		for( var i = 0; i < 6; i++){
			if(fourConsecutive(oneRow(i)) == "rgb(0, 0, 255)"){
				winnerColorRowB = true
				break
				//alert('Winner is: ' + winnerColor)
			}
		}
		for( var i = 0; i < 7; i++){
			if(fourConsecutive(oneCol(i)) == "rgb(0, 0, 255)"){
				console.log(fourConsecutive(oneCol(i)))
				winnerColorColB = true
				break
				//alert('Winner is: ' + winnerColor)
			}
		}
		//console.log(winnerColorColB	)
		if(winnerColorRowB  || winnerColorColB ){
			console.log('Congrats ' + player1 + ' you have won!')
		}

	}else{
		$('h3').text('Player ' + player1 + ' : it is your turn, please pick a column to drop your blue chip.')
		var column_num = parseInt( $(this).index());
		var row_num = parseInt( $(this).parent().index());
		// console.log('This is row: ' + row_num)
		// console.log('This is col: ' + column_num)
		// var number = ordinateToNumber(row_num, column_num)S
		// $(this).css('background-color','red')
		var number = targetCellNumber(row_num, column_num)
		//console.log(number)
		cells.eq(number).css('background', 'red')
		var winnerColor = null
		for( var i = 0; i < 6; i++){
			if(fourConsecutive(oneRow(i)) == "rgb(255, 0, 0)"){
				winnerColorRowA = true
				//alert('Winner is: ' + winnerColor)
			}
		}
		for( var i = 0; i < 7; i++){
			if(fourConsecutive(oneCol(i)) != "rgb(255, 0, 0)"){
				winnerColorColA = true
				//alert('Winner is: ' + winnerColor)
			}
		}
		if(winnerColorRowA || winnerColorColB ){
			console.log('Congrats ' + player2 + ' you have won!')
		}
		//
	}
	clickCount+=1
})