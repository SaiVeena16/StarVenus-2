const baseURL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json";
const dropDown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropDown){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name==="from"&& currcode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to"&& currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag = (element)=>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newsrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flagImg = element.parentElement.querySelector("img");
    flagImg.src = newsrc ;
};
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue===""|| amountValue<0){
        amountValue=1;
        amount.value =1;
    }
    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let reponse = await fetch(URL);
    let data = await reponse.json();
    let rate = data[toCurr.value.toLowerCase()];
    
    let finalAmount = amountValue * rate;
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount}${toCurr.value}`;

})
