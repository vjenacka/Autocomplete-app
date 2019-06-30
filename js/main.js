const search = document.querySelector("#search");
const list = document.querySelector("#match-list");
let states;

async function getStates() {
  const resp = await fetch("../data/data.json");
  states = await resp.json();
}

const filterStates = searchText => {
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.abbr.match(regex) || state.name.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    list.innerHTML = "";
  }
  outputMatched(matches)
};

const outputMatched = matches => {
  if (matches.length > 0) {
    const htmlList = matches.map(match => {
      return `
            <div class='card card-body mb-1'>
            <h4>${match.name} (${match.abbr}) 
            <span class="text-primary">${match.capital}</span></h4>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>`
    }).join('');

    list.innerHTML=htmlList;
  }
};

window.addEventListener("DOMContentLoaded", getStates);
search.addEventListener("input", () => filterStates(search.value));
