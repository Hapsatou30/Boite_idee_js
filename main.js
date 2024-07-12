const form = document.getElementById('form');
const libelle = document.getElementById('libelle');
const categorie = document.getElementById('categorie');
const description = document.getElementById('description');
const submit_button = document.getElementById('submit-button');
const cards_section = document.getElementById('cards-section');
let idees = [];
// Expressions régulières pour vérifier l'absence de chiffres et de balises HTML
const regexNoDigits = /^[^\d]*$/; 
const regexNoHTML = /<\/?[^>]+(>|$)/g; 
// Liste des catégories valides
const validCategories = ["Politique", "Sport", "Sante", "Education", "Autre"];


// Ajout d'un écouteur d'événement pour la soumission du formulaire
form.addEventListener('submit', e =>{
    e.preventDefault();

    let isValid = true;

    // Validation du libelle
    const valeurLibelle = libelle.value.trim();
    if (valeurLibelle === '') {
        setError(libelle, 'Le libelle est obligatoire');
        isValid = false;
    } else if (valeurLibelle.length < 5 || valeurLibelle.length > 50) {
        setError(libelle, 'Le libelle doit contenir entre 5 et 50 caractères');
        isValid = false;
    } else if (!regexNoDigits.test(valeurLibelle)) {
        setError(libelle, 'Le libelle ne doit pas contenir de chiffres');
        isValid = false;
    } else if (regexNoHTML.test(valeurLibelle)) {
        setError(libelle, 'Le libelle ne doit pas contenir de balises HTML');
        isValid = false;
    } else {
        setSuccess(libelle);
    }


    // Validation de la categorie
    const valeurCategorie = categorie.value.trim();
    if (valeurCategorie === '') {
        setError(categorie, 'Vous devez choisir une catégorie');
        isValid = false;
    } else if (!validCategories.includes(valeurCategorie)) {
        setError(categorie, "Cette catégorie n'existe pas");
        isValid = false;
    } else {
        setSuccess(categorie);
    }

     // Validation de la description
     const valeurDescription = description.value.trim();
     if (valeurDescription === '') {
         setError(description, 'La description est obligatoire');
         isValid = false;
     } else if (valeurDescription.length < 10 || valeurDescription.length > 250) {
         setError(description, 'La description doit contenir entre 10 et 250 caractères');
         isValid = false;
     } else if (!regexNoDigits.test(valeurDescription)) {
         setError(description, 'La description ne doit pas contenir de chiffres');
         isValid = false;
     } else if (regexNoHTML.test(valeurDescription)) {
        setError(description, 'La description ne doit pas contenir de balises HTML');
        isValid = false;
    } else {
         setSuccess(description);
     }

    
    // Si toutes les validations sont réussies, ajouter la nouvelle idée
    if (isValid) {
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
    }
});

//fonction pour réinitialiser les idées après soumission
const resetForm = () => {
    libelle.value = '';
    categorie.value = '';
    description.value = '';


    libelle.parentElement.classList.remove('success', 'error');
    categorie.parentElement.classList.remove('success', 'error');
    description.parentElement.classList.remove('success', 'error');
}

const affichageIdee = (idees) => {
    cards_section.innerHTML = ''; // Efface le contenu précédent

    idees.forEach((idee, index) => {
        // Création d'une carte pour chaque idée
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
             <div class="card-body">
                <h5 class="card-title">${idee.libelle}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${idee.categorie}</h6>
                <p class="card-text">${idee.description}</p>
                <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">
                    <i class="fas fa-trash-alt"></i> 
                </button>
            </div> 
        `;

        // Ajout d'un gestionnaire d'événements pour le bouton de suppression
        const deleteButton = card.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette idée ?");
            if (confirmation) {
                idees.splice(index, 1); // Supprimer l'idée du tableau
                affichageIdee(idees); // Réafficher les idées mises à jour
            }
        });


        cards_section.appendChild(card);
    });
}

//fonction pour afficher un message d'erreur 
const setError = (element, message)  => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

//fonction pour afficher un message de succès
const setSuccess = (element, message)  => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}