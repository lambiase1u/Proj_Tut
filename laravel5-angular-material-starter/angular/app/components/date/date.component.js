class DateController{
    constructor(){
        'ngInject';

        this.jour = null;
        this.mois = null;
    }
    
    formatDate() {
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
        
        let dateSplit = this.date.split("-");
        let monthNumber = dateSplit[1];
        let dayNumber = dateSplit[2].split(' ')[0];
        
        this.mois = monthList[monthNumber];
        this.jour = dayNumber;
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
