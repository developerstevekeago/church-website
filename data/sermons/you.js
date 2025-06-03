 const apiKey = "AIzaSyCMffEXp0A3lYNLDfUL3AJHSgSMPXKNA10";
      const channelId = "UC-ugP6AcvKwiO8gs5BnEXkA"; // Hope Channel Kenya
      let allVideos = [];

      async function getUploadsPlaylistId() {
        try {
          const res = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
          );
          const data = await res.json();
          return data.items[0].contentDetails.relatedPlaylists.uploads;
        } catch (error) {
          console.error("Error fetching playlist ID:", error);
          return null;
        }
      }

      async function fetchVideos() {
        const container = document.getElementById("videos");
        container.innerHTML =
          '<div class="loading"><div class="spinner"></div></div>';

        try {
          const uploadsPlaylistId = await getUploadsPlaylistId();
          if (!uploadsPlaylistId) {
            container.innerHTML =
              '<p class="error">Unable to load videos. Please try again later.</p>';
            return;
          }

          const res = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${uploadsPlaylistId}&key=${apiKey}`
          );
          const data = await res.json();
          allVideos = data.items;
          displayVideos(allVideos);
        } catch (error) {
          console.error("Error fetching videos:", error);
          container.innerHTML =
            '<p class="error">Failed to load videos. Check your connection.</p>';
        }
      }

      function displayVideos(videos) {
        const container = document.getElementById("videos");

        if (videos.length === 0) {
          container.innerHTML =
            '<p class="no-results">No sermons found matching your search.</p>';
          return;
        }

        container.innerHTML = "";
        videos.forEach((item) => {
          const vidId = item.snippet.resourceId.videoId;
          const thumb =
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default.url;
          const title = item.snippet.title;
          const date = new Date(item.snippet.publishedAt).toLocaleDateString();

          const videoDiv = document.createElement("div");
          videoDiv.className = "video";
          videoDiv.innerHTML = `
          <img data-src="${thumb}" alt="${title}" />
          <div class="play-icon">
            <i class="fas fa-play"></i>
          </div>
          <div class="video-content">
            <h3 class="video-title">${title}</h3>
            <div class="video-date">
              <i class="far fa-calendar-alt"></i> ${date}
            </div>
          </div>
        `;
          videoDiv.addEventListener("click", () => openModal(vidId));
          container.appendChild(videoDiv);
        });

        lazyLoadImages();
      }

      function openModal(videoId) {
        const modal = document.getElementById("modal");
        const player = document.getElementById("player");
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }

      function closeModal() {
        const modal = document.getElementById("modal");
        const player = document.getElementById("player");
        player.src = "";
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }

      function lazyLoadImages() {
        const imgs = document.querySelectorAll("img[data-src]");
        const observer = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.removeAttribute("data-src");
                observer.unobserve(img);
              }
            });
          },
          { rootMargin: "100px" }
        );

        imgs.forEach((img) => observer.observe(img));
      }

      function filterVideos() {
        const topic = document
          .getElementById("topic-filter")
          .value.toLowerCase();
        const search = document.getElementById("search").value.toLowerCase();

        const filtered = allVideos.filter((v) => {
          const title = v.snippet.title.toLowerCase();
          const desc = v.snippet.description.toLowerCase();

          const matchesTopic =
            !topic || title.includes(topic) || desc.includes(topic);
          const matchesSearch =
            !search || title.includes(search) || desc.includes(search);

          return matchesTopic && matchesSearch;
        });

        localStorage.setItem("preferredTopic", topic);
        displayVideos(filtered);
      }

      // Event listeners
      document
        .getElementById("topic-filter")
        .addEventListener("change", filterVideos);
      document.getElementById("search").addEventListener("input", filterVideos);
      document.getElementById("modal").addEventListener("click", (e) => {
        if (e.target === document.getElementById("modal")) {
          closeModal();
        }
      });

      // Initialize
      window.addEventListener("DOMContentLoaded", () => {
        const savedTopic = localStorage.getItem("preferredTopic");
        if (savedTopic) {
          document.getElementById("topic-filter").value = savedTopic;
        }
        fetchVideos();
      });

      function openModal(videoId) {
        const modal = document.getElementById("modal");
        const player = document.getElementById("player");
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }

      function closeModal() {
        const modal = document.getElementById("modal");
        const player = document.getElementById("player");
        player.src = "";
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }