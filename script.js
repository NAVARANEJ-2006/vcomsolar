const slides = document.querySelectorAll(".slide");

const dots = document.querySelectorAll(".dot");

const nextButton = document.querySelector(".next");

const previousButton = document.querySelector(".previous");


let currentSlide = 0;


function showSlide(number) {

    slides.forEach(function(slide) {

        slide.classList.remove("active");

    });


    dots.forEach(function(dot) {

        dot.classList.remove("active");

    });


    slides[number].classList.add("active");

    dots[number].classList.add("active");

}


function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    showSlide(currentSlide);

}


function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide = slides.length - 1;

    }

    showSlide(currentSlide);

}


nextButton.addEventListener("click", nextSlide);


previousButton.addEventListener("click", previousSlide);


dots.forEach(function(dot, index) {

    dot.addEventListener("click", function() {

        currentSlide = index;

        showSlide(currentSlide);

    });

});


setInterval(nextSlide, 5000);
async function loadProjects() {

    const projectsList = document.getElementById("projects-list");

    if (!projectsList) {
        return;
    }

    const { data: projects, error } = await supabaseClient
        .from("projects")
        .select("*")
        .order("project_date", { ascending: false });

    if (error) {

        projectsList.innerHTML =
            "<p>Unable to load projects.</p>";

        console.error(error);

        return;
    }

    if (!projects || projects.length === 0) {

        projectsList.innerHTML =
            "<p>No projects available yet.</p>";

        return;
    }

    projectsList.innerHTML = "";

    projects.forEach(function(project) {

        const card = document.createElement("div");

        card.className = "project-card";

        card.innerHTML = `
            <img
                src="${project.image_url}"
                alt="${project.title}"
            >

            <div class="project-content">

                <h3>${project.title}</h3>

                <div class="project-location">
                    📍 ${project.location}
                </div>

                <p>
                    ${project.description}
                </p>

            </div>
        `;

        projectsList.appendChild(card);

    });
}

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

loadProjects();

// =========================================
// VCOM SOLAR - WEBSITE SETTINGS
// =========================================

async function loadWebsiteSettings() {

    const { data, error } = await supabaseClient
        .from("website_settings")
        .select("*")
        .limit(1)
        .single();

    if (error) {
        console.error("Website settings error:", error);
        return;
    }

    if (!data) {
        return;
    }

    // Apply website colors

    document.documentElement.style.setProperty(
        "--primary-color",
        data.primary_color
    );

    document.documentElement.style.setProperty(
        "--accent-color",
        data.accent_color
    );

    document.documentElement.style.setProperty(
        "--background-color",
        data.background_color
    );

    document.documentElement.style.setProperty(
        "--text-color",
        data.text_color
    );

}


// Load settings when the page opens

loadWebsiteSettings();