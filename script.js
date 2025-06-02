
const apiKey = "AIzaSyCMffEXp0A3lYNLDfUL3AJHSgSMPXKNA10";
const channelId = "UCucDQxxSSwDe01n-E11WFbg";
const maxResults = 12;

const latestContainer = document.getElementById("latest-sermon");
const grid = document.getElementById("video-grid");
const modal = document.getElementById("video-modal");
const player = document.getElementById("modal-player");
const closeModal = document.querySelector(".modal .close");
const searchInput = document.getElementById("search");
const topicFilter = document.getElementById("topic-filter");

let allVideos = [];

function fetchVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      allVideos = data.items;
      renderVideos();
      saveFilterPreference();
    });
}

function renderVideos() {
  let keyword = searchInput.value.toLowerCase();
  let topic = topicFilter.value.toLowerCase();

  const filtered = allVideos.filter(video => {
    const title = video.snippet.title.toLowerCase();
    const desc = video.snippet.description.toLowerCase();

    return (
      (keyword === "" || title.includes(keyword) || desc.includes(keyword)) &&
      (topic === "" || title.includes(topic) || desc.includes(topic))
    );
  });

  grid.innerHTML = "";
  if (filtered.length) {
    const [latest, ...others] = filtered;

    latestContainer.innerHTML = `
      <h3>Latest Sermon</h3>
      <div class="video-card" data-id="${latest.id.videoId}">
        <img src="${latest.snippet.thumbnails.high.url}" alt="">
        <h4>${latest.snippet.title}</h4>
      </div>
    `;

    others.forEach(video => {
      grid.innerHTML += `
        <div class="video-card" data-id="${video.id.videoId}">
          <img src="${video.snippet.thumbnails.medium.url}" alt="">
          <h4>${video.snippet.title}</h4>
        </div>
      `;
    });
  } else {
    grid.innerHTML = "<p>No videos found.</p>";
  }

  attachCardListeners();
}

function attachCardListeners() {
  document.querySelectorAll(".video-card").forEach(card => {
    card.onclick = () => {
      const id = card.dataset.id;
      player.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
      modal.style.display = "flex";
    };
  });
}

closeModal.onclick = () => {
  modal.style.display = "none";
  player.src = "";
};

window.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";
    player.src = "";
  }
};

function saveFilterPreference() {
  localStorage.setItem("preferredTopic", topicFilter.value);
}

function loadFilterPreference() {
  const pref = localStorage.getItem("preferredTopic");
  if (pref) {
    topicFilter.value = pref;
  }
}

searchInput.oninput = renderVideos;
topicFilter.onchange = () => {
  renderVideos();
  saveFilterPreference();
};

loadFilterPreference();
fetchVideos();

