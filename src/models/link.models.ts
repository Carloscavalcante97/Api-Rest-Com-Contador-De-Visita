interface ILink {
    identificador: string;
    url: string;
    visitas: number;
}
class Link implements ILink {
    identificador: string;
    url: string;
    visitas: number;
    constructor(identificador: string, url: string) {
        this.identificador = identificador;
        this.url = url;
        this.visitas = 0;
    }
}
export default Link