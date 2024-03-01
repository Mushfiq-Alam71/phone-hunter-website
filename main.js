const loadPhone = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await response.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhone(phones);
};

const displayPhone = (phones) => {
  //get container id
  const phoneContainer = document.getElementById("phone-container");

  phones.forEach((phone) => {
    console.log(phone);

    //create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl gap-x-12`;

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
};

loadPhone();
