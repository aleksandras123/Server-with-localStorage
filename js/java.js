$(function(){
  $("#listButton").click(showList);
  $("#newButton").click(addRecord);
});
let allData=[];


function showList()
{

  $("#myContent").empty();
      allData=window.localStorage.getItem('db');
      if (allData) {
        allData=JSON.parse(allData);
      }else {
        allData=[];
      }
      let table = $('<table>');
      for (let i = 0; i < allData.length; i++) {
        let row=$('<tr>');
        let cell=$('<td>');
        // id
        cell.text(allData[i].id);
        row.append(cell);
        // Name
        cell=$('<td>');
        cell.text(allData[i].userName);
        row.append(cell);
        // mail
        cell=$('<td>');
        cell.text(allData[i].eMail);
        row.append(cell);
        // age
        cell=$('<td>');
        cell.text(allData[i].age);
        row.append(cell);
        // del
        cell=$('<td>');
        let delButton=$('<button>delete</button>');
        cell.append(delButton);
        row.append(cell);
        delButton.attr('value',allData[i].id);
        delButton.click(deleteRecord);
        //update
        cell=$('<td>');
        let updateButton=$('<button>update</button>');
        cell.append(updateButton);
        row.append(cell);
        updateButton.attr('value',allData[i].id);
        updateButton.click(updateClick);

        table.append(row);
      }
      $('#myContent').append(table);
    }


 // add

function addRecord()
{
addTable();
}

// SAVE

function saveClick()
{
  let o={
    userName: $('#userName').val(),
    eMail: $('#eMail').val(),
    age: parseInt($('#age').val())
  }
  let uid=$('#userId');
  if (uid.length>0) {
    o.id=parseInt(uid.val());
    for (var i = 0; i < allData.length; i++) {
      if (allData[i].id==o.id) {
        allData[i]=o;
        break;
      }
    }
  } else {
    if (allData.length==0) {
      o.id=0;
    } else {
      o.id=allData[allData.length-1].id+1;
    }
    allData.push(o);
  }
  window.localStorage.setItem('db',JSON.stringify(allData));
  showList();
}
// CANCEL

function cancelClick()
{
  $("#myContent").empty();

}

// DELETE

function deleteRecord(){

  for (var i = 0; i < allData.length; i++) {
    if (allData[i].id==this.value) {
      allData.splice(i,1);
      break;
    }
  }
  window.localStorage.setItem('db',JSON.stringify(allData));
}

//UPDATE
function updateClick()
{
  for (var i = 0; i < allData.length; i++) {
    if (allData[i].id==this.value) {
      o=allData[i];
      break;
    }
  }
addTable(o);
}


function addTable(o)
{
    $("#myContent").empty();
    let formDiv=$('<div>');

    // ID
    let d=($('<input type="hidden" id="userId">'));
    if ('undefined'!=typeof(o)) {
      d.val(o.id)
      formDiv.append(d);
    }
      // Name
    formDiv.append($('<h4>userName</h4>'));
    let a=($('<input id="userName">'));
    if('undefined'!=typeof(o)){
      a.val(o.userName);
    }
    formDiv.append(a);

    // Mail
    formDiv.append($('<h4>eMail</h4>'));
    let b=($('<input id="eMail">'));
    if ('undefined'!=typeof(o)) {
      b.val(o.eMail);
    }
    formDiv.append(b);

    // age

    formDiv.append($('<h4>age</h4>'));
    let c=($('<input id="age">'));
    if ('undefined'!=typeof(o)) {
      c.val(o.age);
    }
    formDiv.append(c);

    let saveButton = $('<button>Save</button>');
    saveButton.click(saveClick);
    formDiv.append(saveButton);
  // button cancel
    let cancelButton = $('<button>Cancel</button>');
    cancelButton.click(cancelClick);
    formDiv.append(cancelButton);


    $('#myContent').append(formDiv);

}
