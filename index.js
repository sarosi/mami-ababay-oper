const lalala = document.createElement('tr');
const lalalaTitle = document.createElement('input');
const lalalaAuthor = document.createElement('input');
const lalalaDuration = document.createElement('input');
const lalalaProtected = document.createElement('input');

lalalaTitle.type="text";
lalalaAuthor.type="text";
lalalaDuration.type="text";
lalalaProtected.type="checkbox";

lalala.appendChild(lalalaTitle);
lalala.appendChild(lalalaAuthor);
lalala.appendChild(lalalaDuration);
lalala.appendChild(lalalaProtected);


function addLalala() {
  var lalalaTable = document.getElementById("lalalaTable");
  var paradigmRow = lalalaTable.rows[1];
  var newRow = lalalaTable.insertRow(lalalaTable.rows.length);

  newRowIndex = lalalaTable.rows.length - 1;

  var colCount = paradigmRow.cells.length;

			for(var i=0; i<colCount; i++) {

				var newcell	= newRow.insertCell(i);

				newcell.innerHTML = paradigmRow.cells[i].innerHTML;
        var firstId = paradigmRow.cells[i].childNodes[1].id;
        console.log(firstId);
        newcell.childNodes[1].id = firstId.slice(0, -1) + newRowIndex;
        console.log(newcell.childNodes[1]);
				switch(newcell.childNodes[0].type) {
					case "text":
							newcell.childNodes[0].value = "";
							break;
					case "checkbox":
							newcell.childNodes[0].checked = false;
							break;
				}
			}
}

function calculate() {
  console.log("calculating...");
  var sumDuration = 0;
  var sumProtectedDuration = 0;
  var ratioProtected = 0.0;
  var percentageProtected = 0.0;
  var result = 0.0;
  var intermissions = 0;

  var revenue = parseFloat(document.getElementById("revenue").value);

  intermissions = parseInt(document.getElementById("intermissions").value);

  for (i=1; i<=lalalaTable.rows.length-1; i++) {
    var durationElemName = "duration_" + i;
    var durationElem = document.getElementById(durationElemName);
    var protectedElemName = "protected_" + i;
    var protectedElem = document.getElementById(protectedElemName);
    if (durationElem.value !== "") {
      sumDuration += parseInt(durationElem.value);
      if (protectedElem.checked) {
        sumProtectedDuration += parseInt(durationElem.value);
      }
    }
  }

  ratioProtected = sumProtectedDuration / (sumDuration + intermissions);
  percentageProtected = ratioProtected * 100;

  result = revenue * ratioProtected * 0.08;

  document.getElementById("sum_duration").value = sumDuration;
  document.getElementById("protected_duration").value = sumProtectedDuration;
  document.getElementById("protected_ratio").value = percentageProtected.toFixed(2);
  document.getElementById("result").value = result.toFixed(2);
}
