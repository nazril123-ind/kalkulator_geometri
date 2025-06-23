
export class Tabung {
    constructor(jariJari, tinggi) {
        if (jariJari <= 0 || tinggi <= 0) {
            throw new Error('Jari-jari dan tinggi harus lebih besar dari 0');
        }
        this.jariJari = jariJari;
        this.tinggi = tinggi;
    }

    hitungVolume() {
        return Math.PI * this.jariJari * this.jariJari * this.tinggi;
    }

    hitungLuas() {
        // Luas permukaan tabung = 2πr² + 2πrt
        const luasAlas = Math.PI * this.jariJari * this.jariJari;
        const luasSelimut = 2 * Math.PI * this.jariJari * this.tinggi;
        return 2 * luasAlas + luasSelimut;
    }
}