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
    // console.log(phone);

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
              <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary text-lg font-bold">Show Details</button>
            </div>
          </div>`;
    //   append child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

const handleShowDetails = async (id) => {
  console.log("Show Details", id);
  //load single device details
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();

  const phone = data.data;
  showPhoneDetails(data);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.data.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <div class="flex justify-center">
    <img src="${phone.data.image}" alt="">
    </div>
    <p class="pt-4"><span class="font-bold">Storage:</span> ${phone.data.mainFeatures.storage}</p>
    <p class="pt-4"><span class="font-bold">Display Size:</span> ${phone.data.mainFeatures.displaySize}</p>
  `;
  //show the modal
  show_details_modal.showModal();
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
