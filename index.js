const scrollBtn = document.getElementById("scroll-btn");
console.log(scrollBtn);

const refreshBtnVisibility = () => {
  if (document.documentElement.scrollTop <= 350) {
    scrollBtn.style.display = "none";
  } else {
    scrollBtn.style.display = "block";
  }
};

refreshBtnVisibility();

scrollBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

document.addEventListener("scroll", (e) => {
  refreshBtnVisibility();
});

const loadData = (foodName = "") => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then((res) => res.json())
    .then((data) => displayDataVideos(data.meals))
    .catch((error) => console.error(error));
};

const videoDetails = async (id) => {
  console.log(id);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.meals);
};

const displayDetails = (data) => {
  const detailsContainer = document.getElementById("modalDetails");
  detailsContainer.innerHTML = `
 <figure class="h-[200px] relative">
         <img
         class="h-full w-full object-cover"
          src=${data[0].strMealThumb}
           alt="Shoes" />
       </figure>
<p>${data[0].strMeal}</p>
<p>${data[0].strInstructions}</p>

`;

  document.getElementById("showModal").click();
};

const displayDataVideos = (data) => {
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";

  // if (data.length == 0) {
  //   videosContainer.innerHTML = `
  //   <p class="text-red-500">HERE NO CONTENT</p>
  //   `;
  //   return;
  // }

  data.forEach((item) => {
    // console.log(item);

    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
       <figure class="h-[200px] relative">
         <img
         class="h-full w-full object-cover"
          src=${item.strMealThumb}
           alt="Shoes" />
       </figure>
       <div class="px-0 py-2 flex gap-2">
        
   <div>
         <h2 class="font-bold">${item.strMeal}</h2>
        <div class="flex items-center gap-2">
           <p class="text-gray-400">${item.strInstructions.slice(0, 50)}</p>
        </div>
        </div>
       <div>
        <button onclick="videoDetails('${
          item.idMeal
        }')" class="bg-green-300 btn">Details</button>
       </div>
       </div>
         `;
    videosContainer.appendChild(card);
  });
};

document.getElementById("search-videos").addEventListener("keyup", (e) => {
  // console.log(e.target.value);
  loadData(e.target.value);
});

loadData();
