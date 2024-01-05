let bagItemsObj; 
onLoad();

function onLoad()
{
  let bagItemsStr = localStorage.getItem('bagItems');
  bagItemsObj = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  loadBagItemsObj();
  displayBagItemsObj();
  displayBagSummary();

}

function displayBagSummary()
{
  let bagSummaryElement=document.querySelector('.bag-summary');
  let totalItem=bagItemsObj.length;
  let totalMRP=0;
  let totalDiscount=0;

  //calculate prices
  bagItemsObj.forEach(bagItem =>
    {
      totalMRP+=bagItem.original_price;
      totalDiscount+=bagItem.original_price - bagItem.current_price;
    })

  let  finalPayment=totalMRP-totalDiscount+99;
  bagSummaryElement.innerHTML=` <div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">Rs. ${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">Rs. ${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">Rs. 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">Rs. ${finalPayment}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`;
}
function loadBagItemsObj()
{
  console.log(bagItems);
  bagItemsObj=bagItems.map(itemId =>{
    for(let i=0;i<items.length;i++)
    {
      if(itemId == items[i].id)
      {
        return items[i];
      }
    }
  });
  console.log(bagItemsObj);
}

function displayBagItemsObj()
{
    let containerItem=document.querySelector('.bag-items-container');
    //containerItem.innerHTML=
    let innerHTML='';
    bagItemsObj.forEach(bagItem =>{
      innerHTML+= generateItemHTML(bagItem);
    });
    containerItem.innerHTML=innerHTML;

}

function removeFromBag(itemId)
{
  bagItems = bagItems.filter(bagItemsId => bagItemsId !=itemId); //checking if selected item is not equal to other items that are added
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemsObj();
  displayBagItemsObj();
  displayBagCount();
  displayBagSummary();
}
function generateItemHTML(item)
{
  return `<div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="${item.image}">
      </div>
      <div class="item-right-part">
        <div class="company">${item.company_name}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
          <span class="current-price">Rs. ${item.current_price}</span>
          <span class="original-price">Rs. ${item.original_price}</span>
          <span class="discount-percentage">(${item.discount}% OFF)</span>
        </div>
        <div class="return-period">
          <span class="return-period-days">${item.return_period}</span> return available
        </div>
        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
      </div>
      <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
    </div>`;
}
