class VueJeu {
    constructor() {
        this.html = document.getElementById("html-vue-jeu").innerHTML;
        this.score = 0;
        this.sequenceJeu = [];
        this.sequenceJoueur = [];
        this.actionAllerVersPageScore = null;
        this.imageURI = null;
        this.elem = null;
        this.listeJeu = null;
    }

    initialiserActionAllerVersPageScore(actionAllerVersPageScore){
        this.actionAllerVersPageScore = actionAllerVersPageScore;
    }

    afficher(){
        /*console.log("pseudo : " + document.getElementById("input-text-pseudo").value)
        this.joueur.setPseudoJoueur(document.getElementById("input-text-pseudo").value)
        console.log(this.joueur.getPseudoJoueur())*/
        this.score = 0;
        this.sequenceJeu = [];
        this.sequenceJoueur = [];

        document.getElementsByTagName("body")[0].innerHTML = this.html;
        document.getElementById("score-ecran-de-jeu").innerHTML = this.score;
        document.getElementById("score-ecran-parametre").innerHTML = this.score;
        let listeEnJSON = JSON.stringify(this.listeJeu);
        console.log("Tesssst" + listeEnJSON);

        for (let i = 1; i <= 9; i++) {
            this.imageURI = this.listeJeu[i.toString()];
            this.elem = document.getElementById("carte" + i.toString());
            if (this.imageURI) {
                this.elem.style.backgroundImage = "url('" + this.imageURI + "')";
                this.elem.style.backgroundSize = "cover";
                this.elem.style.backgroundRepeat = "no-repeat";
            }
        }

        let cartes = document.getElementsByClassName("carre-ecran-de-jeu")

        setTimeout(() => this.faireJouerSequence(), 1000);

        for (var i = 0; i < cartes.length; i++) {
            let idCarte = cartes[i].id;
            cartes[i].addEventListener("click", () =>this.verifierSequence(idCarte));
        }

    }

    verifierSequence(idCarte){
        this.faireTournerCarte(idCarte);
        if (this.sequenceJeu[this.sequenceJoueur.length] == idCarte) {
            this.sequenceJoueur.push(idCarte);
            if (this.sequenceJoueur.length == this.sequenceJeu.length) {
                this.augmenterScore();
                setTimeout(() =>this.faireJouerSequence(), 2000);
            }
        }
        else {
            this.actionAllerVersPageScore(this.score);
        }
    }

    augmenterScore() {
        this.score += 1;
        document.getElementById("score-ecran-de-jeu").innerHTML = this.score;
        document.getElementById("score-ecran-parametre").innerHTML = this.score;
    }

    async faireJouerSequence(){
        for (var i = 0; i < this.sequenceJeu.length; i++) {
            //await this.sleep(3000);
            await this.faireTournerCarte(this.sequenceJeu[i]);
            console.log(this.sequenceJeu[i]);
        }
        let idCarte = 'carte' + (Math.floor(Math.random() * 9) + 1);
        this.faireTournerCarte(idCarte);
        this.sequenceJeu.push(idCarte);
        this.sequenceJoueur = [];
    }

    async faireTournerCarte(idCarte){
        gsap.to('#' + idCarte, {
            rotate: '+=360',
            ease: 'back.out'
        })
        await this.sleep(1000);
    }

    initialiserListe(liste){
        this.listeJeu = liste;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}