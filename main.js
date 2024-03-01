const loadPhone = async (searchText, isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  //get container id
  const phoneContainer = document.getElementById("phone-container");
  // clear phone phone container before adding new devices
  phoneContainer.textContent = "";

  // add show all button functionality
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //display limited devices
  if (!isShowAll) {
    phones = phones.slice(0, 8);
  }

  //looping devices
  phones.forEach((phone) => {
    console.log(phone);

    //create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl gap-x-12 pt-8`;

    //set innter HTML
    phoneCard.innerHTML = `<figure>
            <img
              src="${phone.image}"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>`;
    //   append child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

// handle search button (taking search input value and finding using button)
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("input-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all devices
const handleShowAll = () => {
  handleSearch(true);
};

// loadPhone();
