const btn = document.querySelector("#btn");
const kuralinput = document.querySelector("#kuralinput");
const card = document.querySelector(".card");

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const kural = kuralinput.value;
    if(kural>=1 && kural<=1330){
        try {
            const kuraldata = await getKuralData(kural);
            displayKural(kuraldata);
        } catch (error) {
            displayError(error)
        }
    } else {
        displayError("Please Enter The Kural Number(1 To 1330)")
            // console.log("error");
    }
});

async function getKuralData(number) {
    const apiurl = `https://getthirukkural.appspot.com/api/3.0/kural/${number}?appid=18c2aukokxmoz`;
    const response = await fetch(apiurl);
    // const data = await response.json();
    // return data;

    if(!response.ok){
        throw new Error("Could Not fetch Kural Data")
    }
    return await response.json();
}

function displayKural(data) {
    // Display the retrieved Kural data in the card
    // card.style.display =""
    card.textContent =""
    card.innerHTML += `
    <div class="content1">
        <h3>திருக்குறள்:${data.number}</h3>
        <ul>
            <h4>"${data.line1} <br>${data.line2}"</h4>

        </ul>
        <h3>பொருள்:</h3>
        <p>${data.urai1}</p>
    </div>
    <br>
    <div class="content2">
        <h3>Thirukural ${data.number}:</h3>
        <h2>Translation:</h2>
        <p>${data.translation}</p>
    </div>
    `
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent =message;

    card.textContent=""
    card.style.display ="flex"
    card.appendChild(errorDisplay)
}