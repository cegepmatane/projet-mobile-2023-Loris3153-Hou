class Application {
    constructor(window, vueAccueilJeu, vueJeu, vuePersonnalisationJeu, vueScore, vueParametre) {
        this.window = window;
        this.vueAccueilJeu = vueAccueilJeu;
        this.vueJeu = vueJeu;
        this.vuePersonnalisationJeu = vuePersonnalisationJeu;
        this.vueScore= vueScore;
        this.vueParametre= vueParametre;

        document.addEventListener('hashchange', () =>this.naviguer());

        this.naviguer();
        //setTimeout(() =>this.naviguer(), 3000);
    }

    naviguer(){
        let hash = window.location.hash;
        console.log(hash);
        if(!hash){
            this.vueAccueilJeu.afficher();

        }else if(hash.match(/^#jeu/)){

            this.vueJeu.afficher();
            this.window.location.hash = "#";
            window.location.href = urlSansFragment + "#score";
            setTimeout(() =>this.naviguer(), 5000);

        }else if (hash.match(/^#parametre/)){

            this.vueParametre.afficher();

        }else if (hash.match(/^#score/)){

            this.vueScore.afficher();

        }
        else if (hash.match(/^#perso/)){
            this.vuePersonnalisationJeu.afficher();
        }
    }
}

new Application(window, new VueAccueilJeu(), new VueJeu(), new VuePersonnalisationJeu(), new VueScore(), new VueParametre());