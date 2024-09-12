import Link from "./link.models"

describe('Criação de links', () => {
    test('deve criar um link', () => {

    const link = new Link("CarlinCavalcante",'www.carlincavalcante.com.br');

    expect(link).toHaveProperty('identificador', 'CarlinCavalcante');
    expect(link).toHaveProperty('url', 'www.carlincavalcante.com.br');
    expect(link).toHaveProperty('visitas', 0);
})
})