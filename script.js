let currentPage = 0;

document.getElementById('next').addEventListener('click', () => {
    currentPage++;
    loadDogs();
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 0) currentPage--;
    loadDogs();
});

async function fetchDogs(page) {
    const response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=3&page=${page}&order=Desc`, {
        headers: {
            'x-api-key': 'live_eyaX1S7ACIZDJFQnADKnSA2w0KX4lH2HWv32RSZgNAWGb2vSWf0QO911LJmZrUV9'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch dogs');
    }
    return response.json();
}

function displayDogs(dogs) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear gallery
    dogs.forEach(dog => {
        const img = document.createElement('img');
        img.src = dog.url;
        gallery.appendChild(img);
    });
}

async function loadDogs() {
    try {
        const dogs = await fetchDogs(currentPage);
        displayDogs(dogs);
    } catch (error) {
        console.error('Failed to load dogs:', error);
    }
}

// Initial load
loadDogs();
