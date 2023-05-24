document.addEventListener('DOMContentLoaded', function(){

  //Two functions that create local storage for the list items and the items that are archived
function store(){
localStorage.setItem('list', JSON.stringify(itemStore));
}
function Archive(){
  localStorage.setItem('ArchivedList', JSON.stringify(ArchivedStore));
}

//Global variables that will be access throughout the code a variable that holds an array for each list on the page, The other variables identify the elements of the HTML document.
var itemStore = [];
var ArchivedStore = [];
var listItem = document.querySelector('#item-input');
var listElement = document.querySelector('#list');
var ArchiveElement = document.querySelector('#Archived')
var NewItem = document.querySelector('#Add-Item');
var RemoveItem = document.querySelector('#Remove-Item');
var ArchiveList = document.querySelector('#Archive-List');
var ClearArchive = document.querySelector('#Clear-Archive')

//This code will retrieve the local storage and convert it back to JSON and iterate through each item of both Arrays to add them to the respective lists.
window.onload = function() {
  var retrievedList = JSON.parse(localStorage.getItem('list')) || [];
  var retrievedArchive = JSON.parse(localStorage.getItem('ArchivedList')) || [];


  var activeFragment = document.createDocumentFragment();
  var archiveFragment = document.createDocumentFragment();

  if (retrievedList.length >= 1) {
    for (let i of retrievedList) {
      let newParagraph = document.createElement('p');
      let newCheckbox = document.createElement('input');
      newCheckbox.setAttribute('type', 'checkbox');
      newParagraph.textContent = i;
      newParagraph.id = i;
      newParagraph.className = "check-list-item";
      newCheckbox.id = i + "Check";
      newCheckbox.className = "check-box";
      newCheckbox.addEventListener('change', function() {
        if (this.checked) {
          newParagraph.classList.add('checked');
        } else {
          newParagraph.classList.remove('checked');
        }
      });
      newParagraph.appendChild(newCheckbox);
      listElement.appendChild(newParagraph);
    }

  }

  if (retrievedArchive.length >= 1) {
    for (let i of retrievedArchive) {
      let newParagraph = document.createElement('p');
      let newCheckbox = document.createElement('input');
      newCheckbox.setAttribute('type', 'checkbox');
      newParagraph.textContent = i;
      newParagraph.id = i;
      newParagraph.className = "check-list-item";
      newCheckbox.id = i + "Check";
      newCheckbox.className = "check-box";
      newCheckbox.addEventListener('change', function() {
        if (this.checked) {
          newParagraph.classList.add('checked');
        } else {
          newParagraph.classList.remove('checked');
        }
      });
      newParagraph.appendChild(newCheckbox);
      ArchiveElement.appendChild(newParagraph);
    }

  }
};
//listens to the NewItem element for a click to push an item to the itemStore Array
NewItem.addEventListener(
  'click', function(){itemStore.push(listItem.value)
  }
);

//listens to the NewItem element for a click to create a new child for listElement with the contents of the users input
NewItem.addEventListener(
  'click', function(){
      let newParagraph = document.createElement('p');
      let newCheckbox = document.createElement('input');
      newCheckbox.setAttribute('type', 'checkbox');
      newParagraph.textContent = listItem.value;
      newParagraph.id = listItem.value;
      newParagraph.className = "check-list-item";
      newCheckbox.id = listItem.value + "Check";
      newCheckbox.className = "check-box";
      newCheckbox.addEventListener('change', function() {
        if (this.checked) {
          newParagraph.classList.add('checked');
        } else {
          newParagraph.classList.remove('checked');
        }
      });
      listElement.appendChild(newParagraph);
      newParagraph.appendChild(newCheckbox);
      store();
     });
//listens to the RemoveItem Element for a click to remove the item the user inputed or the items that have been checked from the their respective lists, the Store Arrays, and updates the local storage.
RemoveItem.addEventListener(
  'click', function(){
    let Item = document.getElementById(listItem.value);
    let ItemIndex = itemStore.indexOf(Item);
    let checkedItem = document.querySelectorAll('.check-box:checked');
    itemStore.splice(ItemIndex, 1);
    checkedItem.forEach(function(checkedItem) {
      let listItem = checkedItem.parentNode;
      let listItemIndex = itemStore.indexOf(listItem.id);
      itemStore.splice(listItemIndex, 1);
      ArchivedStore.splice(listItemIndex, 1);
      listItem.remove();
    });
    store();
    Archive();
  });

//listens to the ArchiveList Element for a click to move the to-do list items to the Archive list and removes them from the to-do list and updates the Store Arrays, and updates local storage.
  ArchiveList.addEventListener(
    'click', function(){
      let checkedItem = document.querySelectorAll('.check-box:checked');
      checkedItem.forEach(function(checkedItem) {
        let listItem = checkedItem.parentNode;
        let listItemIndex = itemStore.indexOf(listItem.id);
        if (listItemIndex > -1) {
          itemStore.splice(listItemIndex, 1);
        }
        let newParagraph = document.createElement('p');
        let newCheckbox = document.createElement('input');
        newCheckbox.setAttribute('type', 'checkbox');
        newParagraph.textContent = listItem.id;
        newParagraph.id = listItem.id;
        newParagraph.className = "check-list-item";
        newCheckbox.id = listItem.id + "Check";
        newCheckbox.className = "check-box";
        newCheckbox.addEventListener('change', function() {
          if (this.checked) {
            newParagraph.classList.add('checked');
          } else {
            newParagraph.classList.remove('checked');
          }
        });
        newParagraph.appendChild(newCheckbox);
        ArchiveElement.appendChild(newParagraph);
        ArchivedStore.push(listItem.id);
        listItem.remove();
      });
      store();
      Archive();
    }
  );
//listens to the ClearArchive Element for a click and removes all items form the archive, the ArchivedStore, and the local storage.
  ClearArchive.addEventListener('click', function() {
    while (ArchiveElement.firstChild) {
      ArchiveElement.firstChild.remove();
    }
    localStorage.removeItem('ArchivedList');
  });

  ClearArchive.addEventListener('click', function() {
    while (ArchivedStore.length >= 1) {
      ArchivedStore.splice(0, 1);
    }
  })
 });

