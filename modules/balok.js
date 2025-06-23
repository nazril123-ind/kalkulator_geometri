
export class Balok {
    constructor(panjang, lebar, tinggi) {
        if (panjang <= 0 || lebar <= 0 || tinggi <= 0) {
            throw new Error('Panjang, lebar, dan tinggi harus lebih besar dari 0');
        }
        this.panjang = panjang;
        this.lebar = lebar;
        this.tinggi = tinggi;
    }

    hitungVolume() {
        return this.panjang * this.lebar * this.tinggi;
    }

    hitungLuas() {
        // Luas permukaan balok = 2(pl + pt + lt)
        return 2 * (this.panjang * this.lebar + 
                   this.panjang * this.tinggi + 
                   this.lebar * this.tinggi);
    }
}