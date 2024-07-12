const form = document.getElementById('form');
const libelle = document.getElementById('libelle');
const categorie = document.getElementById('categorie');
const description = document.getElementById('description');
const submit_button = document.getElementById('submit-button');
const cards_section = document.getElementById('cards-section');
const counter = document.getElementById('char-counter');
const maxLenght = description.getAttribute('maxlength');
let idees = [];
// Expressions régulières pour vérifier l'absence de chiffres et de balises HTML
const regexNoDigits = /^[^\d]*$/; 
const regexNoHTML = /<\/?[^>]+(>|$)/g; 
// Liste des catégories valides
const validCategories = [
    { name: "Politique", image: "https://www.leparisien.fr/resizer/Y3nncH8lt8e_l906tUG9ug0okXo=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/ERSNC4R5GVAS3N75DVLNBK6HY4.jpg" },
    { name: "Sport", image: "https://i.ytimg.com/vi/evftqcUAsLk/maxresdefault.jpg" },
    { name: "Sante", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQliC8GApWw0vWibBrayTjzBMUS8Fa0I-vOQ&s" },
    { name: "Education", image: "https://ared-edu.org/wp-content/uploads/2021/06/KEURNDIAYE30-scaled.jpg" },
    { name: "Autre", image: "https://img.freepik.com/vecteurs-libre/jeu-isometrique-personnes-jeux-societe_1284-23221.jpg?t=st=1720806000~exp=1720809600~hmac=4f303211dea223d53c3ae602634432657ed074380d56c126a12a70754f2a1bec&w=740" }
];


// Récupérer les données depuis localStorage au chargement de la page
const ideesFromStorage = JSON.parse(localStorage.getItem('idees')) || [];
idees = ideesFromStorage; // Mettre à jour le tableau idees avec les données récupérées


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
    } else if (!validCategories.some(category => category.name === valeurCategorie)) {
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
     } else if (valeurDescription.length < 10 || valeurDescription.length > 255) {
         setError(description, 'La description doit contenir entre 10 et 255 caractères');
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

    // Afficher un message d'erreur si les validations ont échoué
    if (!isValid) {
        displayMessage('Veuillez corriger les erreurs dans le formulaire.', false);
        return;
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
        // Afficher un message de succès
    displayMessage('L\'idée a été ajoutée avec succès.', true);


         // Sauvegarder dans localStorage
    localStorage.setItem('idees', JSON.stringify(idees));

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
        // Trouver l'objet catégorie correspondant dans validCategories
        const categorieObj = validCategories.find(cat => cat.name === idee.categorie);

        if (!categorieObj) {
            console.error(`La catégorie "${idee.categorie}" n'a pas d'image associée.`);
            return;
        }

        // Création d'une carte pour chaque idée
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Définir les classes et icônes selon l'état d'approbation
        let cardBorderClass = '';
        if (idee.approved === true) {
            cardBorderClass = 'border-success';
        } else if (idee.approved === false) {
            cardBorderClass = 'border-danger';
        }

        card.innerHTML = `
            <div class="card-body ${cardBorderClass}">
                <img src="${categorieObj.image}" alt="${idee.categorie}" class="category-image" />
                <h5 class="card-title">${idee.libelle}</h5>
                <h6 class="card-subtitle mb-2 text-muted"> Catégorie: ${idee.categorie}</h6>
                <p class="card-text mb-5">${idee.description}</p>
                <div class="approval-icons">
                    ${idee.approved !== true ? `<i class="fas fa-thumbs-up approve-icon" data-index="${index}"></i>` : ''}
                    ${idee.approved !== false ? `<i class="fas fa-thumbs-down disapprove-icon" data-index="${index}"></i>` : ''}
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;

        // Ajout d'un gestionnaire d'événements pour le bouton de suppression
        const deleteButton = card.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette idée ?");
            if (confirmation) {
                idees.splice(index, 1); // Supprimer l'idée du tableau
                affichageIdee(idees); // Réafficher les idées mises à jour
                localStorage.setItem('idees', JSON.stringify(idees));
            }
        });

        // Ajout d'événements pour l'approbation et la désapprobation
        const approveIconElement = card.querySelector('.approve-icon');
        if (approveIconElement) {
            approveIconElement.addEventListener('click', () => {
                idees[index].approved = true; // Approuver l'idée
                affichageIdee(idees); // Réafficher les idées mises à jour
                localStorage.setItem('idees', JSON.stringify(idees));
            });
        }

        const disapproveIconElement = card.querySelector('.disapprove-icon');
        if (disapproveIconElement) {
            disapproveIconElement.addEventListener('click', () => {
                idees[index].approved = false; // Désapprouver l'idée
                affichageIdee(idees); // Réafficher les idées mises à jour
                localStorage.setItem('idees', JSON.stringify(idees));
            });
        }

        cards_section.appendChild(card);
    });
}

affichageIdee(idees);

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
const displayMessage = (message, isSuccess) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isSuccess ? 'success' : 'error');
    messageDiv.textContent = message;

    // Insérer le message avant le formulaire
    form.parentElement.insertBefore(messageDiv, form);

    // Masquer le formulaire pendant l'affichage du message
    form.style.display = 'none';

    setTimeout(() => {
        // Retirer le message
        messageDiv.remove();
        form.style.display = 'block'; // Afficher à nouveau le formulaire après 2 secondes
    }, 2000); // Affiche le message pendant 2 secondes
};

// Écouteur d'événement pour mettre à jour le compteur de caractères
description.addEventListener('input', e => {
    const maxLength = 255;
    const currentLength = e.target.value.length;

    const leftCharLength = maxLength - currentLength;

    if (leftCharLength < 0) return;

    // Mise à jour du texte du compteur avec la valeur actuelle et le total
    counter.innerText = `${currentLength}/${maxLength}`;
});
