module.exports = function solveSudoku(matrix) {
	
function nullElements(Sudoku) // Count of unfilled cells
{ 
var nullElements = [];
var k = 0;
  for ( i = 0; i < 9 ; i++ )
  for ( j = 0; j < 9 ; j++ )
    if ( Sudoku[i][j] == 0 ) nullElements[k++] = 10 * i + j;
return nullElements;
}




function Checker(Sudoku) // Count of undefined cells
{ 


var nullElements = [];
var k = 1;
  for ( i = 0; i < 9 ; i++ )
  for ( j = 0; j < 9 ; j++ )
    if ( Sudoku[i][j] == undefined )  k = -1;
	
for (i=0; i < 9; i++ )
   if ( Sudoku[i].indexOf(0) != -1 && Sudoku[i].indexOf(0) == Sudoku[i].lastIndexOf(0) ) k = -1;	
	
	
return k;
}


function notInThisRow( sudokuCell, Sudoku, NoNumberInRow ) //Exclude numbers which are in the same r
{

  var rowNumber = Math.floor( sudokuCell / 10);
  
  
  for ( i=0; i<9; i++)
    delete  NoNumberInRow[ Sudoku[rowNumber][i] - 1 ];
	 
 return NoNumberInRow;	 
	 
 
}



function notInThisColumn( sudokuCell, Sudoku, NoNumberInColumn ) //Exclude numbers which are in the same column
{
  var ColumnNumber = sudokuCell % 10;
  
  
  for ( i=0; i<9; i++)
    delete  NoNumberInColumn[ Sudoku[i][ColumnNumber] - 1 ];
	 
 return NoNumberInColumn;	 
	 
 }


function notInThisSquare( sudokuCell, Sudoku, NoNumberInSquare) //Exclude numbers which are in the same square
{

  var ColumnNumber = Math.floor((sudokuCell % 10) / 3);
  var rowNumber = Math.floor( Math.floor( sudokuCell / 10) / 3 );
  
  for ( i=0; i < 3; i++)
  for ( j=0; j < 3; j++)
    delete  NoNumberInSquare[ Sudoku[ 3 * rowNumber + i][ 3 * ColumnNumber + j ] - 1 ];
	 
 return NoNumberInSquare;	 
	 
 } 
 
 
function PossibleNumbers( sudokuCell, Sudoku ) //Array of potential numbers
{

 var PossibleNumbers =  [1, 2, 3, 4, 5, 6, 7, 8, 9];
 
 var PossibleNumbers2018 = [];
 
 var j = 0;
 
 notInThisSquare( sudokuCell, Sudoku, PossibleNumbers);
 
 notInThisColumn( sudokuCell, Sudoku, PossibleNumbers );
 
 notInThisRow( sudokuCell, Sudoku, PossibleNumbers );
 
 
 
 for ( i=0; i < PossibleNumbers.length; i++)
 if ( PossibleNumbers[i] ) PossibleNumbers2018[ j++ ] = PossibleNumbers[i];
 
 
 
 return PossibleNumbers2018;

}
 
 function PossibleNumbersLength( sudokuCell, Sudoku ) //Length of array of potential numbers
 
   {
 
   var array = PossibleNumbers( sudokuCell, Sudoku );
 
   return array.length; 
 
  }
 
 
 function numbersOfSimpler(Sudoku) //Indexes of cells where only one potential number
 {
 
 var arrayZeroes = nullElements(Sudoku);
 
 var array2018 = [];
 
 var n = 0;
 
 for ( k=0; k < arrayZeroes.length; k++ )
   if ( PossibleNumbersLength( arrayZeroes[k], Sudoku ) == 1 ) array2018[n++] = arrayZeroes[k]; 
   
  return array2018;
 
 }
 
 
function setOfSimpler(Sudoku) // Fill up cells with only one potential number
 {

var array2018 = numbersOfSimpler(Sudoku); 

for ( k=0; k < array2018.length; k++ )
 
Sudoku[ Math.floor( array2018[k] / 10) ][array2018[k] % 10 ] = PossibleNumbers( array2018[k], Sudoku )[0];

if (array2018.length) return 1;
else return 0;
  
}

function setOfPotentialNumbers(Sudoku2018)
 {
 
var array2018 = nullElements(Sudoku2018); 

for ( k=0; k < array2018.length; k++ ) Sudoku2018[ Math.floor( array2018[k] / 10) ][array2018[k] % 10 ] = PossibleNumbers( array2018[k], Sudoku2018 );
 
return Sudoku2018;
 
}


function nullElementsInRow( rowNumber, Sudoku ) // Indexes of unfilled field in a row
{ 

var nullElements = [];

var k = 0;
  for ( j = 0; j < 9 ; j++ )
    if ( Sudoku[rowNumber][j] ==  0 ) nullElements[k++] = j;
	
return nullElements;
}

function nullElementsInColumn( columnNumber, Sudoku ) // Indexes of unfilled field in a column
{ 

var nullElements = [];

var k = 0;
  for ( j = 0; j < 9 ; j++ )
    if ( Sudoku[j][columnNumber] ==  0 ) nullElements[k++] = j;
	
return nullElements;
}



function Unique ( Row, Sudoku ) //Looking for lonely hero in the row
{
 
 var array = nullElementsInRow( Row, Sudoku ) ;

 var unique = [];

  for ( q = 0; q < 9; q++ )
  {
  
  unique[q] = 0;
  
  var index = [];
  
  for ( p = 0; p < array.length; p++ )  if ( PossibleNumbers( 10 * Row + array[p], Sudoku ).indexOf(q+1) !=-1 ) unique[q]+=1;
  
  }
  
  
   

   if ( unique.indexOf(1) != -1 ) 
       for ( p = 0; p < array.length; p++ )  if ( PossibleNumbers( 10 * Row + array[p], Sudoku ).indexOf(unique.indexOf(1) + 1) != -1 ) { index[0] = array[p]; index[1] = unique.indexOf(1) + 1; 
	  // alert("нужно поменять элемент под номером "+array[p]+ " в строке "+Row+" c 0 на "+index[1]);
	   }
  

 return index;
 

	 
}



function UniqueColumn ( Column, Sudoku ) //Looking for lonely hero in the column
{
 
 var array = nullElementsInColumn( Column, Sudoku ) ;

 var unique = [];

  for ( q = 0; q < 9; q++ )
  {
  
  unique[q] = 0;
  
  var index = [];
  
  for ( p = 0; p < array.length; p++ )  if ( PossibleNumbers( 10 * array[p] + Column, Sudoku ).indexOf(q+1) !=-1 ) unique[q]+=1;
  
  }
  
  
   

if ( unique.indexOf(1) != -1 ) 
       for ( p = 0; p < array.length; p++ )  if ( PossibleNumbers( 10 * array[p] + Column, Sudoku ).indexOf(unique.indexOf(1) + 1) != -1 ) { index[0] = array[p]; index[1] = unique.indexOf(1) + 1; 
	//  alert("нужно поменять элемент под номером "+array[p]+ " в столбце "+Column+" c 0 на "+index[1]);
	   }
  

 return index;
 

	 
}



function SetLonelyInTheRow( Sudoku ) //Set lonely hero in the row
{

var counter2=1;

var k=0;

while (counter2)
{

counter2=0;

for ( qwerty = 0; qwerty  < 9; qwerty++ )
{

if ( Unique( qwerty, Sudoku ).length > 1 ) { Sudoku[qwerty][ Unique( qwerty, Sudoku )[0] ] = Unique( qwerty, Sudoku )[1]; counter2=1; k++;}

}

}
 
 return k;
 
}


function SetLonelyInTheColumn( Sudoku ) //Set lonely hero in the row
{

var counter2=1;

var k=0;

while (counter2)
{

counter2=0;

for ( qwerty = 0; qwerty  < 9; qwerty++ )
{

if ( UniqueColumn( qwerty, Sudoku ).length > 1 ) { Sudoku[ UniqueColumn( qwerty, Sudoku )[0] ][ qwerty ] = UniqueColumn( qwerty, Sudoku )[1]; counter2=1; k++;}

}

}
 
 return k;
 
}


function fillUp(Sudoku) //Fill up Sudoku
{

var counter=1;

var k=0;

while (counter)
{ 

counter=setOfSimpler(Sudoku); 

 if ( counter == 1 ) k++;
 
}

return k;

}


function Transform(Sudoku) // Fiiling and looking for last heroes
{

var counter = 1;
var counter1 = 0;
var counter2 = 0;
var counter3 = 0;

while (counter)
{

counter1 = fillUp(Sudoku);

counter2 = SetLonelyInTheRow( Sudoku );

counter3 = SetLonelyInTheColumn( Sudoku );

counter = counter1 + counter2 + counter3;

}

}

 function numbersOfSimplerFor2(Sudoku) //Indexes of cells where only two potential number
 {
 
 var arrayZeroes = nullElements(Sudoku);
 
 var array2018 = [];
 
 var n = 0;
 
 for ( k=0; k < arrayZeroes.length; k++ )
   if ( PossibleNumbersLength( arrayZeroes[k], Sudoku ) == 2 ) array2018[n++] = arrayZeroes[k]; 
   
  return array2018;
 
 }
 
 

function SuperTransform(Sudoku) //Set possible value
{

var NewSudoku = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

 for ( i = 0; i < 9 ; i++ )
  for ( j = 0; j < 9 ; j++ )
    NewSudoku[i][j] = Sudoku[i][j];  

Sudoku[Math.floor( numbersOfSimplerFor2(Sudoku)[0] / 10 ) ][ numbersOfSimplerFor2(Sudoku)[0] % 10 ] = PossibleNumbers( numbersOfSimplerFor2(Sudoku)[0], Sudoku )[0];

Transform(Sudoku);

if ( Checker(Sudoku) == -1 ) 
{
for ( i = 0; i < 9 ; i++ )
  for ( j = 0; j < 9 ; j++ )
    Sudoku[i][j] = NewSudoku[i][j];  
Sudoku[Math.floor( numbersOfSimplerFor2(Sudoku)[0] / 10 ) ][ numbersOfSimplerFor2(Sudoku)[0] % 10 ] = PossibleNumbers( numbersOfSimplerFor2(Sudoku)[0], Sudoku )[1];
Transform(Sudoku);
}	
	
}


Transform(matrix);

var counterTransformer = 0;

if ( nullElements(matrix).length > 2 ) counterTransformer = 1;

while (counterTransformer)
{
counterTransformer = 0;
SuperTransform(matrix);
if ( nullElements(matrix).length > 2 ) counterTransformer = 1;
}

return matrix;
}
