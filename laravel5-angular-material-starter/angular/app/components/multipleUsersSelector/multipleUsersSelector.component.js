/**
 * Composant permettant d'utiliser des chips sur les utilisateurs
 */
class MultipleUsersSelectorController{
    /**
     * Constructeur du composant
     */
    constructor(UserService){
        'ngInject';

        this.UserService = UserService;
        this.contacts = [];
    }
    
    /**
     * Methode permettant de recuperer une liste filtree d'utilisateurs
     */
    getFilteredUserList(selector) {
        return this.UserService.findAll().then(
            (success) => {
                let users = [];
                
                success.forEach((user) => {
                    let combinedName = user.firstName + ' ' + user.name;
                    
                    if(combinedName.includes(selector))
                        users.push({ name: user.firstName + " " + user.name, email: user.email });
                });

                return users;
            },
            (error) => {
                //En cas d'erreur
                return ['Impossible de charger les utilisateurs...'];
            }
        );
    }
    
    /**
     * Methode appelee a l'initialisation du composant
     */
    $onInit(){
    }
}

export const MultipleUsersSelectorComponent = {
    templateUrl: './views/app/components/multipleUsersSelector/multipleUsersSelector.component.html',
    controller: MultipleUsersSelectorController,
    controllerAs: 'vm',
    bindings: {}
}
