class KliquencerieDAO {
    constructor() {
        this.token = "valeurAuthentification";
        this.listeObjetsJoueurs = null;
    }

    retournerLesVingtMeilleursScores() {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var apiUrl = 'https://arbre-du-savoir.shop/ProjetCordova/controlleurs/JoueurControlleur.php?methode=retournerLesVingtMeilleursScores&token=' + this.token;

            xhr.open('GET', apiUrl, true);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        var response = xhr.responseText;
                        this.listeObjetsJoueurs = this.convertirJsonEnString(response);
                        for (let joueur of this.listeObjetsJoueurs) {
                            console.log('ID du joueur :', joueur.getIdJoueur());
                        }
                        resolve();  // Resolve the promise when the operation is complete
                    } else {
                        reject('La requête a échoué.');  // Reject the promise on error
                    }
                }
            };

            xhr.send();
        });
    }

    retournerUnJoueurParSonId(idJoueur) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var apiUrl = 'https://arbre-du-savoir.shop/ProjetCordova/controlleurs/JoueurControlleur.php?methode=getJoueurParId&joueur='+ idJoueur +'&token=' + this.token;

            xhr.open('GET', apiUrl, true);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        var response = xhr.responseText;
                        this.listeObjetsJoueurs = this.convertirJsonEnString(response);
                        for (let joueur of this.listeObjetsJoueurs) {
                            console.log('ID du joueur :', joueur.getIdJoueur());
                        }
                        resolve();  // Resolve the promise when the operation is complete
                    } else {
                        reject('La requête a échoué.');  // Reject the promise on error
                    }
                }
            };

            xhr.send();
        });
    }


    miseAJourPseudo(idJoueur, NewPseudo) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var apiUrl = 'https://arbre-du-savoir.shop/ProjetCordova/controlleurs/JoueurControlleur.php?methode=ModifierLePseudo&newPseudo='+ NewPseudo +'&joueur='+ idJoueur +'&token=' + this.token;

            xhr.open('GET', apiUrl, true);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log("Pseudo Modifié : " + NewPseudo)
                        resolve();  // Resolve the promise when the operation is complete
                    } else {
                        reject('La requête a échoué.');  // Reject the promise on error
                    }
                }
            };

            xhr.send();
        });
    }

    miseAJourScore(idJoueur, NewScore) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var apiUrl = 'https://arbre-du-savoir.shop/ProjetCordova/controlleurs/JoueurControlleur.php?methode=ModifierLeScore&newScore='+ NewScore +'&joueur='+ idJoueur +'&token=' + this.token;

            xhr.open('GET', apiUrl, true);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log("Score Modifié : " + NewScore)
                        resolve();  // Resolve the promise when the operation is complete
                    } else {
                        reject('La requête a échoué.');  // Reject the promise on error
                    }
                }
            };

            xhr.send();
        });
    }

    ajouterJoueur(pseudo, token) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var apiUrl = 'https://arbre-du-savoir.shop/ProjetCordova/controlleurs/JoueurControlleur.php?methode=AjouterJoueur&pseudo='+ pseudo +'&tokenJoueur='+ token +'&token=' + this.token;

            xhr.open('GET', apiUrl, true);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve();  // Resolve the promise when the operation is complete
                    } else {
                        reject('La requête a échoué.');  // Reject the promise on error
                    }
                }
            };

            xhr.send();
        });
    }

    getJoueurParToken(token) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var apiUrl = 'https://arbre-du-savoir.shop/ProjetCordova/controlleurs/JoueurControlleur.php?methode=getJoueurParToken&tokenJoueur='+ token +'&token=' + this.token;

            xhr.open('GET', apiUrl, true);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        var response = xhr.responseText;
                        console.log("test" + JSON.stringify(response));
                        this.listeObjetsJoueurs = this.convertirJsonEnString(response);
                        resolve(this.listeObjetsJoueurs);  // Resolve the promise when the operation is complete
                    } else {
                        reject('La requête a échoué.');  // Reject the promise on error
                    }
                }
            };

            xhr.send();
        });
    }
    convertirJsonEnString(jsonInput) {
        var listeObjetsJoueurs = JSON.parse(jsonInput).map(jsonJoueur => {
            const joueur = new Joueur();
            joueur.setIdJoueur(jsonJoueur.idJoueur);
            joueur.setPseudoJoueur(jsonJoueur.pseudoJoueur);
            joueur.setMeilleurScoreJoueur(jsonJoueur.meilleurScoreJoueur);
            return joueur;
        });
        return listeObjetsJoueurs;
    }

//------------------------GETTERS AND SETTERS------------------------

    getListeObjetsJoueurs() {
        return this.listeObjetsJoueurs;
    }
}
