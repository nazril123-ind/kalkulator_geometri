
export class Persegi {
    constructor(sisi) {
        if (sisi <= 0) {
            throw new Error('Sisi harus lebih besar dari 0');
        }
        this.sisi = sisi;
    }

    hitungLuas() {
        return this.sisi * this.sisi;
    }

    hitungKeliling() {
        return 4 * this.sisi;
    }
}