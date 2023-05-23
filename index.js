document.addEventListener('DOMContentLoaded', function(){
//Stores an array of items to list
//variable storing items to be manipulated
var itemStore = [];
var listItem = document.querySelector('#item-input');
var listElement = document.querySelector('#list');
var NewItem = document.querySelector('#Add-Item');
var RemoveItem = document.querySelector('#Remove-Item');

NewItem.addEventListener(
  "click", function(){itemStore.push(listItem.value)
  }
);

NewItem.addEventListener(
  'click', function(){


      let newParagraph = document.createElement('p');
      newParagraph.textContent = listItem.value;
      newParagraph.id = listItem.value;
      listElement.appendChild(newParagraph);
     }
);

RemoveItem.addEventListener(
  'click', function(){
    let Item = document.getElementById(listItem.value);
    let ItemIndex = itemStore.indexOf(Item);
    itemStore.splice(ItemIndex, 1);
    Item.remove();
  })
});
