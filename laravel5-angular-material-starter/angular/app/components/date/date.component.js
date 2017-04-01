class DateController{
    constructor(){
        'ngInject';

        this.jour = null;
        this.mois = null;
    }
    
    formatDate() {
        if(this.date !== undefined) {
            let monthList = {
                "01": "JANVIER",
                "02": "FÉVRIER",
                "03": "MARS",
                "04": "AVRIL",
                "05": "MAI",
                "06": "JUIN",
                "07": "JUILLET",
                "08": "AOÛT",
                "09": "SEPTEMBRE",
                "10": "OCTOBRE",
                "11": "NOVEMBRE",
                "12": "DÉCEMBRE",
            }

            let dateSplit = this.date.split(" ");
            
            let date = dateSplit[0].split("-");
            let monthNumber = date[1];

            this.mois = monthList[monthNumber];
            this.jour =  date[2];  
        }
    }

    $onChanges(){ 
        this.formatDate();
    }
}

export const DateComponent = {
    templateUrl: './views/app/components/date/date.component.html',
    controller: DateController,
    controllerAs: 'vm',
    bindings: {
        date: '@'
    }
}
