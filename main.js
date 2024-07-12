const form = document.getElementById('form');
const libelle = document.getElementById('libelle');
const categorie = document.getElementById('categorie');
const description = document.getElementById('description');
const submit_button = document.getElementById('submit-button');
const cards_section = document.getElementById('cards-section');



// Ajout d'un écouteur d'événement pour la soumission du formulaire
form.addEventListener('submit', e =>{
    e.preventDefault();

    const libelleValue = libelle.value;
    const categorieValue = categorie.value;
    const descriptionValue = description.value;

    resetForm();
});

//fonction pour réinitialiser les idées après soumission
const resetForm = () => {
    libelle.value = '';
    categorie.value = '';
    description.value = '';
}
