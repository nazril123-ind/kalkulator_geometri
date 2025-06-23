
export class Lingkaran {
    constructor(jariJari) {
        if (jariJari <= 0) {
            throw new Error('Jari-jari harus lebih besar dari 0');
        }
        this.jariJari = jariJari;
    }

    hitungLuas() {
        return Math.PI * this.jariJari * this.jariJari;
    }

    hitungKeliling() {
        return 2 * Math.PI * this.jariJari;
    }
}