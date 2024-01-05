let bagItems; 
onLoad();

function onLoad()
{
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItems();
    displayBagCount();
    
}

//bag button function
let addToBag = (itemId) =>
{
    bagItems.push(itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    displayBagCount();
}

//ftn for bag size button
function displayBagCount()
{
    let bagItemCountElement=document.querySelector('.bag-item-count');
    //to show bag size only when an item is added
    if(bagItems.length > 0)
    {
        bagItemCountElement.style.visibility ='visible';
        bagItemCountElement.innerText=bagItems.length;
    }
    else
    {
        bagItemCountElement.style.visibility ='hidden';
    }

}

function displayItems()
{
    let itemsContainerElement=document.querySelector('.items-container');
    if(!itemsContainerElement)
    {return;}
    let innerHtml='';
    items.forEach( item => {
        innerHtml+=
        `<div class="item-container">
            <img  class="item-image" src="${item.image}" alt="item-image">
            <div class="rating">
                ${item.rating.stars}⭐| ${item.rating.count}
            </div>
            <div class="company-name"font item.company_name}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs. ${item.current_price}</span>
                <span class="original-price">Rs. ${item.original_price}</span>
                <span class="discount">${item.discount}%OFF</span> </div>
                <button class="add-btn" onclick="addToBag(${item.id})">Add to Bag</button>
             </div>
        </div>`
    });
    itemsContainerElement.innerHTML=innerHtml;
}






