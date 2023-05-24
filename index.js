document.addEventListener('DOMContentLoaded', function(){
//Stores an array of items to list
//variable storing items to be manipulated
function store(){
localStorage.setItem('list', JSON.stringify(itemStore));
}
function Archive(){
  localStorage.setItem('ArchivedList', JSON.stringify(ArchivedStore));
}
var itemStore = [];
var ArchivedStore = [];
var listItem = document.querySelector('#item-input');
var listElement = document.querySelector('#list');
var ArchiveElement = document.querySelector('#Archived')
var NewItem = document.querySelector('#Add-Item');
var RemoveItem = document.querySelector('#Remove-Item');
var ArchiveList = document.querySelector('#Archive-List');
var ClearArchive = document.querySelector('#Clear-Archive')


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

NewItem.addEventListener(
  'click', function(){itemStore.push(listItem.value)
  }
);


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
      listItem.remove();
    });
    store();
    Archive();
  });


  ArchiveList.addEventListener(
    'click', function(){
      let checkedItem = document.querySelectorAll('.check-box:checked');
      checkedItem.forEach(function(checkedItem) {
        let listItem = checkedItem.parentNode;
        let listItemIndex = itemStore.indexOf(listItem.id);
        let newParagraph = document.createElement('p');
        let newCheckbox = document.createElement('input');
        newCheckbox.setAttribute('type', 'checkbox');
        newParagraph.textContent = listItem.id;
        newParagraph.id = listItem.id;
        newParagraph.className = "check-list-item";
        newCheckbox.id = checkedItem + "Check";
        newCheckbox.className = "check-box";
        newCheckbox.addEventListener('change', function() {
          if (this.checked) {
            newParagraph.classList.add('checked');
          } else {      listElement.appendChild(newParagraph);
            newParagraph.appendChild(newCheckbox);move('checked');
          }

        });
        ArchivedStore.push(listItem.id);
        ArchiveElement.appendChild(newParagraph);
        newParagraph.appendChild(newCheckbox);
      });
      RemoveItem.click();
    }
  )

  ClearArchive.addEventListener('click', function() {
    while (ArchiveElement.firstChild) {
      ArchiveElement.firstChild.remove();
    }
  });

  ClearArchive.addEventListener('click', function() {
    while (ArchivedStore.length >= 1) {
      ArchivedStore.splice(0, 1);
    }
  })
 });

