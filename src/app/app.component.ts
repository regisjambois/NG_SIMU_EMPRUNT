import { Component } from '@angular/core';
import { TableauAmortissement } from './services/CalculFinanciers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {

    displayDialog: boolean;

    data1:         any;
    data2:         any;
  
    montant:      number = 235000;
    taux:         number = 1.5;
    duree:        number = 240;
  
    mensualite:   number = 0;
    interetsTot:  number = 0;
  
    ta = new TableauAmortissement(this.montant,this.taux,this.duree);
    
  
    constructor() {
        
    }

    ngOnInit() {
      this.calculer();
    }

    showDialog() {
        console.log('APPEL de showDialog');
        this.displayDialog = true;
    }

    closeDialog() {
        this.displayDialog = false;
    }
  
    calculer() {
        // Tableau d'amortissement 
        this.ta.calculerTableauAmortissement(this.montant,this.taux,this.duree);
      
        this.mensualite   =   this.ta.getMensualite();
        this.interetsTot  =   this.ta.getTotalInterets();
        // Mise à jour du graphique
        this.getGraphique(this.montant,this.interetsTot,this.ta);
      
    }
  
    getGraphique(c: number, i: number, ta: TableauAmortissement) {
            
            console.log('APPEL de getGraphique');
            
            this.data1 = {
            labels: ['INTERETS','CAPITAL'],
            datasets: [
                {
                    data: [i, c],
                    backgroundColor: ["#cc3300","#66ccff"]                    
                }]
            };
            
            this.data2 = {
            labels: ta.getTabNumEcheances(),
            datasets: [
                {
                    label: 'INTERETS',
                    data: ta.getTabInterets(),
                    fill: true,
                    borderColor: '#cc3300'
                },
                {
                    label: 'AMORTISSEMENTS',
                    data: ta.getTabAmort(),
                    fill: true,
                    borderColor: '#66ccff'
                }
            ]
        }            
            
    }

}
