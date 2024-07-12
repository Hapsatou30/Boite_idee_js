const form = document.getElementById('form');
const libelle = document.getElementById('libelle');
const categorie = document.getElementById('categorie');
const description = document.getElementById('description');
const submit_button = document.getElementById('submit-button');
const cards_section = document.getElementById('cards-section');
let idees = [];


// Ajout d'un écouteur d'événement pour la soumission du formulaire
form.addEventListener('submit', e =>{
    e.preventDefault();

    const libelleValue = libelle.value;
    const categorieValue = categorie.value;
    const descriptionValue = description.value;

    // Ajouter la nouvelle idée à la liste
    const nouvelleIdee = {
        libelle: libelleValue,
        categorie: categorieValue,
        description: descriptionValue
    };

    idees.push(nouvelleIdee); // Ajouter la nouvelle idée au tableau

    // Afficher à nouveau toutes les idées (y compris la nouvelle)
    affichageIdee(idees);

    resetForm();
});

//fonction pour réinitialiser les idées après soumission
const resetForm = () => {
    libelle.value = '';
    categorie.value = '';
    description.value = '';
}

//fonction pour afficher la liste des idées par carte
const affichageIdee = (idees) => {
    cards_section.innerHTML = ''; // Efface le contenu précédent

    idees.forEach(idee => {
        // Création d'une carte pour chaque idée
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${idee.libelle}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${idee.categorie}</h6>
                <p class="card-text">${idee.description}</p>
            </div> 
        `;
        cards_section.appendChild(card);
    });
}

