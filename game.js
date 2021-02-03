var firstMove = true;
var origem = "", destino = "";

//Handle user clicks
$(".btn").on("click", function(event) {
  if(firstMove){
    origem = this.id;
    if(hasPiece(origem)){
      firstMove = false;
    }
  } else{
    destino = this.id;
    move(origem, destino);
    firstMove = true;
  }
});

function move(org, dest) {
  var piece = getPiece(org);

  if(possibleMovement(getType(piece), getColor(piece), org, dest)){
    removePiece(org);
    placePiece(dest, piece);
  }
}

//Place pieces on the table
function placePiece(house, piece) {
  $("#" + house).html(piece);
}

function removePiece(house) {
  $("#" + house).html("");
}

function hasPiece(house) {
  if ($("#" + house).html() === "") {
      return false;
  } else {
    return true;
  }
}

function getPiece(house) {
  return $("#" + house).html();
}

function getType(piece){
  switch(true){
    case (piece.includes("rei")):
      return "king";
    case (piece.includes("rainha")):
      return "queen";
    case (piece.includes("torre")):
      return "tower";
    case (piece.includes("cavalo")):
      return "knight";
    case (piece.includes("bispo")):
      return "bishop";
    case (piece.includes("peao")):
      return "pawn";
  }
}

function getColor(piece){
  if(piece.includes("branco") || piece.includes("branca")){
    return "white";
  } else{
    return "black";
  }
}

function possibleMovement(piece, cor, origem, destino){
  var start = [], end = [];
  var a = origem.split("-", 2);
  var b = destino.split("-", 2);

  for(var i = 0; i < 2; i++){
    start[i] = parseInt(a[i]);
    end[i] = parseInt(b[i]);
  }

  switch(piece){
    //Pawn possible movements start
    case "pawn":
      if(cor === "white"){
        if((end[0] === (start[0] + 1) && (end[1] === start[1])) || ((start[0] === 2) && (end[0] === (start[0] + 2)))){
          if(!hasPiece(destino)){
            return true;
          }
        }
        else if((end[0] === (start[0] + 1)) && ((end[1] == start[1] + 1) || (end[1] == start[1] - 1))){
          if(hasPiece(destino) && (getColor(getPiece(destino)) === "black")){
            return true;
          }
        }
      } else{
        if((end[0] === (start[0] - 1) && (end[1] === start[1])) || ((start[0] === 7) && (end[0] === (start[0] - 2)))){
          if(!hasPiece(destino)){
            return true;
          }
        }
        else if((end[0] === (start[0] - 1)) && ((end[1] == start[1] + 1) || (end[1] == start[1] - 1))){
          if(hasPiece(destino) && (getColor(getPiece(destino)) === "white")){
            return true;
          }
        }
      }
    //Pawn possible movements end

    //Knight possible movements start
    case "knight":
      if(!hasPiece(destino) || (getColor(getPiece(destino)) != getColor(getPiece(origem)))){
        if((end[0] === start[0] + 2 || end[0] === start[0] - 2) && (end[1] === start[1] + 1 || end[1] === start[1] - 1)){
          return true;
        }
        else if((end[0] === start[0] + 1 || end[0] === start[0] - 1) && (end[1] === start[1] + 2 || end[1] === start[1] - 2)){
          return true;
        }
      }
    //Knight possible movements end

    //Tower possible movements start
    case "tower":
      if(end[0] === start[0] || (end[1] === start[1])){
        if(canJump(start, end)){
          if(!hasPiece(destino) || (hasPiece(destino) && (getColor(getPiece(destino)) != getColor(getPiece(origem))))){
            return true;
          }
        }
      }
      //Tower possible movements end
  }

  return false;
}

function canJump(a, b){
  var s, e;
  if(a[0] == b[0]){
    if(a[1] < b[1]){
      s = a[1] + 1;
      e = b[1] - 1;
    } else{
      s = b[1] + 1;
      e = a[1] - 1;
    }
    for(var i = s; i <= e; i++){
      if(hasPiece(a[0] + "-" + i)){
        return false;
      }
    }
  } else{
    if(a[0] < b[0]){
      s = a[0] + 1;
      e = b[0] - 1;
    } else{
      s = b[0] + 1;
      e = a[0] - 1;
    }
    for(var i = s; i <= e; i++){
      if(hasPiece(i + "-" + a[1])){
        return false;
      }
    }
  }

  return true;
}

function start() {
  //place pawns
  for(var i = 1; i <= 8; i++){
    placePiece("2-" + i, "<img class='piece' src='images/peao-branco.png'>");
    placePiece("7-" + i, "<img class='piece' src='images/peao-preto.png'>")
  }

  //place towers
  placePiece("1-1", "<img class='piece' src='images/torre-branca.png'>");
  placePiece("1-8", "<img class='piece' src='images/torre-branca.png'>");
  placePiece("8-1", "<img class='piece' src='images/torre-preta.png'>");
  placePiece("8-8", "<img class='piece' src='images/torre-preta.png'>");

  //place knight
  placePiece("1-2", "<img class='piece' src='images/cavalo-branco.png'>");
  placePiece("1-7", "<img class='piece' src='images/cavalo-branco.png'>");
  placePiece("8-2", "<img class='piece' src='images/cavalo-preto.png'>");
  placePiece("8-7", "<img class='piece' src='images/cavalo-preto.png'>");

  //place bishops
  placePiece("1-3", "<img class='piece' src='images/bispo-branco.png'>");
  placePiece("1-6", "<img class='piece' src='images/bispo-branco.png'>");
  placePiece("8-3", "<img class='piece' src='images/bispo-preto.png'>");
  placePiece("8-6", "<img class='piece' src='images/bispo-preto.png'>");

  //place queens
  placePiece("1-4", "<img class='piece' src='images/rainha-branca.png'>");
  placePiece("8-4", "<img class='piece' src='images/rainha-preta.png'>");

  //place kings
  placePiece("1-5", "<img class='piece' src='images/rei-branco.png'>");
  placePiece("8-5", "<img class='piece' src='images/rei-preto.png'>");
}

start();
var s = 1;
var ss = 2;

var sss = (s+1) + "-" + (ss + 1);
