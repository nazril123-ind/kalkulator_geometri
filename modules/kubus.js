
export class Kubus {
    constructor(sisi) {
        if (sisi <= 0) {
            throw new Error('Sisi harus lebih besar dari 0');
        }
        this.sisi = sisi;
    }

    hitungVolume() {
        return this.sisi * this.sisi * this.sisi;
    }

    hitungLuas() {
        return 6 * this.sisi * this.sisi;
    }
}