// =============================================
    // SHOOTING STARS
    // =============================================
    (function createShootingStars() {
      const container = document.getElementById('shootingStars');
      if (!container) return;

      setInterval(() => {
        const star = document.createElement('div');
        star.classList.add('shooting');
        star.style.left = Math.random() * 60 + '%';
        star.style.top = Math.random() * 40 + '%';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(star);

        setTimeout(() => star.remove(), 4000);
      }, 3500);
    })();

    // =============================================
    // TYPING EFFECT — simple, clear DS phrases
    // =============================================
    (function typeEffect() {
      const el = document.getElementById('typedText');
      const phrases = [
        'Data Analyst',
        'Machine Learning Enthusiast',
        'Python Developer',
        'Problem Solver',
        'AI & Data Science Student'
      ];
      let phraseIdx = 0;
      let charIdx = 0;
      let isDeleting = false;
      let typingSpeed = 70;

      function type() {
        const current = phrases[phraseIdx];

        if (isDeleting) {
          el.textContent = current.substring(0, charIdx - 1);
          charIdx--;
          typingSpeed = 35;
        } else {
          el.textContent = current.substring(0, charIdx + 1);
          charIdx++;
          typingSpeed = 70;
        }

        if (!isDeleting && charIdx === current.length) {
          isDeleting = true;
          typingSpeed = 1700;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          typingSpeed = 350;
        }

        setTimeout(type, typingSpeed);
      }

      type();
    })();

    // =============================================
    // SCROLL REVEAL
    // =============================================
    (function scrollReveal() {
      const reveals = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

      reveals.forEach(el => observer.observe(el));
    })();

    // =============================================
    // CONTACT FORM — AWS API INTEGRATION (PRESERVED)
    // =============================================
    const API_URL =
      "https://7irgjgums8.execute-api.ap-south-1.amazonaws.com/feedback";

    document
      .getElementById("contactForm")
      .addEventListener("submit", async function(e) {

        e.preventDefault();

        const status =
          document.getElementById("status");

        const submitBtn =
          document.getElementById("submitBtn");

        // Loading state
        submitBtn.classList.add("loading");
        status.className = "status-notification";
        status.innerHTML = "";

        const name =
          document.getElementById("name").value;

        const email =
          document.getElementById("email").value;

        const phone =
          document.getElementById("phone").value;

        const message =
          document.getElementById("message").value;

        try {

          const response =
            await fetch(API_URL, {

              method: "POST",

              headers: {
                "Content-Type": "application/json"
              },

              body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                phone: phone || null
              })

            });

          const data =
            await response.json();

          // Success state
          status.className = "status-notification success";
          status.innerHTML = "Message sent successfully. I'll get back to you soon!";

          document
            .getElementById("contactForm")
            .reset();

        } catch (error) {

          console.error(error);

          // Error state
          status.className = "status-notification error";
          status.innerHTML = "Failed to send message. Please try again.";

        } finally {
          submitBtn.classList.remove("loading");
        }

      });