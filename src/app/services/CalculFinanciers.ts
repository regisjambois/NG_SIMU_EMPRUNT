
/******************************************************************************/

/**
 * Repr�sentation d'une ligne d'un tableau d'amortissement
 */
class LigneAmortissement {
  constructor() {}
  public num: number;
  public crd: number;
  public interets: number;
  public amort: number;
}

/**
 * Representation d'un tableau d'amortissement d'emprunt
 */
export class TableauAmortissement {

  private lignes: Array<LigneAmortissement> = new Array();
  private capital : number;
  private taux    : number;
  private duree   : number;
  
  private tabEch      : Array<string> = new Array();
  private tabInterets : Array<number> = new Array();
  private tabAmort    : Array<number> = new Array();
  
  private totalInterets: number;
  /**
  * Tableau d'amortissement d'emprunt
  * le taux annuel est exprim� en %
  * la dur�e est exprim�e en nombre de mois (180 pour 15 ans)
  * La m�thode retourne la mensualit�
  * @param {number} capital
  * @param {number} taux
  * @param {number} duree
  * @return {number}
  */
  constructor(c: number, t: number, d: number) {
    this.calculerTableauAmortissement(c,t,d);
  }
  
  public calculerTableauAmortissement(c: number, t: number, d: number) {
    
    this.capital        = c;
    this.taux           = t;
    this.duree          = d;
    this.totalInterets  = 0;
    
    
    // Le tableau des lignes
    this.lignes       = new Array();
    this.tabEch       = new Array();
    this.tabInterets  = new Array();
    this.tabAmort     = new Array();    
    
    let m = CalculFinanciers.getMensualite(this.capital, this.taux, this.duree);

    let i:number;
    console.log("capital : "+this.capital);
    console.log("taux : "+this.taux);
    console.log("duree : "+this.duree);
    let crd = this.capital;
    for (i=1;i<=this.duree;i++) {
        let ligne = new LigneAmortissement();
        ligne.num = i;
        // les intérêts du mois
        let interets = CalculFinanciers.getInteretsMensuel(crd,this.taux);
        ligne.interets = interets;
        // total des interets
        this.totalInterets += interets;
        
        // console.log("CRD : "+ligne.crd);
        // Amortissement du mois (mensualit� - les int�r�ts mensuels)
        ligne.amort = m - interets;
        // CRD du mois suivant
        crd = crd - ligne.amort;
        // Capital restant du
        ligne.crd = crd;
        // Ajouter la ligne dans le tableau d'amortissement
        this.lignes[i - 1] = ligne;
      
      
        // Tableau des num�ros d'�ch�ances
        this.tabEch[i]        = String(i);
        // Tableau des interets
        this.tabInterets[i]   = Number(ligne.interets.toFixed(2));
        // Tableau des amortissements
        this.tabAmort[i]      = Number(ligne.amort.toFixed(2));
      
    }    
  }

  public getLignesAmortissement() {
    return this.lignes;
  }
  
  public getMensualite() {
    return CalculFinanciers.getMensualite(this.capital, this.taux, this.duree);
  }

  public getTotalInterets() {
    return this.totalInterets;
  }
  
  /**
   * Tableau des num�ros d'�ch�ances pour le graphique
   */
  public getTabNumEcheances() {
    return this.tabEch;
  }
  
  /**
   * Tableau des interets
   */
  public getTabInterets() {
    return this.tabInterets; 
  }
  
  /**
   * Tableau des amortissements
   */
  public getTabAmort() {    
    return this.tabAmort;    
  }
  
  
  /**
   * Affichage du tableau d'amortissement
   */
  public toString() {
    for (let uneLigne of this.getLignesAmortissement()) {
      let m = uneLigne.interets+uneLigne.amort;
      console.log(uneLigne.num+" ==> "+uneLigne.crd.toFixed(2)+" | "+uneLigne.interets.toFixed(2)+" | "+uneLigne.amort.toFixed(2)+" ==> "+m.toFixed(2));
    }
  }

}


/**
 * Classe de calculs financiers
 * Amortissement d'un emprunt
 */
export class CalculFinanciers {
  /**
   * Constructeur vide
   * @constructor
   */
  constructor() {}
  /**
  * M�thode statique de calcul d'une mensualit�
  * le taux annuel est exprimé en %
  * la dur�e est exprimée en nombre de mois (180 pour 15 ans)
  * La m�thode retourne la mensualit�
  * @param {number} capital
  * @param {number} taux
  * @param {number} duree
  * @return {number}
  */
  static getMensualite(capital:number, taux:number,duree:number)  {
    let txm = taux/100/12;
    let p1 = capital * txm;
    let p2 = 1-(1/Math.pow((1+txm),duree));
    return p1/p2;
  }

  /**
   * M�thode de statique de calcul des int�r�ts mensuel
   * d'un capital
   * le taux annuel est exprim� en %
   * @param {number} capital
   * @param {number} taux
   */
   static getInteretsMensuel(capital:number, taux:number) {
     let txm = taux/100/12;
     let interets = capital * txm;
     return interets;
   }
  
  /**
   * M�thode de calcul du co�t d'une emprunt
   * Montant total des int�r�ts per�us
   * @return {number} Montant des interets per�us
   */
   static getInterets(capital:number, taux:number,duree:number) {
     let i:number;
     let crd = capital;
     let m = this.getMensualite(capital,taux,duree);
     let intTot = 0;
     for (i = 1 ; i <= duree ; i++) {
        
        // les int�r�ts du mois
        let interets = CalculFinanciers.getInteretsMensuel(crd,taux);
        intTot = intTot + interets;
       
        // Amortissement du mois (mensualit� - les int�r�ts mensuels)
        let amort = m - interets;
        // CRD du mois suivant
        crd = crd - amort;
        
    }
     return intTot;
   }

}


