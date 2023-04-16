
const apiUrl = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"


//Creating HTML Elements using DOM
const container = document.createElement('div')
container.className = "container"

const wrapper = document.createElement('div')
wrapper.className = "wrapper"
wrapper.classList.add('table-responsive')

const heading = document.createElement('h1')
heading.innerText = "PAGINATION"
heading.setAttribute('id',"title")

const paginationBox = document.createElement('div')
paginationBox.className= "d-flex justify-content-center"
paginationBox.setAttribute('id', 'buttons')

const previousBtn = document.createElement('button')
previousBtn.className="control"
previousBtn.innerText= "<"
previousBtn.setAttribute('id','previous-btn')

const pageNumbers = document.createElement('div')
pageNumbers.className="page-numbers"

const nextBtn = document.createElement('button')
nextBtn.className="control"
nextBtn.innerText =">"
nextBtn.setAttribute('id','next-btn')

paginationBox.append(previousBtn,pageNumbers,nextBtn)

const description = document.createElement('p')
description.setAttribute('id',"description")
description.innerText ="Pagination using DOM Manipulation"


container.append(heading, description, wrapper,paginationBox)
document.querySelector('body').append(container)



//Function to Fetch Data
async function fetchData(url){
    try{
        const data = await fetch(url)
        const response = await data.json()
        
        if(data.status ===200){

            createCard(response)

            //Function to Create Usercard using DOM
            function createCard (data){
                data.forEach(value => {
                    const card = document.createElement('div')
                    card.className = "card"
                    card.innerHTML = `
                    <h2>${value.name}</h2>
                    <p>${value.email}</p>`
                    wrapper.appendChild(card)
                });
            }


            //Function to Display Page Numbers 
            let contentLimit = 10
            let currentPage = 1
            var totalList =  response.length
            var pageCount = Math.ceil(totalList/contentLimit);
            const listItem = document.querySelectorAll('.card')
            
            function displayPageNumber (index){
                const pageNumber = document.createElement("a")
                pageNumber.innerText = index
                pageNumber.setAttribute("href", "#")
                pageNumber.setAttribute("index", index)
                pageNumbers.appendChild(pageNumber)
            }
            
            function getPageNumbers(){
                for(let i = 1; i <= pageCount; i++){
                    displayPageNumber(i)
                }
            }
            
            //Function to Enable and Disable Previous & Next button
            const disableButton = (button)=>{
                button.classList.add("disabled")
                button.setAttribute("disabled", true)
            }
            
            const enableButton = (button)=>{
                button.classList.remove("disabled")
                button.removeAttribute("disabled")
            }
            
            const controlButtonStatus = ()=>{
                if(currentPage == 1){
                    disableButton(previousBtn)
                } else {
                    enableButton(previousBtn)
                }
                if(pageCount == currentPage){
                    disableButton(nextBtn)
                } else {
                    enableButton(nextBtn)
                }
            }
            
            //Function to Handle Active Page Number
            const handleActivePageNumber = ()=>{
                document.querySelectorAll("a").forEach((button)=>{
                    button.classList.remove("active")
                    const pageIndex = Number(button.getAttribute("index"))
                    if(pageIndex == currentPage){
                        button.classList.add("active")
                    }
                })
            }
            
            //Function to Display Current Page
            const setCurrentPage = (pageNum)=>{
                currentPage = pageNum;
            
                handleActivePageNumber()
                controlButtonStatus()
            
                const prevRange = (pageNum-1)* contentLimit;
                const currRange = pageNum * contentLimit;
            
                listItem.forEach((item,index) =>{
                    item.classList.add("hidden");
                    if(index >= prevRange && index < currRange){
                        item.classList.remove("hidden")
                    }
                })
            }
            
                getPageNumbers()
                setCurrentPage(1);

                //Function to Display Next and Previous page when buttons are clicked
                previousBtn.addEventListener('click', ()=>{
                    setCurrentPage(currentPage-1)
                })

                nextBtn.addEventListener('click', ()=>{
                    setCurrentPage(currentPage +1)
                })
            
                document.querySelectorAll('a').forEach(button =>{
                    const pageIndex = Number(button.getAttribute('index'))
                    if(pageIndex){
                        button.addEventListener('click', ()=>{
                            setCurrentPage(pageIndex);
                        });
                    };
                });

        } 
    } catch (error){
        console.log(error.message);
    }
}

fetchData(apiUrl)








