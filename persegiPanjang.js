
export class PersegiPanjang {
    constructor(panjang, lebar) {
        if (panjang <= 0 || lebar <= 0) {
            throw new Error('Panjang dan lebar harus lebih besar dari 0');
        }
        this.panjang = panjang;
        this.lebar = lebar;
    }

    hitungLuas() {
        return this.panjang * this.lebar;
    }

    hitungKeliling() {
        return 2 * (this.panjang + this.lebar);
    }
}