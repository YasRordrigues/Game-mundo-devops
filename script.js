// Importar PhaserJS
import Phaser from 'phaser';

// Criar a cena do jogo
class MundoDevOps extends Phaser.Scene {
  constructor() {
    super('MundoDevOps');
  }

  // Carregar assets
  preload() {
    this.load.image('personagem', 'assets/personagem.png');
    this.load.image('bau', 'assets/bau.png');
    // Carregar spritesheet do personagem
    this.load.spritesheet('personagem_animado', 'assets/personagem_animado.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  // Criar a cena
  create() {
    // Criar o canvas
    this.canvas = this.add.canvas(800, 600);

    // Criar o personagem
    this.personagem = this.add.sprite(100, 100, 'personagem');
    this.personagem.setScale(2);

    // Criar a trilha
    this.trilha = this.add.rectangle(400, 300, 800, 20, 0xffffff);

    // Criar os baús
    this.baús = [];
    for (let i = 0; i < 5; i++) {
      const bau = this.add.sprite(200 + i * 100, 300, 'bau');
      bau.setScale(2);
      this.baús.push(bau);
    }

    // Criar a animação do personagem
    this.anims.create({
      key: 'andar',
      frames: this.anims.generateFrameNumbers('personagem_animado', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Adicionar evento de movimento do personagem
    this.input.keyboard.on('keydown_LEFT', () => {
      this.personagem.x -= 10;
    });
    this.input.keyboard.on('keydown_RIGHT', () => {
      this.personagem.x += 10;
    });

    // Adicionar evento de interação com os baús
    this.baús.forEach((bau) => {
      bau.on('pointerdown', () => {
        // Mostrar cards com informações sobre ferramentas DevOps
        this.mostrarCard(bau);
      });
    });
  }

  // Mostrar card com informações sobre ferramentas DevOps
  mostrarCard(bau) {
    // Criar um grupo de objetos para o card
    const cardGroup = this.add.group();

    // Criar o card
    const card = this.add.rectangle(bau.x, bau.y, 200, 100, 0xffffff);
    cardGroup.add(card);

    // Criar o texto do card
    const texto = this.add.text(bau.x + 10, bau.y + 10, 'Ferramenta DevOps: Docker', {
      fontSize: 24,
      fill: '#000',
    });
    cardGroup.add(texto);

    // Adicionar evento de fechar o card
    cardGroup.on('pointerdown', () => {
      cardGroup.destroy();
    });
  }

  // Atualizar a cena
  update(time, delta) {
    // Atualizar a animação do personagem
    this.personagem.anims.play('andar');
  }
}

// Criar o jogo
const game = new Phaser.Game({
  type: Phaser.CANVAS,
  parent: 'game-container',
  scene: MundoDevOps,
  width: 800,
  height: 600,
});