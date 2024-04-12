const accessKey = 'hjKyePMMfTmZfzkOX8XQ-6Tk_7PA0ITf8M7vO0RDAuM';
const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");
const loadMoreBtn = document.querySelector(".loadMoreBtn");

let page = 1;

//function to fetch images using Unsplash API
const fetchImages = async (query, pageNo) => {

    if (pageNo==1) {
        imagesContainer.innerHTML = '';
    } 
    // imagesContainer.innerHTML = '';

    // console.log(query);
    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (data.results.length > 0) {
            data.results.forEach(photo => {
                //creating image div
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv')
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

                // creating overlay 
                const overlayElement = document.createElement('div')
                overlayElement.classList.add('overlay')

                // creating overlay text 
                const overlayText = document.createElement('h3')
                overlayText.innerText = `${photo.alt_description}`

                // creating overlay link 
                // const overlayLink = document.createElement('p')
                var overlayLink = document.createElement('button')
                // overlayLink.onclick='copyUrl()'
                // overlayLink.innerText = `copy`
                // overlayLink.innerText = `click`

                overlayLink.classList.add('fa-solid', 'fa-link', 'button');
                // <i class="fa-solid fa-link"></i>

                var overlayLinkOpen = document.createElement('button')
                // overlayLinkOpen.innerText = `click`
                overlayLinkOpen.classList.add('fa-solid', 'fa-arrow-up-right-from-square', 'button2');
                // fa-solid fa-arrow-up-right-from-square

                overlayElement.appendChild(overlayText)
                overlayElement.appendChild(overlayLink)
                overlayElement.appendChild(overlayLinkOpen)
                imageElement.appendChild(overlayElement)

                imagesContainer.appendChild(imageElement);



                overlayLink.addEventListener("click",()=>{
                    const text = `${photo.links.download}`
                
                    navigator.clipboard.writeText(text);
                })

                overlayLinkOpen.addEventListener("click",()=>{
                    const text = `${photo.links.download}`
                
                    window.open(text);
                })



                

            });

            if(data.total_pages === pageNo){
                loadMoreBtn.style.display = "none";
                // loadMoreBtn.className.add('d-block')
            }
            else{
                loadMoreBtn.style.display = "block";
                // loadMoreBtn.className.add('d-block')
                // imageElement.classList.add('imageDiv')
            }
        } else {
            imagesContainer.innerHTML = '<h2>No image found</h2>';
        }

        
    } 
    catch (error) {
        console.error('Error fetching images:', error);
        imagesContainer.innerHTML = '<h2>Error fetching images. Please try again later.</h2>';
    }

    // imageElement.innerHTML = '';

}

// Add event listner to search form 
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(searchInput.value);
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1
        fetchImages(inputText,page)
    }
    else {
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`
    }
})

// Adding Event Listner to load more button to fetch more images
loadMoreBtn.addEventListener('click',()=>{
    fetchImages(searchInput.value.trim(), ++page)
})




// overlayLink.addEventListener("click",()=>{
//     const text = overlayLink.innerText

//     navigator.clipboard.writeText(text);
// })




