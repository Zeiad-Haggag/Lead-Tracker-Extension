let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
    
}


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads){
    let  listItem = ""
    for(let i = 0 ; i < leads.length ; i++){

   //listItem  += "<li><a href='" + myLeads[i]+"' target='_blank' " +">" + myLeads[i] + "</a></li>"
    listItem  += `
    <li>
    <a href= ${leads[i]} target='_blank'>${leads[i]}</a>
    </li>`
    /*let li = document.createElement("li")
    li.textContent= myLeads[i]
    ulEl.append(li)*/
    }
     ulEl.innerHTML = listItem
}

deleteBtn.addEventListener("dblclick" , function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})




inputBtn.addEventListener("click" , function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    window.localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    
})
